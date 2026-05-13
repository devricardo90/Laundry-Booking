# LBC Backlog

## REMOTE DONE

### LBC-004B - Apply Dev Prisma Migration and Seed Minimal Availability Data

Status: Remote DONE

Type: Persistence / Dev Database

Goal:
Prepare the minimum local development persistence path required before implementing the real Availability API endpoint.

Acceptance:
- Initial repository guard confirmed clean working tree and `HEAD == origin/main`.
- `prisma` was added as a dev dependency.
- `@prisma/client` was added as a dependency.
- Prisma 7 configuration was added.
- `prisma/schema.prisma` validation passed.
- `.env.example` contains only a fictitious local PostgreSQL `DATABASE_URL` example.
- Local/dev database `lbc_dev` was created after Trigger authorization.
- Dev migration `init` was applied locally and versioned.
- Prisma Client generation completed locally.
- Minimal dev seed was created, executed, and verified.
- Seed includes one LaundryRoom, one Resident, one Admin, one ACTIVE Booking, one CANCELED Booking, and one BlockedSlot.
- No endpoint, route/controller/service/repository, runtime availability logic, Angular screen, auth, booking creation, booking cancellation, production seed, production database, Docker, CI, deploy, `packages/shared`, or LBC-004C READY was created during the task.
- Remote DONE confirmed at commit `7025936`.

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
- Remote DONE confirmed at commit `967a321`.

## READY FOR TRIGGER REVIEW

### LBC-004C - Implement Availability API Read Endpoint

Status: READY FOR TRIGGER REVIEW

Type: API / Read Endpoint

Goal:
Implement only the read-only availability endpoint that follows the LBC-004A contract and uses the LBC-004B dev persistence baseline.

Completed:
- Implemented `GET /laundry-rooms/:laundryRoomId/availability?date=YYYY-MM-DD` without `/api` prefix.
- Added a small Prisma helper for the API using Prisma 7 PostgreSQL adapter.
- Added availability route logic with request validation, LaundryRoom lookup, UTC slot conversion, overlap checks, and response formatting.
- Validated UUID input, required strict date input, the `Europe/Stockholm` operational date interpretation, and the 14-day read window.
- Implemented read-only availability behavior where ACTIVE bookings block, CANCELED bookings do not block, and BlockedSlots block with priority over bookings.
- Verified existing seed coverage for BOOKED, BLOCKED, AVAILABLE, and ignored CANCELED slots through local endpoint calls.
- `pnpm lint`, `pnpm typecheck`, and `pnpm build` passed.

Still pending:
- Trigger review.
- Local DONE authorization.
- Commit authorization.

Blocked scope remains:
- No booking creation, booking cancellation, auth, Angular UI, admin panel, mutation endpoint, new migration, new seed, `prisma db push`, Docker, CI, deploy, `packages/shared`, or new READY task.

## BACKLOG

No task is READY beyond LBC-004C.
