# LBC Status

Project: LBC - Laundry Booking Condo

Current task: LBC-004A - Define Availability API Contract and Dev Persistence Strategy

Status: Local DONE

Protocol state:
- No task is READY.
- LBC-001 is Remote DONE at commit `3d90251`.
- LBC-002A is Remote DONE at commit `d6b7673cc6be018308b2d8bf4d6220141e58f509`.
- LBC-002B is Remote DONE at commit `b577a40b61b016aef345d27e41cd8dcc9c9ff67a`.
- LBC-002C is Remote DONE at commit `93f32c7`.
- LBC-003A is Remote DONE at commit `fe1ac8c`.
- LBC-003B is Remote DONE at commit `c31ed8c`.
- LBC-003C is Remote DONE at commit `e5285f4`.
- LBC-004A is approved by the Trigger for Local DONE and commit.
- Minimum scaffold files have been created for `apps/web` and `apps/api`.
- Dependencies have been installed with pnpm and `pnpm-lock.yaml` has been created.
- Availability API contract and dev persistence strategy changes are approved for local commit.
- No migration, seed, or real database has been created.
- No database connection, auth, booking rules implementation, domain endpoints, or domain screens have been created.
- No deploy, CI, Docker, or `packages/shared` work is authorized.
- No commit or push has been made for LBC-004A yet.
- PostgreSQL is the approved primary database.
- MongoDB is outside the current decision.

Scope guard:
- Files authorized for LBC-004A are selected architecture, product, and ops documentation.
- Authorized architecture files: `docs/architecture/availability-api-contract.md` and `docs/architecture/persistence-model.md`.
- Authorized product file: `docs/product/business-rules.md`.
- Authorized ops files: `STATUS.md`, `backlog.md`, `docs/ops/status.md`, `docs/ops/backlog.md`, `docs/ops/execution-log.md`, and `docs/ops/session-handoff.md`.
- Runtime, dependency, migration, seed, real database, endpoint, API code, Angular product UI, deploy, CI, Docker, and `packages/shared` changes are blocked.

Completion evidence checklist:
- Availability endpoint contract is documented.
- `date=YYYY-MM-DD` interpretation in `Europe/Stockholm` is documented.
- UTC storage/comparison and ISO UTC response timestamps are documented.
- Response shape, slot format, slot status, and reason rules are documented.
- 14-day read window rule is documented as contract only.
- Dev persistence strategy recommends migration and seed before the real endpoint.
- `git status --short --untracked-files=all`, `git diff --stat`, and `git diff --check` evidence presented.
- New `docs/architecture/availability-api-contract.md` must be made diff-auditable with `git add -N` before commit authorization is requested.
- Local DONE is approved by the Trigger after evidence review.
- Remote DONE must not be declared without push and origin synchronization verification.
