# Execution Log

## 2026-09-30 - LBC-008C Review and Completion

Task:
LBC-008C - README and portfolio demo evidence.

Result:
- Manual review passed the existing acceptance items: overview, stack, implemented features, local setup, smoke evidence, screenshot section/placeholders, ordered demo flow, current limitations, and future roadmap.
- README claims were checked against the current app, package manifests, product docs, seed, and recorded LBC-007C/LBC-010 validation evidence.
- No screenshot image assets were present in the repository; clearly labeled placeholders were used.
- Only `README.md` and operational/product governance documents changed. No code, runtime configuration, database, migration, dependency, or architecture changes were made.
- No build or tests were run because the change is documentation-only.
- LBC-008C is Remote DONE after its documentation commit is pushed.
- LBC-009 remains BLOCKED pending historical acceptance-criteria investigation; it was not executed.

## 2026-09-30 - LBC-008C READY Opening

Task:
LBC-008C - README and portfolio demo evidence.

Decision:
- Owner authorized the existing LBC-008C after the governance reconciliation was pushed at `82b51e9`.
- The existing Included list in `docs/ops/backlog.md` is the acceptance basis: overview, stack, features, local setup, smoke evidence, screenshot section/placeholders, demo flow, limitations, and future roadmap.
- Allowed scope remains `README.md` and product/operations documentation; application code, API, Prisma, and deploy remain out of scope.
- LBC-009 remains blocked because its original acceptance checklist is missing.

## 2026-09-29 - LBC-010 Remote Completion and Governance Reconciliation

Task:
LBC-010 - Alternate local runtime on API port 3010.

Result:
- Reviewed the exact six authorized staged files; no scope violation, dependency addition, or accidental change was found.
- Preserved the standard API/proxy flow on port 3000 and validated the alternate runtime: direct API `3010/health` PASS; proxied `4200/api/health` PASS.
- Lint, typecheck, web test (1 file / 2 tests), build, and `git diff --cached --check` passed.
- Both runtime processes were stopped normally; ports 3000, 3010, and 4200 were free afterward.
- Commit `2d20d97` (`fix(dev): add alternate 3010 local runtime`) was pushed to `origin/main`; `HEAD` equals `origin/main` and the tree was clean.

Governance reconciliation:
- LBC-008A Remote DONE at `4c6829d`; LBC-008B Remote DONE at `3ce264c`.
- At the time of this reconciliation, LBC-008C was Future / Suggested; it was later promoted to READY on 2026-09-30 under the Owner's authorization.
- Owner-referenced LBC-009 validation/readiness is BLOCKED because the original LBC-009 acceptance checklist was not found in the repository, so no criteria were invented. This is distinct from LBC-009A manual deploy readiness, which remains Future / Suggested.
- `docs/ops/backlog.md` is designated the canonical operational backlog; root `backlog.md` is its synchronized entry-point mirror. Status, handoff, roadmap, and current objective now carry the same task state.
- LBC-008C became the current READY unit; no new sprint was opened.

## 2026-07-08 - LBC-008A READY Opening

Task:
LBC-008A - Polish responsive demo UI.

Type:
UI / Angular Frontend.

Decision:
- Ricardo directed to open LBC-008A as READY after backlog planning.
- LBC-001 through LBC-007C are Remote DONE, latest commit `b713885`.
- LBC-008A is the only READY task.
- LBC-008B, LBC-008C, and LBC-009A remain Future/Suggested.

Authorized scope:
- `apps/web/src/app/app.html`
- `apps/web/src/app/app.ts` only for presentation labels/state helpers
- `apps/web/src/styles.css` if present and already used
- Update operational documentation (STATUS.md, backlog.md, docs/ops/status.md, docs/ops/backlog.md, docs/ops/execution-log.md, docs/ops/session-handoff.md)

Blocked scope:
- No API changes, no Prisma changes, no seed/migration changes
- No package/lock changes, no dependencies added
- No deploy, no auth changes, no backend features
- No commit or push without Ricardo authorization

Actions completed:
- Updated `STATUS.md` to mark LBC-008A as READY.
- Updated `backlog.md` to move LBC-008A to READY section.
- Updated `docs/ops/status.md` to reflect LBC-008A READY.
- Updated `docs/ops/backlog.md` to move LBC-008A to READY section.
- Updated `docs/ops/session-handoff.md` to reflect LBC-008A as active READY task.
- Updated this execution log.

## 2026-07-08 - Post-LBC-007C Execution Backlog Planning

Task:
Post-LBC-007C Execution Backlog Planning.

Type:
DOCS / Planning.

Decision:
- Ricardo directed to create post-LBC-007C execution backlog without implementing code yet.
- LBC-001 through LBC-007C are Remote DONE, latest commit `b713885`.
- Planned sequential tasks, no multiple READY tasks allowed.

Planned post-LBC-007C sequence:
1. LBC-008A - Polish responsive demo UI (UI only, no backend changes)
2. LBC-008B - Harden booking flow UX (UI only, no backend changes)
3. LBC-008C - README and portfolio demo evidence (docs only)
4. LBC-009A - Manual deploy readiness discussion (docs only)

Product direction:
- Make the app functional, visually solid, responsive on mobile.
- Document with a good README.
- Later manual deploy for testing (no deploy yet).
- No Prisma/database changes yet.

Actions completed:
- Updated `STATUS.md`.
- Updated `backlog.md`.
- Updated `docs/ops/status.md`.
- Updated `docs/ops/backlog.md`.
- Updated `docs/ops/session-handoff.md`.
- Updated this execution log.

Blocked scope:
- No app code changes, no API changes, no Prisma changes.
- No package/lock changes, no dependencies added.
- No deploy, no commit, no push.

## 2026-07-08 - LBC-007C Smoke Test Execution

Task:
LBC-007C - Validate Demo Presets and Record Demo Smoke Evidence.

Type:
DOCS / EVIDENCE.

Decision:
- Ricardo authorized executing LBC-007C smoke test.
- Repository was clean at commit `fa803b378c3ecb4399e36f98f9305190d8e3f69c`.
- HEAD matched origin/main.
- LBC-007B was confirmed Remote DONE at `9009aa5`.
- LBC-007C was the single active READY task.
- No code changes were allowed during smoke test.

Environment setup:
- Started local PostgreSQL container `lbc-postgres-smoke` (stopped container was restarted).
- API server started with `DATABASE_URL=postgresql://user:password@127.0.0.1:55432/lbc_dev`.
- Angular web server started at `http://127.0.0.1:4200`.

Health checks:
- API health endpoint `GET http://127.0.0.1:3000/health` returned `{"status":"ok","service":"lbc-api"}`.
- Proxy health endpoint `GET http://127.0.0.1:4200/api/health` returned `{"status":"ok","service":"lbc-api"}`.

Smoke flow executed:
1. Opened Angular web app at `http://127.0.0.1:4200`.
2. Confirmed Development Presets button was visible and pre-filled the form with:
   - Laundry Room ID: `11111111-1111-4111-8111-111111111111`
   - Resident ID: `22222222-2222-4222-8222-222222222222`
3. Changed date to `2026-07-09` (tomorrow, within booking window).
4. Clicked "Check Availability" - confirmed availability slots were loaded (all available since no bookings existed for that date).
5. Clicked "Book slot 00:00 to 02:00" - confirmed booking was created successfully.
6. Verified bookings list showed the new booking as Active (00:00–02:00).
7. Clicked "Cancel booking at 00:00" - confirmed booking was canceled successfully.
8. Verified bookings list showed the booking as Canceled, and availability slot was back to Available.

Evidence collected:
- Screenshots:
  - `page-2026-07-08T15-40-05-334Z.png` - initial app load
  - `page-2026-07-08T15-43-21-694Z.png` - booking active
  - `page-2026-07-08T15-43-46-392Z.png` - booking canceled
- Git status confirmed no forbidden files modified.
- No errors occurred during smoke test.

Validation completed:
- `git status --short --untracked-files=all` showed no changes to forbidden files.
- `git diff --check` completed without whitespace errors.

Blocked scope respected:
- No changes to `apps/web/*`, `apps/api/*`, `prisma/*`, `package.json`, lockfiles, Docker files, seed, migrations, dependencies, deploy, or auth.
- No new READY task opened.
- No commit or push.

## 2026-06-12 - LBC-007C READY Opening

Task:
LBC-007C - Validate Demo Presets and Record Demo Smoke Evidence.

Type:
DOCS / EVIDENCE.

Decision:
- Ricardo authorized opening LBC-007C as READY.
- LBC-007B is confirmed Remote DONE at commit `9009aa5`.
- LBC-007C becomes the single active READY task.
- LBC-007C is documentation/evidence only.
- Product code, backend code, persistence code, dependencies, migrations, seed, Docker, deploy, auth, commit, and push are not authorized in this opening.

Smoke target documented:
- Start local PostgreSQL, API, and web if needed.
- Use Development Presets.
- Check availability.
- Create booking.
- List booking.
- Cancel booking.
- Confirm success, error, and empty states where possible.

Actions completed:
- Updated operational status and backlog files.
- Recorded LBC-007B as Remote DONE at `9009aa5`.
- Opened LBC-007C as READY.
- Recorded LBC-007C as documentation/evidence only.
- Recorded smoke target and blocked scope.

Blocked scope:
- `apps/web`, `apps/api`, `prisma`, `package.json`, lockfiles, migrations, seed, Docker, dependencies, deploy, UI changes, backend changes, auth, new READY task besides LBC-007C, commit, and push.

Evidence status:
- Pending final git status and diff evidence for Ricardo review.

## 2026-05-22 - LBC-007B READY Promotion

Task:
LBC-007B - Implement Angular UI Development Presets.

Type:
DOCS / READY PROMOTION.

Decision:
- Ricardo authorized only the documentation promotion of LBC-007B to READY.
- LBC-007A is confirmed Remote DONE at commit `b0c5d06`.
- LBC-007B becomes the single active READY task.
- Angular UI implementation is not authorized in this task.
- Implementation may start only after this READY promotion is reviewed, committed, pushed, and origin synchronization is verified.

Future implementation scope documented:
- Add hardcoded development/demo presets in the Angular UI.
- Use Laundry Room A `11111111-1111-4111-8111-111111111111`.
- Use Development Resident `22222222-2222-4222-8222-222222222222`.
- Allow the existing UI controls to fill `residentId` and `laundryRoomId`.
- Preserve check availability -> book -> list -> cancel.
- Do not alter API, Prisma, seed, dependencies, migrations, or runtime configuration.

Actions completed:
- Updated operational status and backlog files.
- Recorded LBC-007A as Remote DONE at `b0c5d06`.
- Promoted LBC-007B to READY.
- Recorded that LBC-007B has not been implemented yet.

Blocked scope:
- `apps/web`, `apps/api`, `prisma`, `package.json`, `pnpm-lock.yaml`, `angular.json`, `tsconfig.json`, dependencies, migrations, seed, build/lint/typecheck, UI implementation, commit, and push.

Evidence status:
- Pending final git status and diff evidence for Ricardo review.

## 2026-05-20 - LBC-007A

Task:
LBC-007A - Define Product Roadmap and Current Sprint Objective.

Decision:
- Ricardo authorized LBC-007A as a documentation-only roadmap task.
- The project must now evolve through Product Roadmap -> Current Sprint Objective -> READY task -> Execution -> Review -> Commit -> Push.
- Official current sprint is SPR-01 - Product Demo Readiness.
- LBC-007B must remain FUTURE / SUGGESTED and not READY.

Actions completed:
- Created `docs/product/roadmap.md` with phases 0 through 4.
- Created `docs/ops/current-objective.md` with objective, allowed scope, non-goals, exit criteria, candidate tasks, and future tasks.
- Updated operational status, backlog, execution log, and session handoff.
- Kept LBC-007B as FUTURE / SUGGESTED only, not READY.

Validation completed:
- Raw git status and diff evidence collected for review.
- Required validation for this documentation-only task is `git diff --check`, completed without whitespace errors.

Blocked scope:
- Angular UI presets, `apps/web`, `apps/api`, `prisma`, package/config files, dependencies, migrations, seed, deploy, Docker, CI/CD, auth, admin, notifications, payments, and opening LBC-007B as READY.

## 2026-05-20 - LBC-006A

Task:
LBC-006A - Define Demo Data Presets Strategy.

Decision:
- Trigger authorized LBC-006A as the first task of SPR-01.
- Task is documentation-only to define the approach for reducing UUID friction.

Actions completed:
- Created `docs/architecture/demo-presets-strategy.md` defining the frontend-hardcoded preset approach.
- Updated operational documentation.

Validation completed:
- Git status and diff checked.
- No code or database files modified.

## 2026-05-20 - LBC-005C

Task:
LBC-005C - Record Local UI Smoke Evidence.

Decision:
- Trigger authorized LBC-005C as the only READY task.
- Task is documentation-only to formalize local smoke test results.

Actions completed:
- Formalized LBC-005B as Remote DONE at commit `ef37b8b`.
- Recorded local UI smoke test evidence:
  - API started with `DATABASE_URL` in PowerShell.
  - `GET /health` returned `{"status":"ok","service":"lbc-api"}`.
  - Angular UI served at `http://127.0.0.1:4200`.
  - Proxy `/api` verified functional.
  - Manual flow (availability, create, list, cancel) verified in browser.
  - No code or database changes during smoke test.
- Updated all authorized operational documentation files.

Validation completed:
- `git status` confirms only documentation files modified.
- `apps/web/angular.json` is clean.

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
