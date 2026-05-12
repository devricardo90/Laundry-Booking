# Ops Status

Project: LBC - Laundry Booking Condo

Current task: LBC-001 - Define MVP Scope and Business Rules

Task status: READY

Repository status:
- Repository initialized.
- Documentation-only MVP definition in progress.
- No application stack has been scaffolded.
- No dependencies have been installed.
- No commit has been made.
- No push has been made.

Protocol checks:
- One READY task only: yes.
- LBC-002 READY: no.
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
- `pwd`: confirmed as project directory before the latest update.
- `.git`: confirmed present.
- Branch: `main`.
- Initial status: documentation files were untracked before the latest update.
