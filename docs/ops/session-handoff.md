# Session Handoff

Project: LBC - Laundry Booking Condo

Active task:
LBC-007A - Define Product Roadmap and Current Sprint Objective.

Current state:
- LBC-001 through LBC-006A are Remote DONE.
- Latest remote commit: `d6f8060` (LBC-006A).
- SPR-01 - Product Demo Readiness is the official current sprint.
- LBC-007A is documentation-only and currently in progress.
- LBC-007B is FUTURE / SUGGESTED only and is not READY.

Current sprint objective:
Make Laundry Booking Condo demonstrable to an external person with clear flow, realistic demo states, and reduced friction, without opening full redesign, real auth, deploy, payments, or admin complexity.

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
- Review LBC-007A documentation evidence.
- Do not commit without Trigger authorization.
- Do not push.
- Do not declare Remote DONE without push and origin synchronization verification.

Scope note:
- LBC-007A authorized files: `docs/product/roadmap.md`, `docs/ops/current-objective.md`, `STATUS.md`, `backlog.md`, `docs/ops/status.md`, `docs/ops/backlog.md`, `docs/ops/execution-log.md`, and `docs/ops/session-handoff.md`.
- `apps/web`, `apps/api`, `prisma`, `package.json`, `pnpm-lock.yaml`, `angular.json`, `tsconfig.json`, dependencies, migrations, seed, deploy, Docker, CI/CD, auth, admin, notifications, payments, commit without authorization, push, and opening LBC-007B as READY are blocked.
