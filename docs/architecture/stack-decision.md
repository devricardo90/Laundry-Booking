# Stack Decision

Project: LBC - Laundry Booking Condo

Task: LBC-001 - Define MVP Scope and Business Rules

## Official Decision

The approved MVP stack is:

- Frontend: Angular + TypeScript + Tailwind.
- Backend: Fastify + TypeScript.
- Validation: Zod.
- ORM: Prisma.
- Database: PostgreSQL.

PostgreSQL is the primary database for the current decision.

MongoDB is outside the current stack decision.

## Rationale

Angular gives the project a frontend stack that is useful for condominium administration workflows and broadens the portfolio beyond React-based examples.

Fastify keeps the backend small, explicit, and TypeScript-friendly for an MVP API.

Zod provides request validation close to the API boundary.

Prisma provides typed database access and migration support for PostgreSQL in later implementation tasks.

PostgreSQL is appropriate because the critical business rule depends on reliable relational data, transactional behavior, and conflict-prevention strategy.

## Timezone Decision

All persisted booking and blocked-slot times must be stored in UTC.

User-facing times must be displayed according to the condominium operational timezone.

Initial operational timezone: `Europe/Stockholm`.

This decision avoids ambiguity around daylight saving time and supports future condominium-specific timezone configuration.

## Architecture Constraint

The system must prevent overlapping unavailable time in the same laundry room.

Formal ACTIVE Booking conflict condition:

```text
existing.startTime < new.endTime
AND existing.endTime > new.startTime
AND existing.laundryRoomId = new.laundryRoomId
AND existing.status = ACTIVE
```

Formal BlockedSlot conflict condition:

```text
blockedSlot.startTime < new.endTime
AND blockedSlot.endTime > new.startTime
AND blockedSlot.laundryRoomId = new.laundryRoomId
```

The same overlap logic applies when creating BlockedSlots.

## Out Of Scope For LBC-001

- Application code.
- Dependency installation.
- Angular scaffold.
- Fastify scaffold.
- Prisma schema.
- Migration.
- Seed data.
- Tailwind configuration.
- Deploy configuration.
- Commit.
- Push.

## Status

This stack decision is documented only. No application implementation has been created in LBC-001.
