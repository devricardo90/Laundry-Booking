import { createHash } from 'node:crypto';
import type { Prisma } from '@prisma/client';
import type { FastifyInstance } from 'fastify';
import { prisma } from './prisma.js';

const operationalTimezone = 'Europe/Stockholm';
const slotDurationMinutes = 120;
const slotDurationHours = slotDurationMinutes / 60;
const residentLockNamespace = 40_401;
const laundryRoomLockNamespace = 40_402;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const slotStartPattern = /^\d{2}:\d{2}$/;

type DateParts = {
  year: number;
  month: number;
  day: number;
};

type CreateBookingBody = {
  residentId?: unknown;
  laundryRoomId?: unknown;
  date?: unknown;
  slotStart?: unknown;
};

type ParsedCreateBookingBody = {
  residentId: string;
  laundryRoomId: string;
  date: DateParts;
  slotStartHour: number;
};

type BookingConflictErrorCode =
  | 'RESIDENT_INACTIVE'
  | 'LAUNDRY_ROOM_INACTIVE'
  | 'RESIDENT_HAS_ACTIVE_BOOKING'
  | 'BOOKING_CONFLICT'
  | 'BLOCKED_SLOT_CONFLICT'
  | 'BOOKING_NOT_ACTIVE'
  | 'BOOKING_ALREADY_STARTED';

class BookingConflictError extends Error {
  constructor(readonly code: BookingConflictErrorCode) {
    super(code);
  }
}

class NotFoundError extends Error {
  constructor(readonly resource: 'Resident' | 'LaundryRoom' | 'Booking') {
    super(`${resource} not found`);
  }
}

type CancelBookingRouteParams = {
  bookingId: string;
};

type ListBookingsQuery = {
  laundryRoomId?: string;
  date?: string;
  status?: string;
};

type BookingListStatus = 'ACTIVE' | 'CANCELED';

const bookingListStatuses = new Set<BookingListStatus>(['ACTIVE', 'CANCELED']);

const getDatePartsInTimezone = (date: Date, timeZone: string): DateParts => {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);

  return {
    year: Number(parts.find((part) => part.type === 'year')?.value),
    month: Number(parts.find((part) => part.type === 'month')?.value),
    day: Number(parts.find((part) => part.type === 'day')?.value),
  };
};

const datePartsToKey = (dateParts: DateParts) =>
  `${dateParts.year.toString().padStart(4, '0')}-${dateParts.month.toString().padStart(2, '0')}-${dateParts.day
    .toString()
    .padStart(2, '0')}`;

const datePartsToOrdinal = (dateParts: DateParts) =>
  Math.floor(Date.UTC(dateParts.year, dateParts.month - 1, dateParts.day) / 86_400_000);

const addDaysToDateParts = (dateParts: DateParts, days: number): DateParts => {
  const date = new Date(Date.UTC(dateParts.year, dateParts.month - 1, dateParts.day + days));

  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  };
};

const parseDate = (value: string): DateParts | null => {
  if (!datePattern.test(value)) {
    return null;
  }

  const [yearText, monthText, dayText] = value.split('-');
  const dateParts = {
    year: Number(yearText),
    month: Number(monthText),
    day: Number(dayText),
  };
  const validDate = new Date(Date.UTC(dateParts.year, dateParts.month - 1, dateParts.day));
  const normalized = datePartsToKey(dateParts);

  if (
    normalized !== value ||
    validDate.getUTCFullYear() !== dateParts.year ||
    validDate.getUTCMonth() + 1 !== dateParts.month ||
    validDate.getUTCDate() !== dateParts.day
  ) {
    return null;
  }

  return dateParts;
};

const parseSlotStartHour = (value: string): number | null => {
  if (!slotStartPattern.test(value)) {
    return null;
  }

  const [hourText, minuteText] = value.split(':');
  const hour = Number(hourText);
  const minute = Number(minuteText);

  if (!Number.isInteger(hour) || !Number.isInteger(minute) || hour < 0 || hour > 23 || minute !== 0) {
    return null;
  }

  return hour % slotDurationHours === 0 ? hour : null;
};

const getTimezoneOffsetMinutes = (date: Date, timeZone: string) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(date);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const asUtc = Date.UTC(
    Number(values.year),
    Number(values.month) - 1,
    Number(values.day),
    Number(values.hour),
    Number(values.minute),
    Number(values.second),
  );

  return (asUtc - date.getTime()) / 60_000;
};

const localTimeToUtcDate = (dateParts: DateParts, hour: number, timeZone: string) => {
  const utcGuess = new Date(Date.UTC(dateParts.year, dateParts.month - 1, dateParts.day, hour));
  const offsetMinutes = getTimezoneOffsetMinutes(utcGuess, timeZone);

  return new Date(utcGuess.getTime() - offsetMinutes * 60_000);
};

const validateBody = (body: unknown): ParsedCreateBookingBody | { message: string } => {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { message: 'request body must be an object' };
  }

  const { residentId, laundryRoomId, date, slotStart } = body as CreateBookingBody;

  if (typeof residentId !== 'string' || typeof laundryRoomId !== 'string' || typeof date !== 'string') {
    return { message: 'residentId, laundryRoomId, date, and slotStart are required' };
  }

  if (typeof slotStart !== 'string') {
    return { message: 'residentId, laundryRoomId, date, and slotStart are required' };
  }

  if (!uuidPattern.test(residentId)) {
    return { message: 'residentId must be a valid UUID' };
  }

  if (!uuidPattern.test(laundryRoomId)) {
    return { message: 'laundryRoomId must be a valid UUID' };
  }

  const parsedDate = parseDate(date);

  if (!parsedDate) {
    return { message: 'date must use YYYY-MM-DD format' };
  }

  const slotStartHour = parseSlotStartHour(slotStart);

  if (slotStartHour === null) {
    return { message: 'slotStart must align to the 2-hour slot grid' };
  }

  const today = getDatePartsInTimezone(new Date(), operationalTimezone);
  const maxDate = addDaysToDateParts(today, 14);
  const requestedOrdinal = datePartsToOrdinal(parsedDate);

  if (requestedOrdinal < datePartsToOrdinal(today) || requestedOrdinal > datePartsToOrdinal(maxDate)) {
    return { message: 'date must be within the next 14 days' };
  }

  const slotStartDate = localTimeToUtcDate(parsedDate, slotStartHour, operationalTimezone);

  if (slotStartDate <= new Date()) {
    return { message: 'slot must not be in the past' };
  }

  return {
    residentId,
    laundryRoomId,
    date: parsedDate,
    slotStartHour,
  };
};

const advisoryLockKey = (value: string) => {
  const hash = createHash('sha256').update(value).digest();

  return hash.readInt32BE(0);
};

const conflictMessage = (code: BookingConflictErrorCode) => {
  switch (code) {
    case 'RESIDENT_INACTIVE':
      return 'Resident is not active';
    case 'LAUNDRY_ROOM_INACTIVE':
      return 'LaundryRoom is not active';
    case 'RESIDENT_HAS_ACTIVE_BOOKING':
      return 'Resident already has a future ACTIVE booking';
    case 'BOOKING_CONFLICT':
      return 'Requested slot is no longer available';
    case 'BLOCKED_SLOT_CONFLICT':
      return 'Requested slot is blocked';
    case 'BOOKING_NOT_ACTIVE':
      return 'Booking cannot be canceled unless it is ACTIVE';
    case 'BOOKING_ALREADY_STARTED':
      return 'Booking cannot be canceled after it has started';
  }
};

export const registerBookingRoutes = (app: FastifyInstance) => {
  app.get<{ Querystring: ListBookingsQuery }>('/bookings', async (request, reply) => {
    const { laundryRoomId, date, status } = request.query;
    const where: Prisma.BookingWhereInput = {};

    if (laundryRoomId !== undefined) {
      if (!uuidPattern.test(laundryRoomId)) {
        return reply.code(400).send({
          error: 'Bad Request',
          message: 'laundryRoomId must be a valid UUID',
        });
      }

      where.laundryRoomId = laundryRoomId;
    }

    if (date !== undefined) {
      const parsedDate = parseDate(date);

      if (!parsedDate) {
        return reply.code(400).send({
          error: 'Bad Request',
          message: 'date must use YYYY-MM-DD format',
        });
      }

      const dayStart = localTimeToUtcDate(parsedDate, 0, operationalTimezone);
      const nextDayStart = localTimeToUtcDate(addDaysToDateParts(parsedDate, 1), 0, operationalTimezone);

      where.startTime = { lt: nextDayStart };
      where.endTime = { gt: dayStart };
    }

    if (status !== undefined) {
      if (!bookingListStatuses.has(status as BookingListStatus)) {
        return reply.code(400).send({
          error: 'Bad Request',
          message: 'status must be ACTIVE or CANCELED',
        });
      }

      where.status = status as BookingListStatus;
    }

    const bookings = await prisma.booking.findMany({
      where,
      orderBy: [{ startTime: 'asc' }, { id: 'asc' }],
      select: {
        id: true,
        laundryRoomId: true,
        startTime: true,
        endTime: true,
        status: true,
        canceledAt: true,
        resident: {
          select: {
            name: true,
          },
        },
      },
    });

    return {
      items: bookings.map((booking) => ({
        id: booking.id,
        laundryRoomId: booking.laundryRoomId,
        residentName: booking.resident.name,
        startTime: booking.startTime.toISOString(),
        endTime: booking.endTime.toISOString(),
        status: booking.status,
        canceledAt: booking.canceledAt?.toISOString() ?? null,
        timezone: operationalTimezone,
      })),
      timezone: operationalTimezone,
    };
  });

  app.post<{ Body: unknown }>('/bookings', async (request, reply) => {
    const parsedBody = validateBody(request.body);

    if ('message' in parsedBody) {
      return reply.code(400).send({
        error: 'Bad Request',
        message: parsedBody.message,
      });
    }

    const { residentId, laundryRoomId, date, slotStartHour } = parsedBody;
    const startTime = localTimeToUtcDate(date, slotStartHour, operationalTimezone);
    const endTime = localTimeToUtcDate(date, slotStartHour + slotDurationHours, operationalTimezone);

    try {
      const booking = await prisma.$transaction(async (tx) => {
        await tx.$executeRaw`SELECT pg_advisory_xact_lock(${residentLockNamespace}, ${advisoryLockKey(residentId)})`;
        await tx.$executeRaw`SELECT pg_advisory_xact_lock(${laundryRoomLockNamespace}, ${advisoryLockKey(
          laundryRoomId,
        )})`;

        const resident = await tx.resident.findUnique({
          where: { id: residentId },
          select: { id: true, status: true },
        });

        if (!resident) {
          throw new NotFoundError('Resident');
        }

        if (resident.status !== 'ACTIVE') {
          throw new BookingConflictError('RESIDENT_INACTIVE');
        }

        const laundryRoom = await tx.laundryRoom.findUnique({
          where: { id: laundryRoomId },
          select: { id: true, status: true },
        });

        if (!laundryRoom) {
          throw new NotFoundError('LaundryRoom');
        }

        if (laundryRoom.status !== 'ACTIVE') {
          throw new BookingConflictError('LAUNDRY_ROOM_INACTIVE');
        }

        const [residentFutureActiveBooking, overlappingBooking, overlappingBlockedSlot] = await Promise.all([
          tx.booking.findFirst({
            where: {
              residentId,
              status: 'ACTIVE',
              startTime: { gte: new Date() },
            },
            select: { id: true },
          }),
          tx.booking.findFirst({
            where: {
              laundryRoomId,
              status: 'ACTIVE',
              startTime: { lt: endTime },
              endTime: { gt: startTime },
            },
            select: { id: true },
          }),
          tx.blockedSlot.findFirst({
            where: {
              laundryRoomId,
              startTime: { lt: endTime },
              endTime: { gt: startTime },
            },
            select: { id: true },
          }),
        ]);

        if (residentFutureActiveBooking) {
          throw new BookingConflictError('RESIDENT_HAS_ACTIVE_BOOKING');
        }

        if (overlappingBooking) {
          throw new BookingConflictError('BOOKING_CONFLICT');
        }

        if (overlappingBlockedSlot) {
          throw new BookingConflictError('BLOCKED_SLOT_CONFLICT');
        }

        return tx.booking.create({
          data: {
            residentId,
            laundryRoomId,
            startTime,
            endTime,
            status: 'ACTIVE',
          },
          select: {
            id: true,
            residentId: true,
            laundryRoomId: true,
            startTime: true,
            endTime: true,
            status: true,
          },
        });
      });

      return reply.code(201).send({
        id: booking.id,
        residentId: booking.residentId,
        laundryRoomId: booking.laundryRoomId,
        startTime: booking.startTime.toISOString(),
        endTime: booking.endTime.toISOString(),
        status: booking.status,
        timezone: operationalTimezone,
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
        return reply.code(404).send({
          error: 'Not Found',
          message: `${error.resource} not found`,
        });
      }

      if (error instanceof BookingConflictError) {
        return reply.code(409).send({
          error: 'Conflict',
          message: conflictMessage(error.code),
        });
      }

      throw error;
    }
  });

  app.post<{ Params: CancelBookingRouteParams }>('/bookings/:bookingId/cancel', async (request, reply) => {
    const { bookingId } = request.params;

    if (!uuidPattern.test(bookingId)) {
      return reply.code(400).send({
        error: 'Bad Request',
        message: 'bookingId must be a valid UUID',
      });
    }

    const now = new Date();

    try {
      const booking = await prisma.$transaction(async (tx) => {
        const existingBooking = await tx.booking.findUnique({
          where: { id: bookingId },
          select: {
            id: true,
            status: true,
            startTime: true,
          },
        });

        if (!existingBooking) {
          throw new NotFoundError('Booking');
        }

        if (existingBooking.status !== 'ACTIVE') {
          throw new BookingConflictError('BOOKING_NOT_ACTIVE');
        }

        if (existingBooking.startTime <= now) {
          throw new BookingConflictError('BOOKING_ALREADY_STARTED');
        }

        const updateResult = await tx.booking.updateMany({
          where: {
            id: bookingId,
            status: 'ACTIVE',
            startTime: { gt: now },
          },
          data: {
            status: 'CANCELED',
            canceledAt: now,
          },
        });

        if (updateResult.count === 0) {
          throw new BookingConflictError('BOOKING_NOT_ACTIVE');
        }

        const canceledBooking = await tx.booking.findUnique({
          where: { id: bookingId },
          select: {
            id: true,
            status: true,
            canceledAt: true,
          },
        });

        const canceledAt = canceledBooking?.canceledAt;

        if (!canceledBooking || !canceledAt) {
          throw new Error('Canceled booking was not found after update');
        }

        return {
          ...canceledBooking,
          canceledAt,
        };
      });

      return reply.code(200).send({
        id: booking.id,
        status: booking.status,
        canceledAt: booking.canceledAt.toISOString(),
        timezone: operationalTimezone,
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
        return reply.code(404).send({
          error: 'Not Found',
          message: `${error.resource} not found`,
        });
      }

      if (error instanceof BookingConflictError) {
        return reply.code(409).send({
          error: 'Conflict',
          message: conflictMessage(error.code),
        });
      }

      throw error;
    }
  });
};
