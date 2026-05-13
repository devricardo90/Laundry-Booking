# Ops Status

Project: LBC - Laundry Booking Condo

Current task: LBC-003C - Implement Prisma schema baseline

Task status: READY

Repository status:
- Repository initialized.
- LBC-001 is Remote DONE at commit `3d90251`.
- LBC-002A is Remote DONE at commit `d6b7673cc6be018308b2d8bf4d6220141e58f509`.
- LBC-002B is Remote DONE at commit `b577a40b61b016aef345d27e41cd8dcc9c9ff67a`.
- LBC-002C is Remote DONE at commit `93f32c7`.
- LBC-003A is Remote DONE at commit `fe1ac8c`.
- LBC-003B is Remote DONE at commit `c31ed8c`.
- Prisma schema baseline task is in progress.
- Minimum Angular web and Fastify API scaffold files have been created.
- Dependencies have been installed with pnpm.
- `pnpm-lock.yaml` has been created.
- No commit has been made for LBC-003C.
- No push has been made for LBC-003C.

Protocol checks:
- One READY task only: yes.
- LBC-003C READY: yes.
- Evidence missing: no current blocker identified.
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
