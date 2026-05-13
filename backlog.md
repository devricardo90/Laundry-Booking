# LBC Backlog

## LOCAL DONE

### LBC-004A - Define Availability API Contract and Dev Persistence Strategy

Status: Local DONE

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

## BACKLOG

### LBC-004B - Apply Dev Prisma Migration and Seed Minimal Availability Data

Status: BACKLOG

Notes:
- Expected future scope: apply the development Prisma migration path and create minimal data for testing availability reads.

### LBC-004C - Implement Availability API Read Endpoint

Status: BACKLOG

Notes:
- Expected future scope: implement the read-only availability endpoint after the development persistence path is ready.
