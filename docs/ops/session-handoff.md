# Session Handoff

Project: LBC - Laundry Booking Condo

Active task:
LBC-004D - Define Booking Creation Contract and Concurrency Strategy.

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
- LBC-004C is Remote DONE at commit `9552c7b`.
- Official stack decision is documented in `docs/architecture/stack-decision.md`.
- LBC-004D is Local DONE after Trigger technical approval as a documentation-only contract task.
- Minimum pnpm workspace scaffold has been created.
- Angular shell exists under `apps/web`.
- Tailwind CSS is configured only under `apps/web`.
- Fastify TypeScript shell exists under `apps/api`.
- Required validation commands have passed.
- Prisma tooling, Prisma 7 config, migration, and seed baseline are versioned.
- The read-only availability endpoint is implemented and Remote DONE.
- The booking creation contract and concurrency strategy have been technically approved by the Trigger.
- No push has been made for LBC-004D.

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
- Commit LBC-004D only with explicit file staging if authorized.
- Do not push.
- Do not declare Remote DONE without push and origin synchronization verification.

Scope note:
- LBC-004D may include `docs/architecture/booking-creation-contract.md`, `docs/product/business-rules.md`, `STATUS.md`, `backlog.md`, `docs/ops/status.md`, `docs/ops/backlog.md`, `docs/ops/execution-log.md`, and `docs/ops/session-handoff.md`.
- LBC-004D avoided changing `docs/architecture/availability-api-contract.md`.
- Implementing `POST /bookings`, changing `apps/api`, changing `apps/web`, booking cancellation, auth, Angular product UI, admin panel, controllers, services, repositories, new migration, new seed, Prisma generate, `prisma db push`, Docker, deploy, CI, `packages/shared`, commit without authorization, push, LBC-004E READY, and any new READY task are blocked.
