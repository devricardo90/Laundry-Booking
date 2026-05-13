# LBC Backlog

## READY

### LBC-002C - Define API/Web local runtime and environment baseline

Type: Runtime / Developer Experience

Goal:
Define official local runtime scripts, ports, environment defaults, and documentation for the scaffolded web and API apps.

Acceptance:
- Root scripts exist for running web, API, and both together locally.
- Web local runtime uses port `4200`.
- API local runtime uses default port `3000`.
- API reads `HOST` and `PORT` from environment variables with safe defaults.
- `.env.example` exists and contains no secrets.
- `docs/ops/local-runtime.md` documents the official local runtime.
- `/health` remains a technical healthcheck only.
- No new dependencies are installed.
- No `packages/shared` package is created.
- Prisma, schema, migrations, seed, real database, auth, booking rules, conflict prevention, domain endpoints, domain screens, deploy, CI, Docker, and new READY tasks remain outside scope.
- Required raw evidence is presented before any commit request.

## BACKLOG

### LBC-003 - Data Model and Conflict Constraints

Status: BACKLOG

Notes:
- Expected future scope: Prisma schema and database-level protection against conflicting bookings or blocked slots.
