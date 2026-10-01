import assert from 'node:assert/strict';
import { after, before, mock, test } from 'node:test';
import { buildApp } from './server.js';
import { prisma } from './prisma.js';

const laundryRoomId = '11111111-1111-4111-8111-111111111111';
const seededResidentId = '22222222-2222-4222-8222-222222222222';
const testResidentId = '77777777-7777-4777-8777-777777777777';
const conflictTestResidentId = '88888888-8888-4888-8888-888888888888';
const tomorrow = new Date();
tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
const date = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Stockholm',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(tomorrow);
const stockholmDate = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Stockholm',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});
const stockholmHour = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Stockholm',
  hour: '2-digit',
  hourCycle: 'h23',
});

const app = buildApp();
let residentId: string;
let conflictResidentId: string;
let createdBookingId: string;

const removeTestData = async () => {
  const activeRoomBookings = await prisma.booking.findMany({
    where: { laundryRoomId, status: 'ACTIVE' },
    select: { id: true, startTime: true },
  });
  const staleTestSlotIds = activeRoomBookings
    .filter(({ startTime }) => {
      const localDate = stockholmDate.format(startTime);
      const localHour = stockholmHour.format(startTime);
      return localDate === date && (localHour === '16' || localHour === '18');
    })
    .map(({ id }) => id);

  await prisma.booking.deleteMany({ where: { id: { in: staleTestSlotIds } } });
  await prisma.booking.deleteMany({ where: { residentId: { in: [testResidentId, conflictTestResidentId] } } });
  await prisma.resident.deleteMany({ where: { id: { in: [testResidentId, conflictTestResidentId] } } });
};

const assertBadRequest = (response: Awaited<ReturnType<typeof app.inject>>, message: string) => {
  assert.equal(response.statusCode, 400);
  assert.deepEqual(response.json(), { error: 'Bad Request', message });
};

const assertNotFound = (response: Awaited<ReturnType<typeof app.inject>>, message: string) => {
  assert.equal(response.statusCode, 404);
  assert.deepEqual(response.json(), { error: 'Not Found', message });
};

before(async () => {
  await app.ready();
  await removeTestData();
  const [resident, conflictResident] = await Promise.all([
    prisma.resident.create({ data: { id: testResidentId, name: 'API Regression Resident', email: 'api-regression@example.local' } }),
    prisma.resident.create({ data: { id: conflictTestResidentId, name: 'API Conflict Resident', email: 'api-conflict@example.local' } }),
  ]);
  residentId = resident.id;
  conflictResidentId = conflictResident.id;
});

after(async () => {
  await removeTestData();
  await app.close();
});

test('returns seeded availability with booked and blocked slots', async () => {
  const response = await app.inject({ method: 'GET', url: `/laundry-rooms/${laundryRoomId}/availability?date=${date}` });
  assert.equal(response.statusCode, 200);
  const body = response.json();
  assert.equal(body.timezone, 'Europe/Stockholm');
  assert.equal(body.slotDurationMinutes, 120);
  assert.equal(body.slots.length, 12);
  assert.deepEqual(
    body.slots.map((slot: { status: string; reason: string | null }) => [slot.status, slot.reason]),
    [
      ['AVAILABLE', null],
      ['AVAILABLE', null],
      ['AVAILABLE', null],
      ['AVAILABLE', null],
      ['BOOKED', 'BOOKED'],
      ['BLOCKED', 'MAINTENANCE'],
      ['AVAILABLE', null],
      ['AVAILABLE', null],
      ['AVAILABLE', null],
      ['AVAILABLE', null],
      ['AVAILABLE', null],
      ['AVAILABLE', null],
    ],
  );
  assert.equal(body.slots[4].status, 'BOOKED');
  assert.equal(body.slots[5].status, 'BLOCKED');
  assert.equal(body.slots[5].reason, 'MAINTENANCE');

  const localTime = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Stockholm',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });
  assert.deepEqual(
    body.slots.map((slot: { startTime: string }) => localTime.format(new Date(slot.startTime))),
    ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
  );
  assert.equal(localTime.format(new Date(body.slots[11].endTime)), '00:00');
});

test('emits Europe/Stockholm UTC boundaries across the autumn DST transition', async () => {
  mock.timers.enable({ apis: ['Date'], now: new Date('2026-10-20T12:00:00.000Z') });

  try {
    const response = await app.inject({
      method: 'GET',
      url: `/laundry-rooms/${laundryRoomId}/availability?date=2026-10-25`,
    });
    assert.equal(response.statusCode, 200);

    const body = response.json();
    assert.deepEqual(
      body.slots.slice(0, 3).map((slot: { startTime: string; endTime: string }) => [slot.startTime, slot.endTime]),
      [
        ['2026-10-24T22:00:00.000Z', '2026-10-25T01:00:00.000Z'],
        ['2026-10-25T01:00:00.000Z', '2026-10-25T03:00:00.000Z'],
        ['2026-10-25T03:00:00.000Z', '2026-10-25T05:00:00.000Z'],
      ],
    );

    const localTime = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Stockholm',
      dateStyle: 'short',
      timeStyle: 'short',
    });
    assert.deepEqual(
      body.slots.slice(0, 3).map((slot: { startTime: string; endTime: string }) => [
        localTime.format(new Date(slot.startTime)),
        localTime.format(new Date(slot.endTime)),
      ]),
      [
        ['25/10/2026, 00:00', '25/10/2026, 02:00'],
        ['25/10/2026, 02:00', '25/10/2026, 04:00'],
        ['25/10/2026, 04:00', '25/10/2026, 06:00'],
      ],
    );
  } finally {
    mock.timers.reset();
  }
});

test('blocked status takes precedence when a booking overlaps the same slot', async () => {
  const availability = await app.inject({ method: 'GET', url: `/laundry-rooms/${laundryRoomId}/availability?date=${date}` });
  const blockedSlot = availability.json().slots[5] as { startTime: string; endTime: string };
  const booking = await prisma.booking.create({
    data: {
      residentId: seededResidentId,
      laundryRoomId,
      startTime: new Date(blockedSlot.startTime),
      endTime: new Date(blockedSlot.endTime),
      status: 'ACTIVE',
    },
  });

  try {
    const response = await app.inject({ method: 'GET', url: `/laundry-rooms/${laundryRoomId}/availability?date=${date}` });
    assert.equal(response.statusCode, 200);
    assert.equal(response.json().slots[5].status, 'BLOCKED');
    assert.equal(response.json().slots[5].reason, 'MAINTENANCE');
  } finally {
    await prisma.booking.delete({ where: { id: booking.id } });
  }
});

test('rejects malformed availability identifiers and date filters', async () => {
  assertBadRequest(
    await app.inject({ method: 'GET', url: `/laundry-rooms/not-a-uuid/availability?date=${date}` }),
    'laundryRoomId must be a valid UUID',
  );
  assertBadRequest(
    await app.inject({ method: 'GET', url: `/laundry-rooms/${laundryRoomId}/availability` }),
    'date query parameter is required',
  );
  assertBadRequest(
    await app.inject({ method: 'GET', url: `/laundry-rooms/${laundryRoomId}/availability?date=2026/02/30` }),
    'date must use YYYY-MM-DD format',
  );
  assertBadRequest(
    await app.inject({ method: 'GET', url: `/laundry-rooms/${laundryRoomId}/availability?date=2000-01-01` }),
    'date must be within the next 14 days',
  );
  assertNotFound(
    await app.inject({
      method: 'GET',
      url: `/laundry-rooms/99999999-9999-4999-8999-999999999999/availability?date=${date}`,
    }),
    'LaundryRoom not found',
  );
});

test('rejects invalid booking list filters', async () => {
  assertBadRequest(
    await app.inject({ method: 'GET', url: '/bookings?laundryRoomId=not-a-uuid' }),
    'laundryRoomId must be a valid UUID',
  );
  assertBadRequest(
    await app.inject({ method: 'GET', url: '/bookings?date=2026/02/30' }),
    'date must use YYYY-MM-DD format',
  );
  assertBadRequest(
    await app.inject({ method: 'GET', url: '/bookings?status=UNKNOWN' }),
    'status must be ACTIVE or CANCELED',
  );
});

test('rejects missing and malformed booking payload data', async () => {
  assertBadRequest(
    await app.inject({ method: 'POST', url: '/bookings', payload: {} }),
    'residentId, laundryRoomId, date, and slotStart are required',
  );
  assertBadRequest(
    await app.inject({ method: 'POST', url: '/bookings', payload: { residentId: 'not-a-uuid', laundryRoomId, date, slotStart: '16:00' } }),
    'residentId must be a valid UUID',
  );
  assertBadRequest(
    await app.inject({ method: 'POST', url: '/bookings', payload: { residentId, laundryRoomId, date: '2026-02-30', slotStart: '16:00' } }),
    'date must use YYYY-MM-DD format',
  );
  assertBadRequest(
    await app.inject({ method: 'POST', url: '/bookings', payload: { residentId, laundryRoomId, date, slotStart: '15:00' } }),
    'slotStart must align to the 2-hour slot grid',
  );
  assertBadRequest(
    await app.inject({ method: 'POST', url: '/bookings' }),
    'request body must be an object',
  );
});

test('returns not found for unknown booking resources', async () => {
  assertNotFound(
    await app.inject({
      method: 'POST',
      url: '/bookings',
      payload: {
        residentId: '99999999-9999-4999-8999-999999999999',
        laundryRoomId,
        date,
        slotStart: '16:00',
      },
    }),
    'Resident not found',
  );
  assertNotFound(
    await app.inject({
      method: 'POST',
      url: '/bookings',
      payload: {
        residentId,
        laundryRoomId: '99999999-9999-4999-8999-999999999999',
        date,
        slotStart: '16:00',
      },
    }),
    'LaundryRoom not found',
  );
  assertBadRequest(
    await app.inject({ method: 'POST', url: '/bookings/not-a-uuid/cancel' }),
    'bookingId must be a valid UUID',
  );
  assertNotFound(
    await app.inject({ method: 'POST', url: '/bookings/99999999-9999-4999-8999-999999999999/cancel' }),
    'Booking not found',
  );
});

test('creates a booking, rejects an overlapping booking, lists it, and cancels it', async () => {
  const payload = { residentId, laundryRoomId, date, slotStart: '16:00' };
  const created = await app.inject({ method: 'POST', url: '/bookings', payload });
  assert.equal(created.statusCode, 201);
  const createdBody = created.json();
  createdBookingId = createdBody.id;
  assert.equal(createdBody.status, 'ACTIVE');
  assert.equal(createdBody.endTime, new Date(new Date(createdBody.startTime).getTime() + 2 * 60 * 60 * 1000).toISOString());

  const conflict = await app.inject({
    method: 'POST',
    url: '/bookings',
    payload: { ...payload, residentId: conflictResidentId },
  });
  assert.equal(conflict.statusCode, 409);
  assert.equal(conflict.json().message, 'Requested slot is no longer available');

  const listed = await app.inject({ method: 'GET', url: `/bookings?laundryRoomId=${laundryRoomId}&date=${date}&status=ACTIVE` });
  assert.equal(listed.statusCode, 200);
  assert.ok(listed.json().items.some((item: { id: string }) => item.id === createdBookingId));

  const canceled = await app.inject({ method: 'POST', url: `/bookings/${createdBookingId}/cancel` });
  assert.equal(canceled.statusCode, 200);
  assert.equal(canceled.json().status, 'CANCELED');

  const canceledAgain = await app.inject({ method: 'POST', url: `/bookings/${createdBookingId}/cancel` });
  assert.equal(canceledAgain.statusCode, 409);
  assert.equal(canceledAgain.json().message, 'Booking cannot be canceled unless it is ACTIVE');
});

test('serializes concurrent requests for the same laundry-room slot', async () => {
  const payload = { laundryRoomId, date, slotStart: '18:00' };
  const [first, second] = await Promise.all([
    app.inject({ method: 'POST', url: '/bookings', payload: { ...payload, residentId } }),
    app.inject({ method: 'POST', url: '/bookings', payload: { ...payload, residentId: conflictResidentId } }),
  ]);

  assert.deepEqual(
    [first.statusCode, second.statusCode].sort((left, right) => left - right),
    [201, 409],
  );
  const successfulResponse = first.statusCode === 201 ? first : second;
  const conflictResponse = first.statusCode === 409 ? first : second;
  assert.equal(conflictResponse.json().message, 'Requested slot is no longer available');

  const successfulBookingId = successfulResponse.json().id as string;
  try {
    const activeBookings = await prisma.booking.findMany({
      where: {
        id: successfulBookingId,
        laundryRoomId,
        status: 'ACTIVE',
      },
      select: { id: true },
    });
    assert.deepEqual(activeBookings.map(({ id }) => id), [successfulBookingId]);
  } finally {
    await prisma.booking.delete({ where: { id: successfulBookingId } });
  }
});
