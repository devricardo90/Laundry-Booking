# Ops Backlog

## REMOTE DONE

### LBC-004G - Booking Read/List API

Status: Remote DONE

Type: API / Read Endpoint

Operational notes:
- This task implemented only `GET /bookings`.
- This task supported optional filters for `laundryRoomId`, `date=YYYY-MM-DD`, and `status=ACTIVE|CANCELED`.
- This task interpreted `date=YYYY-MM-DD` in `Europe/Stockholm`.
- This task returned ISO timestamps and included `timezone: Europe/Stockholm`.
- This task kept CANCELED bookings visible when the filter permitted.
- This task validated invalid UUID, date, and status with `400`.
- This task did not change `apps/web`, create migration, create seed, run Prisma generate, run Prisma db push, add dependency, configure Docker, configure CI, configure deploy, implement auth, create admin panel, create `packages/shared`, or open LBC-004H as READY.
- Remote DONE confirmed at commit `252c16e`.

### LBC-004F - Implement Booking Cancellation API

Status: Remote DONE

Type: API / Mutation Endpoint

Operational notes:
- This task implemented only `POST /bookings/:bookingId/cancel`.
- This task did not implement `PATCH /bookings/:bookingId`.
- This task did not create a generic booking status update endpoint.
- This task used existing Fastify and Prisma 7 setup.
- This task used a short transaction plus conditional `updateMany`.
- This task set `status` to `CANCELED` and filled `canceledAt`.
- This task validated required local success and error cases.
- This task validated that canceled Booking no longer blocks availability.
- This task did not change `apps/web`, create migration, create seed, run Prisma generate, run Prisma db push, add dependency, configure Docker, configure CI, configure deploy, implement auth, create admin panel, create `packages/shared`, or open LBC-004G as READY.
- Remote DONE confirmed at commit `1e76fb9`.

### LBC-004E - Implement Booking Creation Endpoint

Status: Remote DONE

Type: API / Mutation Endpoint

Operational notes:
- This task implemented only `POST /bookings`.
- This task added an API-only booking route module.
- This task registered the booking route in the Fastify server.
- This task implemented manual TypeScript request validation.
- This task used `prisma.$transaction`.
- This task used PostgreSQL transaction advisory locks for Resident and LaundryRoom.
- This task used separate lock namespaces and fixed lock order: Resident first, LaundryRoom second.
- This task validated required local success and error cases.
- This task did not change `apps/web`, create migration, create seed, run Prisma generate, run Prisma db push, add dependency, configure Docker, configure CI, configure deploy, implement auth, implement cancellation, create admin panel, create `packages/shared`, or open LBC-004F as READY.
- Remote DONE confirmed at commit `36263f6`.

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

## REMOTE DONE

### LBC-005A - Minimal Angular Booking Flow

Status: Remote DONE

Type: UI / Angular Frontend

Operational notes:
- This task created `apps/web/proxy.conf.json` to proxy `/api` to `http://127.0.0.1:3000` with path rewrite.
- This task added `proxyConfig` to the `serve` target in `apps/web/angular.json`.
- This task added `provideHttpClient()` to `apps/web/src/app/app.config.ts`.
- This task implemented the booking flow component in `apps/web/src/app/app.ts` using `HttpClient`, signals, and `FormsModule`.
- This task implemented the UI template in `apps/web/src/app/app.html` with Tailwind CSS.
- This task added slot status CSS classes to `apps/web/src/app/app.css`.
- This task did not install new dependencies, change `package.json`, change `pnpm-lock.yaml`, change `apps/api`, create migration, create versioned seed, run Prisma generate, run Prisma db push, configure Docker, configure CI, configure deploy, implement auth, create admin panel, create `packages/shared`, or open LBC-005B as READY.
- `pnpm lint`, `pnpm typecheck`, and `pnpm build` passed.
- Manual tests passed for availability, cancel, create, and list via proxy.
- `proxy.conf.json` audited via `git add -N`.
- Remote DONE confirmed at commit `0a33863`.

## REMOTE DONE

### LBC-005B - UI Usability Pass

Status: Remote DONE

Type: UI / Angular Frontend — Usability

Operational notes:
- This task added `hasQueried` signal and 4 view-helper methods to `apps/web/src/app/app.ts`.
- This task updated `apps/web/src/app/app.html` with improved labels, helper texts, UUID placeholders, flow guidance, distinct initial vs. empty states, slot status badges, booking status badges, improved banners, and clearer button labels.
- `pnpm lint`, `pnpm typecheck`, and `pnpm build` passed.
- Manual tests passed for all flows and states.
- Remote DONE confirmed at commit `ef37b8b`.

## REMOTE DONE

### LBC-005C - Record Local UI Smoke Evidence

Status: Remote DONE

Type: Documentation / Ops

Operational notes:
- Formalized smoke test evidence for LBC-005B.
- Verified full flow success via Angular proxy.
- Remote DONE confirmed at commit `9dd8962`.

## REMOTE DONE

### LBC-006A - Define Demo Data Presets Strategy

Status: Remote DONE

Type: Documentation / Architecture

Operational notes:
- Created `docs/architecture/demo-presets-strategy.md`.
- Defined frontend-hardcoded presets based on seed data.
- Defined no backend or database changes.
- Defined boundaries: not security, no new dependencies.
- Defined exit criteria for future implementation.
- Updated operational documentation.
- Remote DONE confirmed at commit `d6f8060`.

## REMOTE DONE

### LBC-007A - Define Product Roadmap and Current Sprint Objective

Status: Remote DONE

Type: DOCS / ROADMAP

Operational notes:
- Active documentation task for SPR-01.
- Creates the official product roadmap above individual tasks.
- Creates the current objective document for SPR-01 - Product Demo Readiness.
- Keeps LBC-007B as FUTURE / SUGGESTED only.
- Does not authorize UI implementation.
- Remote DONE confirmed at commit `b0c5d06`.

## REMOTE DONE

### LBC-007B - Implement Angular UI Development Presets

Status: Remote DONE

Type: UI / Angular Frontend

Goal:
Implement the demo presets in the Angular UI.

Operational notes:
- This task added hardcoded development/demo presets in the Angular UI.
- This task used Laundry Room A `11111111-1111-4111-8111-111111111111`.
- This task used Development Resident `22222222-2222-4222-8222-222222222222`.
- This task let the existing controls fill `residentId` and `laundryRoomId`.
- This task preserved check availability -> book -> list -> cancel.
- This task did not alter API, Prisma, seed, dependencies, migrations, or runtime configuration.
- Remote DONE confirmed at commit `9009aa5`.

## READY

### LBC-007C - Validate Demo Presets and Record Demo Smoke Evidence

Status: READY

Type: DOCS / EVIDENCE

Goal:
Record local demo smoke evidence for the preset-assisted flow after LBC-007B.

Operational notes:
- LBC-007C is documentation/evidence only.
- May start local PostgreSQL, API, and web if needed.
- Must use Development Presets during smoke validation.
- Smoke target is check availability -> create booking -> list booking -> cancel booking.
- Confirm success, error, and empty states where possible.
- Must not change `apps/web`, `apps/api`, `prisma`, `package.json`, lockfiles, migrations, seed, Docker, dependencies, deploy, UI, backend, auth, or open any new READY task besides LBC-007C.
- Commit and push are blocked.
