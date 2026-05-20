# Session Handoff

Project: LBC - Laundry Booking Condo

Active task:
LBC-005C - Record Local UI Smoke Evidence.

Current state:
- Repository initialized.
- LBC-001 through LBC-005B are Remote DONE.
- Latest remote commit is `ef37b8b` (LBC-005B).
- LBC-005C is READY to formalize smoke test evidence.
- Local UI smoke test (full flow via proxy) confirmed as SUCCESS.
- API and UI are functionally verified for the current scope.
- `apps/web/angular.json` is clean.
- Only authorized operational documentation is being updated.

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

Seed data (dev only):
- Laundry Room A: `11111111-1111-4111-8111-111111111111`
- Development Resident: `22222222-2222-4222-8222-222222222222`
- Development Admin: `33333333-3333-4333-8333-333333333333`

Next protocol step:
- Review LBC-005B final evidence.
- Do not commit without Trigger authorization.
- Do not push.
- Do not declare Remote DONE without push and origin synchronization verification.

Scope note:
- LBC-005B authorized files: `apps/web/src/app/app.ts`, `apps/web/src/app/app.html`, and operational docs.
- `apps/api`, `apps/web/angular.json`, `apps/web/proxy.conf.json`, `apps/web/src/app/app.config.ts`, `apps/web/src/app/app.css`, `package.json`, `pnpm-lock.yaml`, `prisma/`, migration, versioned seed, Prisma generate, Prisma db push, remote database, deploy, Docker, CI, `packages/shared`, auth, admin panel, new UI library, global store, commit without authorization, push, LBC-005C READY, and any new READY task are blocked.
