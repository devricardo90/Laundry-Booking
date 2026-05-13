# LBC Backlog

## READY

### LBC-003A - Define booking domain model before implementation

Type: Documentation / Domain Modeling

Goal:
Define the minimum conceptual booking domain model before any technical persistence or API implementation.

Acceptance:
- Domain model documentation is created or updated.
- Resident/User is documented with conceptual fields.
- Admin is documented with conceptual fields.
- LaundryRoom is documented with conceptual fields.
- Booking is documented with conceptual fields.
- BlockedSlot is documented with conceptual fields.
- Booking statuses are documented.
- Minimum time conflict rules are documented.
- Minimum cancellation rules are documented.
- MVP limits are documented.
- Prisma schema, migrations, seed, real database, endpoints, controllers, services, repositories, Angular product screens, runtime changes, dependency changes, deploy, CI, Docker, and `packages/shared` remain outside scope.
- Required raw evidence is presented before any commit request.

## BACKLOG

### LBC-003B - Persistence Model and Conflict Constraints

Status: BACKLOG

Notes:
- Expected future scope: Prisma schema and database-level protection against conflicting bookings or blocked slots.
