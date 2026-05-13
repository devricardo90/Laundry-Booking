# LBC Backlog

## REMOTE DONE

### LBC-004A - Define Availability API Contract and Dev Persistence Strategy

Status: Remote DONE

Type: Documentation / Architecture

Goal:
Define the contract for reading laundry room availability and the minimum development persistence strategy needed before implementing the real endpoint.

Acceptance:
- Proposed endpoint `GET /laundry-rooms/:id/availability?date=YYYY-MM-DD` is documented.
- `date=YYYY-MM-DD` is documented as interpreted in `Europe/Stockholm`.
- UTC storage/comparison and ISO UTC `startTime`/`endTime` response timestamps are documented.
- Response shape includes `laundryRoomId`, `date`, `timezone`, `slotDurationMinutes`, and `slots`.
- Slot shape includes `startTime`, `endTime`, `status`, and limited optional `reason`.
- Slot statuses `AVAILABLE`, `BOOKED`, and `BLOCKED` are documented.
- Reason rules avoid exposing resident personal data.
- 14-day read window and `400` behavior for dates outside the window are documented.
- Dev persistence strategy recommends migration and minimal seed before the real endpoint.
- No endpoint, controller, service, repository, migration, seed, real database access, auth, Angular screen, dependency change, or booking creation flow is created.
- Required raw evidence is presented before any commit request.
- Trigger approved LBC-004A for Local DONE and commit.
- Remote DONE confirmed at commit `967a321`.

## READY FOR TRIGGER REVIEW

### LBC-004B - Apply Dev Prisma Migration and Seed Minimal Availability Data

Status: READY FOR TRIGGER REVIEW

Type: Persistence / Dev Database

Goal:
Prepare the minimum local development persistence path required before implementing the real Availability API endpoint.

Completed before blocker:
- Initial repository guard confirmed clean working tree and `HEAD == origin/main`.
- `prisma` was added as a dev dependency.
- `@prisma/client` was added as a dependency.
- Prisma 7 required moving datasource URL configuration from `prisma/schema.prisma` to `prisma.config.ts`.
- `prisma/schema.prisma` validation passed with session-only `DATABASE_URL`.
- `.env.example` was updated with a fictitious local PostgreSQL `DATABASE_URL` example.

Completed after unblock authorization:
- Created local/dev database `lbc_dev`.
- Applied dev migration `init`.
- Generated Prisma Client.
- Created `prisma/seed.mjs`.
- Ran local seed.
- Verified one LaundryRoom, one Resident, one Admin, one ACTIVE Booking, one CANCELED Booking, and one BlockedSlot.

Still pending:
- Trigger review.
- Local DONE authorization.
- Commit authorization.

Blocked scope remains:
- No endpoint, controller, service, repository, runtime availability logic, Angular screen, auth, booking creation, booking cancellation, production seed, production database, Docker, CI, deploy, `packages/shared`, or LBC-004C READY.

## BACKLOG

### LBC-004C - Implement Availability API Read Endpoint

Status: BACKLOG

Notes:
- Expected future scope: implement the read-only availability endpoint after the development persistence path is ready.
