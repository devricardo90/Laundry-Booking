# Ops Status

Project: LBC - Laundry Booking Condo

Next unit: LBC-009 - validation/readiness (BLOCKED; original acceptance criteria missing)

Task status: SPR-01 active; no unblocked implementation unit is READY

## Current Recovery State - 2026-10-03

- Latest completed task commit: `2d20d97` (LBC-010); governance reconciliation is at `82b51e9`.
- SPR-01 - Product Demo Readiness remains the current sprint.
- LBC-008A: Remote DONE at `4c6829d`.
- LBC-008B: Remote DONE at `3ce264c`.
- LBC-008C: Remote DONE; documentation/evidence criteria passed review.
- LBC-009 validation/readiness (Owner-referenced): BLOCKED because its original acceptance checklist is absent from the repository.
- LBC-009A manual deployment discussion remains Future / Suggested.
- LBC-010: Remote DONE at `2d20d97`.
- Operational backlog authority: `docs/ops/backlog.md`; root `backlog.md` is its synchronized entry-point mirror.

Current sprint objective:
- Make Laundry Booking Condo demonstrable to an external person with clear flow, realistic demo states, and reduced friction, without opening full redesign, real auth, deploy, payments, or admin complexity.

Product direction:
- Make the app functional, visually solid, responsive on mobile.
- Document with a good README.
- Later manual deploy for testing (no deploy yet).
- No Prisma/database changes yet.

Next planned sequence:
1. Keep Owner-referenced LBC-009 BLOCKED until its original acceptance checklist is recovered and reviewed through an Owner Discussion Gate.
2. LBC-009A remains a separate Future / Suggested manual deployment discussion.


Current approved stack:
- Frontend: Angular + TypeScript + Tailwind.
- Backend: Fastify + TypeScript.
- Validation: Zod.
- ORM: Prisma.
- Database: PostgreSQL.
- MongoDB: outside current decision.

Critical rule:
- The system must prevent time conflicts in the same laundry room.

Timezone rule:
- Store times in UTC.
- Display times in the operational timezone `Europe/Stockholm`, unless changed by a later decision.

Initial repository guard:
- `pwd`: run before LBC-002A changes.
- Branch: `main`.
- `HEAD`: `3d90251f844641e2df5d8e4f00942cd5d88e299c`.
- `origin/main`: `3d90251f844641e2df5d8e4f00942cd5d88e299c`.
- Initial status: no tracked or untracked file entries were reported, only Git config ignore permission warnings.

LBC-002A decision draft:
- Future scaffold structure: simple monorepo.
- Future package manager: pnpm.
- Future runtime target: Node.js 24.x LTS.
- Future frontend target: Angular 21.x with TypeScript 5.9.x.
- Future backend target: Fastify 5.8.x.
- Future validation target: Zod 4.4.x.
- Future ORM target: Prisma 7.8.x.
- Future database target: PostgreSQL 18.x.
- Future CSS framework target: Tailwind CSS 4.3.x.

LBC-002B authorized scope:
- Root workspace files: `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, and `.gitignore`.
- Web scaffold: `apps/web/**`.
- API scaffold: `apps/api/**`.
- Ops documents: `STATUS.md`, `backlog.md`, `docs/ops/status.md`, `docs/ops/backlog.md`, `docs/ops/execution-log.md`, and `docs/ops/session-handoff.md`.

LBC-002B blocked scope:
- `packages/shared`.
- Prisma, schema, migrations, seed, and real database.
- Auth, booking rules, conflict prevention, domain endpoints, and domain screens.
- Deploy, CI, Docker, tests E2E, and LBC-002C.

LBC-002B validation status:
- `pnpm install`: passed.
- `pnpm lint`: passed.
- `pnpm typecheck`: passed.
- `pnpm build`: passed.
- `pnpm --filter web build`: passed.
- `pnpm --filter api build`: passed.

LBC-002C authorized scope:
- Root local runtime scripts in `package.json`.
- Web runtime script updates in `apps/web/package.json`.
- API `HOST` and `PORT` defaults in `apps/api/src/server.ts`.
- `.env.example` without secrets.
- Local runtime documentation in `docs/ops/local-runtime.md`.
- Operational docs updates.

LBC-002C blocked scope:
- New dependencies.
- `pnpm approve-builds`.
- `packages/shared`.
- Prisma, schema, migrations, seed, and real database.
- Auth, booking rules, conflict prevention, domain endpoints, and domain screens.
- Deploy, CI, Docker, and new READY tasks.

LBC-003A authorized scope:
- Create or update `docs/product/domain-model.md`.
- Update `docs/product/business-rules.md`.
- Update `docs/product/mvp-scope.md`.
- Update operational docs for the task.

LBC-003A blocked scope:
- Prisma schema, migrations, seed, and real database.
- Endpoints, controllers, services, and repositories.
- Angular product screens or components.
- Runtime changes, dependency changes, `pnpm approve-builds`, deploy, CI, Docker, and `packages/shared`.

LBC-003B authorized scope:
- Create `docs/architecture/persistence-model.md`.
- Update `docs/product/business-rules.md`.
- Update `docs/product/domain-model.md`.
- Update operational docs for the task.

LBC-003B blocked scope:
- Prisma schema, migrations, seed, real database, and `DATABASE_URL` changes.
- Endpoints, controllers, services, and repositories.
- Angular product screens or components.
- Runtime changes, dependency changes, `pnpm approve-builds`, deploy, CI, Docker, and `packages/shared`.

LBC-003C authorized scope:
- Create the `prisma` folder if needed.
- Create `prisma/schema.prisma`.
- Define PostgreSQL datasource and Prisma Client generator.
- Model Resident, Admin, LaundryRoom, Booking, and BlockedSlot.
- Define minimum enums, relationships, foreign keys, statuses, timestamps, `startTime`, `endTime`, and `canceledAt` where applicable.
- Document schema baseline limitations around overlap and race-condition protection.
- Update authorized operational documentation.
- Run Prisma schema validation only if the Prisma CLI is already available locally.

LBC-003C blocked scope:
- Migrations, `prisma migrate`, `prisma db push`, seed data, real database access, and `.env` or `DATABASE_URL` file changes.
- Dependency installation and `pnpm approve-builds`.
- Endpoints, controllers, services, repositories, Angular screens, auth, and real booking flows.
- Deploy, CI, Docker, `packages/shared`, new READY tasks, commit, and push.

LBC-004A authorized scope:
- Promote LBC-004A as the only READY task.
- Create or update the Availability API contract documentation.
- Define the proposed endpoint `GET /laundry-rooms/:id/availability?date=YYYY-MM-DD`.
- Define `Europe/Stockholm` date interpretation, UTC storage/comparison, and ISO UTC response timestamps.
- Define response shape, slot shape, status values, and reason privacy rules.
- Define the 14-day read window as contract-only behavior.
- Define the dev persistence strategy before real endpoint implementation.
- Update authorized operational documentation.

LBC-004A blocked scope:
- Endpoint implementation, Fastify route/controller, service, repository, and runtime overlap logic.
- Prisma migration, Prisma generate, Prisma db push, seed, and real database access.
- Dependency installation, `package.json` changes, `pnpm approve-builds`, tests, auth, Angular UI, booking creation, deploy, CI, Docker, commit, push, and opening LBC-004B as READY.

LBC-004B authorized scope:
- Add `prisma` as a dev dependency and `@prisma/client` as a dependency.
- Keep `node_modules` out of Git.
- Validate `prisma/schema.prisma`.
- Add Prisma 7 configuration required for local migrations.
- Use `DATABASE_URL` only in the terminal session or a non-versioned local `.env`.
- Update `.env.example` with a fictitious local `DATABASE_URL` if needed.
- Apply local dev migration only against local/dev PostgreSQL.
- Generate Prisma Client if needed.
- Create and run a minimal development seed only after migration succeeds.
- Prove minimum data exists with safe local inspection.
- Update authorized operational documentation.

LBC-004B local persistence result:
- Local/dev database `lbc_dev` was created after Trigger authorization.
- Dev migration `init` was created and applied.
- Prisma Client generation completed.
- Minimal development seed was created and executed.
- Seed output verified one LaundryRoom, one Resident, one Admin, one ACTIVE Booking, one CANCELED Booking, and one BlockedSlot.
- Remote DONE is confirmed at commit `7025936`.

LBC-004B blocked scope:
- Endpoint implementation, Fastify route/controller/service/repository, runtime availability logic, Angular UI, auth, booking creation, booking cancellation, production seed, production database, Docker, CI, deploy, `packages/shared`, `prisma db push`, and opening LBC-004C as READY.

LBC-004C authorized scope:
- Implement only `GET /laundry-rooms/:laundryRoomId/availability?date=YYYY-MM-DD`.
- Do not use `/api` prefix because the Fastify scaffold registers `/health` directly.
- Connect the API to the local/dev database through Prisma 7 and the PostgreSQL adapter.
- Validate `laundryRoomId` as UUID.
- Validate required strict `date=YYYY-MM-DD`.
- Interpret `date` in operational timezone `Europe/Stockholm`.
- Reject dates outside today through today plus 14 days with 400.
- Return 404 for missing LaundryRoom.
- Treat ACTIVE bookings as BOOKED, ignore CANCELED bookings, and treat BlockedSlots as BLOCKED.
- Use overlap rule `existing.startTime < slot.endTime AND existing.endTime > slot.startTime`.
- Use priority `BLOCKED > BOOKED > AVAILABLE`.
- Return the documented response contract with ISO UTC slot timestamps.
- Validate locally with the existing seed for 200, 400, and 404 cases.

LBC-004C validation result:
- `pnpm lint` passed.
- `pnpm typecheck` passed.
- `pnpm build` passed.
- Local endpoint validation proved BOOKED at 08:00-10:00, BLOCKED at 10:00-12:00, AVAILABLE at 12:00-14:00, at least one other AVAILABLE slot, invalid input 400, and missing LaundryRoom 404.
- Remote DONE confirmed at commit `9552c7b`.

LBC-004C blocked scope:
- Booking creation, booking cancellation, auth, Angular UI, admin panel, mutation of bookings or blocked slots, new migration, new seed, `prisma db push`, Docker, deploy, CI, `packages/shared`, large controller/service/repository refactor, and any new READY task.

LBC-004D authorized scope:
- Create `docs/architecture/booking-creation-contract.md`.
- Update `docs/product/business-rules.md` only for booking creation contract references and rule alignment.
- Update `STATUS.md`, `backlog.md`, `docs/ops/status.md`, `docs/ops/backlog.md`, `docs/ops/execution-log.md`, and `docs/ops/session-handoff.md`.
- Document proposed `POST /bookings` request and response contract.
- Document `Europe/Stockholm` request interpretation and UTC `startTime`/`endTime` response timestamps.
- Document `400`, `404`, and `409` error behavior.
- Document domain validations for Resident, LaundryRoom, 14-day window, 2-hour slot grid, ACTIVE Booking, CANCELED Booking, BlockedSlot, and one future ACTIVE booking per Resident.
- Document concurrency risk from read-only availability.
- Document future transaction plus advisory lock strategy and future PostgreSQL exclusion constraint hardening.

LBC-004D blocked scope:
- Implementing `POST /bookings`.
- Changing `apps/api` or `apps/web`.
- Creating controllers, services, repositories, migration, seed, Prisma generate, Prisma db push, Docker, CI, deploy, remote database, production configuration, auth, cancellation, admin panel, Angular UI, LBC-004E READY, any new READY task, or push.

LBC-004D result:
- Remote DONE confirmed at commit `f79f3dc`.

LBC-004E authorized scope:
- Implement only `POST /bookings`.
- Use Fastify in `apps/api`.
- Use the existing Prisma 7 configuration.
- Follow `docs/architecture/booking-creation-contract.md`.
- Validate Resident existence/status, LaundryRoom existence/status, date, slotStart, 14-day window, past slots, fixed 2-hour grid, ACTIVE Booking overlap, BlockedSlot overlap, and Resident future ACTIVE Booking limit.
- Use `prisma.$transaction`.
- Acquire PostgreSQL transaction advisory locks for Resident and LaundryRoom.
- Use separate lock namespaces and acquire locks in fixed order: Resident first, LaundryRoom second.
- Create Booking only if every validation passes.
- Update authorized operational documentation.

LBC-004E validation requirements:
- `pnpm lint`.
- `pnpm typecheck`.
- `pnpm build`.
- Local `POST /bookings` tests for 201, 400, 404, 409 active booking conflict, 409 resident future ACTIVE booking, 409 BlockedSlot, and CANCELED nonblocking behavior.
- Evidence that `apps/web` was not changed.

LBC-004E validation result:
- `pnpm lint` passed.
- `pnpm typecheck` passed.
- `pnpm build` passed.
- Local endpoint tests proved `201`, `400`, `404`, `409` active booking conflict, `409` resident future ACTIVE booking, `409` BlockedSlot, and CANCELED nonblocking behavior.
- `apps/web` was not changed.
- Trigger technical approval has been recorded.

LBC-004E blocked scope:
- `apps/web`, Angular UI, admin panel, auth, cancellation, migration, versioned seed, Prisma generate, Prisma db push, remote database, deploy, Docker, CI, `packages/shared`, LBC-004F READY, any new READY task, and push.

LBC-004E result:
- Remote DONE confirmed at commit `36263f6`.

LBC-004F authorized scope:
- Implement only `POST /bookings/:bookingId/cancel`.
- Do not implement `PATCH /bookings/:bookingId`.
- Do not create a generic booking status update endpoint.
- Use Fastify in `apps/api`.
- Use existing Prisma 7 configuration.
- Validate `bookingId` as UUID.
- Return 404 for missing Booking.
- Return 409 for Booking status other than ACTIVE.
- Return 409 for ACTIVE Booking that has already started or is in the past.
- Capture `now` once.
- Use a short `prisma.$transaction`.
- Use conditional `updateMany` with `id`, `status: ACTIVE`, and `startTime > now`.
- Set `status` to `CANCELED` and fill `canceledAt`.
- Return `id`, `status`, `canceledAt`, and `timezone`.
- Update authorized operational documentation.

LBC-004F validation requirements:
- `pnpm lint`.
- `pnpm typecheck`.
- `pnpm build`.
- Local cancel test for `200`.
- Local cancel test for invalid UUID `400`.
- Local cancel test for missing Booking `404`.
- Local cancel test for already CANCELED Booking `409`.
- Local cancel test for past or started ACTIVE Booking `409`.
- Local availability test proving CANCELED Booking does not block availability.
- Evidence that `apps/web` was not changed.

LBC-004F validation result:
- `pnpm lint` passed.
- `pnpm typecheck` passed.
- `pnpm build` passed.
- Local cancel test returned `200` for ACTIVE future Booking.
- Local cancel test returned `400` for invalid UUID.
- Local cancel test returned `404` for missing Booking.
- Local cancel test returned `409` for already CANCELED Booking.
- Local cancel test returned `409` for past/started ACTIVE Booking.
- Local availability test showed BOOKED before cancellation and AVAILABLE after cancellation for the same slot.
- Local API server was stopped after validation.
- Temporary local test data was removed after validation.
- `apps/web` was not changed.

LBC-004F result:
- Remote DONE confirmed at commit `1e76fb9`.

LBC-004G authorized scope:
- Implement only `GET /bookings`.
- Support optional query filters `laundryRoomId`, `date=YYYY-MM-DD`, and `status=ACTIVE|CANCELED`.
- Interpret `date=YYYY-MM-DD` in `Europe/Stockholm`.
- Return ISO timestamps and include `timezone: Europe/Stockholm`.
- Include CANCELED bookings when the filter permits.
- Validate invalid UUID, date, and status with `400`.
- Update authorized operational documentation.

LBC-004G validation requirements:
- `pnpm lint`.
- `pnpm typecheck`.
- `pnpm build`.
- Local `GET /bookings` test returning existing reservations.
- Local tests for `laundryRoomId`, `date`, `status=ACTIVE`, and `status=CANCELED`.
- Local `400` tests for invalid UUID, invalid date, and invalid status.
- Evidence that `apps/web` was not changed.

LBC-004G validation result:
- `pnpm lint` passed.
- `pnpm typecheck` passed.
- `pnpm build` passed.
- Local list tests passed for unfiltered listing, `laundryRoomId`, `date`, `status=ACTIVE`, and `status=CANCELED`.
- Local invalid input tests returned `400` for invalid UUID, invalid date, and invalid status.
- `apps/web` was not changed.

LBC-004G blocked scope:
- `apps/web`, Angular UI, admin panel, auth, login, permissions, migration, versioned seed, Prisma generate, Prisma db push, remote database, deploy, Docker, CI, `packages/shared`, pagination complexity, reports, visual calendar, LBC-004H READY, any new READY task, commit, and push.

LBC-004G result:
- Remote DONE confirmed at commit `252c16e`.

LBC-005A authorized scope:
- Create `apps/web/proxy.conf.json` to proxy `/api` to `http://127.0.0.1:3000` with path rewrite.
- Add `proxyConfig` option to `apps/web/angular.json` serve target.
- Add `provideHttpClient()` to `apps/web/src/app/app.config.ts`.
- Implement booking flow in `apps/web/src/app/app.ts` using `HttpClient`, signals, and `FormsModule`.
- Implement UI template in `apps/web/src/app/app.html`.
- Add slot status CSS classes to `apps/web/src/app/app.css`.
- Update authorized operational documentation.

LBC-005A validation result:
- `pnpm lint` passed.
- `pnpm typecheck` passed.
- `pnpm build` passed (177 kB initial, under 500 kB budget).
- Angular dev server served the app at `http://127.0.0.1:4200`.
- `/api/health` via proxy returned `{"status":"ok","service":"lbc-api"}`.
- Availability endpoint via proxy returned 12 slots with AVAILABLE and BOOKED statuses.
- Cancel booking via proxy returned `200 CANCELED`.
- Create booking via proxy returned `201 ACTIVE`.
- Bookings list via proxy returned updated list after changes.
- Error 409 returned `{"message":"Resident already has a future ACTIVE booking"}`.
- Error 400 returned for invalid UUID and out-of-range date.
- `proxy.conf.json` audited via `git add -N` and visible in `git diff`.
- `git diff --check` showed no whitespace errors.
- No file outside the authorized list was altered.

LBC-005A blocked scope:
- `apps/api/src/server.ts` (CORS not applicable: `@fastify/cors` is not installed), `apps/api/src/bookings.ts`, `apps/api/src/availability.ts`, `package.json`, `pnpm-lock.yaml`, migration, versioned seed, Prisma generate, Prisma db push, remote database, deploy, Docker, CI, `packages/shared`, auth, login, admin panel, permissions, payment, notifications, complex visual calendar, design system, new UI library, global store, LBC-005B READY, any new READY task, commit without authorization, and push.

LBC-005B authorized scope:
- Update `apps/web/src/app/app.ts` to add `hasQueried` signal and view-helper methods for slot and booking status badges.
- Update `apps/web/src/app/app.html` to improve labels, helper texts, placeholders, state messages, and status badges.
- Update authorized operational documentation.

LBC-005B validation result:
- `pnpm lint` passed.
- `pnpm typecheck` passed.
- `pnpm build` passed (180 kB initial, under 500 kB budget).
- Angular dev server recompiled new code automatically (confirmed via `main.js` grep for new strings).
- Availability, cancel, create, and list manual tests passed via proxy.
- Error 409, error 400, empty state confirmed.
- `git status` showed only `apps/web/src/app/app.html` and `apps/web/src/app/app.ts` modified.
- `git diff --check` showed no whitespace errors.
- No blocked file was altered.

LBC-005B blocked scope:
- `apps/api/*`, `apps/web/angular.json`, `apps/web/proxy.conf.json`, `apps/web/src/app/app.config.ts`, `apps/web/src/app/app.css`, `package.json`, `pnpm-lock.yaml`, `prisma/`, new endpoint, auth, login, admin, permissions, payment, notifications, complex visual calendar, design system, new UI library, `packages/shared`, deploy, Docker, CI, LBC-005C READY, any new READY task, commit without authorization, and push.
