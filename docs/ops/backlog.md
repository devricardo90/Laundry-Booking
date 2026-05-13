# Ops Backlog

## READY

### LBC-002A - Define Scaffold Plan and Version Matrix

Status: READY

Type: Documentation / Architecture

Operational notes:
- This task may create or update only authorized documentation and ops files.
- This task must not create application code.
- This task must not install dependencies.
- This task must not scaffold Angular, Fastify, Prisma, migrations, or seed data.
- This task must not configure Tailwind.
- This task must not configure deploy.
- This task must not open LBC-002B as READY.
- This task must not be committed without explicit authorization.
- This task must not be pushed.
- This task may create `docs/architecture/scaffold-plan.md`.
- This task may create `docs/architecture/version-matrix.md`.
- This task must stop after evidence and ask for Trigger authorization.

## BACKLOG

### LBC-002B - Project Scaffold

Status: BACKLOG

Expected future purpose:
- Initialize Angular frontend.
- Initialize Fastify backend.
- Add TypeScript project structure.
- Add Tailwind configuration.
- Add base tooling only after LBC-001 is approved.
- Must follow the LBC-002A decision after it is approved.
- Must not start during LBC-002A.

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
