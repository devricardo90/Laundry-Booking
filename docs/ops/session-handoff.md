# Session Handoff

Project: LBC - Laundry Booking Condo

Active task:
LBC-002A - Define Scaffold Plan and Version Matrix.

Current state:
- Repository has been initialized.
- LBC-001 is Remote DONE at commit `3d90251`.
- Official stack decision is documented in `docs/architecture/stack-decision.md`.
- LBC-002A is the only READY task.
- Scaffold plan and version matrix have been drafted for review.
- LBC-002B remains BACKLOG and is not READY.
- No commit has been made for LBC-002A.
- No push has been made for LBC-002A.

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

LBC-002A draft decisions:
- Future scaffold type: simple monorepo.
- Future project layout: `apps/web`, `apps/api`, optional `packages/shared`, and docs under `docs`.
- Future package manager: pnpm 10.x via Corepack.
- Future Node.js target: 24.x LTS.
- Future Angular target: 21.x.
- Future TypeScript target: 5.9.x because Angular 21 requires `<6.0.0`.
- Future Tailwind target: 4.3.x.
- Future Fastify target: 5.8.x.
- Future Zod target: 4.4.x.
- Future Prisma target: 7.8.x.
- Future PostgreSQL target: 18.x.

Next protocol step:
- Present status and diff evidence.
- Await Trigger approval.
- Do not commit until explicitly authorized.
- Do not push.
- Do not declare Local DONE without evidence.
- Do not declare Remote DONE without push and origin synchronization verification.

Scope note:
- LBC-002A may only alter the files explicitly authorized for this task.
- LBC-002B must remain BACKLOG and must not be opened as READY during LBC-002A.
