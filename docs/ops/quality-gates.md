# Quality gates

Run these commands from the repository root. The supported toolchain is Node 24 and pnpm 10.33.0.

## Install and static checks

```sh
corepack enable
corepack prepare pnpm@10.33.0 --activate
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

`pnpm test` runs the API integration tests against PostgreSQL and the Angular tests once in non-watch mode. The web test command is intentionally invoked through `pnpm exec` so Angular does not receive a duplicated `--` argument.

## Prisma and database checks

Set `DATABASE_URL` to a disposable PostgreSQL database before running database commands. The checked-in migration is applied before seeding, and the seed is development data only.

```sh
pnpm prisma:validate
pnpm db:check
```

`pnpm prisma:validate` checks the schema and requires `DATABASE_URL` because `prisma.config.ts` reads it explicitly. `pnpm db:check` runs `prisma migrate deploy`, `prisma db seed`, and the API database-backed tests in that order. Tests create uniquely named temporary residents and remove their records during teardown; run them only against a disposable development database.

For a clean local database, use the values in `.env.example`, then run the commands above. Do not commit `.env` or real credentials.

## Individual gates

- `pnpm test:api` — API/database regression tests; requires migrated and seeded PostgreSQL.
- `pnpm test:web` — Angular/Vitest tests, one non-watch run.
- `pnpm prisma:validate` — Prisma schema validation.
- `pnpm db:migrate` — apply checked-in migrations.
- `pnpm db:seed` — load development fixtures.
- `pnpm db:check` — complete reproducible database check.
- `git diff --check` — whitespace validation before commit.
