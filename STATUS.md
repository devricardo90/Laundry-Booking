# LBC Status

Project: LBC - Laundry Booking Condo

Current task: LBC-005A - Minimal Angular Booking Flow

Status: READY FOR TRIGGER REVIEW

Protocol state:
- LBC-005A is the active READY task and is a minimal Angular UI implementation task.
- LBC-001 is Remote DONE at commit `3d90251`.
- LBC-002A is Remote DONE at commit `d6b7673cc6be018308b2d8bf4d6220141e58f509`.
- LBC-002B is Remote DONE at commit `b577a40b61b016aef345d27e41cd8dcc9c9ff67a`.
- LBC-002C is Remote DONE at commit `93f32c7`.
- LBC-003A is Remote DONE at commit `fe1ac8c`.
- LBC-003B is Remote DONE at commit `c31ed8c`.
- LBC-003C is Remote DONE at commit `e5285f4`.
- LBC-004A is Remote DONE at commit `967a321`.
- LBC-004B is Remote DONE at commit `7025936`.
- LBC-004C is Remote DONE at commit `9552c7b`.
- LBC-004D is Remote DONE at commit `f79f3dc`.
- LBC-004E is Remote DONE at commit `36263f6`.
- LBC-004F is Remote DONE at commit `1e76fb9`.
- LBC-004G is Remote DONE at commit `252c16e`.
- LBC-005A implements a minimal Angular UI for availability, booking creation, booking list, and booking cancellation.
- No auth, admin panel, login, permissions, store global, new dependencies, new READY task, commit without authorization, or push is authorized.
- LBC-005A implementation and required validation evidence are ready for Trigger review.
- No commit or push has been made for LBC-005A.

Scope guard:
- Files authorized for LBC-005A are `apps/web/angular.json`, `apps/web/proxy.conf.json`, `apps/web/src/app/app.config.ts`, `apps/web/src/app/app.ts`, `apps/web/src/app/app.html`, `apps/web/src/app/app.css`, `STATUS.md`, `backlog.md`, `docs/ops/status.md`, `docs/ops/backlog.md`, `docs/ops/execution-log.md`, and `docs/ops/session-handoff.md`.
- LBC-005A must not change `apps/api` except `apps/api/src/server.ts` only if `@fastify/cors` is already installed — it was not installed, so `apps/api` was not changed.
- LBC-005A must not install new dependencies, alter `package.json`, alter `pnpm-lock.yaml`, create migration, versioned seed, Prisma generate, Prisma db push, deploy, Docker, or CI.
- Real `.env` files and real credentials must not be committed.

Completion evidence checklist:
- Initial repository guard evidence has been presented.
- Angular proxy is configured via `apps/web/proxy.conf.json` and `apps/web/angular.json`.
- Angular dev server calls only relative `/api/*` URLs with no hardcoded backend host.
- `provideHttpClient()` is added to `app.config.ts`.
- Booking flow component is implemented with local signal state.
- UI supports laundryRoomId input, residentId input, date input, Consultar button, slot list, booking list, Reservar button per AVAILABLE slot, and Cancelar button per future ACTIVE booking.
- Loading, error, empty, and success states are implemented.
- `pnpm lint`, `pnpm typecheck`, and `pnpm build` passed.
- Angular dev server serves the app at `http://127.0.0.1:4200`.
- `/api/health` via proxy returned `{"status":"ok","service":"lbc-api"}`.
- Availability endpoint via proxy returned 12 slots with AVAILABLE and BOOKED statuses.
- Cancel booking via proxy returned `200 CANCELED`.
- Create booking via proxy returned `201 ACTIVE`.
- Bookings list via proxy returned updated list after changes.
- Error state: 409 conflict returned `{"message":"Resident already has a future ACTIVE booking"}`.
- Error state: 400 returned for invalid UUID and out-of-range date.
- `proxy.conf.json` audited via `git add -N` and visible in `git diff`.
- `git diff --check` showed no whitespace errors.
- No blocked file was altered.
- Local DONE has not been declared.
- Remote DONE must not be declared without commit, push, and origin synchronization verification.
