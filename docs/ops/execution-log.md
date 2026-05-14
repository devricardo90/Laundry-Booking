# Execution Log

## 2026-05-14 - LBC-005B

Task:
LBC-005B - UI Usability Pass.

Decision:
- Trigger authorized LBC-005B as the only READY task.
- LBC-005A is confirmed as pending Remote DONE (commit authorization pending).
- Scope is UI-only: no backend changes, no new endpoints, no new dependencies.

Pre-change repository guard:
- `git status --short --untracked-files=all` showed only LBC-005A changes (from prior session).
- `git log --oneline -3` showed `252c16e`, `1e76fb9`, and `36263f6`.

Authorized scope:
- Add `hasQueried` signal and view-helper methods to `apps/web/src/app/app.ts`.
- Improve labels, helpers, placeholders, state messages, and badges in `apps/web/src/app/app.html`.
- Update authorized operational documentation.

Actions completed:
- Added `hasQueried = signal(false)` to `app.ts`.
- Added `statusLabel()`, `statusBadgeClass()`, `bookingStatusLabel()`, `bookingStatusBadgeClass()` methods.
- Set `hasQueried.set(true)` in `load()`.
- Translated all UI strings to English.
- Added helper text for laundryRoomId: "Development seed laundry room ID — change to test with another laundry room."
- Added helper text for residentId: "Development seed resident ID — used when creating a booking."
- Added UUID format placeholder for both ID inputs (`font-mono` class applied).
- Added date helper text: "Must be within the next 14 days."
- Added section subtitle in Filters: "Enter the details below and click Check Availability to see slots and bookings."
- Renamed button to "Check Availability".
- Distinguished initial state ("Enter your details above and click Check Availability.") from empty-after-query ("No slots found for this date." / "No bookings for this date.").
- Added slot status badges with color variants: Available (green), Booked (red), Blocked (orange).
- Added booking status badges: Active (green), Canceled (gray).
- Improved success/error banners: left border accent, ✓/✕ icon prefix.
- Renamed slot button to "Book" / "Booking..." with `aria-label`.
- Renamed cancel button to "Cancel booking" / "Canceling..." with `aria-label` and increased visual weight.
- Applied Prettier formatting fix to `app.html`.
- Updated operational documentation.

Validation completed:
- `pnpm lint` passed.
- `pnpm typecheck` passed.
- `pnpm build` passed (180 kB initial, under 500 kB budget).
- Angular dev server recompiled automatically; new strings confirmed in `main.js`.
- Availability test returned 12 slots with AVAILABLE and BOOKED statuses.
- Cancel booking returned `200 CANCELED`.
- Create booking returned `201 ACTIVE`.
- Bookings list returned ACTIVE and CANCELED entries.
- Error 409 returned `{"message":"Resident already has a future ACTIVE booking"}`.
- Error 400 returned for invalid UUID and out-of-range date.
- Empty state: bookings query for clean date returned `{"items":[]}`.
- `git status --short` showed only `apps/web/src/app/app.html` and `apps/web/src/app/app.ts` modified.
- `git diff --check` showed no whitespace errors.
- `apps/api/*`, `angular.json`, `proxy.conf.json`, `app.config.ts`, `app.css`, `package.json`, `pnpm-lock.yaml`, `prisma/` were not altered.

Blocked scope:
- `apps/api/*`, `apps/web/angular.json`, `apps/web/proxy.conf.json`, `apps/web/src/app/app.config.ts`, `apps/web/src/app/app.css`, `package.json`, `pnpm-lock.yaml`, `prisma/`, new endpoint, auth, login, admin, permissions, payment, notifications, complex visual calendar, design system, new UI library, `packages/shared`, deploy, Docker, CI, LBC-005C READY, any new READY task, commit without authorization, and push.

Evidence status:
- All validation outputs presented in raw form.
- Pending Trigger commit authorization.

## 2026-05-14 - LBC-005A

Task:
LBC-005A - Minimal Angular Booking Flow.

Decision:
- Trigger authorized LBC-005A as the only READY task.
- LBC-004G is confirmed Remote DONE at commit `252c16e`.
- Discussion Gate assessed: READY with Angular Dev Proxy as CORS solution.
- CORS via `@fastify/cors` was not used because the package is not installed.
- Angular proxy approach was authorized instead: no backend changes required.

Pre-change repository guard:
- `git status --short --untracked-files=all` was run and showed no file entries.
- `git log --oneline -3` showed `252c16e`, `1e76fb9`, and `36263f6`.

Authorized scope:
- Create `apps/web/proxy.conf.json` to proxy `/api` to `http://127.0.0.1:3000` with path rewrite.
- Add `proxyConfig` to `apps/web/angular.json` serve target options.
- Add `provideHttpClient()` to `apps/web/src/app/app.config.ts`.
- Implement booking flow in `apps/web/src/app/app.ts` with `HttpClient`, signals, and `FormsModule`.
- Implement UI template in `apps/web/src/app/app.html`.
- Add slot status CSS classes to `apps/web/src/app/app.css`.
- Update authorized operational documentation.

Actions completed:
- Created `apps/web/proxy.conf.json`.
- Updated `apps/web/angular.json` to add `proxyConfig` to the serve target.
- Updated `apps/web/src/app/app.config.ts` to add `provideHttpClient()`.
- Implemented full booking flow component in `apps/web/src/app/app.ts`.
- Implemented full UI template in `apps/web/src/app/app.html`.
- Added slot status color classes to `apps/web/src/app/app.css`.
- Applied Prettier formatting fix to `app.html`.
- Ran `git add -N apps/web/proxy.conf.json` to make new file auditable.
- Updated all operational documentation.

Validation completed:
- `pnpm lint` passed.
- `pnpm typecheck` passed.
- `pnpm build` passed (177 kB initial bundle, under 500 kB budget).
- Angular dev server served the app at `http://127.0.0.1:4200`.
- `/api/health` via proxy returned `{"status":"ok","service":"lbc-api"}`.
- Availability endpoint via proxy returned 12 slots with AVAILABLE and BOOKED statuses.
- Cancel existing ACTIVE booking via proxy returned `200 CANCELED`.
- Create new booking via proxy returned `201 ACTIVE`.
- Bookings list via proxy returned updated list reflecting cancel and create.
- Error state 409 returned `{"message":"Resident already has a future ACTIVE booking"}` (error display confirmed).
- Error state 400 returned for invalid UUID and out-of-range date (error display confirmed).
- `proxy.conf.json` audited via `git add -N` and visible in `git diff`.
- `git diff --check` showed no whitespace errors.
- No file outside the authorized list was altered.

Blocked scope:
- `apps/api/src/server.ts`, `apps/api/src/bookings.ts`, `apps/api/src/availability.ts`, `package.json`, `pnpm-lock.yaml`, migration, versioned seed, Prisma generate, Prisma db push, remote database, deploy, Docker, CI, `packages/shared`, auth, login, admin panel, permissions, payment, notifications, complex visual calendar, design system, new UI library, global store, LBC-005B READY, any new READY task, commit without authorization, and push.

Evidence status:
- All validation outputs presented in raw form.
- `git status`, `git diff --stat`, `git diff --check`, `git diff -- apps/web/proxy.conf.json`, and `git diff --name-only` presented in full.
- Pending Trigger commit authorization.

## 2026-05-14 - LBC-004G

Task:
LBC-004G - Booking Read/List API.

Decision:
- Trigger authorized LBC-004G as the only READY task.
- LBC-004F is confirmed Remote DONE.
- This task may implement only `GET /bookings` in `apps/api`.

Pre-change repository guard:
- `git status --short --untracked-files=all` was run and showed no file entries, only Git global ignore permission warnings.
- `git status -sb` was run and showed `main...origin/main`.
- `git log --oneline -3` showed `1e76fb9`, `36263f6`, and `f79f3dc`.

Authorized scope:
- Implement only `GET /bookings`.
- Support only `laundryRoomId`, `date=YYYY-MM-DD`, and `status=ACTIVE|CANCELED` query filters.
- Interpret `date=YYYY-MM-DD` in `Europe/Stockholm`.
- Return ISO timestamps and include `timezone: Europe/Stockholm`.
- Keep CANCELED bookings visible for history when the filter permits.
- Validate invalid UUID, invalid date, and invalid status with `400`.
- Update authorized operational documentation.

Actions completed:
- Added booking list route to the existing booking route module.
- Updated operational documentation for LBC-004G.

Validation completed:
- `pnpm lint` passed.
- `pnpm typecheck` passed.
- `pnpm build` passed.
- Local `GET /bookings` test returned existing reservations.
- Local filtered tests passed for `laundryRoomId`, `date`, `status=ACTIVE`, and `status=CANCELED`.
- Local invalid input tests returned `400` for invalid UUID, invalid date, and invalid status.
- Temporary local test data was removed after validation.
- `apps/web` was not changed.

Blocked scope:
- `apps/web`, Angular UI, admin panel, auth, login, permissions, migration, versioned seed, Prisma generate, Prisma db push, remote database, deploy, Docker, CI, `packages/shared`, pagination complexity, reports, visual calendar, LBC-004H READY, any new READY task, commit, push, and Remote DONE declaration.

Evidence status:
- Pending final git status and diff evidence for Trigger review.

## 2026-05-14 - LBC-004F

Task:
LBC-004F - Implement Booking Cancellation API.

Decision:
- Trigger authorized LBC-004F as the only READY task.
- LBC-004E is confirmed Remote DONE at commit `36263f6`.
- This task may implement only `POST /bookings/:bookingId/cancel` in `apps/api`.

Pre-change repository guard:
- `git status --short --untracked-files=all` was run and showed no file entries, only Git global ignore permission warnings.
- `git status -sb` was run and showed `main...origin/main`.
- `git log --oneline -3` showed `36263f6`, `f79f3dc`, and `9552c7b`.

Authorized scope:
- Implement only `POST /bookings/:bookingId/cancel`.
- Do not implement `PATCH /bookings/:bookingId`.
- Do not create a generic booking status update endpoint.
- Use existing Fastify and Prisma 7 setup.
- Validate `bookingId` as UUID.
- Return 404 for missing Booking.
- Return 409 for Booking status other than ACTIVE.
- Return 409 for ACTIVE Booking that has already started or is in the past.
- Capture `now` once.
- Use a short `prisma.$transaction`.
- Use conditional `updateMany` with `id`, `status: ACTIVE`, and `startTime > now`.
- Set `status` to `CANCELED` and fill `canceledAt`.
- Update authorized operational documentation.

Actions completed:
- Added cancellation route to the existing booking route module.
- Updated operational documentation for LBC-004F.

Validation completed:
- `pnpm lint` passed.
- `pnpm typecheck` passed.
- `pnpm build` passed.
- Local endpoint test returned `200` for canceling an ACTIVE future Booking.
- Local endpoint test returned `400` for invalid `bookingId`.
- Local endpoint test returned `404` for missing Booking.
- Local endpoint test returned `409` for already CANCELED Booking.
- Local endpoint test returned `409` for past/started ACTIVE Booking.
- Local availability test returned BOOKED before cancellation and AVAILABLE after cancellation for the same slot.
- The local API server used for validation was stopped after testing.
- Temporary local test data was removed after validation.
- `apps/web` was not changed.

Blocked scope:
- `apps/web`, Angular UI, admin panel, auth, migration, versioned seed, Prisma generate, Prisma db push, remote database, deploy, Docker, CI, `packages/shared`, LBC-004G READY, any new READY task, commit, push, and Remote DONE declaration.

Evidence status:
- Pending final git status and diff evidence for Trigger review.

## 2026-05-14 - LBC-004E

Task:
LBC-004E - Implement Booking Creation Endpoint.

Decision:
- Trigger authorized LBC-004E as the only READY task.
- LBC-004D is confirmed Remote DONE at commit `f79f3dc`.
- This task may implement only `POST /bookings` in `apps/api`.

Pre-change repository guard:
- `git status --short --untracked-files=all` was run and showed no file entries, only Git global ignore permission warnings.
- `git status -sb` was run and showed `main...origin/main`.
- `git log --oneline -3` showed `f79f3dc`, `9552c7b`, and `7025936`.

Authorized scope:
- Implement only `POST /bookings`.
- Use Fastify in `apps/api`.
- Use existing Prisma 7 configuration.
- Follow `docs/architecture/booking-creation-contract.md`.
- Implement manual TypeScript validation without new dependency unless unavoidable.
- Use `prisma.$transaction`.
- Use PostgreSQL transaction advisory locks for Resident and LaundryRoom.
- Use separate lock namespaces and fixed lock order: Resident first, LaundryRoom second.
- Create Booking only if all validations pass.
- Update authorized operational documentation.

Actions completed:
- Added booking route module.
- Registered booking route in the API server.
- Updated operational documentation for LBC-004E.

Validation completed:
- `pnpm lint` passed.
- `pnpm typecheck` passed.
- `pnpm build` passed.
- Local endpoint test returned `400` for invalid `slotStart`.
- Local endpoint test returned `404` for missing Resident.
- Local endpoint test returned `404` for missing LaundryRoom.
- Local endpoint test returned `409` for ACTIVE Booking overlap.
- Local endpoint test returned `409` for Resident future ACTIVE Booking.
- Local endpoint test returned `409` for BlockedSlot overlap.
- Local endpoint test returned `201` for creating over a CANCELED Booking slot, proving CANCELED does not block.
- The local API server used for validation was stopped after testing.
- `apps/web` was not changed.

Blocked scope:
- `apps/web`, Angular UI, admin panel, auth, cancellation, migration, versioned seed, Prisma generate, Prisma db push, remote database, deploy, Docker, CI, `packages/shared`, LBC-004F READY, any new READY task, push, and Remote DONE declaration.

Evidence status:
- Trigger technically approved LBC-004E after implementation and validation review.
- Local DONE recorded before commit.
- Commit is authorized only with explicit file staging.
- Push remains blocked.

## 2026-05-14 - LBC-004D

Task:
LBC-004D - Define Booking Creation Contract and Concurrency Strategy.

Decision:
- Trigger authorized LBC-004D as the only READY task.
- LBC-004C is confirmed Remote DONE at commit `9552c7b`.
- This task is documentation-only and must not implement booking creation.

Pre-change repository guard:
- `git status --short --untracked-files=all` was run and showed no file entries, only Git global ignore permission warnings.
- `git status -sb` was run and showed `main...origin/main`.
- `git log --oneline -5` showed `9552c7b`, `7025936`, `967a321`, `e5285f4`, and `c31ed8c`.

Authorized scope:
- Create `docs/architecture/booking-creation-contract.md`.
- Update `docs/product/business-rules.md` if needed for booking creation rule alignment.
- Update authorized operational documentation.
- Document proposed `POST /bookings` contract.
- Document request body with `residentId`, `laundryRoomId`, `date`, and `slotStart`.
- Document `Europe/Stockholm` interpretation and UTC `startTime`/`endTime` response timestamps.
- Document `201`, `400`, `404`, and `409` behavior.
- Document domain validations and concurrency strategy.
- Document future transaction plus advisory lock protection and future PostgreSQL exclusion constraint hardening.

Actions completed:
- Added booking creation contract documentation.
- Added business-rules reference for the booking creation contract.
- Updated operational documentation for LBC-004D.

Blocked scope:
- Implementing `POST /bookings`, changing `apps/api`, changing `apps/web`, controllers, services, repositories, new migration, new seed, Prisma generate, Prisma db push, Docker, CI, deploy, remote database, production, auth, cancellation, admin panel, Angular UI, LBC-004E READY, any new READY task, push, and Remote DONE declaration.

Evidence status:
- Trigger technically approved LBC-004D after content review.
- Local DONE recorded before commit.
- Commit is authorized only with explicit file staging.
- Push remains blocked.

## 2026-05-13 - LBC-004C

Task:
LBC-004C - Implement Availability API Read Endpoint.

Decision:
- Trigger authorized LBC-004C as the only READY task.
- LBC-004B is confirmed Remote DONE at commit `7025936`.

Pre-change repository guard:
- `git status --short --untracked-files=all` was run and showed no file entries, only Git global ignore permission warnings.
- `git status -sb` was run and showed `main...origin/main`.
- `git log --oneline -3` showed `7025936`, `967a321`, and `e5285f4`.

Authorized scope:
- Implement only `GET /laundry-rooms/:laundryRoomId/availability?date=YYYY-MM-DD`.
- Use no `/api` prefix.
- Connect the API to the local/dev PostgreSQL database through Prisma 7.
- Add a small Prisma helper and route module if needed.
- Add the Prisma 7 PostgreSQL adapter and `pg` dependency if needed.
- Validate UUID, strict required `YYYY-MM-DD`, `Europe/Stockholm` operational date interpretation, and today through today plus 14 days.
- Return 400 for invalid input and 404 for missing LaundryRoom.
- Treat ACTIVE bookings as BOOKED, ignore CANCELED bookings, and treat BlockedSlots as BLOCKED.
- Use priority `BLOCKED > BOOKED > AVAILABLE`.
- Return the documented response contract with ISO UTC slot timestamps.

Actions completed:
- Added `@prisma/adapter-pg` and `pg` to the API package.
- Added `apps/api/src/prisma.ts` for Prisma 7 adapter-backed client initialization.
- Added `apps/api/src/availability.ts` for the read-only availability route.
- Updated `apps/api/src/server.ts` to register the availability route and disconnect Prisma on close.
- Updated operational documentation for LBC-004C.

Validation completed:
- `pnpm lint` passed.
- `pnpm typecheck` passed.
- `pnpm build` passed.
- Local endpoint validation with session-only `DATABASE_URL` proved 200 behavior for the seeded laundry room.
- Seeded 08:00-10:00 local slot returned BOOKED.
- Seeded 10:00-12:00 local slot returned BLOCKED.
- Seeded 12:00-14:00 local slot returned AVAILABLE because the booking is CANCELED.
- At least one other AVAILABLE slot was returned.
- Invalid request validation returned 400.
- Missing LaundryRoom returned 404.

Blocked scope:
- Booking creation, booking cancellation, auth, Angular UI, admin panel, booking or blocked slot mutation, new migration, new seed, `prisma db push`, Docker, deploy, CI, `packages/shared`, large controller/service/repository refactor, commit, push, Local DONE declaration, and any new READY task.

Evidence status:
- Pending final git status and diff evidence for Trigger review.

## 2026-05-13 - LBC-004B

Task:
LBC-004B - Apply Dev Prisma Migration and Seed Minimal Availability Data.

Decision:
- Trigger authorized LBC-004B as a controlled development persistence task.
- LBC-004A is confirmed Remote DONE at commit `967a321`.

Pre-change repository guard:
- `git status --short --untracked-files=all` was run and showed no file entries, only Git global ignore permission warnings.
- `git status -sb` was run and showed `main...origin/main`.
- `git rev-parse HEAD` returned `967a32136682038cc4c8e9209f3f7611e3f66856`.
- `git rev-parse origin/main` returned `967a32136682038cc4c8e9209f3f7611e3f66856`.
- `git log --oneline -3` showed `967a321`, `e5285f4`, and `c31ed8c`.

Actions completed:
- Ran `pnpm.cmd add -D prisma --store-dir C:\Users\ricardodev\AppData\Local\pnpm\store\v10`.
- Ran `pnpm.cmd add @prisma/client --store-dir C:\Users\ricardodev\AppData\Local\pnpm\store\v10`.
- Did not run `pnpm approve-builds`.
- Added Prisma 7 config in `prisma.config.ts`.
- Removed datasource URL from `prisma/schema.prisma` because Prisma 7 rejects `url` in schema files.
- Updated `.env.example` with a fictitious local `DATABASE_URL`.
- Ran `pnpm.cmd exec prisma validate --schema prisma/schema.prisma` with session-only `DATABASE_URL`; validation passed.

Blocked action:
- Ran `pnpm.cmd exec prisma migrate dev --schema prisma/schema.prisma --name init` with session-only `DATABASE_URL=postgresql://user:password@localhost:5432/lbc_dev`.
- Prisma reached PostgreSQL at `localhost:5432` but failed with `P1000` because the candidate credentials were rejected.

Unblock action:
- Trigger authorized creating only the local/dev database `lbc_dev`.
- Created `lbc_dev` with session-only local `DATABASE_URL`.
- Re-ran `pnpm.cmd exec prisma migrate dev --schema prisma/schema.prisma --name init`; migration `20260513195342_init` was created and applied.
- Ran `pnpm.cmd exec prisma generate --schema prisma/schema.prisma`; Prisma Client generation completed.
- Created `prisma/seed.mjs` without adding an extra seed runner dependency.
- Configured `migrations.seed = "node prisma/seed.mjs"` in `prisma.config.ts`.
- Ran `pnpm.cmd exec prisma db seed`; seed completed and printed controlled verification for the required six records.

Completed:
- Dev migration applied.
- Prisma Client generated.
- Minimal dev seed created and executed.
- Data proof produced through seed assertions and controlled seed output.

Pending:
- Trigger review.
- Local DONE authorization.
- Commit authorization.

Blocked scope:
- Docker, remote database, `prisma db push`, endpoint implementation, Fastify route/controller/service/repository, runtime availability logic, tests, Angular UI, auth, booking creation, production seed, production database, deploy, CI, `packages/shared`, commit, push, and opening LBC-004C as READY.

Evidence status:
- Pending final git status and diff evidence for Trigger review.

## 2026-05-13 - LBC-004A

Task:
LBC-004A - Define Availability API Contract and Dev Persistence Strategy.

Decision:
- Trigger authorized LBC-004A as a documentation and architecture task.
- LBC-003C is confirmed Remote DONE at commit `e5285f4`.
- The next step is not a real endpoint, migration, seed, or database access.

Pre-change repository guard:
- `git status --short --untracked-files=all` was run and showed no file entries, only Git global ignore permission warnings.
- `git status -sb` was run and showed `main...origin/main`.
- `git rev-parse HEAD` returned `e5285f4e1b8b7311f102f2b76da5e3a3648d2650`.
- `git rev-parse origin/main` returned `e5285f4e1b8b7311f102f2b76da5e3a3648d2650`.
- `git log --oneline -3` showed `e5285f4`, `c31ed8c`, and `fe1ac8c`.

Authorized scope:
- Promote LBC-004A as the only READY task.
- Create or update documentation for the Availability API contract.
- Define endpoint, timezone interpretation, response shape, slot shape, status values, reason privacy rules, and the 14-day read window.
- Define the minimum dev persistence strategy before implementing the real endpoint.
- Update authorized operational documentation.

Blocked scope:
- Endpoint implementation, Fastify route/controller, service, repository, runtime overlap logic, tests, auth, Angular UI, and booking creation.
- Prisma migration, Prisma generate, Prisma db push, seed data, real database access, dependency installation, deploy, CI, Docker, commit, push, and opening LBC-004B as READY.

Evidence status:
- Final git status and diff evidence were presented.
- Trigger approved LBC-004A for Local DONE and commit.
- Commit is authorized with message `docs: define availability API contract`.
- Push remains blocked until explicitly authorized.

## 2026-05-13 - LBC-003C

Task:
LBC-003C - Implement Prisma schema baseline.

Decision:
- Trigger authorized LBC-003C as a controlled Prisma schema baseline task.
- LBC-003B is confirmed Remote DONE at commit `c31ed8c`.

Pre-change repository guard:
- `git status --short --untracked-files=all` was run and showed no file entries, only Git global ignore permission warnings.
- `git status -sb` was run and showed `main...origin/main`.
- `git log --oneline -3` was run and showed `c31ed8c`, `fe1ac8c`, and `93f32c7`.

Authorized scope:
- Create the `prisma` folder if needed.
- Create `prisma/schema.prisma`.
- Define PostgreSQL datasource and Prisma Client generator.
- Model Resident, Admin, LaundryRoom, Booking, and BlockedSlot.
- Define minimum enums, relationships, foreign keys, statuses, timestamps, `startTime`, `endTime`, and `canceledAt` where applicable.
- Document schema baseline limitations around overlap and race-condition protection.
- Update authorized operational documentation.
- Run Prisma validation only if the Prisma CLI is already available.

Blocked scope:
- Migrations, `prisma migrate`, `prisma db push`, seed data, real database access, and `.env` or `DATABASE_URL` file changes.
- Dependency installation and `pnpm approve-builds`.
- Endpoints, controllers, services, repositories, Angular screens, auth, real reservation flows, deploy, CI, Docker, `packages/shared`, commit, and push.

Evidence status:
- Pending final git status, diff evidence, `git add -N` for `prisma/schema.prisma`, and Trigger authorization before commit.

## 2026-05-13 - LBC-003B

Task:
LBC-003B - Define persistence model and conflict constraint strategy.

Decision:
- Trigger authorized LBC-003B as a documentation-only technical persistence task.

Pre-change repository guard:
- `git status --short --untracked-files=all` was run and showed no file entries, only Git global ignore permission warnings.
- `git status -sb` was run and showed `main...origin/main`.
- `git log --oneline -3` was run and showed `fe1ac8c`, `93f32c7`, and `b577a40`.

Authorized scope:
- Document future persistence tables for Resident/User, Admin, LaundryRoom, Booking, and BlockedSlot.
- Document expected technical fields, relationships, and indexes.
- Document PostgreSQL strategy for preventing time conflicts.
- Document ACTIVE, CANCELED, and BlockedSlot blocking behavior.
- Document race condition risk.
- Document that implementation is deferred to future tasks.

Blocked scope:
- Prisma schema, migrations, seed, real database, and `DATABASE_URL` changes.
- Endpoints, controllers, services, and repositories.
- Angular product screens or components.
- Runtime changes, dependency changes, `pnpm approve-builds`, deploy, CI, Docker, and `packages/shared`.

Evidence status:
- Pending final git status, diff evidence, `git add -N` for `docs/architecture/persistence-model.md`, and Trigger authorization before commit.

## 2026-05-13 - LBC-003A

Task:
LBC-003A - Define booking domain model before implementation.

Decision:
- Trigger promoted LBC-003A to READY with documentation-only domain modeling scope.

Pre-change repository guard:
- `git status --short --untracked-files=all` was run and showed no file entries, only Git global ignore permission warnings.
- `git status -sb` was run and showed `main...origin/main`.
- `git log --oneline -3` was run and showed `93f32c7`, `b577a40`, and `d6b7673`.

Authorized scope:
- Create or update documentation for the minimum booking domain model.
- Define Resident/User, Admin, LaundryRoom, Booking, and BlockedSlot.
- Define conceptual fields for each entity.
- Define booking statuses.
- Define minimum conflict and cancellation rules.
- Define MVP limits.
- Update operational task files.

Blocked scope:
- Prisma schema, migrations, seed, and real database.
- Endpoints, controllers, services, and repositories.
- Angular product screens or components.
- Runtime changes, dependency changes, `pnpm approve-builds`, deploy, CI, Docker, and `packages/shared`.

Evidence status:
- Pending final git status, diff evidence, `git add -N` for `docs/product/domain-model.md`, and Trigger authorization before commit.

## 2026-05-13 - LBC-002C

Task:
LBC-002C - Define API/Web local runtime and environment baseline.

Decision:
- Trigger promoted LBC-002C to READY with local runtime baseline scope.

Authorized scope:
- Define official local scripts for web and API.
- Use web port `4200` and API port `3000`.
- Read API `HOST` and `PORT` from environment variables with safe defaults.
- Create `.env.example` without secrets.
- Create `docs/ops/local-runtime.md`.
- Keep `/health` technical only.
- Run `pnpm lint`, `pnpm typecheck`, and `pnpm build`.

Blocked scope:
- New dependencies.
- `pnpm approve-builds`.
- `packages/shared`.
- Prisma, schema, migrations, seed, and real database.
- Auth, booking rules, conflict prevention, product endpoints, and product screens.
- Deploy, CI, Docker, and new READY tasks.

Evidence status:
- Pending validation evidence, diff evidence, `git add -N` for new files, and Trigger authorization before commit.

## 2026-05-13 - LBC-002B

Task:
LBC-002B - Project Scaffold.

Decision:
- Trigger promoted LBC-002B to READY with reduced and controlled scaffold scope.

Authorized scope:
- Create pnpm workspace.
- Create `apps/web` with Angular shell.
- Configure Tailwind only in `apps/web`.
- Create `apps/api` with Fastify TypeScript shell.
- Create minimal validation scripts.
- Update operational documentation.

Blocked scope:
- `packages/shared`.
- Prisma, schema, migrations, seed, and real database.
- Auth, booking rules, conflict prevention, domain endpoints, and domain screens.
- Deploy, CI, Docker, E2E tests, and opening LBC-002C.

Evidence status:
- `pnpm install` passed.
- `pnpm lint` passed after formatting the Angular shell files with Prettier.
- `pnpm typecheck` passed.
- `pnpm build` passed.
- `pnpm --filter web build` passed.
- `pnpm --filter api build` passed.
- Pending final git status, diff evidence, `git add -N` for new files, and Trigger authorization before commit.

Actions:
- Created root pnpm workspace files.
- Created Angular shell under `apps/web`.
- Configured Tailwind CSS only under `apps/web`.
- Created Fastify TypeScript shell under `apps/api`.
- Created minimal validation scripts.
- Did not create `packages/shared`.
- Did not create Prisma schema, migrations, seed, or database configuration.
- Did not create auth, booking rules, conflict prevention, domain endpoints, or domain screens.
- Did not configure deploy, CI, Docker, or E2E tests.
- Did not open LBC-002C.

## 2026-05-13 - LBC-002A

Task:
LBC-002A - Define Scaffold Plan and Version Matrix.

Pre-change repository guard:
- `pwd` was run.
- `git status --short --untracked-files=all` was run.
- `git status -sb` was run and showed `main...origin/main`.
- `git log --oneline -3` was run and showed `3d90251 docs: define LBC MVP scope and business rules`.
- `git rev-parse HEAD` returned `3d90251f844641e2df5d8e4f00942cd5d88e299c`.
- `git rev-parse origin/main` returned `3d90251f844641e2df5d8e4f00942cd5d88e299c`.

Actions:
- Created `docs/architecture/scaffold-plan.md`.
- Created `docs/architecture/version-matrix.md`.
- Updated status, backlog, ops status, ops backlog, execution log, and session handoff for LBC-002A.
- Documented the future scaffold as a simple monorepo.
- Documented pnpm as the future package manager.
- Documented future validation commands for the scaffold task.
- Documented scaffold limits and out-of-scope items.
- Kept LBC-002B in BACKLOG and not READY.
- Did not install dependencies.
- Did not create Angular, Fastify, Prisma schema, migration, seed, tests, endpoints, screens, or application code.
- Did not change README.
- Did not commit or push.
- Did not declare Local DONE or Remote DONE.

Evidence status:
- Pending final diff evidence and Trigger authorization.

## 2026-05-12 - LBC-001

Task:
LBC-001 - Define MVP Scope and Business Rules.

Actions:
- Confirmed the working directory was empty and not yet a Git repository.
- Initialized a Git repository for the project.
- Created documentation files for MVP scope, business rules, operational status, backlog, execution log, and session handoff.
- Kept LBC-002 in BACKLOG.
- Did not create application code.
- Did not install dependencies.
- Did not create Angular, Fastify, Prisma schema, migration, or seed files.
- Did not create `docs/architecture/stack-decision.md` because it is outside the authorized LBC-001 file list.
- Did not commit changes.

Evidence status:
- `git status --short --untracked-files=all` was run and listed the new documentation files as untracked.
- `git diff --stat` was run and returned no file stats because the created files remain untracked.
- `git diff --check` was run and returned no issues.
- `git add -N` was attempted only to make untracked files visible to `git diff`, but it was not completed because Git index access was blocked in the sandbox context.
- No commit was made.

## 2026-05-12 - LBC-001 Scope Correction

Task update:
The authorized LBC-001 scope was expanded to include `docs/architecture/stack-decision.md`.

Pre-change repository guard:
- `pwd` confirmed the current directory as `C:\Users\ricardodev\Desktop\Laundry-Booking`.
- `.git` was confirmed present.
- `git branch --show-current` returned `main`.
- `git status --short --untracked-files=all` showed only the LBC-001 documentation files as untracked.

Actions:
- Added the official stack decision document.
- Updated product scope with formal conflict logic, timezone policy, and official stack decision.
- Updated business rules with the formal overlap condition.
- Updated ops files to reflect the expanded authorized scope.
- Kept LBC-002 in BACKLOG.
- Did not create application code.
- Did not install dependencies.
- Did not create Angular, Fastify, Prisma schema, migration, or seed files.
- Did not configure Tailwind or deploy.
- Did not commit or push.
