# Availability API Contract

Task: LBC-004A - Define Availability API Contract and Dev Persistence Strategy

## Purpose

This document defines the first contract for reading laundry room availability before implementing a real endpoint.

This task is documentation and architecture only. It does not create a Fastify route, controller, service, repository, Prisma migration, Prisma Client generation, seed data, real database access, Angular screen, authentication, booking creation flow, deployment, CI, Docker setup, or shared package.

## Proposed Endpoint

```http
GET /laundry-rooms/:id/availability?date=YYYY-MM-DD
```

Path parameters:
- `id`: LaundryRoom identifier.

Query parameters:
- `date`: calendar date in `YYYY-MM-DD` format.

## Timezone Contract

- The `date=YYYY-MM-DD` query parameter is interpreted in the operational timezone `Europe/Stockholm`.
- The system must store and compare timestamps in UTC.
- The database timestamp strategy remains PostgreSQL `timestamptz` through Prisma `DateTime`.
- The response must expose `startTime` and `endTime` as ISO UTC timestamps.
- The response must include `timezone: "Europe/Stockholm"` so clients know how the date was interpreted.

Example:

```json
{
  "date": "2026-05-13",
  "timezone": "Europe/Stockholm"
}
```

This means the availability day starts at local midnight in `Europe/Stockholm`, then the implementation converts the slot boundaries to UTC for storage comparisons and response timestamps.

## Response Shape

Successful response:

```json
{
  "laundryRoomId": "6a8f2bcb-0c90-47c8-96d8-40dddb5e8d4b",
  "date": "2026-05-13",
  "timezone": "Europe/Stockholm",
  "slotDurationMinutes": 120,
  "slots": [
    {
      "startTime": "2026-05-13T06:00:00.000Z",
      "endTime": "2026-05-13T08:00:00.000Z",
      "status": "AVAILABLE",
      "reason": null
    },
    {
      "startTime": "2026-05-13T08:00:00.000Z",
      "endTime": "2026-05-13T10:00:00.000Z",
      "status": "BOOKED",
      "reason": "BOOKED"
    },
    {
      "startTime": "2026-05-13T10:00:00.000Z",
      "endTime": "2026-05-13T12:00:00.000Z",
      "status": "BLOCKED",
      "reason": "MAINTENANCE"
    }
  ]
}
```

Top-level fields:
- `laundryRoomId`: requested LaundryRoom identifier.
- `date`: requested date in `YYYY-MM-DD` format.
- `timezone`: operational timezone used to interpret the date. Initial value: `Europe/Stockholm`.
- `slotDurationMinutes`: fixed slot duration. Initial value: `120`.
- `slots`: ordered list of slots for the requested date.

## Slot Shape

Each slot must contain:
- `startTime`: ISO UTC timestamp for the slot start.
- `endTime`: ISO UTC timestamp for the slot end.
- `status`: one of `AVAILABLE`, `BOOKED`, or `BLOCKED`.
- `reason`: nullable or omitted when no reason should be exposed.

Slot statuses:
- `AVAILABLE`: no ACTIVE Booking and no BlockedSlot overlaps this slot in the requested LaundryRoom.
- `BOOKED`: at least one ACTIVE Booking overlaps this slot in the requested LaundryRoom.
- `BLOCKED`: at least one BlockedSlot overlaps this slot in the requested LaundryRoom.

Precedence:
- `BLOCKED` should take precedence over `BOOKED` if both record types overlap the same slot because operational blocks are administrator-created availability overrides.
- `BOOKED` should take precedence over `AVAILABLE`.
- CANCELED Bookings must not make a slot unavailable.

## Reason Rules

The API contract must not expose personal information.

For `BOOKED` slots:
- Use a generic `reason` value of `"BOOKED"` or omit the field.
- Do not expose resident name, apartment, email, phone number, booking owner, or any personal data.

For `BLOCKED` slots:
- The API may expose a limited operational reason only if the reason is safe for resident-facing display.
- Examples of acceptable public reasons: `"MAINTENANCE"`, `"CLEANING"`, or `"BLOCKED"`.
- Internal notes, admin names, incident details, or sensitive operational data must not be exposed.

For `AVAILABLE` slots:
- Use `reason: null` or omit the field.

## Read Window

Availability reads are limited to the next 14 days.

Contract rule:
- The API should accept dates from today through 14 days ahead, interpreted in `Europe/Stockholm`.
- Dates outside the allowed read window should return HTTP `400`.
- Invalid date formats should return HTTP `400`.
- This task only documents the rule. It does not implement validation logic.

The booking creation flow remains outside LBC-004A.

## Availability Calculation Contract

For each generated 2-hour slot on the requested date:
- Query ACTIVE Bookings for the requested LaundryRoom and date range.
- Query BlockedSlots for the requested LaundryRoom and date range.
- Mark the slot unavailable if an ACTIVE Booking overlaps it.
- Mark the slot unavailable if a BlockedSlot overlaps it.
- Ignore CANCELED Bookings for availability blocking.

The conceptual overlap rule remains:

```text
existing.startTime < slot.endTime
AND existing.endTime > slot.startTime
AND existing.laundryRoomId = requestedLaundryRoomId
```

For Booking records, only `status = ACTIVE` blocks availability.

## Error Contract

Expected error responses for the later implementation:
- `400`: missing `date`, invalid `YYYY-MM-DD` date, or date outside the 14-day read window.
- `404`: requested LaundryRoom does not exist.
- `500`: unexpected server error.

The exact error body is deferred to a later API implementation task.

## Dev Persistence Strategy

The real Availability API should not be implemented before the development persistence path is usable.

Recommended sequence:

1. `LBC-004B - Apply Dev Prisma Migration and Seed Minimal Availability Data`
2. `LBC-004C - Implement Availability API Read Endpoint`

`LBC-004B` should decide and apply the minimum development database path:
- run Prisma schema validation if the CLI is available,
- apply a development migration,
- generate Prisma Client if required by the implementation path,
- create minimal development seed data for LaundryRoom, Resident, Admin, ACTIVE Booking, CANCELED Booking, and BlockedSlot,
- keep production seed and deployment outside scope unless separately authorized.

`LBC-004C` should implement the read endpoint only after the development persistence path is ready.

## LBC-004A Exit Criteria

- Availability endpoint contract is documented.
- Timezone interpretation is documented.
- Response shape is documented.
- Slot shape is documented.
- Slot status and reason rules are documented.
- 14-day read window rule is documented.
- Dev persistence sequence recommends migration and seed before the real endpoint.
- No endpoint is implemented.
- No controller, route, service, or repository is created.
- No migration is executed.
- No Prisma generate is executed.
- No seed is created or executed.
- No dependency is installed.
- No API code is changed.
