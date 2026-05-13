# Ops Status

Project: LBC - Laundry Booking Condo

Current task: LBC-004B - Apply Dev Prisma Migration and Seed Minimal Availability Data

Task status: READY FOR TRIGGER REVIEW

Repository status:
- Repository initialized.
- LBC-001 is Remote DONE at commit `3d90251`.
- LBC-002A is Remote DONE at commit `d6b7673cc6be018308b2d8bf4d6220141e58f509`.
- LBC-002B is Remote DONE at commit `b577a40b61b016aef345d27e41cd8dcc9c9ff67a`.
- LBC-002C is Remote DONE at commit `93f32c7`.
- LBC-003A is Remote DONE at commit `fe1ac8c`.
- LBC-003B is Remote DONE at commit `c31ed8c`.
- LBC-003C is Remote DONE at commit `e5285f4`.
- LBC-004A is Remote DONE at commit `967a321`.
- LBC-004B is ready for Trigger review after local/dev database, migration, generate, and seed.
- Minimum Angular web and Fastify API scaffold files have been created.
- Dependencies have been installed with pnpm.
- `pnpm-lock.yaml` has been created.
- No commit has been made for LBC-004B.
- No push has been made for LBC-004B.

Protocol checks:
- One READY task only: LBC-004B is active and awaiting Trigger review.
- LBC-004B READY: ready for Trigger review.
- Evidence missing: pending final Trigger review.
- Authorized file scope respected: pending final diff verification.
- Local DONE declared: no.
- Remote DONE declared: no.

Current approved stack:
- Frontend: Angular + TypeScript + Tailwind.
- Backend: Fastify + TypeScript.
- Validation: Zod.
- ORM: Prisma.
- Database: PostgreSQL.
- MongoDB: outside current decision.

Critical rule:
- The system must prevent time conflicts in the same laundry room.

Timezone rule:
- Store times in UTC.
- Display times in the operational timezone `Europe/Stockholm`, unless changed by a later decision.

Initial repository guard:
- `pwd`: run before LBC-002A changes.
- Branch: `main`.
- `HEAD`: `3d90251f844641e2df5d8e4f00942cd5d88e299c`.
- `origin/main`: `3d90251f844641e2df5d8e4f00942cd5d88e299c`.
- Initial status: no tracked or untracked file entries were reported, only Git config ignore permission warnings.

LBC-002A decision draft:
- Future scaffold structure: simple monorepo.
- Future package manager: pnpm.
- Future runtime target: Node.js 24.x LTS.
- Future frontend target: Angular 21.x with TypeScript 5.9.x.
- Future backend target: Fastify 5.8.x.
- Future validation target: Zod 4.4.x.
- Future ORM target: Prisma 7.8.x.
- Future database target: PostgreSQL 18.x.
- Future CSS framework target: Tailwind CSS 4.3.x.

LBC-002B authorized scope:
- Root workspace files: `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, and `.gitignore`.
- Web scaffold: `apps/web/**`.
- API scaffold: `apps/api/**`.
- Ops documents: `STATUS.md`, `backlog.md`, `docs/ops/status.md`, `docs/ops/backlog.md`, `docs/ops/execution-log.md`, and `docs/ops/session-handoff.md`.

LBC-002B blocked scope:
- `packages/shared`.
- Prisma, schema, migrations, seed, and real database.
- Auth, booking rules, conflict prevention, domain endpoints, and domain screens.
- Deploy, CI, Docker, tests E2E, and LBC-002C.

LBC-002B validation status:
- `pnpm install`: passed.
- `pnpm lint`: passed.
- `pnpm typecheck`: passed.
- `pnpm build`: passed.
- `pnpm --filter web build`: passed.
- `pnpm --filter api build`: passed.

LBC-002C authorized scope:
- Root local runtime scripts in `package.json`.
- Web runtime script updates in `apps/web/package.json`.
- API `HOST` and `PORT` defaults in `apps/api/src/server.ts`.
- `.env.example` without secrets.
- Local runtime documentation in `docs/ops/local-runtime.md`.
- Operational docs updates.

LBC-002C blocked scope:
- New dependencies.
- `pnpm approve-builds`.
- `packages/shared`.
- Prisma, schema, migrations, seed, and real database.
- Auth, booking rules, conflict prevention, domain endpoints, and domain screens.
- Deploy, CI, Docker, and new READY tasks.

LBC-003A authorized scope:
- Create or update `docs/product/domain-model.md`.
- Update `docs/product/business-rules.md`.
- Update `docs/product/mvp-scope.md`.
- Update operational docs for the task.

LBC-003A blocked scope:
- Prisma schema, migrations, seed, and real database.
- Endpoints, controllers, services, and repositories.
- Angular product screens or components.
- Runtime changes, dependency changes, `pnpm approve-builds`, deploy, CI, Docker, and `packages/shared`.

LBC-003B authorized scope:
- Create `docs/architecture/persistence-model.md`.
- Update `docs/product/business-rules.md`.
- Update `docs/product/domain-model.md`.
- Update operational docs for the task.

LBC-003B blocked scope:
- Prisma schema, migrations, seed, real database, and `DATABASE_URL` changes.
- Endpoints, controllers, services, and repositories.
- Angular product screens or components.
- Runtime changes, dependency changes, `pnpm approve-builds`, deploy, CI, Docker, and `packages/shared`.

LBC-003C authorized scope:
- Create the `prisma` folder if needed.
- Create `prisma/schema.prisma`.
- Define PostgreSQL datasource and Prisma Client generator.
- Model Resident, Admin, LaundryRoom, Booking, and BlockedSlot.
- Define minimum enums, relationships, foreign keys, statuses, timestamps, `startTime`, `endTime`, and `canceledAt` where applicable.
- Document schema baseline limitations around overlap and race-condition protection.
- Update authorized operational documentation.
- Run Prisma schema validation only if the Prisma CLI is already available locally.

LBC-003C blocked scope:
- Migrations, `prisma migrate`, `prisma db push`, seed data, real database access, and `.env` or `DATABASE_URL` file changes.
- Dependency installation and `pnpm approve-builds`.
- Endpoints, controllers, services, repositories, Angular screens, auth, and real booking flows.
- Deploy, CI, Docker, `packages/shared`, new READY tasks, commit, and push.

LBC-004A authorized scope:
- Promote LBC-004A as the only READY task.
- Create or update the Availability API contract documentation.
- Define the proposed endpoint `GET /laundry-rooms/:id/availability?date=YYYY-MM-DD`.
- Define `Europe/Stockholm` date interpretation, UTC storage/comparison, and ISO UTC response timestamps.
- Define response shape, slot shape, status values, and reason privacy rules.
- Define the 14-day read window as contract-only behavior.
- Define the dev persistence strategy before real endpoint implementation.
- Update authorized operational documentation.

LBC-004A blocked scope:
- Endpoint implementation, Fastify route/controller, service, repository, and runtime overlap logic.
- Prisma migration, Prisma generate, Prisma db push, seed, and real database access.
- Dependency installation, `package.json` changes, `pnpm approve-builds`, tests, auth, Angular UI, booking creation, deploy, CI, Docker, commit, push, and opening LBC-004B as READY.

LBC-004B authorized scope:
- Add `prisma` as a dev dependency and `@prisma/client` as a dependency.
- Keep `node_modules` out of Git.
- Validate `prisma/schema.prisma`.
- Add Prisma 7 configuration required for local migrations.
- Use `DATABASE_URL` only in the terminal session or a non-versioned local `.env`.
- Update `.env.example` with a fictitious local `DATABASE_URL` if needed.
- Apply local dev migration only against local/dev PostgreSQL.
- Generate Prisma Client if needed.
- Create and run a minimal development seed only after migration succeeds.
- Prove minimum data exists with safe local inspection.
- Update authorized operational documentation.

LBC-004B local persistence result:
- Local/dev database `lbc_dev` was created after Trigger authorization.
- Dev migration `init` was created and applied.
- Prisma Client generation completed.
- Minimal development seed was created and executed.
- Seed output verified one LaundryRoom, one Resident, one Admin, one ACTIVE Booking, one CANCELED Booking, and one BlockedSlot.
- Local DONE has not been declared.

LBC-004B blocked scope:
- Endpoint implementation, Fastify route/controller/service/repository, runtime availability logic, Angular UI, auth, booking creation, booking cancellation, production seed, production database, Docker, CI, deploy, `packages/shared`, `prisma db push`, and opening LBC-004C as READY.
