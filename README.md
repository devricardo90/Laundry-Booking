# Laundry Booking Condo

Laundry Booking Condo is a pnpm workspace for a shared condominium laundry booking MVP.

## Current Repository Status / Purpose

The repository currently contains:

- an Angular web app in `apps/web`
- a Fastify TypeScript API in `apps/api`
- a Prisma schema, migration, and seed script in `prisma`
- product, architecture, and operations documentation in `docs`

The codebase is for local MVP development and demo preparation. Deployment and production setup are not defined in the repository.

## Tech Stack Detected From The Repo

- Package manager: pnpm `10.33.0`
- Runtime target: Node.js `^20.19.0 || ^22.12.0 || ^24.0.0`
- Web: Angular, TypeScript, Tailwind CSS
- API: Fastify, TypeScript
- Database/ORM: Prisma with PostgreSQL
- Web test dependency: Vitest

## Project Structure

```text
.
|-- apps/
|   |-- api/          Fastify API source and package scripts
|   `-- web/          Angular web app source and package scripts
|-- docs/
|   |-- architecture/ Architecture notes and API contracts
|   |-- ops/          Operational status and runtime notes
|   `-- product/      Product scope, rules, and domain notes
|-- prisma/
|   |-- migrations/   Prisma migration files
|   |-- schema.prisma Prisma data model
|   `-- seed.mjs      Development seed script
|-- package.json      Root workspace scripts and shared dependencies
|-- pnpm-workspace.yaml
|-- prisma.config.ts
|-- STATUS.md
`-- backlog.md
```

## How To Run Locally

The root `package.json` defines these local run commands:

```powershell
pnpm dev
pnpm dev:web
pnpm dev:web:3010
pnpm dev:api
```

The documented local runtime ports are:

- Web: `http://127.0.0.1:4200`
- API default: `http://127.0.0.1:3000` when `PORT` is unset
- Default proxied healthcheck through the web app: `http://127.0.0.1:4200/api/health`
- Alternative API for local UI/API validation: `http://127.0.0.1:3010`
- Alternative API healthcheck: `http://127.0.0.1:3010/health`
- Alternative proxied healthcheck through the web app: `http://127.0.0.1:4200/api/health`

The default `pnpm dev` flow starts the API on port `3000` and uses
`apps/web/proxy.conf.json`, which also targets `http://127.0.0.1:3000`.

If port `3000` is occupied locally, start the API on port `3010` and start the
web app with the alternative proxy config in separate terminals:

```powershell
$env:PORT='3010'
pnpm dev:api
```

```powershell
pnpm dev:web:3010
```

Keep `DATABASE_URL` set for the API as described in `.env.example`; the proxy
healthcheck does not require a live database connection, but the API requires the
variable at startup.

In the alternative flow, the proxied healthcheck at
`http://127.0.0.1:4200/api/health` should return:

```json
{
  "status": "ok",
  "service": "lbc-api"
}
```

Environment examples are provided in `.env.example`.

## Development Notes

- Root validation scripts are defined as `pnpm lint`, `pnpm typecheck`, and `pnpm build`.
- The Prisma schema defines `Resident`, `Admin`, `LaundryRoom`, `Booking`, and `BlockedSlot`.
- API source files currently include availability and booking routes.
- Operational and product context is tracked in `STATUS.md`, `backlog.md`, and `docs/ops`.
- No deployment, CI, Docker, authentication, or production environment configuration is defined in the repository.

## Git Verification Commands

Useful commands before and after documentation-only changes:

```powershell
git status --short --untracked-files=all
git status -sb
git rev-parse HEAD
git rev-parse origin/main
git diff -- README.md
```
