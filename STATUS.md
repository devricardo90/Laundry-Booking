# LBC Status

Project: LBC - Laundry Booking Condo

Current task: LBC-002C - Define API/Web local runtime and environment baseline

Status: READY

Protocol state:
- Only one task is READY.
- LBC-001 is Remote DONE at commit `3d90251`.
- LBC-002A is Remote DONE at commit `d6b7673cc6be018308b2d8bf4d6220141e58f509`.
- LBC-002B is Remote DONE at commit `b577a40b61b016aef345d27e41cd8dcc9c9ff67a`.
- LBC-002C is READY.
- Minimum scaffold files have been created for `apps/web` and `apps/api`.
- Dependencies have been installed with pnpm and `pnpm-lock.yaml` has been created.
- No schema, migration, seed, or real database has been created.
- No Prisma schema, migration, seed, database connection, auth, booking rules, domain endpoints, or domain screens have been created.
- No deploy, CI, Docker, or `packages/shared` work is authorized.
- No commit or push has been made for LBC-002C.
- PostgreSQL is the approved primary database.
- MongoDB is outside the current decision.

Scope guard:
- Files authorized for LBC-002C are limited to local runtime baseline and ops documentation.
- Authorized root files: `package.json` and `.env.example`.
- Authorized app files: `apps/web/package.json`, `apps/api/package.json`, and `apps/api/src/server.ts`.
- Authorized docs files: `docs/ops/local-runtime.md`, `STATUS.md`, `backlog.md`, `docs/ops/status.md`, `docs/ops/backlog.md`, `docs/ops/execution-log.md`, and `docs/ops/session-handoff.md`.
- Blocked paths: `packages/**`, `prisma/**`, `docker/**`, `.github/**`, `.env`, and `.env.local`.

Completion evidence checklist:
- Official local web script documented and configured.
- Official local API script documented and configured.
- Web port is fixed to `4200`.
- API default port is `3000`.
- API `HOST` and `PORT` are read from environment variables with safe local defaults.
- `.env.example` exists without secrets.
- `docs/ops/local-runtime.md` documents local runtime.
- `/health` remains a technical endpoint only.
- `pnpm lint` evidence presented.
- `pnpm typecheck` evidence presented.
- `pnpm build` evidence presented.
- `git status --short --untracked-files=all`, `git diff --stat`, and `git diff --check` evidence presented.
- New files must be made diff-auditable with `git add -N` before commit authorization is requested.
- Local DONE must not be declared without evidence.
- Remote DONE must not be declared without push and origin synchronization verification.
