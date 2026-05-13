# LBC Backlog

## READY

### LBC-003B - Define persistence model and conflict constraint strategy

Type: Documentation / Architecture

Goal:
Define the future persistence model and PostgreSQL conflict-constraint strategy before any Prisma or database implementation.

Acceptance:
- Future tables for Resident/User, Admin, LaundryRoom, Booking, and BlockedSlot are documented.
- Expected technical fields are documented.
- Relationships are documented.
- Expected indexes are documented.
- PostgreSQL strategy for preventing time conflicts is documented.
- ACTIVE bookings blocking availability is documented.
- CANCELED bookings remaining historical and non-blocking is documented.
- BlockedSlot blocking availability is documented.
- Race condition risk is documented.
- Real implementation is deferred to future tasks.
- Prisma schema, migrations, seed, real database, `DATABASE_URL`, endpoints, controllers, services, repositories, Angular screens, runtime changes, dependency changes, deploy, CI, Docker, and `packages/shared` remain outside scope.
- Required raw evidence is presented before any commit request.

## BACKLOG

### LBC-003C - Persistence Implementation

Status: BACKLOG

Notes:
- Expected future scope: Prisma schema and database-level protection against conflicting bookings or blocked slots after LBC-003B is approved.
