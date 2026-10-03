# LBC Status

Project: LBC - Laundry Booking Condo

Next unit: LBC-009 - local validation/readiness (BLOCKED; acceptance criteria missing)

Status: SPR-01 active; no unblocked implementation unit is READY.

## Current Recovery State - 2026-10-03

- LBC-010 implementation commit: `2d20d97`; governance reconciliation commit: `82b51e9`.
- SPR-01 - Product Demo Readiness remains the current sprint.
- LBC-008A: Remote DONE at `4c6829d`.
- LBC-008B: Remote DONE at `3ce264c`.
- LBC-008C: Remote DONE; README and portfolio evidence acceptance criteria are complete.
- LBC-009 validation/readiness (Owner-referenced): BLOCKED because its original acceptance checklist is absent from the repository; do not invent criteria.
- LBC-009A manual deployment discussion remains Future / Suggested.
- LBC-010: Remote DONE at `2d20d97`.
- Operational backlog authority: `docs/ops/backlog.md`; root `backlog.md` is its synchronized entry-point mirror.

Historical scope guard (LBC-008A READY opening, 2026-07-08):
- Authorized files for this planning task: `STATUS.md`, `backlog.md`, `docs/ops/status.md`, `docs/ops/backlog.md`, `docs/ops/execution-log.md`, `docs/ops/session-handoff.md`, and `docs/product/roadmap.md`.
- Strictly blocked: `apps/web/*`, `apps/api/*`, `prisma/*`, `package.json`, lockfiles, migrations, seed, Docker, dependencies, deploy, UI changes, backend changes, auth, and opening multiple READY tasks at once.
- No code implementation yet, only documentation planning.

Next planned sequence:
1. LBC-009 remains BLOCKED until its original acceptance checklist is recovered and reviewed through an Owner Discussion Gate.
2. LBC-009A remains a separate Future / Suggested manual deployment discussion.

Product direction:
- Make the app functional, visually solid, responsive on mobile.
- Document with a good README.
- Later manual deploy for testing (no deploy yet).
- No Prisma/database changes yet.
