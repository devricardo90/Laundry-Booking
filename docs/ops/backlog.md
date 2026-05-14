# Ops Backlog

## REMOTE DONE

### LBC-004D - Define Booking Creation Contract and Concurrency Strategy

Status: Remote DONE

Type: Documentation / Architecture

Operational notes:
- This task created `docs/architecture/booking-creation-contract.md`.
- This task documented the proposed route `POST /bookings`.
- This task documented request fields `residentId`, `laundryRoomId`, `date`, and `slotStart`.
- This task documented `Europe/Stockholm` interpretation and UTC `startTime`/`endTime` response timestamps.
- This task documented `201`, `400`, `404`, and `409` behavior.
- This task documented domain validations and concurrency strategy.
- This task documented future transaction plus Resident and LaundryRoom advisory lock protection.
- This task documented future PostgreSQL exclusion constraint hardening as a later option.
- This task did not implement `POST /bookings`, change `apps/api`, change `apps/web`, create migration, create seed, run Prisma generate, run Prisma db push, create UI, configure deploy, configure CI, configure Docker, or open LBC-004E as READY.
- Remote DONE confirmed at commit `f79f3dc`.

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

### LBC-004E - Implement Booking Creation Endpoint

Status: LOCAL DONE

Type: API / Mutation Endpoint

Operational notes:
- This task may implement only `POST /bookings`.
- This task may add `apps/api/src/bookings.ts` or equivalent.
- This task may update `apps/api/src/server.ts` only to register the route.
- This task may use existing Prisma 7 configuration.
- This task may implement manual TypeScript validation without adding dependencies.
- This task may use `prisma.$transaction`.
- This task may use PostgreSQL transaction advisory locks for Resident and LaundryRoom.
- This task must use separate lock namespaces and fixed lock order: Resident first, LaundryRoom second.
- This task may update authorized operational documentation.
- This task must not change `apps/web`.
- This task must not create Angular UI, admin panel, auth, cancellation, migration, versioned seed, Prisma generate, Prisma db push, remote database, deploy, Docker, CI, `packages/shared`, LBC-004F READY, any new READY task, or push.

Expected result:
- Booking creation endpoint is implemented according to the LBC-004D contract.
- Required validation commands pass.
- Required local endpoint tests pass.
- No blocked scope is changed.

Implementation result:
- Added API-only booking route.
- Registered the booking route in the Fastify server.
- Implemented manual TypeScript request validation.
- Implemented `prisma.$transaction`.
- Implemented Resident and LaundryRoom transaction advisory locks with separate namespaces and fixed lock order.
- Validated required local success and error cases.
- No `apps/web`, migration, seed, Prisma generate, Prisma db push, dependency, Docker, CI, deploy, auth, cancellation, admin panel, `packages/shared`, LBC-004F READY, or new READY task was created.
- Trigger technical approval has been recorded before commit.
- Commit is authorized with explicit file staging.

## BACKLOG

No task is READY beyond LBC-004E.
