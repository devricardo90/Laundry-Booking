# LBC Status

Project: LBC - Laundry Booking Condo

Current task: LBC-003C - Implement Prisma schema baseline

Status: READY

Protocol state:
- Only one task is READY.
- LBC-001 is Remote DONE at commit `3d90251`.
- LBC-002A is Remote DONE at commit `d6b7673cc6be018308b2d8bf4d6220141e58f509`.
- LBC-002B is Remote DONE at commit `b577a40b61b016aef345d27e41cd8dcc9c9ff67a`.
- LBC-002C is Remote DONE at commit `93f32c7`.
- LBC-003A is Remote DONE at commit `fe1ac8c`.
- LBC-003B is Remote DONE at commit `c31ed8c`.
- LBC-003C is READY.
- Minimum scaffold files have been created for `apps/web` and `apps/api`.
- Dependencies have been installed with pnpm and `pnpm-lock.yaml` has been created.
- Prisma schema baseline changes are being prepared for review.
- No migration, seed, or real database has been created.
- No database connection, auth, booking rules implementation, domain endpoints, or domain screens have been created.
- No deploy, CI, Docker, or `packages/shared` work is authorized.
- No commit or push has been made for LBC-003C.
- PostgreSQL is the approved primary database.
- MongoDB is outside the current decision.

Scope guard:
- Files authorized for LBC-003C are `prisma/schema.prisma` plus selected architecture, product, and ops documentation.
- Authorized Prisma file: `prisma/schema.prisma`.
- Authorized architecture file: `docs/architecture/persistence-model.md`.
- Authorized product files: `docs/product/business-rules.md` and `docs/product/domain-model.md`.
- Authorized ops files: `STATUS.md`, `backlog.md`, `docs/ops/status.md`, `docs/ops/backlog.md`, `docs/ops/execution-log.md`, and `docs/ops/session-handoff.md`.
- Runtime, dependency, migration, seed, real database, endpoint, Angular product UI, deploy, CI, Docker, and `packages/shared` changes are blocked.

Completion evidence checklist:
- Prisma schema baseline created.
- PostgreSQL datasource defined.
- Prisma Client generator defined.
- Resident, Admin, LaundryRoom, Booking, and BlockedSlot models defined.
- Minimum enums, relationships, foreign keys, timestamps, statuses, `startTime`, `endTime`, and `canceledAt` are defined.
- Prisma baseline limitations for overlap and race-condition protection are documented.
- `git status --short --untracked-files=all`, `git diff --stat`, and `git diff --check` evidence presented.
- New `prisma/schema.prisma` must be made diff-auditable with `git add -N` before commit authorization is requested.
- Prisma validation should be run only if the CLI is already locally available.
- Local DONE must not be declared without evidence.
- Remote DONE must not be declared without push and origin synchronization verification.
