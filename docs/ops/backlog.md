# Ops Backlog

## READY

### LBC-002C - Define API/Web local runtime and environment baseline

Status: READY

Type: Runtime / Developer Experience

Operational notes:
- This task may define root scripts for local web and API runtime.
- This task may set web local runtime to `127.0.0.1:4200`.
- This task may keep API local runtime on `127.0.0.1:3000` by default.
- This task may allow API `HOST` and `PORT` environment variables with safe defaults.
- This task may create `.env.example` without secrets.
- This task may create `docs/ops/local-runtime.md`.
- This task may keep `/health` as a technical healthcheck.
- This task may update authorized operational documentation.
- This task must not install new dependencies.
- This task must not run `pnpm approve-builds`.
- This task must not create `packages/shared`.
- This task must not create Prisma schema, migrations, seed, or database configuration.
- This task must not create auth, booking rules, conflict prevention, domain endpoints, or domain screens.
- This task must not configure deploy, CI, Docker, or E2E tests.
- This task must not open a new READY task.
- This task must not be committed without explicit authorization.
- This task must not be pushed.
- This task must present raw validation and diff evidence before commit authorization.

## BACKLOG

### LBC-003 - Persistence Model

Status: BACKLOG

Expected future purpose:
- Define Prisma schema.
- Model Resident, Administrator, LaundryRoom, Booking, and BlockedSlot.
- Add PostgreSQL constraints or transaction strategy for conflict prevention.

### LBC-004 - Booking Availability API

Status: BACKLOG

Expected future purpose:
- Expose availability for fixed 2-hour slots.
- Enforce ACTIVE, CANCELED, and BlockedSlot behavior.
