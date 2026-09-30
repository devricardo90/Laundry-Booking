# Session Handoff

Project: LBC - Laundry Booking Condo

Current next unit:
LBC-009 validation/readiness (BLOCKED; original acceptance criteria missing).

Current state (2026-09-30):
- LBC-008A is Remote DONE at `4c6829d`; LBC-008B is Remote DONE at `3ce264c`.
- LBC-008C is Remote DONE; README and portfolio evidence criteria passed review on 2026-09-30.
- Owner-referenced LBC-009 validation/readiness is BLOCKED because its original acceptance checklist is not in the repository.
- LBC-009A manual deployment discussion remains a separate Future / Suggested item.
- LBC-010 is Remote DONE at `2d20d97`.
- SPR-01 remains current; do not open a new sprint.
- `docs/ops/backlog.md` is the canonical operational backlog; root `backlog.md` mirrors it.

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

Next planned sequence:
1. Keep LBC-009 BLOCKED until its original acceptance checklist is recovered and reviewed through an Owner Discussion Gate; do not execute it yet.
2. Keep LBC-009A as a separate Future / Suggested manual deployment discussion.

Next protocol step:
- Owner has authorized the LBC-010 commit/push, completed at `2d20d97`.
- LBC-008C was closed as documentation-only; no code changed.
- Do not execute LBC-009; its original acceptance checklist is missing.
- Do not open a new sprint.

Historical scope note (LBC-008A READY opening, 2026-07-08):
- Authorized files for this planning task: `STATUS.md`, `backlog.md`, `docs/ops/status.md`, `docs/ops/backlog.md`, `docs/ops/execution-log.md`, `docs/ops/session-handoff.md`, and `docs/product/roadmap.md`.
- Blocked files: `apps/web`, `apps/api`, `prisma`, `package.json`, lockfiles, migrations, seed, Docker, dependencies, deploy, UI changes, backend changes, auth, opening multiple READY tasks, commit without authorization, push.
