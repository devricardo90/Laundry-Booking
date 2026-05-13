# Ops Backlog

## LOCAL DONE

### LBC-004A - Define Availability API Contract and Dev Persistence Strategy

Status: Local DONE

Type: Documentation / Architecture

Operational notes:
- This task may create or update Availability API contract documentation.
- This task may document the proposed endpoint `GET /laundry-rooms/:id/availability?date=YYYY-MM-DD`.
- This task may document `Europe/Stockholm` date interpretation, UTC storage/comparison, and ISO UTC response timestamps.
- This task may document response shape, slot shape, status values, and reason privacy rules.
- This task may document the 14-day read window as contract-only behavior.
- This task may document the recommended dev persistence sequence before real endpoint implementation.
- This task may update authorized operational documentation.
- This task must not install new dependencies.
- This task must not run `pnpm approve-builds`.
- This task must not create `packages/shared`.
- This task must not create migrations, seed data, database configuration files, or `DATABASE_URL` changes.
- This task must not run `prisma migrate`, `prisma generate`, or `prisma db push`.
- This task must not access a real database.
- This task must not create endpoints, controllers, services, repositories, runtime overlap logic, or Angular product screens.
- This task must not implement auth, booking creation, or cancellation.
- This task must not change runtime scripts or healthcheck implementation.
- This task must not configure deploy, CI, Docker, or E2E tests.
- This task must not open LBC-004B as READY.
- This task must not be committed without explicit authorization.
- This task must not be pushed.
- This task must present raw validation and diff evidence before commit authorization.
- Trigger approved LBC-004A for Local DONE and commit after evidence review.

## BACKLOG

### LBC-004B - Apply Dev Prisma Migration and Seed Minimal Availability Data

Status: BACKLOG

Expected future purpose:
- Apply the development Prisma migration path and create minimal data for testing availability reads.

### LBC-004C - Implement Availability API Read Endpoint

Status: BACKLOG

Expected future purpose:
- Implement the read-only availability endpoint after the development persistence path is ready.
