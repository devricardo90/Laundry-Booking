# LBC Status

Project: LBC - Laundry Booking Condo

Current task: LBC-002B - Project Scaffold

Status: READY

Protocol state:
- Only one task is READY.
- LBC-001 is Remote DONE at commit `3d90251`.
- LBC-002A is Remote DONE at commit `d6b7673cc6be018308b2d8bf4d6220141e58f509`.
- LBC-002B is READY.
- Minimum scaffold files have been created for `apps/web` and `apps/api`.
- Dependencies have been installed with pnpm and `pnpm-lock.yaml` has been created.
- No schema, migration, seed, or real database has been created.
- No Prisma schema, migration, seed, database connection, auth, booking rules, domain endpoints, or domain screens have been created.
- No deploy, CI, Docker, or `packages/shared` work is authorized.
- No commit or push has been made for LBC-002B.
- PostgreSQL is the approved primary database.
- MongoDB is outside the current decision.

Scope guard:
- Files authorized for LBC-002B are limited to the approved scaffold and ops documentation.
- Authorized root files: `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, and `.gitignore`.
- Authorized app files: `apps/web/**` and `apps/api/**`.
- Authorized ops files: `STATUS.md`, `backlog.md`, `docs/ops/status.md`, `docs/ops/backlog.md`, `docs/ops/execution-log.md`, and `docs/ops/session-handoff.md`.
- Blocked paths: `packages/**`, `prisma/**`, `docker/**`, `.github/**`, `.env`, `.env.local`, and `.env.example`.

Completion evidence checklist:
- pnpm workspace created.
- Angular shell created under `apps/web`.
- Fastify TypeScript shell created under `apps/api`.
- Tailwind configured only under `apps/web`.
- Minimal validation scripts created.
- Operational documents updated.
- `pnpm install` evidence presented.
- `pnpm lint` evidence presented.
- `pnpm typecheck` evidence presented.
- `pnpm build` evidence presented.
- `pnpm --filter web build` evidence presented.
- `pnpm --filter api build` evidence presented.
- `git status --short --untracked-files=all`, `git diff --stat`, and `git diff --check` evidence presented.
- New files must be made diff-auditable with `git add -N` before commit authorization is requested.
- Local DONE must not be declared without evidence.
- Remote DONE must not be declared without push and origin synchronization verification.
