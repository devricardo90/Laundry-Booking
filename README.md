# Laundry Booking Condo

Laundry Booking Condo (LBC) is a local MVP for scheduling shared condominium laundry rooms. It gives residents one place to check time-slot availability, create a booking, review bookings, and cancel a future booking instead of coordinating through messages or paper calendars.

This repository is for local development and demonstration. It is not a deployed production service.

## What works today

- Check laundry-room availability by date.
- Create a booking for an available, fixed two-hour slot.
- View active and canceled bookings.
- Cancel a future active booking and see the released slot become available again.
- Load the development laundry-room and resident IDs from the UI's Development Presets.
- Apply the API's booking rules, including the 14-day window, fixed two-hour slots, and conflict checks.

The current web app demonstrates the resident booking flow. An administrator interface, authentication, payments, notifications, and production deployment are not implemented.

## Stack

- Web: Angular, TypeScript, Tailwind CSS
- API: Fastify and TypeScript
- Validation: Zod
- Persistence: Prisma and PostgreSQL
- Workspace: pnpm 10.x; Node.js `^20.19.0 || ^22.12.0 || ^24.0.0`

## Run locally

You need Node.js, pnpm, and a local PostgreSQL database. The API needs `DATABASE_URL` at startup. `.env.example` shows the local connection-string format; set the variable in the PowerShell session used to start the API.

From the repository root, install dependencies, point to an existing local database, apply the checked-in migrations, and load the development seed:

```powershell
pnpm install
$env:DATABASE_URL='postgresql://user:password@localhost:5432/lbc_dev'
pnpm exec prisma migrate deploy
pnpm exec prisma db seed
```

Start the default web and API runtime on ports 4200 and 3000:

```powershell
pnpm dev
```

Open <http://127.0.0.1:4200>. The default web proxy sends `/api/*` requests to the API on port 3000.

If port 3000 is occupied, run the API and web app in separate terminals. In the API terminal, set the same `DATABASE_URL` and use port 3010:

```powershell
$env:DATABASE_URL='postgresql://user:password@localhost:5432/lbc_dev'
$env:PORT='3010'
pnpm dev:api
```

In the web terminal:

```powershell
pnpm dev:web:3010
```

This alternative keeps the web app on port 4200 and directs its `/api/*` proxy to port 3010. See [docs/ops/local-runtime.md](docs/ops/local-runtime.md) for the runtime details.

## Development data

The Development Presets button fills these IDs from the local development seed:

| Record | ID |
| --- | --- |
| Laundry Room A | `11111111-1111-4111-8111-111111111111` |
| Development Resident | `22222222-2222-4222-8222-222222222222` |

The seed creates example active, blocked, and canceled time slots. The resident may already have a future active booking; cancel that booking in the UI before trying to create another, because the MVP permits only one future active booking per resident.

## Demo flow

1. Start PostgreSQL, set `DATABASE_URL`, apply migrations, and run the development seed.
2. Start the API and Angular app with `pnpm dev`, or use the alternative 3010 commands above.
3. Open the app and select **Development Presets**.
4. Choose a date within the next 14 days and check availability.
5. If the preset resident has an active booking, cancel it first. Then select an available slot and create a booking.
6. Confirm the new booking appears as Active in the bookings list.
7. Cancel the future booking and confirm its status changes to Canceled and the slot is available again.

The app uses fixed two-hour slots and the `Europe/Stockholm` operational timezone.

## Recorded validation evidence

- **2026-07-08 — LBC-007C browser smoke:** the recorded flow checked availability, created and listed a booking, canceled it, and confirmed the slot was available again. The API health endpoint on port 3000 and the web proxy health endpoint also returned `{"status":"ok","service":"lbc-api"}`. The run is documented in [docs/ops/execution-log.md](docs/ops/execution-log.md).
- **2026-09-29 — LBC-010 alternate runtime:** direct `GET http://127.0.0.1:3010/health` and proxied `GET http://127.0.0.1:4200/api/health` returned `{"status":"ok","service":"lbc-api"}`. Lint, typecheck, web tests (1 file / 2 tests), and build passed for that runtime change.

## Screenshots

No screenshot image files are currently included in the repository. These placeholders mark where reviewed portfolio screenshots can be added later:

> Screenshot placeholder — initial app and availability view.

> Screenshot placeholder — active booking in the bookings list.

> Screenshot placeholder — canceled booking and released slot.

The 2026-07-08 execution log records screenshot capture during the smoke run, but those image files are not present in this checkout.

## Current limitations

- The app is intended for local development and demo use; production hosting and deployment are not configured.
- There is no authentication or role-based access control. Development presets are convenience helpers, not security controls.
- The current web interface demonstrates the resident flow; administrator operations are not available in the UI.
- A local PostgreSQL database and development seed data are required for booking flows.
- The current LBC-009 readiness checklist is missing from the repository, so that task remains blocked until its original acceptance criteria are recovered.

## Roadmap

- SPR-01 demo and portfolio evidence work is recorded as complete; the remaining local readiness item is blocked pending its original acceptance criteria.
- Resume local readiness validation only after the original LBC-009 acceptance criteria are recovered and reviewed.
- Continue the documented resident booking-flow stabilization work in Phase 2 of [the product roadmap](docs/product/roadmap.md).
- Authentication, payments, production deployment, and expanded administrator workflows are outside the current sprint and are not delivered features.

## Useful commands

```powershell
pnpm lint
pnpm typecheck
pnpm build
```

Operational status and the canonical backlog are maintained in `docs/ops`; the root `backlog.md` is a synchronized entry-point mirror.
