import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { buildApp } from './server.js';
import { prisma } from './prisma.js';

const laundryRoomId = '11111111-1111-4111-8111-111111111111';
const tomorrow = new Date();
tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
const date = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Stockholm',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(tomorrow);

const app = buildApp();
let residentId: string;
let conflictResidentId: string;
let createdBookingId: string;

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
  const [resident, conflictResident] = await Promise.all([
    prisma.resident.create({ data: { name: 'API Regression Resident', email: `api-regression-${Date.now()}@example.local` } }),
    prisma.resident.create({ data: { name: 'API Conflict Resident', email: `api-conflict-${Date.now()}@example.local` } }),
  ]);
  residentId = resident.id;
  conflictResidentId = conflictResident.id;
});

after(async () => {
  await prisma.booking.deleteMany({ where: { residentId: { in: [residentId, conflictResidentId] } } });
  await prisma.resident.deleteMany({ where: { id: { in: [residentId, conflictResidentId] } } });
  await app.close();
});

test('returns seeded availability with booked and blocked slots', async () => {
  const response = await app.inject({ method: 'GET', url: `/laundry-rooms/${laundryRoomId}/availability?date=${date}` });
  assert.equal(response.statusCode, 200);
  const body = response.json();
  assert.equal(body.timezone, 'Europe/Stockholm');
  assert.equal(body.slots.length, 12);
  assert.equal(body.slots[4].status, 'BOOKED');
  assert.equal(body.slots[5].status, 'BLOCKED');
  assert.equal(body.slots[5].reason, 'MAINTENANCE');
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
