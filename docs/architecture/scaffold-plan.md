# Scaffold Plan

Project: LBC - Laundry Booking Condo

Task: LBC-002A - Define Scaffold Plan and Version Matrix

## Decision

The future scaffold should use a simple monorepo.

This keeps the frontend, backend, shared TypeScript contracts, and database tooling in one repository while avoiding a multi-repo coordination cost for the MVP.

No scaffold is created by this document.

## Proposed Project Structure

```text
.
|-- apps/
|   |-- web/
|   |   |-- Angular application
|   |   |-- Tailwind integration
|   |   `-- frontend tests and build config
|   `-- api/
|       |-- Fastify application
|       |-- Zod request validation
|       |-- Prisma client usage
|       |-- prisma/
|       |   |-- schema.prisma
|       |   `-- migrations/
|       `-- backend tests and build config
|-- packages/
|   `-- shared/
|       |-- shared TypeScript types
|       `-- cross-app constants only when needed
|-- docs/
|   |-- architecture/
|   |-- product/
|   `-- ops/
|-- package.json
|-- pnpm-workspace.yaml
|-- tsconfig.base.json
`-- .env.example
```

## Monorepo Boundaries

- `apps/web` owns browser UI, routing, forms, Tailwind usage, and frontend build output.
- `apps/api` owns HTTP API, Fastify server setup, validation boundaries, Prisma access, and database commands.
- `packages/shared` is optional at scaffold time and should stay small. It may hold DTO types or constants only after both apps need them.
- Prisma files should live under `apps/api/prisma` because persistence belongs to the backend boundary.
- Documentation stays under `docs`.

## Package Manager

Use `pnpm` with a workspace file.

Recommended baseline for the future scaffold: `pnpm` 10.x through Corepack.

Reason:
- The existing operational command examples already use `pnpm`.
- `pnpm` workspaces fit a simple monorepo without adding a heavier build system.
- A future task may revisit pnpm 11.x after its defaults and ecosystem impact are explicitly accepted.

## Expected Future Validation Commands

These commands are expected after the scaffold exists and dependencies are installed. They must not be run as part of LBC-002A.

```powershell
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm --filter web build
pnpm --filter api build
pnpm prisma:validate
pnpm prisma:migrate:deploy
```

The exact script names may be adjusted in the scaffold task, but the scaffold should expose equivalent validation for install reproducibility, linting, type checking, tests, builds, Prisma schema validation, and migration deployment.

## Scaffold Limits

The future scaffold should create only the minimum project skeleton needed to validate the approved stack:

- Workspace metadata.
- Angular app shell under `apps/web`.
- Fastify app shell under `apps/api`.
- TypeScript configuration.
- Tailwind setup for the Angular app.
- Prisma package setup and placeholder command wiring only when the Prisma task authorizes schema creation.
- Environment example file without real secrets.
- Validation scripts.

The scaffold must avoid product behavior beyond proving the toolchain can build.

## Outside Scope

The following remain outside the scope of LBC-002A:

- Installing dependencies.
- Creating Angular files.
- Creating Fastify files.
- Creating Prisma schema.
- Creating migrations.
- Creating seed data.
- Creating tests.
- Creating application code.
- Creating endpoints.
- Creating screens.
- Changing README.
- Committing.
- Pushing.
- Declaring Local DONE.
- Declaring Remote DONE.

The following should also remain outside the future scaffold unless explicitly authorized by a later task:

- Authentication.
- Authorization roles.
- Booking business logic.
- Conflict prevention implementation.
- Database constraints.
- Production deployment configuration.
- CI configuration.
- UI design system work beyond Tailwind availability.

## LBC-002A DONE Criteria

LBC-002A can be considered DONE only after all of the following are true:

- The proposed project structure is documented.
- The monorepo decision is documented.
- The version matrix is documented.
- The package manager decision is documented.
- Future validation commands are documented.
- Scaffold limits are documented.
- Out-of-scope items are documented.
- LBC-002B remains BACKLOG and is not READY.
- Diff evidence is presented for all authorized files.
- `git diff --check` passes.
- Trigger authorization is received before any DONE declaration.

## Status

This is a documentation-only decision for LBC-002A.

No scaffold, dependency installation, application code, schema, migration, seed, test, endpoint, or screen has been created.
