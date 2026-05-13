# Session Handoff

Project: LBC - Laundry Booking Condo

Active task:
LBC-003B - Define persistence model and conflict constraint strategy.

Current state:
- Repository has been initialized.
- LBC-001 is Remote DONE at commit `3d90251`.
- LBC-002A is Remote DONE at commit `d6b7673cc6be018308b2d8bf4d6220141e58f509`.
- LBC-002B is Remote DONE at commit `b577a40b61b016aef345d27e41cd8dcc9c9ff67a`.
- LBC-002C is Remote DONE at commit `93f32c7`.
- LBC-003A is Remote DONE at commit `fe1ac8c`.
- Official stack decision is documented in `docs/architecture/stack-decision.md`.
- LBC-003B is the only READY task.
- Minimum pnpm workspace scaffold has been created.
- Angular shell exists under `apps/web`.
- Tailwind CSS is configured only under `apps/web`.
- Fastify TypeScript shell exists under `apps/api`.
- Required validation commands have passed.
- No commit has been made for LBC-003B.
- No push has been made for LBC-003B.

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
- Present raw git diff evidence for LBC-003B.
- Run `git add -N docs/architecture/persistence-model.md` before asking for commit authorization.
- Await Trigger approval.
- Do not commit until explicitly authorized.
- Do not push.
- Do not declare Local DONE without evidence.
- Do not declare Remote DONE without push and origin synchronization verification.

Scope note:
- LBC-003B may only update authorized architecture, product, and ops documentation for the future persistence model and conflict strategy.
- Prisma schema, migrations, seed, real database, `DATABASE_URL`, endpoints, controllers, services, repositories, Angular product screens, runtime changes, dependency changes, deploy, CI, Docker, `packages/shared`, and new READY tasks are blocked.
