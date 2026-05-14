# LBC Status

Project: LBC - Laundry Booking Condo

Current task: LBC-004E - Implement Booking Creation Endpoint

Status: LOCAL DONE

Protocol state:
- LBC-004E is the active READY task and is an API-only implementation task.
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
- LBC-004E implements only `POST /bookings` following `docs/architecture/booking-creation-contract.md`.
- No Angular UI, admin panel, auth, cancellation, migration, seed, Prisma generate, Prisma db push, deploy, Docker, CI, `packages/shared`, LBC-004F READY, or new READY task is authorized.
- LBC-004E is Local DONE after Trigger technical approval.
- Trigger technical approval for LBC-004E has been recorded.
- Commit is authorized after Trigger technical approval; no push has been made for LBC-004E.

Scope guard:
- Files authorized for LBC-004E are `apps/api/src/server.ts`, `apps/api/src/bookings.ts` or equivalent, `apps/api/src/prisma.ts` only if a minimal adjustment is required, `apps/api/package.json` and `pnpm-lock.yaml` only if a dependency is unavoidable, `STATUS.md`, `backlog.md`, `docs/ops/status.md`, `docs/ops/backlog.md`, `docs/ops/execution-log.md`, and `docs/ops/session-handoff.md`.
- LBC-004E must not change `apps/web`.
- LBC-004E must not create migration, seed, Prisma generate, Prisma db push, remote database, deploy, Docker, CI, auth, cancellation, admin panel, Angular UI, `packages/shared`, LBC-004F READY, or any new READY task.
- Real `.env` files and real credentials must not be committed.

Completion evidence checklist:
- Initial repository guard evidence has been presented.
- `POST /bookings` is implemented in the API only.
- Request body validation covers `residentId`, `laundryRoomId`, `date`, and `slotStart`.
- Domain validation covers Resident existence/status, LaundryRoom existence/status, 14-day window, past slots, fixed 2-hour grid, ACTIVE Booking overlap, BlockedSlot overlap, and one future ACTIVE Booking per Resident.
- Booking creation uses `prisma.$transaction`.
- Booking creation acquires PostgreSQL transaction advisory locks for Resident and LaundryRoom.
- Resident and LaundryRoom locks use separate namespaces.
- Locks are acquired in fixed order: Resident first, LaundryRoom second.
- Booking is created only after all validations pass.
- Required validation commands and local endpoint tests must pass before commit authorization.
- `pnpm lint`, `pnpm typecheck`, and `pnpm build` passed.
- Local endpoint tests proved `201`, `400`, `404`, `409` active booking conflict, `409` resident future ACTIVE booking, `409` BlockedSlot, and CANCELED nonblocking behavior.
- Local DONE has been declared after Trigger technical approval.
- Remote DONE must not be declared without commit, push, and origin synchronization verification.
