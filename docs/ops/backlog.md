# Ops Backlog

## REMOTE DONE

### LBC-004C - Implement Availability API Read Endpoint

Status: Remote DONE

Type: API / Read Endpoint

Operational notes:
- This task implemented only `GET /laundry-rooms/:laundryRoomId/availability?date=YYYY-MM-DD`.
- This task used no `/api` prefix.
- This task connected the API to the local/dev PostgreSQL database through Prisma 7 and the PostgreSQL adapter.
- This task added a small Prisma helper and read-only availability route module.
- This task validated UUID, strict required `YYYY-MM-DD`, `Europe/Stockholm` operational date interpretation, and today through today plus 14 days.
- This task returned 400 for invalid input and 404 for missing LaundryRoom.
- This task treated ACTIVE bookings as BOOKED, ignored CANCELED bookings, and treated BlockedSlots as BLOCKED.
- This task used priority `BLOCKED > BOOKED > AVAILABLE`.
- This task returned the documented response contract with ISO UTC slot timestamps.
- `pnpm lint`, `pnpm typecheck`, and `pnpm build` passed.
- Local endpoint validation passed for 200, 400, and 404 cases.
- Remote DONE confirmed at commit `9552c7b`.

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

## READY

### LBC-004D - Define Booking Creation Contract and Concurrency Strategy

Status: Local DONE

Type: Documentation / Architecture

Operational notes:
- This task may create `docs/architecture/booking-creation-contract.md`.
- This task may update `docs/product/business-rules.md` for booking creation contract references and rule alignment.
- This task may update authorized operational documentation.
- This task may document the proposed route `POST /bookings`.
- This task may document request fields `residentId`, `laundryRoomId`, `date`, and `slotStart`.
- This task may document `Europe/Stockholm` interpretation and UTC `startTime`/`endTime` response timestamps.
- This task may document `201`, `400`, `404`, and `409` behavior.
- This task may document domain validations and concurrency strategy.
- This task may document future transaction plus advisory lock protection and future PostgreSQL exclusion constraint hardening.
- This task must not implement `POST /bookings`.
- This task must not change `apps/api` or `apps/web`.
- This task must not create controllers, services, repositories, migration, seed, Prisma generate, Prisma db push, Docker, CI, deploy, remote database, production configuration, auth, cancellation, admin panel, Angular UI, LBC-004E READY, or any new READY task.

Expected result:
- Booking creation contract is documented before implementation.
- Concurrency risk is documented before implementation.
- No code or database implementation is created.
- Trigger technical approval has been recorded before commit.

## BACKLOG

No task is READY.
