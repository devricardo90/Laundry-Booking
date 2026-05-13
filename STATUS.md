# LBC Status

Project: LBC - Laundry Booking Condo

Current task: LBC-004B - Apply Dev Prisma Migration and Seed Minimal Availability Data

Status: READY FOR TRIGGER REVIEW

Protocol state:
- LBC-004B is the active task and is ready for Trigger review.
- LBC-001 is Remote DONE at commit `3d90251`.
- LBC-002A is Remote DONE at commit `d6b7673cc6be018308b2d8bf4d6220141e58f509`.
- LBC-002B is Remote DONE at commit `b577a40b61b016aef345d27e41cd8dcc9c9ff67a`.
- LBC-002C is Remote DONE at commit `93f32c7`.
- LBC-003A is Remote DONE at commit `fe1ac8c`.
- LBC-003B is Remote DONE at commit `c31ed8c`.
- LBC-003C is Remote DONE at commit `e5285f4`.
- LBC-004A is Remote DONE at commit `967a321`.
- LBC-004B is READY for Trigger review after local migration and seed.
- Minimum scaffold files have been created for `apps/web` and `apps/api`.
- Dependencies have been installed with pnpm and `pnpm-lock.yaml` has been created.
- Prisma tooling dependencies have been added locally for review.
- Prisma 7 configuration has been added locally for review.
- Prisma schema validation has passed.
- Local dev database `lbc_dev` was created after Trigger authorization.
- Local dev migration was applied.
- Prisma Client generation completed.
- Minimal development seed executed and verified.
- No database connection, auth, booking rules implementation, domain endpoints, or domain screens have been created.
- No deploy, CI, Docker, or `packages/shared` work is authorized.
- No commit or push has been made for LBC-004B.
- PostgreSQL is the approved primary database.
- MongoDB is outside the current decision.

Scope guard:
- Files authorized for LBC-004B include Prisma dependency metadata, Prisma config/schema adjustments, local migration/seed files if migration becomes possible, `.env.example`, and operational documentation.
- Runtime endpoint, API route/controller/service/repository, Angular product UI, auth, booking creation, production seed, production database, deploy, CI, Docker, `packages/shared`, and LBC-004C READY are blocked.
- `prisma db push` remains blocked.
- Real `.env` files and real credentials must not be committed.

Completion evidence checklist:
- Initial repository guard evidence has been presented.
- `prisma` has been added as a dev dependency.
- `@prisma/client` has been added as a dependency.
- Prisma 7 config/schema compatibility has been addressed.
- `.env.example` includes a fictitious local `DATABASE_URL` example.
- `prisma validate` has passed.
- `prisma migrate dev` completed for local/dev PostgreSQL.
- Prisma Client generation completed.
- Minimal development seed was executed.
- Seed output verified one LaundryRoom, one Resident, one Admin, one ACTIVE Booking, one CANCELED Booking, and one BlockedSlot.
- Local DONE has not been declared and requires Trigger authorization.
- Final diff evidence must be presented before any commit authorization.
- Remote DONE must not be declared without push and origin synchronization verification.
