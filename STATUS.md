# LBC Status

Project: LBC - Laundry Booking Condo

Current task: LBC-004F - Implement Booking Cancellation API

Status: READY FOR TRIGGER REVIEW

Protocol state:
- LBC-004F is the active READY task and is an API-only implementation task.
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
- LBC-004F implements only `POST /bookings/:bookingId/cancel`.
- No Angular UI, admin panel, auth, migration, seed, Prisma generate, Prisma db push, deploy, Docker, CI, `packages/shared`, LBC-004G READY, or new READY task is authorized.
- LBC-004F implementation and required validation evidence are ready for Trigger review.
- No commit or push has been made for LBC-004F.

Scope guard:
- Files authorized for LBC-004F are `apps/api/src/bookings.ts`, `apps/api/src/server.ts` only if route registration is required, `apps/api/src/prisma.ts` only if a minimal adjustment is unavoidable, `STATUS.md`, `backlog.md`, `docs/ops/status.md`, `docs/ops/backlog.md`, `docs/ops/execution-log.md`, and `docs/ops/session-handoff.md`.
- LBC-004F must not change `apps/web`.
- LBC-004F must not use `PATCH /bookings/:bookingId` or create a generic status update endpoint.
- LBC-004F must not create migration, versioned seed, Prisma generate, Prisma db push, remote database, deploy, Docker, CI, auth, admin panel, Angular UI, `packages/shared`, LBC-004G READY, or any new READY task.
- Real `.env` files and real credentials must not be committed.

Completion evidence checklist:
- Initial repository guard evidence has been presented.
- `POST /bookings/:bookingId/cancel` is implemented in the API only.
- `bookingId` validation returns 400 for invalid UUID.
- Missing Booking returns 404.
- Booking with status other than ACTIVE returns 409.
- ACTIVE Booking that has already started or is in the past returns 409.
- Cancellation uses a short `prisma.$transaction`.
- Cancellation captures `now` once.
- Cancellation uses conditional `updateMany` with `id`, `status: ACTIVE`, and `startTime > now`.
- Successful cancellation sets `status` to `CANCELED` and fills `canceledAt`.
- Successful response returns `id`, `status`, `canceledAt`, and `timezone`.
- Booking is not deleted and remains historical.
- Required validation commands and local endpoint tests must pass before commit authorization.
- `pnpm lint`, `pnpm typecheck`, and `pnpm build` passed.
- Local endpoint tests proved `200`, `400`, `404`, `409` already CANCELED, `409` past/started ACTIVE Booking, and that a canceled Booking no longer blocks availability.
- Local DONE has not been declared.
- Remote DONE must not be declared without commit, push, and origin synchronization verification.
