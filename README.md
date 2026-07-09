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
pnpm dev:api
```

The documented local runtime ports are:

- Web: `http://127.0.0.1:4200`
- API: `http://127.0.0.1:3000`
- API healthcheck: `http://127.0.0.1:3000/health`

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
