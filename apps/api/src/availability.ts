import type { FastifyInstance } from 'fastify';
import { prisma } from './prisma.js';

const operationalTimezone = 'Europe/Stockholm';
const slotDurationMinutes = 120;
const slotDurationHours = slotDurationMinutes / 60;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

type DateParts = {
  year: number;
  month: number;
  day: number;
};

type AvailabilityRouteParams = {
  laundryRoomId: string;
};

type AvailabilityRouteQuery = {
  date?: string;
};

type SlotStatus = 'AVAILABLE' | 'BOOKED' | 'BLOCKED';

type AvailabilitySlot = {
  startTime: string;
  endTime: string;
  status: SlotStatus;
  reason: 'BOOKED' | 'MAINTENANCE' | null;
};

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
  const normalized = datePartsToKey(dateParts);

  return normalized === value ? dateParts : null;
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

const overlaps = (existingStart: Date, existingEnd: Date, slotStart: Date, slotEnd: Date) =>
  existingStart < slotEnd && existingEnd > slotStart;

export const registerAvailabilityRoutes = (app: FastifyInstance) => {
  app.get<{
    Params: AvailabilityRouteParams;
    Querystring: AvailabilityRouteQuery;
  }>('/laundry-rooms/:laundryRoomId/availability', async (request, reply) => {
    const { laundryRoomId } = request.params;
    const { date } = request.query;

    if (!uuidPattern.test(laundryRoomId)) {
      return reply.code(400).send({
        error: 'Bad Request',
        message: 'laundryRoomId must be a valid UUID',
      });
    }

    if (!date) {
      return reply.code(400).send({
        error: 'Bad Request',
        message: 'date query parameter is required',
      });
    }

    const requestedDate = parseDate(date);

    if (!requestedDate) {
      return reply.code(400).send({
        error: 'Bad Request',
        message: 'date must use YYYY-MM-DD format',
      });
    }

    const today = getDatePartsInTimezone(new Date(), operationalTimezone);
    const maxDate = addDaysToDateParts(today, 14);
    const requestedOrdinal = datePartsToOrdinal(requestedDate);

    if (requestedOrdinal < datePartsToOrdinal(today) || requestedOrdinal > datePartsToOrdinal(maxDate)) {
      return reply.code(400).send({
        error: 'Bad Request',
        message: 'date must be within the next 14 days',
      });
    }

    const laundryRoom = await prisma.laundryRoom.findUnique({
      where: { id: laundryRoomId },
      select: { id: true },
    });

    if (!laundryRoom) {
      return reply.code(404).send({
        error: 'Not Found',
        message: 'LaundryRoom not found',
      });
    }

    const slotTimes = Array.from({ length: 12 }, (_, index) => {
      const startHour = index * slotDurationHours;

      return {
        start: localTimeToUtcDate(requestedDate, startHour, operationalTimezone),
        end: localTimeToUtcDate(requestedDate, startHour + slotDurationHours, operationalTimezone),
      };
    });
    const rangeStart = slotTimes[0].start;
    const rangeEnd = slotTimes[slotTimes.length - 1].end;

    const [bookings, blockedSlots] = await Promise.all([
      prisma.booking.findMany({
        where: {
          laundryRoomId,
          status: 'ACTIVE',
          startTime: { lt: rangeEnd },
          endTime: { gt: rangeStart },
        },
        select: {
          startTime: true,
          endTime: true,
        },
      }),
      prisma.blockedSlot.findMany({
        where: {
          laundryRoomId,
          startTime: { lt: rangeEnd },
          endTime: { gt: rangeStart },
        },
        select: {
          startTime: true,
          endTime: true,
        },
      }),
    ]);

    const slots: AvailabilitySlot[] = slotTimes.map((slot) => {
      const overlappingBlockedSlot = blockedSlots.find((blockedSlot) =>
        overlaps(blockedSlot.startTime, blockedSlot.endTime, slot.start, slot.end),
      );

      if (overlappingBlockedSlot) {
        return {
          startTime: slot.start.toISOString(),
          endTime: slot.end.toISOString(),
          status: 'BLOCKED',
          reason: 'MAINTENANCE',
        };
      }

      const hasBooking = bookings.some((booking) => overlaps(booking.startTime, booking.endTime, slot.start, slot.end));

      if (hasBooking) {
        return {
          startTime: slot.start.toISOString(),
          endTime: slot.end.toISOString(),
          status: 'BOOKED',
          reason: 'BOOKED',
        };
      }

      return {
        startTime: slot.start.toISOString(),
        endTime: slot.end.toISOString(),
        status: 'AVAILABLE',
        reason: null,
      };
    });

    return {
      laundryRoomId,
      date,
      timezone: operationalTimezone,
      slotDurationMinutes,
      slots,
    };
  });
};
