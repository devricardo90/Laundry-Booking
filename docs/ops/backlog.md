# Ops Backlog

## READY

### LBC-003A - Define booking domain model before implementation

Status: READY

Type: Documentation / Domain Modeling

Operational notes:
- This task may create or update domain model documentation.
- This task may document Resident/User, Admin, LaundryRoom, Booking, and BlockedSlot.
- This task may document conceptual fields for each entity.
- This task may document booking statuses.
- This task may document conflict and cancellation rules.
- This task may document MVP limits.
- This task may update authorized operational documentation.
- This task must not install new dependencies.
- This task must not run `pnpm approve-builds`.
- This task must not create `packages/shared`.
- This task must not create Prisma schema, migrations, seed, or database configuration.
- This task must not create endpoints, controllers, services, repositories, or Angular product screens.
- This task must not change runtime scripts or healthcheck implementation.
- This task must not configure deploy, CI, Docker, or E2E tests.
- This task must not open a new READY task.
- This task must not be committed without explicit authorization.
- This task must not be pushed.
- This task must present raw validation and diff evidence before commit authorization.

## BACKLOG

### LBC-003B - Persistence Model

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
