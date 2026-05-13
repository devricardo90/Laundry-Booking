# LBC Domain Model

Task: LBC-003A - Define booking domain model before implementation

## Purpose

This document defines the minimum conceptual domain model for the Laundry Booking Condo MVP before technical implementation.

This is not a database schema and does not authorize Prisma, migrations, seed data, endpoints, services, repositories, Angular product screens, or real database work.

## Domain Principles

- The laundry room is the availability boundary.
- A booking reserves one laundry room for one fixed 2-hour interval.
- A blocked slot makes one laundry room unavailable for one fixed 2-hour interval.
- Times are stored in UTC and displayed in the condominium operational timezone.
- Initial operational timezone: `Europe/Stockholm`, unless changed by a later decision.
- Only ACTIVE bookings and BlockedSlots block availability.
- CANCELED bookings remain historical and do not block availability.

## Entities

### Resident/User

Represents a condominium resident who can reserve laundry time.

Conceptual fields:
- `id`: stable unique identifier.
- `name`: resident display name.
- `email`: resident contact identifier.
- `status`: resident account state, initially ACTIVE or INACTIVE.
- `createdAt`: record creation timestamp.
- `updatedAt`: last update timestamp.

MVP notes:
- A resident can create bookings.
- A resident can cancel their own ACTIVE booking.
- A resident can have at most one future ACTIVE booking.

### Admin

Represents an operational user who can manage laundry availability.

Conceptual fields:
- `id`: stable unique identifier.
- `name`: administrator display name.
- `email`: administrator contact identifier.
- `status`: administrator account state, initially ACTIVE or INACTIVE.
- `createdAt`: record creation timestamp.
- `updatedAt`: last update timestamp.

MVP notes:
- An admin can view bookings and blocked slots.
- An admin can create BlockedSlots.
- Advanced role permissions are outside the MVP.

### LaundryRoom

Represents a shared laundry room that can be reserved independently.

Conceptual fields:
- `id`: stable unique identifier.
- `name`: resident-visible room name.
- `status`: room availability state, initially ACTIVE or INACTIVE.
- `createdAt`: record creation timestamp.
- `updatedAt`: last update timestamp.

MVP notes:
- Availability is calculated per LaundryRoom.
- Bookings and BlockedSlots in one LaundryRoom do not affect another LaundryRoom.

### Booking

Represents a resident reservation for one LaundryRoom during one fixed 2-hour interval.

Conceptual fields:
- `id`: stable unique identifier.
- `residentId`: reference to the Resident/User who owns the booking.
- `laundryRoomId`: reference to the reserved LaundryRoom.
- `startTime`: UTC start timestamp.
- `endTime`: UTC end timestamp.
- `status`: booking lifecycle status.
- `createdAt`: record creation timestamp.
- `updatedAt`: last update timestamp.
- `canceledAt`: timestamp set when the booking is canceled.

MVP notes:
- A Booking starts as ACTIVE after successful creation.
- Canceling a Booking changes status to CANCELED.
- ACTIVE Bookings block availability.
- CANCELED Bookings do not block availability.

### BlockedSlot

Represents an administrator-created unavailable interval for one LaundryRoom.

Conceptual fields:
- `id`: stable unique identifier.
- `laundryRoomId`: reference to the blocked LaundryRoom.
- `startTime`: UTC start timestamp.
- `endTime`: UTC end timestamp.
- `reason`: short operational reason.
- `createdByAdminId`: reference to the Admin who created the block.
- `createdAt`: record creation timestamp.
- `updatedAt`: last update timestamp.

MVP notes:
- A BlockedSlot blocks availability.
- A BlockedSlot is scoped to one LaundryRoom.
- A BlockedSlot must not overlap an ACTIVE Booking or another BlockedSlot in the same LaundryRoom.

## Booking Status

MVP booking statuses:

- `ACTIVE`: the booking is valid and blocks availability.
- `CANCELED`: the booking has been canceled and no longer blocks availability.

Out of scope for the MVP:
- `PENDING`.
- `EXPIRED`.
- `NO_SHOW`.
- `COMPLETED`.
- Payment-related statuses.

## Time Conflict Rules

A new Booking conflicts with an existing Booking when all conditions are true:

```text
existing.startTime < new.endTime
AND existing.endTime > new.startTime
AND existing.laundryRoomId = new.laundryRoomId
AND existing.status = ACTIVE
```

A new Booking conflicts with a BlockedSlot when all conditions are true:

```text
blockedSlot.startTime < new.endTime
AND blockedSlot.endTime > new.startTime
AND blockedSlot.laundryRoomId = new.laundryRoomId
```

The same overlap logic applies when creating a BlockedSlot:
- It must not overlap an ACTIVE Booking in the same LaundryRoom.
- It must not overlap another BlockedSlot in the same LaundryRoom.

Bookings in different LaundryRooms may use the same time interval.

## Cancellation Rules

- A resident can cancel their own ACTIVE Booking.
- Canceling a Booking changes its status from ACTIVE to CANCELED.
- Canceling a Booking sets `canceledAt`.
- A CANCELED Booking remains in history.
- A CANCELED Booking does not block availability.
- Canceling an already CANCELED Booking must not create another state transition.
- Deleting bookings is outside the MVP.

## MVP Limits

The domain model intentionally excludes:

- Prisma schema.
- Database migrations.
- Seed data.
- Database constraints.
- API endpoints.
- Controllers, services, or repositories.
- Angular product screens or components.
- Authentication and authorization implementation.
- Payments.
- Recurring reservations.
- Waitlists.
- Dynamic slot duration.
- Multi-condominium tenancy.
- Advanced administrator roles.
- Integration with machines, locks, email, SMS, or push notifications.

## Implementation Notes For Future Tasks

- The implementation must protect conflict checks against race conditions.
- The database design should enforce or support the same conflict rules.
- API validation should reject invalid status transitions, ambiguous time handling, and intervals that are not exactly one fixed 2-hour slot.
- These implementation details require later tasks and are not authorized by LBC-003A.
