# Session Handoff

Project: LBC - Laundry Booking Condo

Active task:
LBC-004C - Implement Availability API Read Endpoint.

Current state:
- Repository has been initialized.
- LBC-001 is Remote DONE at commit `3d90251`.
- LBC-002A is Remote DONE at commit `d6b7673cc6be018308b2d8bf4d6220141e58f509`.
- LBC-002B is Remote DONE at commit `b577a40b61b016aef345d27e41cd8dcc9c9ff67a`.
- LBC-002C is Remote DONE at commit `93f32c7`.
- LBC-003A is Remote DONE at commit `fe1ac8c`.
- LBC-003B is Remote DONE at commit `c31ed8c`.
- LBC-003C is Remote DONE at commit `e5285f4`.
- LBC-004A is Remote DONE at commit `967a321`.
- LBC-004B is Remote DONE at commit `7025936`.
- Official stack decision is documented in `docs/architecture/stack-decision.md`.
- LBC-004C is ready for Trigger review after endpoint implementation and validation.
- Minimum pnpm workspace scaffold has been created.
- Angular shell exists under `apps/web`.
- Tailwind CSS is configured only under `apps/web`.
- Fastify TypeScript shell exists under `apps/api`.
- Required validation commands have passed.
- Prisma tooling, Prisma 7 config, migration, and seed baseline are versioned.
- The read-only availability endpoint is implemented locally for review.
- No commit has been made for LBC-004C.
- No push has been made for LBC-004C.

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
- Present final git status and diff evidence for LBC-004C.
- Await Trigger decision for Local DONE and commit authorization.
- Do not push.
- Do not declare Local DONE without Trigger authorization.
- Do not declare Remote DONE without push and origin synchronization verification.

Scope note:
- LBC-004C may include `apps/api/src/server.ts`, a small Prisma helper, an availability route module, API dependency metadata needed for Prisma 7 runtime access, root lockfile updates from those dependencies, and operational documentation.
- Booking creation, booking cancellation, auth, Angular product UI, admin panel, mutation endpoints, new migration, new seed, `prisma db push`, Docker, deploy, CI, `packages/shared`, large controller/service/repository refactor, commit without authorization, push, and any new READY task are blocked.
