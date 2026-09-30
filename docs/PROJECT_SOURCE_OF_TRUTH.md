# Laundry Booking Condo — Project Source of Truth

Audit date: 2026-09-30 UTC. VERIFIED FACTS are from this checkout; UNKNOWN means not present.

## 1. Repository identity

- Repository: `git@github.com:devricardo90/Laundry-Booking.git`
- Branch: `main`
- Audited commit: `57363dc441e1f231c0086fd8bba281d93f9bf028` (the pre-documentation audit baseline and `origin/main` at audit time; the documentation commit is `9125614bd57746773b660de1ac21ef7c2a654459`)
- Working tree was clean before this documentation change.

## 2. Product purpose

LBC is a local/demo MVP for scheduling shared condominium laundry-room time. `README.md:3-16` documents availability lookup, fixed two-hour booking creation, booking listing, future cancellation, development presets, and conflict rules; `README.md:5` says it is not deployed. The resident journey is preset setup, date selection, availability check, slot selection, create, list, and cancel (`apps/web/src/app/app.ts:187-313`, `apps/api/src/availability.ts:117-248`, `apps/api/src/bookings.ts:259-565`). Admin is only a persistence model/seed record (`prisma/schema.prisma:37-48`, `prisma/seed.mjs:81-88`); no admin UI/API exists.

## 3. Current architecture

Frontend is one Angular standalone app in `apps/web`: bootstrap in `src/main.ts`, HTTP provider in `src/app/app.config.ts`, component/state in `src/app/app.ts`, Tailwind template in `app.html`. Relative `/api` calls proxy to `127.0.0.1:3000` or 3010 (`proxy.conf.json`, `proxy.3010.conf.json`). No frontend route tree was found.

Backend is Fastify TypeScript in `apps/api`; `src/server.ts` registers `GET /health`, `GET /laundry-rooms/:laundryRoomId/availability?date=YYYY-MM-DD`, `GET /bookings`, `POST /bookings`, and `POST /bookings/:bookingId/cancel`. Validation is manual TypeScript. Existing docs mention Zod, but Zod is absent from manifests and imports.

PostgreSQL is accessed by Prisma 7 and `@prisma/adapter-pg`; `apps/api/src/prisma.ts:1-16` requires `DATABASE_URL`. No payment, notification, identity provider, hosted deployment, object storage, or other integration configuration was found; outside-repository infrastructure is UNKNOWN.

## 4. Technology stack

TypeScript, JavaScript seed, SQL; Angular `^21.2.0`, TypeScript `~5.9.2`, RxJS, Tailwind CSS `^4.3.0`, Vitest/jsdom; Fastify `^5.8.5`, tsx; Prisma/client `^7.8.0`, adapter-pg, pg. Package manager is pnpm `10.33.0`, workspace `apps/*`. Declared Node is `^20.19.0 || ^22.12.0 || ^24.0.0`; audited Node was `v26.5.1` and emitted an engine warning.

## 5. Repository map

`apps/web` Angular UI/proxies/tests; `apps/api` Fastify/routes/Prisma bootstrap; `prisma` schema, one migration, seed; `prisma.config.ts` Prisma paths and env binding; `docs/architecture`, `docs/product`, `docs/ops` architecture/product/operations documentation; README/STATUS/backlog entry points; `.env.example` template. No `packages/`, Dockerfile/Compose, `.github/workflows`, deployment manifest, or tracked E2E directory was found.

## 6. Runtime/development setup

Prerequisites are supported Node, pnpm 10.x, local PostgreSQL, and `DATABASE_URL` (`.env.example`, `apps/api/src/prisma.ts`). README documents:

    pnpm install
    $env:DATABASE_URL='postgresql://user:***@localhost:5432/lbc_dev'
    pnpm exec prisma migrate deploy
    pnpm exec prisma db seed
    pnpm dev

Web is port 4200; API defaults to 3000. `HOST` defaults to `127.0.0.1`, `PORT` to 3000 (`apps/api/src/server.ts:22-35`). Alternate API 3010 uses `PORT=3010`, `pnpm dev:api`, and `pnpm dev:web:3010`.

## 7. Data layer

Models are Resident, Admin, LaundryRoom, Booking, BlockedSlot; enums are AccountStatus, LaundryRoomStatus, BookingStatus (`prisma/schema.prisma:9-99`). UUID IDs, timestamptz timestamps, unique emails/room name, RESTRICT foreign keys. The initial migration creates tables/indexes/constraints (`prisma/migrations/20260513195342_init/migration.sql`). Availability generates twelve two-hour Europe/Stockholm slots and gives BLOCKED precedence (`availability.ts:148-247`). Booking creation uses a transaction and PostgreSQL advisory locks and checks active records, one future resident booking, overlap, and blocked slot (`bookings.ts:350-440`). Cancellation updates future ACTIVE records (`bookings.ts:483-540`).

Risks: no database exclusion, duration CHECK, or ACTIVE-only uniqueness constraint; runtime code is enforcement. Seed is development-only/time-relative (`prisma/seed.mjs:51-163`).

## 8. Authentication/security

Authentication and runtime authorization are MISSING: no login/session/token provider, identity middleware, ownership check, or admin permission check exists. API accepts caller-supplied UUIDs. `.env.example` is masked; no `.env` is tracked. Development UUID presets are in `apps/web/src/app/app.ts:8-15`.

## 9. Feature inventory

IMPLEMENTED: availability/validation/window/timezone; fixed slots; booking creation/conflicts; booking list filters; future cancellation/refresh; Angular resident demo; Prisma schema/migration/seed; health and proxy. Evidence: `apps/api/src/{availability,bookings}.ts`, `apps/web/src/app/{app.ts,app.html}`, `prisma/*`.

PARTIAL: testing (one Angular spec, two tests, no API/E2E); administration (model/seed only); production readiness (local only); persistence hardening (locks but no DB constraints); status documentation (historical records exist).

MISSING: authentication/authorization, admin surface/API, payments, notifications, reporting, production deployment, CI/CD, API/E2E regression suite, and verified integrations beyond local PostgreSQL/proxy.

## 10. Quality gates

Ran with pnpm 10.33.0 on Node v26.5.1.

| Gate | Exact command | Result |
|---|---|---|
| Lint | `pnpm lint` | FAILED exit 2: web Prettier passed; API missing PrismaClient/Prisma exports and implicit-any errors. |
| Typecheck | `pnpm typecheck` | FAILED exit 2, same API errors; web passed. |
| Web tests | `pnpm --filter web test --watch=false` | PASSED: 1 file, 2 tests. |
| Build | `pnpm build` | FAILED exit 2 because API failed; web build completed. |
| Prisma validation | `pnpm exec prisma validate --config prisma.config.ts` | FAILED exit 1: DATABASE_URL missing; no DB changed. |
| Diff check | `git diff --check` | PASSED exit 0, run after writing and before the documentation commit. |

The attempted `pnpm --filter web test -- --watch=false --browsers=ChromeHeadless` failed Angular schema parsing due duplicated `--`; the direct test command passed. No API repair was attempted.

## 11. CI/CD and deployment

No GitHub Actions, Docker, hosting, IaC, deployment manifest, domain, TLS, production environment, rollback, or observability config is tracked. Operation is local processes plus PostgreSQL. README says no deployment exists.

## 12. Known issues and technical debt

API lint/typecheck/build fail; Node baseline is outside declared range; Prisma validation requires DATABASE_URL; no auth; no API/E2E suite; no CI/Docker/deployment; business rules are mainly application-level; demo UUIDs ship in UI; status docs include historical claims; Zod is documented but absent.

## 13. Autonomous-development blockers

API gates are not green; no CI exists; no auth boundary exists; correctness checks require controlled PostgreSQL; original LBC-009 readiness criteria are missing/blocking (`README.md:109-115`, `docs/ops/status.md:5-19`); no deployment/rollback/observability procedure exists.

## 14. Recommended execution order

P0: restore reproducible Prisma/API TypeScript state and green gates; run Prisma/database checks against controlled PostgreSQL; recover/approve LBC-009 criteria; decide auth boundary.

P1: add API/integration tests; add CI for lockfile install, gates, Prisma validation/build; resolve manual validation vs Zod; harden persistence after confirming PostgreSQL.

P2: add an approved container/deployment target and rollback/secrets plan; expand admin/integrations only from approved scope; automate historical/current status distinction.

## 15. Definition of Ready for autonomous sprint execution

Acceptance criteria, scope, owner decisions, baseline commit, services/variables, executable gates, affected API/database/auth boundaries, migration/dependency permissions, test strategy, and reviewer evidence paths must be recorded. Missing decisions must not be replaced by inference.

## 16. Open questions requiring Owner decision

1. What is the authoritative recovered LBC-009 checklist?
2. Is LBC local/demo-only or is a production host/database/domain/TLS/secrets/rollback target approved?
3. What auth provider/session model and resident/admin authorization rules are approved?
4. Should manual validation remain or should Zod be adopted?
5. Which DB constraints are required beyond advisory locks and what PostgreSQL version is supported?
6. Is one-future-booking a universal rule or MVP demo rule?
7. What CI platform and merge gates are required?

## 17. Audit appendix

Commands: git status --short --branch; git rev-parse HEAD; git branch --show-current; git log -8 --oneline --decorate; git remote -v; git ls-files; date -u; pnpm lint; pnpm typecheck; both web test invocations; pnpm build; pnpm exec prisma validate --config prisma.config.ts; git diff --check.

Successful: identity/remote read; web Prettier; web typecheck; corrected web test (1 file/2 tests); web build; `git diff --check` (exit 0). Failed: root lint/typecheck/build from API errors; duplicated-argument test invocation; Prisma validate from missing DATABASE_URL. Not executed: migration/seed/API smoke/full browser flow because no database was assumed/created; deployment/CI/Docker checks because absent. No source/dependency repair was attempted.
