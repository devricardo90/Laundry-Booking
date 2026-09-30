# Product Roadmap

Project: LBC - Laundry Booking Condo

Purpose:
Define the official product direction above individual implementation tasks.

Execution model:
Product Roadmap -> Current Sprint Objective -> READY task -> Execution -> Review -> Commit -> Push.

## Phase 0 - Product Definition and Technical Foundation

Goal:
Establish the minimum product definition, business rules, technical baseline, local runtime, persistence model, API contracts, and first working booking foundation.

Status:
Mostly complete.

Included outcomes:
- MVP scope and business rules are documented.
- Technical stack and scaffold decisions are documented.
- Local Angular and Fastify scaffold exists.
- Prisma/PostgreSQL persistence baseline exists for local development.
- Core booking availability, creation, cancellation, and listing flows exist.
- Initial Angular booking flow exists for local demonstration.

Non-goals:
- Full production deployment.
- Full authentication or permissions.
- Admin product surface.
- Payment, notification, or reporting features.

## Phase 1 - Product Demo Readiness

Goal:
Make Laundry Booking Condo demonstrable to an external person with clear flow, realistic demo states, and reduced friction.

Current sprint:
SPR-01 - Product Demo Readiness.

## Current Execution State - 2026-09-29

- SPR-01 remains the current sprint; no later sprint is opened.
- LBC-008A is Remote DONE at `4c6829d` (responsive UI polish).
- LBC-008B is Remote DONE at `3ce264c` (booking-flow UX hardening).
- LBC-008C remains Future / Suggested and incomplete. Commit `ee2015c` supplies an initial README, but does not satisfy all documented portfolio/demo evidence items.
- Owner-referenced LBC-009 validation/readiness is BLOCKED until LBC-008C is completed; its original acceptance checklist is not present in the repository.
- LBC-010 local runtime recovery is Remote DONE at `2d20d97`.
- Next existing unit: LBC-008C, subject to promotion to READY. Do not open a new sprint.

Expected outcomes:
- Demo flow is anchored to clear product objective documentation.
- Demo data strategy is defined and implementation-ready.
- UI demo presets reduce manual UUID copying.
- Demo states are realistic enough to show availability, booked slots, blocked slots, active bookings, canceled bookings, validation errors, and conflict behavior.
- Operational evidence is easy to review before portfolio work.

Explicit boundaries:
- No full redesign.
- No real authentication.
- No deploy work.
- No payments.
- No admin complexity.

## Phase 2 - Resident Booking Flow Stabilization

Goal:
Turn the resident booking flow into a stable, understandable MVP experience after the demo friction is reduced.

Expected outcomes:
- Resident-facing booking flow has clearer validation, recovery, and state transitions.
- API and UI contracts are aligned around expected resident behavior.
- Edge cases are documented and handled consistently.
- The booking flow remains small enough for portfolio review.

Candidate work:
- Improve date and slot selection ergonomics.
- Reduce form-level ambiguity.
- Clarify cancellation behavior.
- Add focused regression coverage where risk justifies it.

Non-goals:
- Admin operations.
- Multi-tenant complexity.
- Production user accounts.
- Payments or billing.

## Phase 3 - Design Foundation and UI Polish

Goal:
Create a coherent visual and interaction foundation after the product flow is stable enough to polish.

Expected outcomes:
- UI layout, spacing, typography, status badges, and form states are consistent.
- Resident workflows are easier to scan and explain.
- Demo presentation feels intentional without hiding the technical product behavior.

Candidate work:
- Establish a small design baseline.
- Improve responsive layout.
- Polish empty, loading, success, and error states.
- Keep UI scope product-driven rather than redesign-driven.

Non-goals:
- Large design-system buildout.
- New UI library by default.
- Marketing landing page unless later approved.

## Phase 4 - Portfolio and Demo Evidence

Goal:
Package the project as demonstrable portfolio evidence with clear product narrative, technical evidence, and reviewable local execution.

Expected outcomes:
- Project has a concise portfolio narrative.
- Demo flow can be reproduced reliably.
- Evidence documents show what works, what is intentionally out of scope, and what tradeoffs were made.
- Repository history and documentation tell the product evolution clearly.

Candidate work:
- Demo script.
- Portfolio README updates.
- Evidence screenshots or local smoke notes.
- Final scope and limitation summary.

Non-goals:
- Production launch.
- Complex deployment architecture.
- Enterprise administration.
