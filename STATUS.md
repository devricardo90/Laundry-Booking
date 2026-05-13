# LBC Status

Project: LBC - Laundry Booking Condo

Current task: LBC-002A - Define Scaffold Plan and Version Matrix

Status: READY

Protocol state:
- Only one task is READY.
- LBC-001 is Remote DONE at commit `3d90251`.
- LBC-002B is BACKLOG and not READY.
- No application code, dependencies, schema, migration, or seed has been created.
- No Tailwind configuration or deploy configuration has been created.
- No commit or push has been made.
- PostgreSQL is the approved primary database.
- MongoDB is outside the current decision.

Scope guard:
- Files authorized for LBC-002A are documentation and ops files only.
- Authorized architecture files: `docs/architecture/scaffold-plan.md` and `docs/architecture/version-matrix.md`.
- Authorized ops files: `STATUS.md`, `backlog.md`, `docs/ops/status.md`, `docs/ops/backlog.md`, `docs/ops/execution-log.md`, and `docs/ops/session-handoff.md`.
- Repository guard must be checked before changes: `pwd`, `git status --short --untracked-files=all`, `git status -sb`, `git log --oneline -3`, `git rev-parse HEAD`, and `git rev-parse origin/main`.

Completion evidence checklist:
- Proposed project structure documented.
- Monorepo decision documented.
- Node, Angular, TypeScript, Tailwind, Fastify, Zod, Prisma, and PostgreSQL versions documented.
- Package manager documented.
- Future validation commands documented.
- Scaffold limits documented.
- Out-of-scope items documented.
- LBC-002A DONE criteria documented.
- LBC-002B remains BACKLOG and not READY.
- Local DONE must not be declared without evidence.
- Remote DONE must not be declared without push and origin synchronization verification.
