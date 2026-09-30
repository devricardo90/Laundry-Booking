# Current Objective

Project: LBC - Laundry Booking Condo

Current sprint:
SPR-01 - Product Demo Readiness

## Current Execution State - 2026-09-29

- LBC-008A: Remote DONE at `4c6829d`.
- LBC-008B: Remote DONE at `3ce264c`.
- LBC-008C: Remote DONE; README and portfolio evidence criteria passed review on 2026-09-30.
- LBC-009 validation/readiness: BLOCKED because its original acceptance checklist is not recorded in the repository.
- LBC-010: Remote DONE at `2d20d97`; the alternate API/proxy runtime and Angular test update passed review and runtime smoke.
- Next unit: LBC-009 validation/readiness is BLOCKED because its original acceptance checklist is missing. No implementation task is READY pending an Owner Discussion Gate to recover those criteria.

SPR-01 remains active. No new sprint is opened.

## Objective

Make Laundry Booking Condo demonstrable to an external person with clear flow, realistic demo states, and reduced friction, without opening full redesign, real auth, deploy, payments, or admin complexity.

## Allowed Scope

This sprint may include small, reviewable tasks that improve local product demonstration readiness.

Allowed areas:
- Product and operational documentation that anchors the sprint objective.
- Demo data strategy and demo preset documentation.
- Future Angular UI preset implementation when a separate READY task authorizes it.
- Demo state clarity for seeded or locally available data.
- Local review evidence for the resident booking flow.
- Small resident-flow usability improvements only when explicitly opened as READY tasks.

Task execution must continue to follow:
Product Roadmap -> Current Sprint Objective -> READY task -> Execution -> Review -> Commit -> Push.

## Explicit Non-Goals

The current sprint must not open:
- Full redesign.
- Real authentication.
- Admin complexity.
- Payment flows.
- Notification flows.
- Production deployment.
- Docker or CI/CD configuration.
- New database migrations unless a later READY task explicitly changes the sprint boundary.
- Seed execution unless a later READY task explicitly authorizes it.
- Broad backend rewrites.
- New dependencies by default.

## Exit Criteria

SPR-01 can be considered complete when:
- The product roadmap and current sprint objective are documented.
- Demo preset strategy is documented.
- UI demo presets are implemented only after a dedicated READY task authorizes the implementation.
- The local demo flow can be shown without manual UUID hunting.
- The demo can show realistic states: available, booked, blocked, active booking, canceled booking, validation error, and conflict error.
- Scope boundaries are documented and respected.
- Review evidence exists for the demo-ready flow.

## Candidate Tasks

### LBC-007A - Define Product Roadmap and Current Sprint Objective

Status:
READY / IN_PROGRESS.

Type:
DOCS / ROADMAP.

Goal:
Create the official roadmap and current sprint objective documentation so future implementation tasks are anchored to a clear product objective.

Allowed scope:
- `docs/product/roadmap.md`
- `docs/ops/current-objective.md`
- `STATUS.md`
- `backlog.md`
- `docs/ops/status.md`
- `docs/ops/backlog.md`
- `docs/ops/execution-log.md`
- `docs/ops/session-handoff.md`

### LBC-007B - Implement Angular UI Development Presets

Status:
FUTURE / SUGGESTED.

Type:
UI / UX.

Goal:
Implement demo presets in the Angular UI according to the documented strategy.

Important:
This task is not READY and must not be opened until Ricardo explicitly authorizes it.

## Other Candidate Tasks Not READY Yet

The following candidates are not READY:
- Demo script documentation.
- Resident booking flow stabilization tasks.
- Any auth, admin, notification, payment, deploy, Docker, or CI/CD task.
