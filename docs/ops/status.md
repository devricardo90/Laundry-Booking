# Ops Status

Project: LBC - Laundry Booking Condo

Current task: LBC-002A - Define Scaffold Plan and Version Matrix

Task status: READY

Repository status:
- Repository initialized.
- LBC-001 is Remote DONE at commit `3d90251`.
- Documentation-only scaffold planning is in progress.
- No application stack has been scaffolded.
- No dependencies have been installed.
- No commit has been made for LBC-002A.
- No push has been made for LBC-002A.

Protocol checks:
- One READY task only: yes.
- LBC-002B READY: no.
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
