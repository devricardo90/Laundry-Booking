# Session Handoff

Project: LBC - Laundry Booking Condo

Active task:
LBC-005B - UI Usability Pass.

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
- LBC-004D is Remote DONE at commit `f79f3dc`.
- LBC-004E is Remote DONE at commit `36263f6`.
- LBC-004F is Remote DONE at commit `1e76fb9`.
- LBC-004G is Remote DONE at commit `252c16e`.
- Official stack decision is documented in `docs/architecture/stack-decision.md`.
- LBC-005A is Remote DONE (pending commit confirmation from Trigger).
- LBC-005B is READY for Trigger review after UI usability improvements.
- Angular dev proxy is configured via `apps/web/proxy.conf.json` to route `/api/*` to `http://127.0.0.1:3000`.
- Angular dev server calls only relative `/api/*` URLs with no hardcoded backend host.
- `provideHttpClient()` is added to `app.config.ts`.
- Booking flow component is fully implemented with local signal state.
- UI has been improved with helper texts, badges, distinct state messages, and clearer buttons.
- Minimum pnpm workspace scaffold has been created.
- Angular shell exists under `apps/web`.
- Tailwind CSS is configured only under `apps/web`.
- Fastify TypeScript shell exists under `apps/api`.
- Required validation commands have passed.
- Prisma tooling, Prisma 7 config, migration, and seed baseline are versioned.
- The read-only availability endpoint is implemented and Remote DONE.
- The booking creation contract and concurrency strategy have been technically approved by the Trigger.
- `POST /bookings` implementation and validation are Remote DONE.
- `POST /bookings/:bookingId/cancel` implementation is Remote DONE.
- `GET /bookings` implementation and validation are Remote DONE.
- `proxy.conf.json` was audited via `git add -N` and appears in `git diff`.
- No commit has been made for LBC-005A.
- No push has been made for LBC-005A.

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
