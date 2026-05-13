# Persistence Model

Task: LBC-003B - Define persistence model and conflict constraint strategy

## Purpose

This document defines the future persistence model and PostgreSQL conflict-prevention strategy for the Laundry Booking Condo MVP before implementation.

This is documentation only. It does not create a Prisma schema, migration, seed data, database connection, endpoint, controller, service, repository, Angular screen, deployment, CI, Docker setup, or shared package.

## Persistence Principles

- PostgreSQL is the target database.
- Prisma is the future ORM, but no Prisma schema is authorized in LBC-003B.
- Times must be stored in UTC.
- User-facing times must be displayed in the condominium operational timezone.
- Initial operational timezone: `Europe/Stockholm`, unless changed by a later decision.
- Availability is scoped to a single LaundryRoom.
- ACTIVE Bookings block availability.
- CANCELED Bookings remain historical and do not block availability.
- BlockedSlots block availability.
- Future implementation must protect conflict checks against race conditions.

## Future Tables

### residents

Purpose:
Store condominium residents who can create and cancel bookings.

Expected technical fields:
- `id`: primary key.
- `name`: resident display name.
- `email`: resident contact identifier, expected to be unique.
- `status`: resident account state.
- `created_at`: creation timestamp.
- `updated_at`: update timestamp.

Expected indexes:
- Unique index on `email`.
- Index on `status` if filtering by active residents becomes common.

Relationships:
- One Resident has many Bookings.

### admins

Purpose:
Store operational users who can view reservations and create blocked slots.

Expected technical fields:
- `id`: primary key.
- `name`: administrator display name.
- `email`: administrator contact identifier, expected to be unique.
- `status`: administrator account state.
- `created_at`: creation timestamp.
- `updated_at`: update timestamp.

Expected indexes:
- Unique index on `email`.
- Index on `status` if filtering by active admins becomes common.

Relationships:
- One Admin can create many BlockedSlots.

### laundry_rooms

Purpose:
Store independently bookable shared laundry rooms.

Expected technical fields:
- `id`: primary key.
- `name`: resident-visible room name.
- `status`: room availability state.
- `created_at`: creation timestamp.
- `updated_at`: update timestamp.

Expected indexes:
- Unique index on `name` if room names must be unique in the condominium.
- Index on `status` if filtering by active rooms becomes common.

Relationships:
- One LaundryRoom has many Bookings.
- One LaundryRoom has many BlockedSlots.

### bookings

Purpose:
Store resident reservations for one LaundryRoom and one fixed 2-hour interval.

Expected technical fields:
- `id`: primary key.
- `resident_id`: foreign key to `residents.id`.
- `laundry_room_id`: foreign key to `laundry_rooms.id`.
- `start_time`: UTC start timestamp.
- `end_time`: UTC end timestamp.
- `status`: booking status, initially `ACTIVE` or `CANCELED`.
- `created_at`: creation timestamp.
- `updated_at`: update timestamp.
- `canceled_at`: cancellation timestamp, nullable.

Expected indexes:
- Index on `resident_id`.
- Index on `laundry_room_id`.
- Composite index on `laundry_room_id`, `start_time`, and `end_time` for availability queries.
- Partial index on future or active records may be considered later if query patterns require it.
- Unique or partial strategy for one future ACTIVE booking per resident must be designed in the implementation task.

Relationships:
- Booking belongs to one Resident.
- Booking belongs to one LaundryRoom.

Blocking behavior:
- `ACTIVE` bookings block availability.
- `CANCELED` bookings do not block availability.
- CANCELED bookings remain historical records.

### blocked_slots

Purpose:
Store administrator-created unavailable intervals for one LaundryRoom.

Expected technical fields:
- `id`: primary key.
- `laundry_room_id`: foreign key to `laundry_rooms.id`.
- `start_time`: UTC start timestamp.
- `end_time`: UTC end timestamp.
- `reason`: short operational reason.
- `created_by_admin_id`: foreign key to `admins.id`.
- `created_at`: creation timestamp.
- `updated_at`: update timestamp.

Expected indexes:
- Index on `laundry_room_id`.
- Index on `created_by_admin_id`.
- Composite index on `laundry_room_id`, `start_time`, and `end_time` for availability queries.

Relationships:
- BlockedSlot belongs to one LaundryRoom.
- BlockedSlot is created by one Admin.

Blocking behavior:
- Every BlockedSlot blocks availability.

## Booking Status Persistence

Minimum booking statuses:

- `ACTIVE`: blocks availability.
- `CANCELED`: historical only and does not block availability.

The future schema should prevent or reject unsupported statuses unless a later task explicitly expands the booking lifecycle.

## Time Range Conflict Rule

The conceptual overlap rule remains:

```text
existing.startTime < new.endTime
AND existing.endTime > new.startTime
AND existing.laundryRoomId = new.laundryRoomId
```

For Booking-to-Booking conflicts, only existing `ACTIVE` bookings block:

```text
existing.status = ACTIVE
```

For Booking-to-BlockedSlot and BlockedSlot-to-BlockedSlot conflicts, BlockedSlots always block.

## PostgreSQL Conflict Strategy

The future PostgreSQL implementation should use database-backed protection, not only application checks.

Recommended strategy:

- Use `timestamptz` columns for `start_time` and `end_time`.
- Store UTC timestamps.
- Validate `end_time > start_time`.
- Validate the fixed 2-hour duration.
- Use transaction boundaries around booking and blocked-slot creation.
- Use PostgreSQL locking to serialize writes per LaundryRoom and target interval.
- Add database-level exclusion protection where possible.

Expected table-level constraint direction:

- `bookings`: prevent overlapping ACTIVE bookings in the same `laundry_room_id`.
- `blocked_slots`: prevent overlapping blocked slots in the same `laundry_room_id`.

PostgreSQL can support this kind of protection with range types and exclusion constraints, for example conceptually:

```text
EXCLUDE overlapping ranges for the same laundry_room_id
WHERE booking status is ACTIVE
```

and:

```text
EXCLUDE overlapping blocked-slot ranges for the same laundry_room_id
```

The actual Prisma/PostgreSQL implementation details are deferred to a later task.

## Cross-Table Conflict Risk

Bookings and BlockedSlots are separate future tables. A Booking must not overlap a BlockedSlot, and a BlockedSlot must not overlap an ACTIVE Booking.

This cross-table conflict cannot be fully solved by a simple single-table unique index.

Future implementation must choose one explicit strategy, such as:

- A transaction that checks both tables and uses a PostgreSQL advisory lock scoped to the LaundryRoom before inserting.
- A serializable transaction strategy with retry handling.
- A unified unavailable-time table that stores blocking intervals for both bookings and blocked slots.

For the MVP implementation path, the preferred documented direction is:

- Keep conceptual Booking and BlockedSlot entities separate.
- Use a transaction and per-LaundryRoom advisory lock for creation flows.
- Add table-level exclusion constraints for same-table overlap protection where supported.
- Keep all conflict checks mirrored in API validation for clear user-facing errors.

## Race Condition Notes

Race condition risk:
- Two residents may attempt to book the same LaundryRoom and interval at the same time.
- An admin may block a slot while a resident attempts to book it.
- Two admins may attempt to block overlapping intervals.

Future implementation must not rely on read-before-write application logic alone.

The write path must be atomic from the perspective of conflict prevention.

## Query Support

Availability queries should be able to find:

- ACTIVE bookings for a LaundryRoom and date range.
- BlockedSlots for a LaundryRoom and date range.
- A resident's future ACTIVE booking.
- Historical CANCELED bookings for audit/history views.

Expected query indexes should support filtering by:

- `laundry_room_id`.
- `resident_id`.
- `status`.
- `start_time`.
- `end_time`.

## Out Of Scope For LBC-003B

- Prisma schema.
- Migrations.
- Seed data.
- Real database connection.
- `DATABASE_URL` changes.
- Endpoints.
- Controllers.
- Services.
- Repositories.
- Angular product screens.
- Runtime script changes.
- Dependency installation.
- `pnpm approve-builds`.
- Deploy.
- CI.
- Docker.
- `packages/shared`.

## Future Implementation Tasks

Later tasks should decide:

- Exact Prisma models and field types.
- Exact PostgreSQL constraint syntax.
- Whether to use exclusion constraints through raw SQL migrations.
- Whether to use advisory locks, serializable transactions, or a unified blocking interval table.
- Migration order.
- Seed strategy, if any.
- API validation and error response behavior.
