# Version Matrix

Project: LBC - Laundry Booking Condo

Task: LBC-002A - Define Scaffold Plan and Version Matrix

Review date: 2026-05-13

## Decision Matrix

| Component | Recommended version | Decision |
| --- | --- | --- |
| Node.js | 24.x LTS | Use the current Active LTS line for frontend and backend tooling. |
| Angular | 21.x | Use the current supported Angular major. Do not target Angular 22 before release. |
| TypeScript | 5.9.x | Pin below 6.0 because Angular 21 requires `>=5.9.0 <6.0.0`. |
| Tailwind CSS | 4.3.x | Use the current Tailwind 4.3 line for the Angular app. |
| Fastify | 5.8.x | Use the current Fastify 5 line with the latest security patch available at scaffold time. |
| Zod | 4.4.x | Use the current Zod 4 line. |
| Prisma | 7.8.x | Use the current Prisma 7 line unless a later task finds a blocker. |
| PostgreSQL | 18.x | Target the current supported PostgreSQL major for local and deployed environments. |
| Package manager | pnpm 10.x | Use Corepack-managed pnpm workspaces for the simple monorepo. |

## Compatibility Notes

- Node.js 24.x is compatible with Angular 21 according to Angular's active compatibility table.
- Angular 21 is compatible with Node.js `^20.19.0 || ^22.12.0 || ^24.0.0`.
- Angular 21 is compatible with TypeScript `>=5.9.0 <6.0.0`.
- TypeScript 6.x must not be selected for the Angular 21 scaffold unless Angular compatibility changes in a later decision.
- PostgreSQL 18.x should be the target major, but the application must not depend on provider-specific PostgreSQL extensions during scaffold.
- Prisma 7.x is the recommended Prisma line for new work as of this decision, but schema design remains outside LBC-002A.
- pnpm 11.x is intentionally not selected for this scaffold plan because pnpm 10.x is the conservative workspace baseline for this project.

## Source Basis

- Node.js release schedule: Node.js 24.x is Active LTS and supported until 2028-04-30.
- Angular release and compatibility references: Angular 21.x is actively supported on 2026-05-13, and Angular 21 requires TypeScript `>=5.9.0 <6.0.0`.
- Tailwind CSS releases: Tailwind 4.3.x is the current release line, with v4.3.0 published on 2026-05-08.
- Fastify releases: Fastify 5.8.5 is the latest Fastify 5 release observed for this decision.
- Zod releases: Zod 4.4.3 is the latest Zod release observed for this decision.
- Prisma releases: Prisma 7.8.0 is the latest Prisma release observed for this decision.
- PostgreSQL releases: PostgreSQL 18.x is the current supported major line, with 18.3 listed in the latest supported release set.

## Future Review Triggers

Review this matrix before creating the real scaffold if any of the following are true:

- Angular 22 has been released and is supported by the Angular CLI.
- Angular updates TypeScript compatibility to allow TypeScript 6.x.
- Node.js 26 has entered LTS.
- pnpm 11.x is explicitly approved for this project.
- Prisma 8 or a Prisma Next production release becomes the recommended production line.
- PostgreSQL 19 is released and supported by the intended deployment provider.

## LBC-002A Constraint

This matrix is documentation only.

No dependency has been installed, no lockfile has been created, and no scaffold command has been run.
