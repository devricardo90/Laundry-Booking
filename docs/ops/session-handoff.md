# Session Handoff

Project: LBC - Laundry Booking Condo

Active task:
LBC-008A - Polish responsive demo UI.

Current state:
- LBC-001 through LBC-007C are Remote DONE.
- Latest remote commit: `b713885` (LBC-007C demo smoke evidence).
- SPR-01 - Product Demo Readiness is the official current sprint.
- LBC-007B is Remote DONE at commit `9009aa5`.
- LBC-007C is Remote DONE at commit `b713885`.
- Post-LBC-007C backlog planned.
- LBC-008A is the only READY task.
- LBC-008B, LBC-008C, and LBC-009A are Future/Suggested.

Current sprint objective:
Make Laundry Booking Condo demonstrable to an external person with clear flow, realistic demo states, and reduced friction, without opening full redesign, real auth, deploy, payments, or admin complexity.

Product direction:
- Make the app functional, visually solid, responsive on mobile.
- Document with a good README.
- Later manual deploy for testing (no deploy yet).
- No Prisma/database changes yet.

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

Planned post-LBC-007C sequence:
1. LBC-008A - Polish responsive demo UI (UI only, no backend changes)
2. LBC-008B - Harden booking flow UX (UI only, no backend changes)
3. LBC-008C - README and portfolio demo evidence (docs only)
4. LBC-009A - Manual deploy readiness discussion (docs only)

Next protocol step:
- Review post-LBC-007C backlog plan.
- Do not commit without Ricardo authorization.
- Do not push.
- Do not change app, API, Prisma, dependency, migration, seed, Docker, deploy, UI, backend, or auth files (only docs planning for now).

Scope note:
- Authorized files for this planning task: `STATUS.md`, `backlog.md`, `docs/ops/status.md`, `docs/ops/backlog.md`, `docs/ops/execution-log.md`, `docs/ops/session-handoff.md`, and `docs/product/roadmap.md`.
- Blocked files: `apps/web`, `apps/api`, `prisma`, `package.json`, lockfiles, migrations, seed, Docker, dependencies, deploy, UI changes, backend changes, auth, opening multiple READY tasks, commit without authorization, push.
