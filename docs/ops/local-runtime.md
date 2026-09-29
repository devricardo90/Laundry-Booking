# Local Runtime

Project: LBC - Laundry Booking Condo

Task: LBC-002C - Define API/Web local runtime and environment baseline

## Official Local Ports

- Web: `http://127.0.0.1:4200`
- API default: `http://127.0.0.1:3000` when `PORT` is unset
- Default proxied healthcheck through the web app: `http://127.0.0.1:4200/api/health`
- Alternative API for local UI/API validation: `http://127.0.0.1:3010`
- Alternative API healthcheck: `http://127.0.0.1:3010/health`
- Alternative proxied healthcheck through the web app: `http://127.0.0.1:4200/api/health`

## Official Commands

Run the web app:

```powershell
pnpm dev:web
```

Run the web app with the alternative proxy that targets API port `3010`:

```powershell
pnpm dev:web:3010
```

Run the API:

```powershell
pnpm dev:api
```

Run web and API together:

```powershell
pnpm dev
```

The default `pnpm dev` flow starts the API on port `3000` and uses
`apps/web/proxy.conf.json`, which also targets `http://127.0.0.1:3000`.

For local UI/API validation when port `3000` is occupied, run the API on port
`3010` and the web app with the alternative proxy config in separate terminals:

```powershell
$env:PORT='3010'
pnpm dev:api
```

```powershell
pnpm dev:web:3010
```

## API Environment

The API reads runtime host and port from environment variables:

```text
HOST=127.0.0.1
PORT=3000
```

Defaults are applied when those values are not provided:

- `HOST`: `127.0.0.1`
- `PORT`: `3000`

The API rejects invalid port values before listening.

The default Angular dev proxy file, `apps/web/proxy.conf.json`, targets
`http://127.0.0.1:3000` for `/api/*`. The alternative proxy file,
`apps/web/proxy.3010.conf.json`, targets `http://127.0.0.1:3010` for `/api/*`.
Use `pnpm dev:web:3010` when validating through the alternative proxy.

The API still requires `DATABASE_URL` at startup. `.env.example` documents the
local development format; the proxy healthcheck does not require a live database
connection.

## Healthcheck

The API exposes a technical healthcheck only:

```text
GET /health
```

Expected response shape:

```json
{
  "status": "ok",
  "service": "lbc-api"
}
```

This endpoint is not a product endpoint and must not contain booking, resident, administrator, database, or authentication behavior.

## Validation

Before commit, run:

```powershell
pnpm lint
pnpm typecheck
pnpm build
```

## Out Of Scope

- Prisma schema.
- Migrations.
- Seed data.
- Real database.
- Authentication.
- Booking rules.
- Reservation conflict logic.
- Product endpoints.
- Product screens.
- Deploy.
- CI.
- Docker.
- `packages/shared`.
- New dependencies.
