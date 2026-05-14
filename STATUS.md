# LBC Status

Project: LBC - Laundry Booking Condo

Current task: LBC-004G - Booking Read/List API

Status: READY FOR TRIGGER REVIEW

Protocol state:
- LBC-004G is the active READY task and is an API-only read endpoint implementation task.
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
- LBC-004G implements only `GET /bookings`.
- No Angular UI, admin panel, auth, login, permissions, migration, seed, Prisma generate, Prisma db push, deploy, Docker, CI, `packages/shared`, LBC-004H READY, or new READY task is authorized.
- LBC-004G implementation and required validation evidence are ready for Trigger review.
- No commit or push has been made for LBC-004G.

Scope guard:
- Files authorized for LBC-004G are `apps/api/src/bookings.ts`, `apps/api/src/server.ts` only if required, `STATUS.md`, `backlog.md`, `docs/ops/status.md`, `docs/ops/backlog.md`, `docs/ops/execution-log.md`, and `docs/ops/session-handoff.md`.
- LBC-004G must not change `apps/web`.
- LBC-004G must not mutate, delete, cancel, or create bookings.
- LBC-004G must not create migration, versioned seed, Prisma generate, Prisma db push, remote database, deploy, Docker, CI, auth, login, permissions, admin panel, Angular UI, `packages/shared`, LBC-004H READY, or any new READY task.
- Real `.env` files and real credentials must not be committed.

Completion evidence checklist:
- Initial repository guard evidence has been presented.
- `GET /bookings` is implemented in the API only.
- Optional filters are limited to `laundryRoomId`, `date=YYYY-MM-DD`, and `status=ACTIVE|CANCELED`.
- `date=YYYY-MM-DD` is interpreted in `Europe/Stockholm`.
- Response items include `id`, `laundryRoomId`, `residentName`, `startTime`, `endTime`, `status`, `canceledAt`, and `timezone`.
- Root response includes `timezone`.
- CANCELED bookings remain visible when the filter allows them.
- Invalid UUID, date, or status returns 400.
- No booking data is mutated by the read endpoint.
- Required validation commands and local endpoint tests must pass before commit authorization.
- `pnpm lint`, `pnpm typecheck`, and `pnpm build` passed.
- Local endpoint tests proved unfiltered listing, `laundryRoomId`, `date`, `status=ACTIVE`, `status=CANCELED`, invalid UUID 400, invalid date 400, and invalid status 400.
- Local DONE has not been declared.
- Remote DONE must not be declared without commit, push, and origin synchronization verification.
