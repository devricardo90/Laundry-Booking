# LBC Status

Project: LBC - Laundry Booking Condo

Current task: LBC-004C - Implement Availability API Read Endpoint

Status: READY FOR TRIGGER REVIEW

Protocol state:
- LBC-004C is the active task and is ready for Trigger review.
- LBC-001 is Remote DONE at commit `3d90251`.
- LBC-002A is Remote DONE at commit `d6b7673cc6be018308b2d8bf4d6220141e58f509`.
- LBC-002B is Remote DONE at commit `b577a40b61b016aef345d27e41cd8dcc9c9ff67a`.
- LBC-002C is Remote DONE at commit `93f32c7`.
- LBC-003A is Remote DONE at commit `fe1ac8c`.
- LBC-003B is Remote DONE at commit `c31ed8c`.
- LBC-003C is Remote DONE at commit `e5285f4`.
- LBC-004A is Remote DONE at commit `967a321`.
- LBC-004B is Remote DONE at commit `7025936`.
- LBC-004C is READY for Trigger review after implementing the read-only Availability API endpoint.
- Minimum scaffold files have been created for `apps/web` and `apps/api`.
- Dependencies have been installed with pnpm and `pnpm-lock.yaml` has been created.
- Prisma tooling dependencies, Prisma 7 configuration, local dev migration, and minimal dev seed are versioned.
- The API package now uses Prisma Client with the Prisma 7 PostgreSQL adapter for local development.
- Prisma schema validation has passed.
- Local dev database `lbc_dev` was created after Trigger authorization.
- Local dev migration was applied.
- Prisma Client generation completed.
- Minimal development seed executed and verified.
- The read-only availability endpoint has been implemented for Trigger review.
- No booking creation, booking cancellation, auth, Angular product UI, admin panel, mutation endpoint, deploy, CI, Docker, or `packages/shared` work has been created.
- No deploy, CI, Docker, or `packages/shared` work is authorized.
- No commit or push has been made for LBC-004C.
- PostgreSQL is the approved primary database.
- MongoDB is outside the current decision.

Scope guard:
- Files authorized for LBC-004C include the Fastify server entry, small Prisma helper, availability route module, API dependency metadata if required, root lockfile if dependencies change, and operational documentation.
- Booking creation, booking cancellation, auth, Angular product UI, admin panel, mutation endpoints, new migration, new seed, `prisma db push`, Docker, deploy, CI, `packages/shared`, and any new READY task are blocked.
- Real `.env` files and real credentials must not be committed.

Completion evidence checklist:
- Initial repository guard evidence has been presented.
- Read-only route `GET /laundry-rooms/:laundryRoomId/availability?date=YYYY-MM-DD` has been implemented without `/api` prefix.
- Request validation covers UUID, required strict `YYYY-MM-DD`, and the 14-day read window in `Europe/Stockholm`.
- Domain validation returns 404 for missing LaundryRoom.
- Availability evaluation handles ACTIVE bookings, ignores CANCELED bookings, applies BlockedSlots, and uses `BLOCKED > BOOKED > AVAILABLE`.
- Local endpoint validation proved 200, 400, and 404 behavior against the existing dev seed.
- `pnpm lint`, `pnpm typecheck`, and `pnpm build` passed.
- Local DONE has not been declared and requires Trigger authorization.
- Final diff evidence must be presented before any commit authorization.
- Remote DONE must not be declared without push and origin synchronization verification.
