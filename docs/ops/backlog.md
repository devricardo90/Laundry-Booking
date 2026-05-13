# Ops Backlog

## READY

### LBC-003C - Implement Prisma schema baseline

Status: READY

Type: Persistence / Schema Baseline

Operational notes:
- This task may create the `prisma` folder if needed.
- This task may create `prisma/schema.prisma`.
- This task may define PostgreSQL datasource and Prisma Client generator.
- This task may model Resident, Admin, LaundryRoom, Booking, and BlockedSlot.
- This task may define minimum enums, relationships, foreign keys, statuses, timestamps, `startTime`, `endTime`, and `canceledAt` where applicable.
- This task may document Prisma schema baseline limitations around overlap and race-condition protection.
- This task may update authorized operational documentation.
- This task must not install new dependencies.
- This task must not run `pnpm approve-builds`.
- This task must not create `packages/shared`.
- This task must not create migrations, seed data, database configuration files, or `DATABASE_URL` changes.
- This task must not run `prisma migrate` or `prisma db push`.
- This task must not access a real database.
- This task must not create endpoints, controllers, services, repositories, or Angular product screens.
- This task must not change runtime scripts or healthcheck implementation.
- This task must not configure deploy, CI, Docker, or E2E tests.
- This task must not open a new READY task.
- This task must not be committed without explicit authorization.
- This task must not be pushed.
- This task must present raw validation and diff evidence before commit authorization.

## BACKLOG

### LBC-004 - Booking Availability API

Status: BACKLOG

Expected future purpose:
- Expose availability for fixed 2-hour slots.
- Enforce ACTIVE, CANCELED, and BlockedSlot behavior.
