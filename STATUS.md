# LBC Status

Project: LBC - Laundry Booking Condo

Current next unit: LBC-008C - README and portfolio demo evidence

Status: FUTURE / SUGGESTED; not promoted to READY

## Current Recovery State - 2026-09-29

- Latest commit: `2d20d97`; `HEAD` and `origin/main` are aligned; working tree was clean before this documentation reconciliation.
- SPR-01 - Product Demo Readiness remains the current sprint.
- LBC-008A: Remote DONE at `4c6829d`.
- LBC-008B: Remote DONE at `3ce264c`.
- LBC-008C: Future / Suggested; README at `ee2015c` does not meet all recorded criteria.
- LBC-009 validation/readiness (Owner-referenced): BLOCKED pending LBC-008C; its original acceptance checklist is absent from the repository.
- LBC-009A manual deployment discussion remains Future / Suggested.
- LBC-010: Remote DONE at `2d20d97`.
- Operational backlog authority: `docs/ops/backlog.md`; root `backlog.md` is its synchronized entry-point mirror.

Historical scope guard (LBC-008A READY opening, 2026-07-08):
- Authorized files for this planning task: `STATUS.md`, `backlog.md`, `docs/ops/status.md`, `docs/ops/backlog.md`, `docs/ops/execution-log.md`, `docs/ops/session-handoff.md`, and `docs/product/roadmap.md`.
- Strictly blocked: `apps/web/*`, `apps/api/*`, `prisma/*`, `package.json`, lockfiles, migrations, seed, Docker, dependencies, deploy, UI changes, backend changes, auth, and opening multiple READY tasks at once.
- No code implementation yet, only documentation planning.

Next planned sequence:
1. LBC-008C - README and portfolio demo evidence (existing task; currently Future / Suggested)
2. Resume Owner-referenced LBC-009 validation/readiness only after its dependency and acceptance checklist are resolved.
3. LBC-009A remains a separate Future / Suggested manual deployment discussion.

Product direction:
- Make the app functional, visually solid, responsive on mobile.
- Document with a good README.
- Later manual deploy for testing (no deploy yet).
- No Prisma/database changes yet.
