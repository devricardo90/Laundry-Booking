# LBC Business Rules

## Core Rule

The system must not allow a time conflict in the same laundry room.

An ACTIVE Booking blocks time.

A CANCELED Booking does not block time.

A BlockedSlot blocks time.

Times must be stored in UTC and displayed according to the condominium operational timezone. The initial operational timezone is `Europe/Stockholm`, unless a later decision changes it.

## Reservation Rules

- Slots are fixed at 2 hours.
- A resident can create a booking only for the next 14 days.
- A resident can have at most one future ACTIVE booking.
- A booking starts as ACTIVE when successfully created.
- A resident can cancel an ACTIVE booking.
- Canceling a booking changes its status to CANCELED.
- A CANCELED booking remains in history but no longer affects availability.
- The MVP does not support recurring bookings.
- The MVP does not support custom slot lengths.
- Reservations in different laundry rooms may occur at the same time when each room is independently available.

## Availability Rules

- Availability is calculated by laundry room.
- A slot is unavailable if any ACTIVE booking overlaps it in the same laundry room.
- A slot is unavailable if any BlockedSlot overlaps it in the same laundry room.
- A slot is available if overlapping records are only CANCELED bookings.
- Bookings in one laundry room do not block another laundry room.
- BlockedSlots in one laundry room do not block another laundry room.

## Conflict Rules

A new booking conflicts with an existing booking when all conditions are true:

```text
existing.startTime < new.endTime
AND existing.endTime > new.startTime
AND existing.laundryRoomId = new.laundryRoomId
AND existing.status = ACTIVE
```

A new booking also conflicts with a BlockedSlot when all conditions are true:

```text
blockedSlot.startTime < new.endTime
AND blockedSlot.endTime > new.startTime
AND blockedSlot.laundryRoomId = new.laundryRoomId
```

The same overlap logic applies when creating a BlockedSlot.

The system must reject creation of a Booking when:
- The selected interval overlaps an ACTIVE Booking for the same laundry room.
- The selected interval overlaps a BlockedSlot for the same laundry room.
- The resident already has a future ACTIVE Booking.
- The selected date is outside the next 14 days.
- The selected slot is in the past.
- The selected interval is not exactly one fixed 2-hour slot.

The system must reject creation of a BlockedSlot when:
- The selected interval overlaps an ACTIVE Booking for the same laundry room.
- The selected interval overlaps another BlockedSlot for the same laundry room.
- The selected interval is not exactly one fixed 2-hour slot.

## Entity Rules

Resident:
- Represents the condominium user who books laundry time.
- Can create one future ACTIVE booking.
- Can cancel their own ACTIVE booking.
- Owns their own Booking records.

Administrator:
- Represents the operational user who manages availability.
- Can view bookings and blocked slots.
- Can create BlockedSlots.

LaundryRoom:
- Owns independent availability.
- Can have many bookings and blocked slots.
- Does not share availability with other laundry rooms.

Booking:
- Belongs to one Resident.
- Belongs to one LaundryRoom.
- Has a fixed start and end time.
- Has status ACTIVE or CANCELED.
- Starts as ACTIVE after successful creation.
- May transition from ACTIVE to CANCELED.

BlockedSlot:
- Belongs to one LaundryRoom.
- Has a fixed start and end time.
- Blocks availability.
- Is created by an Administrator.

## Domain Model Reference

The conceptual MVP domain model is documented in `docs/product/domain-model.md`.

LBC-003A defines entity fields and relationships only at the product/domain level. It does not authorize Prisma schema, migrations, seed data, controllers, services, repositories, endpoints, Angular product screens, or real database work.

## Persistence Strategy Reference

The future persistence model and conflict-constraint strategy are documented in `docs/architecture/persistence-model.md`.

LBC-003B defines persistence expectations only at the architecture documentation level. It does not authorize Prisma schema, migrations, seed data, database configuration, endpoints, controllers, services, repositories, or Angular product screens.

## Validation Criteria

Validation must happen before persistence and must be protected against race conditions in implementation tasks.

Required validation outcomes:
- ACTIVE Booking plus overlapping ACTIVE Booking in the same laundry room: reject.
- ACTIVE Booking plus overlapping BlockedSlot in the same laundry room: reject.
- CANCELED Booking plus new Booking in the same laundry room and same slot: allow.
- ACTIVE Booking in laundry room A plus Booking in laundry room B at same time: allow.
- Resident with future ACTIVE Booking plus second future Booking: reject.
- Resident with only CANCELED future Booking plus new future Booking: allow.
- Slot outside 14-day booking window: reject.
- Slot not aligned to fixed 2-hour duration: reject.
- Time storage not normalized to UTC: reject.

## DONE Criteria

The business rules are considered documented for LBC-001 when:
- The blocking behavior of ACTIVE, CANCELED, and BlockedSlot records is explicit.
- The 14-day booking window is explicit.
- The fixed 2-hour slot rule is explicit.
- The one future ACTIVE booking per resident rule is explicit.
- The formal overlap condition is explicit.
- The UTC storage and operational timezone display policy is explicit.
- Booking and BlockedSlot conflict rules are explicit.
- Validation outcomes are documented with allow/reject expectations.
