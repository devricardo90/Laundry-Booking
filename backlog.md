# LBC Backlog

## READY

### LBC-002B - Project Scaffold

Type: Scaffold / Technical Foundation

Goal:
Create the minimum technical monorepo scaffold for the approved Angular web app and Fastify API.

Acceptance:
- pnpm workspace is created.
- Root `package.json`, `pnpm-workspace.yaml`, `pnpm-lock.yaml`, and `.gitignore` are created or updated as needed.
- `apps/web` contains an Angular shell.
- Tailwind is configured only for `apps/web`.
- `apps/api` contains a Fastify TypeScript shell.
- Minimal validation scripts exist for install, lint, typecheck, build, web build, and api build.
- No `packages/shared` package is created.
- Prisma, schema, migrations, seed, real database, auth, booking rules, conflict prevention, domain endpoints, domain screens, deploy, CI, Docker, and LBC-002C remain outside scope.
- Required raw evidence is presented before any commit request.

## BACKLOG

### LBC-003 - Data Model and Conflict Constraints

Status: BACKLOG

Notes:
- Expected future scope: Prisma schema and database-level protection against conflicting bookings or blocked slots.
