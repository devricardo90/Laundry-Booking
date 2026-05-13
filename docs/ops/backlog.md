# Ops Backlog

## REMOTE DONE

### LBC-004B - Apply Dev Prisma Migration and Seed Minimal Availability Data

Status: Remote DONE

Type: Persistence / Dev Database

Operational notes:
- This task added `prisma` as a dev dependency and `@prisma/client` as a dependency.
- This task added Prisma 7 configuration required for migration commands.
- This task minimally adjusted `prisma/schema.prisma` for Prisma 7 compatibility.
- This task updated `.env.example` with a fictitious local `DATABASE_URL`.
- This task created the local/dev database `lbc_dev` after Trigger authorization.
- This task applied local dev migration `init`.
- This task generated Prisma Client.
- This task created and executed the minimal development seed.
- This task verified the required six records.
- This task did not use Docker, remote database, `prisma db push`, production database, production seed, endpoint code, service, repository, Angular UI, auth, booking creation, CI, deploy, `packages/shared`, or open LBC-004C as READY.
- Remote DONE confirmed at commit `7025936`.

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

### LBC-004C - Implement Availability API Read Endpoint

Status: READY FOR TRIGGER REVIEW

Type: API / Read Endpoint

Operational notes:
- This task may implement only `GET /laundry-rooms/:laundryRoomId/availability?date=YYYY-MM-DD`.
- This task may add a small Prisma helper for the API.
- This task may add the Prisma 7 PostgreSQL adapter and `pg` dependency if needed.
- This task may update API package metadata and `pnpm-lock.yaml` only for required runtime dependencies.
- This task may validate against the existing local/dev seed data.
- This task may update authorized operational documentation.
- This task must not implement booking creation, booking cancellation, auth, Angular UI, admin panel, mutation endpoints, new migration, new seed, `prisma db push`, Docker, deploy, CI, `packages/shared`, or any new READY task.

Implementation result:
- Added read-only availability route without `/api` prefix.
- Added Prisma 7 PostgreSQL adapter usage in the API.
- Implemented validation for UUID, required strict date, `Europe/Stockholm` date interpretation, and 14-day window.
- Implemented read-only slot evaluation for ACTIVE bookings, CANCELED bookings, and BlockedSlots.
- Implemented response contract with ISO UTC slot timestamps.
- `pnpm lint`, `pnpm typecheck`, and `pnpm build` passed.
- Local endpoint validation passed for 200, 400, and 404 cases.
- Local DONE and commit remain blocked until Trigger authorization.

## BACKLOG

No task is READY beyond LBC-004C.
