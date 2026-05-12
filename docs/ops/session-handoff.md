# Session Handoff

Project: LBC - Laundry Booking Condo

Active task:
LBC-001 - Define MVP Scope and Business Rules.

Current state:
- Repository has been initialized.
- MVP scope and business rules are documented.
- Official stack decision is documented in `docs/architecture/stack-decision.md`.
- Operational status and backlog files are documented.
- LBC-002 remains BACKLOG and is not READY.
- No commit has been made.
- No push has been made.

Key product decisions:
- The primary user is the condominium resident.
- The administrator is the secondary operational user.
- Slots are fixed at 2 hours.
- Bookings are allowed only for the next 14 days.
- A resident can have at most one future ACTIVE booking.
- ACTIVE bookings block availability.
- CANCELED bookings do not block availability.
- BlockedSlots block availability.
- Availability and conflicts are scoped to the same laundry room.
- Bookings in different laundry rooms may occur at the same time.
- Times are stored in UTC.
- Times are displayed in operational timezone `Europe/Stockholm`, unless changed later.
- PostgreSQL is the primary database.

Approved stack:
- Angular + TypeScript + Tailwind for frontend.
- Fastify + TypeScript for backend.
- Zod for validation.
- Prisma for ORM.
- PostgreSQL for database.

Next protocol step:
- Present status and diff evidence.
- Await Trigger approval.
- Do not commit until explicitly authorized.
- Do not push.
- Do not declare Local DONE without evidence.
- Do not declare Remote DONE without push and origin synchronization verification.

Scope note:
- `docs/architecture/stack-decision.md` is now inside the authorized LBC-001 scope.
