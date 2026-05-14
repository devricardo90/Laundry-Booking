# LBC Backlog

## REMOTE DONE

### LBC-004C - Implement Availability API Read Endpoint

Status: Remote DONE

Type: API / Read Endpoint

Acceptance:
- Implemented `GET /laundry-rooms/:laundryRoomId/availability?date=YYYY-MM-DD` without `/api` prefix.
- Connected the API to the local/dev database through Prisma 7 and the PostgreSQL adapter.
- Validated UUID input, required strict date input, the `Europe/Stockholm` operational date interpretation, and the 14-day read window.
- Implemented read-only availability behavior where ACTIVE bookings block, CANCELED bookings do not block, and BlockedSlots block with priority over bookings.
- Verified existing seed coverage for BOOKED, BLOCKED, AVAILABLE, and ignored CANCELED slots through local endpoint calls.
- `pnpm lint`, `pnpm typecheck`, and `pnpm build` passed.
- Remote DONE confirmed at commit `9552c7b`.

### LBC-004B - Apply Dev Prisma Migration and Seed Minimal Availability Data

Status: Remote DONE

Type: Persistence / Dev Database

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
- Minimal development seed was created, executed, and verified.
- Seed includes one LaundryRoom, one Resident, one Admin, one ACTIVE Booking, one CANCELED Booking, and one BlockedSlot.
- No endpoint, route/controller/service/repository, runtime availability logic, Angular screen, auth, booking creation, booking cancellation, production seed, production database, Docker, CI, deploy, `packages/shared`, or LBC-004C READY was created during the task.
- Remote DONE confirmed at commit `7025936`.

### LBC-004A - Define Availability API Contract and Dev Persistence Strategy

Status: Remote DONE

Type: Documentation / Architecture

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

## READY

### LBC-004D - Define Booking Creation Contract and Concurrency Strategy

Status: Local DONE

Type: Documentation / Architecture

Goal:
Document the booking creation API contract and concurrency strategy before implementing `POST /bookings`.

Acceptance:
- Proposed route `POST /bookings` is documented.
- Proposed body includes `residentId`, `laundryRoomId`, `date`, and `slotStart`.
- `date` and `slotStart` are interpreted in `Europe/Stockholm`.
- Future API conversion to UTC `startTime` and `endTime` is documented.
- `201`, `400`, `404`, and `409` response behavior is documented.
- Domain validation rules are documented for Resident, LaundryRoom, 14-day window, 2-hour grid, ACTIVE Booking, CANCELED Booking, BlockedSlot, and one future ACTIVE booking per Resident.
- Concurrency risk is documented because availability is read-only.
- Future transaction plus advisory lock strategy is documented.
- Future PostgreSQL exclusion constraint hardening is documented as a later option.
- No endpoint, app code, migration, seed, UI, dependency, Docker, CI, deploy, commit, push, LBC-004E READY, or new READY task is created.
- Trigger technical approval has been recorded before commit.

## BACKLOG

No task is READY.
