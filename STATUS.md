# LBC Status

Project: LBC - Laundry Booking Condo

Current task: LBC-004D - Define Booking Creation Contract and Concurrency Strategy

Status: LOCAL DONE

Protocol state:
- LBC-004D is Local DONE after Trigger technical approval and is documentation-only.
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
- LBC-004D documents the booking creation contract and concurrency strategy before implementation.
- Trigger technical approval for LBC-004D has been recorded.
- No implementation of `POST /bookings` is authorized by LBC-004D.
- No booking creation, booking cancellation, auth, Angular product UI, admin panel, deploy, CI, Docker, or `packages/shared` work has been created.
- No push has been made for LBC-004D.

Scope guard:
- Files authorized for LBC-004D are `docs/architecture/booking-creation-contract.md`, `docs/product/business-rules.md`, `STATUS.md`, `backlog.md`, `docs/ops/status.md`, `docs/ops/backlog.md`, `docs/ops/execution-log.md`, and `docs/ops/session-handoff.md`.
- `docs/architecture/availability-api-contract.md` may be touched only if strictly necessary; LBC-004D avoided changing it.
- Implementing `POST /bookings`, changing `apps/api`, changing `apps/web`, creating controllers/services/repositories, creating migrations, creating seed data, running Prisma generate, running Prisma db push, Docker, CI, deploy, remote database, production, auth, cancellation, admin panel, Angular UI, and opening LBC-004E or any new READY task are blocked.
- Real `.env` files and real credentials must not be committed.

Completion evidence checklist:
- Initial repository guard evidence has been presented.
- Proposed route `POST /bookings` is documented.
- Proposed body uses `residentId`, `laundryRoomId`, `date`, and `slotStart`.
- `date` and `slotStart` are documented as interpreted in `Europe/Stockholm`.
- UTC `startTime` and `endTime` response timestamps are documented.
- `201`, `400`, `404`, and `409` behaviors are documented.
- Domain validation rules for Resident, LaundryRoom, slot window, slot grid, ACTIVE Booking, CANCELED Booking, BlockedSlot, and one future ACTIVE Booking per Resident are documented.
- Concurrency risk from read-only availability has been documented.
- Future transaction plus advisory lock strategy has been documented.
- Future PostgreSQL exclusion constraint hardening is documented as a later option.
- Local DONE has been declared after Trigger technical approval.
- Commit authorization has been granted after Trigger technical approval and final diff evidence.
- Remote DONE must not be declared without push and origin synchronization verification.
