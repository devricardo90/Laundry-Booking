# Ops Backlog

## READY

### LBC-003B - Define persistence model and conflict constraint strategy

Status: READY

Type: Documentation / Architecture

Operational notes:
- This task may create persistence model documentation.
- This task may document future tables for Resident/User, Admin, LaundryRoom, Booking, and BlockedSlot.
- This task may document expected technical fields, relationships, and indexes.
- This task may document PostgreSQL conflict-prevention strategy.
- This task may document race condition risk and future implementation boundaries.
- This task may update authorized operational documentation.
- This task must not install new dependencies.
- This task must not run `pnpm approve-builds`.
- This task must not create `packages/shared`.
- This task must not create Prisma schema, migrations, seed, database configuration, or `DATABASE_URL` changes.
- This task must not create endpoints, controllers, services, repositories, or Angular product screens.
- This task must not change runtime scripts or healthcheck implementation.
- This task must not configure deploy, CI, Docker, or E2E tests.
- This task must not open a new READY task.
- This task must not be committed without explicit authorization.
- This task must not be pushed.
- This task must present raw validation and diff evidence before commit authorization.

## BACKLOG

### LBC-003C - Persistence Implementation

Status: BACKLOG

Expected future purpose:
- Define Prisma schema after LBC-003B is approved.
- Model Resident, Administrator, LaundryRoom, Booking, and BlockedSlot.
- Add PostgreSQL constraints or transaction strategy for conflict prevention.

### LBC-004 - Booking Availability API

Status: BACKLOG

Expected future purpose:
- Expose availability for fixed 2-hour slots.
- Enforce ACTIVE, CANCELED, and BlockedSlot behavior.
