# Ops Backlog

## READY

### LBC-001 - Define MVP Scope and Business Rules

Status: READY

Type: Documentation / Product

Operational notes:
- This task may create or update only authorized documentation and ops files.
- This task must not create application code.
- This task must not install dependencies.
- This task must not scaffold Angular, Fastify, Prisma, migrations, or seed data.
- This task must not configure Tailwind.
- This task must not configure deploy.
- This task must not open LBC-002 as READY.
- This task must not be committed without explicit authorization.
- This task must not be pushed.
- This task may document the official stack decision in `docs/architecture/stack-decision.md`.

## BACKLOG

### LBC-002 - Project Scaffold

Status: BACKLOG

Expected future purpose:
- Initialize Angular frontend.
- Initialize Fastify backend.
- Add TypeScript project structure.
- Add Tailwind configuration.
- Add base tooling only after LBC-001 is approved.
- Must not start until after the Discussion Gate for LBC-002.

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
