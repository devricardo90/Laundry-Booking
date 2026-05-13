# LBC Status

Project: LBC - Laundry Booking Condo

Current task: LBC-003A - Define booking domain model before implementation

Status: READY

Protocol state:
- Only one task is READY.
- LBC-001 is Remote DONE at commit `3d90251`.
- LBC-002A is Remote DONE at commit `d6b7673cc6be018308b2d8bf4d6220141e58f509`.
- LBC-002B is Remote DONE at commit `b577a40b61b016aef345d27e41cd8dcc9c9ff67a`.
- LBC-002C is Remote DONE at commit `93f32c7`.
- LBC-003A is READY.
- Minimum scaffold files have been created for `apps/web` and `apps/api`.
- Dependencies have been installed with pnpm and `pnpm-lock.yaml` has been created.
- No schema, migration, seed, or real database has been created.
- No Prisma schema, migration, seed, database connection, auth, booking rules, domain endpoints, or domain screens have been created.
- No deploy, CI, Docker, or `packages/shared` work is authorized.
- No commit or push has been made for LBC-003A.
- PostgreSQL is the approved primary database.
- MongoDB is outside the current decision.

Scope guard:
- Files authorized for LBC-003A are documentation and ops files only.
- Authorized product files: `docs/product/domain-model.md`, `docs/product/business-rules.md`, and `docs/product/mvp-scope.md`.
- Authorized ops files: `STATUS.md`, `backlog.md`, `docs/ops/status.md`, `docs/ops/backlog.md`, `docs/ops/execution-log.md`, and `docs/ops/session-handoff.md`.
- Runtime, dependency, Prisma, database, endpoint, Angular product UI, deploy, CI, Docker, and `packages/shared` changes are blocked.

Completion evidence checklist:
- Domain model document created.
- Resident/User, Admin, LaundryRoom, Booking, and BlockedSlot are documented.
- Conceptual fields for each entity are documented.
- Booking statuses are documented.
- Time conflict rules are documented.
- Cancellation rules are documented.
- MVP limits are documented.
- `git status --short --untracked-files=all`, `git diff --stat`, and `git diff --check` evidence presented.
- New files must be made diff-auditable with `git add -N` before commit authorization is requested.
- Local DONE must not be declared without evidence.
- Remote DONE must not be declared without push and origin synchronization verification.
