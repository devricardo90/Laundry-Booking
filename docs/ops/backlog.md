# Ops Backlog

## REMOTE DONE

### LBC-004A - Define Availability API Contract and Dev Persistence Strategy

Status: Remote DONE

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
- Remote DONE confirmed at commit `967a321`.

## READY FOR TRIGGER REVIEW

### LBC-004B - Apply Dev Prisma Migration and Seed Minimal Availability Data

Status: READY FOR TRIGGER REVIEW

Type: Persistence / Dev Database

Operational notes:
- This task may add `prisma` as a dev dependency and `@prisma/client` as a dependency.
- This task may add Prisma 7 configuration required for migration commands.
- This task may minimally adjust `prisma/schema.prisma` for Prisma 7 compatibility.
- This task may update `.env.example` with a fictitious local `DATABASE_URL`.
- This task may apply local dev migration, generate Prisma Client, create `prisma/seed.mjs`, run seed, and prove data only after valid local PostgreSQL dev credentials are available.
- This task must not use Docker, remote database, `prisma db push`, production database, production seed, endpoint code, service, repository, Angular UI, auth, booking creation, CI, deploy, `packages/shared`, or open LBC-004C as READY.

Local persistence result:
- Local/dev database `lbc_dev` was created after Trigger authorization.
- Dev migration `init` was created and applied.
- Prisma Client generation completed.
- Minimal seed file `prisma/seed.mjs` was created.
- Seed was executed and verified the required six records.
- Local DONE and commit remain blocked until Trigger authorization.

## BACKLOG

### LBC-004C - Implement Availability API Read Endpoint

Status: BACKLOG

Expected future purpose:
- Implement the read-only availability endpoint after the development persistence path is ready.
