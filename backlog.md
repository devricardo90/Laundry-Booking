# LBC Backlog

## REMOTE DONE

### LBC-004E - Implement Booking Creation Endpoint

Status: Remote DONE

Type: API / Mutation Endpoint

Acceptance:
- `POST /bookings` accepts `residentId`, `laundryRoomId`, `date`, and `slotStart`.
- Success returns `201 Created` with `id`, `residentId`, `laundryRoomId`, `startTime`, `endTime`, `status: ACTIVE`, and `timezone: Europe/Stockholm`.
- Invalid request data returns `400`.
- Missing Resident or LaundryRoom returns `404`.
- Domain conflicts return `409`.
- Resident must exist and be ACTIVE.
- LaundryRoom must exist and be ACTIVE.
- Slot must be inside the 14-day window, not in the past, and aligned to the fixed 2-hour grid.
- ACTIVE Booking overlap blocks creation.
- CANCELED Booking does not block creation.
- BlockedSlot overlap blocks creation.
- Resident with another future ACTIVE Booking is rejected.
- Booking creation uses `prisma.$transaction`.
- Transaction advisory locks are acquired for Resident and LaundryRoom with separate namespaces and fixed order.
- `pnpm lint`, `pnpm typecheck`, `pnpm build`, and required local endpoint tests passed.
- No `apps/web`, UI, auth, cancellation, migration, seed, Prisma generate, Prisma db push, deploy, Docker, CI, `packages/shared`, LBC-004F READY, new READY task, or push was created during the task.
- Remote DONE confirmed at commit `36263f6`.

### LBC-004D - Define Booking Creation Contract and Concurrency Strategy

Status: Remote DONE

Type: Documentation / Architecture

Acceptance:
- Proposed route `POST /bookings` is documented.
- Proposed body includes `residentId`, `laundryRoomId`, `date`, and `slotStart`.
- `date` and `slotStart` are interpreted in `Europe/Stockholm`.
- Future API conversion to UTC `startTime` and `endTime` is documented.
- `201`, `400`, `404`, and `409` response behavior is documented.
- Domain validation rules are documented for Resident, LaundryRoom, 14-day window, 2-hour grid, ACTIVE Booking, CANCELED Booking, BlockedSlot, and one future ACTIVE booking per Resident.
- Concurrency risk is documented because availability is read-only.
- Future transaction plus Resident and LaundryRoom advisory lock strategy is documented.
- Future PostgreSQL exclusion constraint hardening is documented as a later option.
- No endpoint, app code, migration, seed, UI, dependency, Docker, CI, deploy, LBC-004E READY, or new READY task was created.
- Remote DONE confirmed at commit `f79f3dc`.

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

### LBC-004F - Implement Booking Cancellation API

Status: READY FOR TRIGGER REVIEW

Type: API / Mutation Endpoint

Goal:
Implement only `POST /bookings/:bookingId/cancel`.

Acceptance:
- `POST /bookings/:bookingId/cancel` is implemented.
- `PATCH /bookings/:bookingId` is not implemented.
- Success returns `200 OK` with `id`, `status: CANCELED`, `canceledAt`, and `timezone: Europe/Stockholm`.
- Invalid `bookingId` returns `400`.
- Missing Booking returns `404`.
- Booking with status other than ACTIVE returns `409`.
- ACTIVE Booking that has already started or is in the past returns `409`.
- Cancelation sets `canceledAt` using server time.
- Booking is not deleted and remains historical.
- CANCELED Booking does not block availability.
- Concurrency uses short transaction plus conditional `updateMany`.
- No advisory lock is added for cancellation.
- `pnpm lint`, `pnpm typecheck`, `pnpm build`, and required local endpoint tests pass.
- No `apps/web`, UI, auth, admin panel, migration, seed, Prisma generate, Prisma db push, deploy, Docker, CI, `packages/shared`, LBC-004G READY, new READY task, commit, or push is created.

Completed:
- Implemented API-only `POST /bookings/:bookingId/cancel`.
- Implemented conditional cancellation with short transaction and `updateMany`.
- Validated required success and error cases locally.
- Validated that canceled Booking no longer blocks availability.
- `pnpm lint`, `pnpm typecheck`, and `pnpm build` passed.

## BACKLOG

No task is READY beyond LBC-004F.
