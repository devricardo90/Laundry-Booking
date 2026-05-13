# Local Runtime

Project: LBC - Laundry Booking Condo

Task: LBC-002C - Define API/Web local runtime and environment baseline

## Official Local Ports

- Web: `http://127.0.0.1:4200`
- API: `http://127.0.0.1:3000`
- API healthcheck: `http://127.0.0.1:3000/health`

## Official Commands

Run the web app:

```powershell
pnpm dev:web
```

Run the API:

```powershell
pnpm dev:api
```

Run web and API together:

```powershell
pnpm dev
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
