# Ops Backlog

## READY

### LBC-002B - Project Scaffold

Status: READY

Type: Scaffold / Technical Foundation

Operational notes:
- This task may create a pnpm workspace.
- This task may create `apps/web` with an Angular shell.
- This task may configure Tailwind only in `apps/web`.
- This task may create `apps/api` with a Fastify TypeScript shell.
- This task may create minimal validation scripts.
- This task may update authorized operational documentation.
- This task must not create `packages/shared`.
- This task must not create Prisma schema, migrations, seed, or database configuration.
- This task must not create auth, booking rules, conflict prevention, domain endpoints, or domain screens.
- This task must not configure deploy, CI, Docker, or E2E tests.
- This task must not open LBC-002C as READY.
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
