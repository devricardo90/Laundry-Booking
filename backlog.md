# LBC Backlog

## READY

### LBC-003C - Implement Prisma schema baseline

Type: Persistence / Schema Baseline

Goal:
Create the first Prisma schema baseline for the MVP domain model without creating migrations, seed data, database state, endpoints, services, repositories, Angular screens, auth, or real booking flows.

Acceptance:
- `prisma/schema.prisma` is created.
- PostgreSQL datasource is defined.
- Prisma Client generator is defined.
- Resident, Admin, LaundryRoom, Booking, and BlockedSlot are modeled.
- Minimum enums are defined where useful.
- Relationships, foreign keys, status fields, technical timestamps, `startTime`, `endTime`, and nullable `canceledAt` are defined.
- Query-support indexes are defined for the documented access patterns.
- Prisma schema baseline limitations around overlap and race-condition protection are documented.
- No migration, seed, real database, `DATABASE_URL` file change, endpoint, controller, service, repository, Angular screen, auth, runtime change, dependency change, deploy, CI, Docker, or `packages/shared` work is created.
- Required raw evidence is presented before any commit request.

## BACKLOG

### LBC-004 - Booking Availability API

Status: BACKLOG

Notes:
- Expected future scope: expose availability for fixed 2-hour slots and enforce documented availability behavior.
