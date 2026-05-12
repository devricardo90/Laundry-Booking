# LBC MVP Scope

## 1. Product Objective

LBC - Laundry Booking Condo is an MVP for shared condominium laundry scheduling. The product lets residents reserve available laundry time slots and lets administrators view reservations and block slots for maintenance or operational reasons.

The MVP must prove one critical behavior: the same laundry room cannot have overlapping unavailable time for active bookings or blocked slots.

Time rule:
Store times in UTC and display them according to the condominium operational timezone. The initial operational timezone is `Europe/Stockholm`, unless changed by a later product decision.

## 2. Main User

The main user is a condominium resident who needs to reserve a fixed laundry time slot without coordinating manually with neighbors or building staff.

The secondary user is the condominium administrator, who needs visibility over reservations and the ability to block unavailable periods.

## 3. Problem Solved

Shared laundry rooms create disputes when residents use informal scheduling, duplicated messages, paper calendars, or verbal agreements. LBC solves this by providing a single source of truth for available slots, active reservations, canceled reservations, and maintenance blocks.

## 4. Resident Flow

1. Resident accesses the booking interface.
2. Resident views laundry availability for the next 14 days.
3. Resident selects a laundry room and a fixed 2-hour slot.
4. System validates that the resident has no future active booking.
5. System validates that the selected slot is within the allowed booking window.
6. System validates that the selected slot does not conflict with an ACTIVE booking or a BlockedSlot for the same laundry room.
7. System creates the booking as ACTIVE.
8. Resident can view the active booking.
9. Resident can cancel the booking, changing it to CANCELED.

## 5. Administrator Flow

1. Administrator accesses the administration interface.
2. Administrator views reservations by laundry room and date.
3. Administrator identifies slots that require maintenance or operational blocking.
4. Administrator creates a BlockedSlot for a fixed 2-hour slot.
5. System validates that the blocked slot does not conflict with an ACTIVE booking or another BlockedSlot for the same laundry room.
6. Administrator can view blocked slots together with resident reservations.

## 6. MVP Scope

The MVP includes:
- Resident booking flow for shared laundry rooms.
- Administrator reservation overview.
- Administrator maintenance block creation.
- Fixed 2-hour slots.
- Booking availability for the next 14 days.
- Booking statuses: ACTIVE and CANCELED.
- Conflict prevention for the same laundry room.
- One future active booking per resident.
- UTC storage for times.
- Display according to operational timezone `Europe/Stockholm`.
- PostgreSQL as the primary database.
- Angular, TypeScript, and Tailwind for the frontend.
- Fastify, TypeScript, Zod, Prisma, and PostgreSQL for the backend.

## 7. Out Of Scope

The MVP does not include:
- Payments.
- Recurring reservations.
- Waitlists.
- Push notifications, email, or SMS.
- Multi-condominium tenancy.
- Dynamic slot duration.
- Resident invitation flow.
- Advanced role permissions.
- Mobile native apps.
- Usage telemetry or analytics.
- Automatic penalty rules.
- Integration with smart locks or laundry machines.

For LBC-001 specifically, the following are also out of scope:
- Application code.
- Dependency installation.
- Angular scaffolding.
- Fastify scaffolding.
- Prisma schema.
- Database migration.
- Seed data.
- Tailwind configuration.
- Deploy configuration.
- Opening LBC-002 as READY.
- Git commit.
- Git push.

## 8. Main Entities

Resident:
Represents a condominium resident who can create and cancel bookings.

Administrator:
Represents an operator who can view reservations and block slots.

LaundryRoom:
Represents a shared laundry location that can be reserved.

Booking:
Represents a resident reservation for one laundry room, one date, and one fixed 2-hour slot. A booking can be ACTIVE or CANCELED.

BlockedSlot:
Represents an administrator-created unavailable slot for a laundry room, usually for maintenance or operational needs.

Slot:
Represents a fixed 2-hour time interval. Slots are not dynamic in the MVP.

## 9. Reservation Rules

- A booking is created only for one laundry room and one fixed 2-hour slot.
- ACTIVE bookings block availability.
- CANCELED bookings do not block availability.
- A resident can have at most one future ACTIVE booking in the MVP.
- Reservations can be made only within the next 14 days.
- Reservations in the past are invalid.
- A booking cannot overlap another ACTIVE booking for the same laundry room.
- A booking cannot overlap a BlockedSlot for the same laundry room.
- Canceling a booking changes its status to CANCELED and releases the slot.
- A booking in a different laundry room can use the same time interval if that room is available.

## 10. Availability Rules

- A slot is available only when there is no ACTIVE booking for the same laundry room and time interval.
- A slot is available only when there is no BlockedSlot for the same laundry room and time interval.
- CANCELED bookings are ignored when calculating availability.
- Availability is calculated per laundry room.
- Availability is exposed only for the next 14 days.
- Slots use fixed 2-hour boundaries.
- Times are stored in UTC.
- Times are displayed in the condominium operational timezone.

## 11. Formal Time Conflict Rule

A new booking conflicts with an existing booking when all conditions are true:

```text
existing.startTime < new.endTime
AND existing.endTime > new.startTime
AND existing.laundryRoomId = new.laundryRoomId
AND existing.status = ACTIVE
```

A new booking also conflicts when it overlaps a BlockedSlot for the same `laundryRoomId`:

```text
blockedSlot.startTime < new.endTime
AND blockedSlot.endTime > new.startTime
AND blockedSlot.laundryRoomId = new.laundryRoomId
```

The same overlap logic applies when an administrator creates a BlockedSlot. The BlockedSlot must not overlap an ACTIVE booking or another BlockedSlot in the same laundry room.

## 12. Official Stack Decision

The official MVP stack is:
- Frontend: Angular + TypeScript + Tailwind.
- Backend: Fastify + TypeScript.
- Validation: Zod.
- ORM: Prisma.
- Database: PostgreSQL.

MongoDB is outside the current stack decision.

## 13. Validation Criteria

The MVP must reject:
- A booking outside the next 14 days.
- A booking in the past.
- A booking whose start or end does not match a fixed 2-hour slot.
- A booking that overlaps an ACTIVE booking for the same laundry room.
- A booking that overlaps a BlockedSlot for the same laundry room.
- A second future ACTIVE booking for the same resident.
- A BlockedSlot that overlaps an ACTIVE booking for the same laundry room.
- A BlockedSlot that overlaps another BlockedSlot for the same laundry room.
- A booking or block with ambiguous timezone handling.

The MVP may allow:
- Multiple CANCELED bookings in historical records.
- A new booking for a slot previously held by a CANCELED booking.
- Bookings for different laundry rooms at the same time, if each room is independently available.

## 14. DONE Criteria

LBC-001 is DONE when:
- MVP scope is documented.
- Business rules are documented.
- Resident and administrator flows are documented.
- Main entities are documented.
- Reservation and availability rules are documented.
- Formal time conflict rule is documented.
- Official stack decision is documented.
- Timezone policy is documented.
- Validation criteria are documented.
- Out-of-scope items are documented.
- No application code or dependencies are introduced.
- Only authorized documentation and ops files are changed.
- Git status, diff stat, and diff check are presented before any commit authorization request.
- LBC-002 remains BACKLOG and is not opened as READY.
