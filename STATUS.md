# LBC Status

Project: LBC - Laundry Booking Condo

Current task: LBC-007C - Validate Demo Presets and Record Demo Smoke Evidence

Status: READY

Protocol state:
- LBC-001 through LBC-007B are Remote DONE.
- Latest remote commit: `9009aa5` (LBC-007B).
- Official current sprint: SPR-01 - Product Demo Readiness.
- LBC-007B is Remote DONE at commit `9009aa5`.
- LBC-007C is opened as READY by documentation-only authorization.
- LBC-007C is documentation/evidence only and does not authorize product code changes.
- One active READY task only: LBC-007C.

Scope guard:
- Authorized files for this READY opening: `STATUS.md`, `backlog.md`, `docs/ops/status.md`, `docs/ops/backlog.md`, `docs/ops/execution-log.md`, and `docs/ops/session-handoff.md`.
- Strictly blocked during this READY opening: `apps/web/*`, `apps/api/*`, `prisma/*`, `package.json`, lockfiles, migrations, seed, Docker, dependencies, deploy, UI changes, backend changes, auth, and any new READY task besides LBC-007C.

LBC-007C smoke target:
- Start local PostgreSQL, API, and web if needed.
- Use Development Presets.
- Check availability.
- Create booking.
- List booking.
- Cancel booking.
- Confirm success, error, and empty states where possible.

Completion evidence checklist:
- LBC-007B recorded as Remote DONE at `9009aa5`.
- LBC-007C recorded as the only READY task.
- LBC-007C recorded as documentation/evidence only.
- Smoke evidence target documented without changing code.
- `git diff --check` validated.
- No code, config, backend, UI, dependency, migration, seed, Docker, deploy, auth, commit, or push changes made.
