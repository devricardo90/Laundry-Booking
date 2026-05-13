# Execution Log

## 2026-05-13 - LBC-002C

Task:
LBC-002C - Define API/Web local runtime and environment baseline.

Decision:
- Trigger promoted LBC-002C to READY with local runtime baseline scope.

Authorized scope:
- Define official local scripts for web and API.
- Use web port `4200` and API port `3000`.
- Read API `HOST` and `PORT` from environment variables with safe defaults.
- Create `.env.example` without secrets.
- Create `docs/ops/local-runtime.md`.
- Keep `/health` technical only.
- Run `pnpm lint`, `pnpm typecheck`, and `pnpm build`.

Blocked scope:
- New dependencies.
- `pnpm approve-builds`.
- `packages/shared`.
- Prisma, schema, migrations, seed, and real database.
- Auth, booking rules, conflict prevention, product endpoints, and product screens.
- Deploy, CI, Docker, and new READY tasks.

Evidence status:
- Pending validation evidence, diff evidence, `git add -N` for new files, and Trigger authorization before commit.

## 2026-05-13 - LBC-002B

Task:
LBC-002B - Project Scaffold.

Decision:
- Trigger promoted LBC-002B to READY with reduced and controlled scaffold scope.

Authorized scope:
- Create pnpm workspace.
- Create `apps/web` with Angular shell.
- Configure Tailwind only in `apps/web`.
- Create `apps/api` with Fastify TypeScript shell.
- Create minimal validation scripts.
- Update operational documentation.

Blocked scope:
- `packages/shared`.
- Prisma, schema, migrations, seed, and real database.
- Auth, booking rules, conflict prevention, domain endpoints, and domain screens.
- Deploy, CI, Docker, E2E tests, and opening LBC-002C.

Evidence status:
- `pnpm install` passed.
- `pnpm lint` passed after formatting the Angular shell files with Prettier.
- `pnpm typecheck` passed.
- `pnpm build` passed.
- `pnpm --filter web build` passed.
- `pnpm --filter api build` passed.
- Pending final git status, diff evidence, `git add -N` for new files, and Trigger authorization before commit.

Actions:
- Created root pnpm workspace files.
- Created Angular shell under `apps/web`.
- Configured Tailwind CSS only under `apps/web`.
- Created Fastify TypeScript shell under `apps/api`.
- Created minimal validation scripts.
- Did not create `packages/shared`.
- Did not create Prisma schema, migrations, seed, or database configuration.
- Did not create auth, booking rules, conflict prevention, domain endpoints, or domain screens.
- Did not configure deploy, CI, Docker, or E2E tests.
- Did not open LBC-002C.

## 2026-05-13 - LBC-002A

Task:
LBC-002A - Define Scaffold Plan and Version Matrix.

Pre-change repository guard:
- `pwd` was run.
- `git status --short --untracked-files=all` was run.
- `git status -sb` was run and showed `main...origin/main`.
- `git log --oneline -3` was run and showed `3d90251 docs: define LBC MVP scope and business rules`.
- `git rev-parse HEAD` returned `3d90251f844641e2df5d8e4f00942cd5d88e299c`.
- `git rev-parse origin/main` returned `3d90251f844641e2df5d8e4f00942cd5d88e299c`.

Actions:
- Created `docs/architecture/scaffold-plan.md`.
- Created `docs/architecture/version-matrix.md`.
- Updated status, backlog, ops status, ops backlog, execution log, and session handoff for LBC-002A.
- Documented the future scaffold as a simple monorepo.
- Documented pnpm as the future package manager.
- Documented future validation commands for the scaffold task.
- Documented scaffold limits and out-of-scope items.
- Kept LBC-002B in BACKLOG and not READY.
- Did not install dependencies.
- Did not create Angular, Fastify, Prisma schema, migration, seed, tests, endpoints, screens, or application code.
- Did not change README.
- Did not commit or push.
- Did not declare Local DONE or Remote DONE.

Evidence status:
- Pending final diff evidence and Trigger authorization.

## 2026-05-12 - LBC-001

Task:
LBC-001 - Define MVP Scope and Business Rules.

Actions:
- Confirmed the working directory was empty and not yet a Git repository.
- Initialized a Git repository for the project.
- Created documentation files for MVP scope, business rules, operational status, backlog, execution log, and session handoff.
- Kept LBC-002 in BACKLOG.
- Did not create application code.
- Did not install dependencies.
- Did not create Angular, Fastify, Prisma schema, migration, or seed files.
- Did not create `docs/architecture/stack-decision.md` because it is outside the authorized LBC-001 file list.
- Did not commit changes.

Evidence status:
- `git status --short --untracked-files=all` was run and listed the new documentation files as untracked.
- `git diff --stat` was run and returned no file stats because the created files remain untracked.
- `git diff --check` was run and returned no issues.
- `git add -N` was attempted only to make untracked files visible to `git diff`, but it was not completed because Git index access was blocked in the sandbox context.
- No commit was made.

## 2026-05-12 - LBC-001 Scope Correction

Task update:
The authorized LBC-001 scope was expanded to include `docs/architecture/stack-decision.md`.

Pre-change repository guard:
- `pwd` confirmed the current directory as `C:\Users\ricardodev\Desktop\Laundry-Booking`.
- `.git` was confirmed present.
- `git branch --show-current` returned `main`.
- `git status --short --untracked-files=all` showed only the LBC-001 documentation files as untracked.

Actions:
- Added the official stack decision document.
- Updated product scope with formal conflict logic, timezone policy, and official stack decision.
- Updated business rules with the formal overlap condition.
- Updated ops files to reflect the expanded authorized scope.
- Kept LBC-002 in BACKLOG.
- Did not create application code.
- Did not install dependencies.
- Did not create Angular, Fastify, Prisma schema, migration, or seed files.
- Did not configure Tailwind or deploy.
- Did not commit or push.
