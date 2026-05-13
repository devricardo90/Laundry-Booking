# LBC Backlog

## READY

### LBC-002A - Define Scaffold Plan and Version Matrix

Type: Documentation / Architecture

Goal:
Create a technical documentation decision before any real scaffold work.

Acceptance:
- Proposed project structure is documented.
- Simple monorepo versus separate structure decision is documented.
- Recommended Node.js version is documented.
- Recommended Angular version is documented.
- Recommended TypeScript version is documented.
- Recommended Tailwind version is documented.
- Recommended Fastify version is documented.
- Recommended Zod version is documented.
- Recommended Prisma version is documented.
- Target PostgreSQL version is documented.
- Package manager is documented.
- Expected future scaffold validation commands are documented.
- Scaffold limits are documented.
- Items outside scope are documented.
- DONE criteria for LBC-002A are documented.
- LBC-002B remains BACKLOG and is not READY.

## BACKLOG

### LBC-002B - Project Scaffold

Status: BACKLOG

Notes:
- Must not be opened as READY during LBC-002A.
- Expected future scope: create the approved scaffold only after Trigger authorization.
- Must follow the LBC-002A scaffold plan and version matrix unless a later decision changes them.
- Must not start during LBC-002A.

### LBC-003 - Data Model and Conflict Constraints

Status: BACKLOG

Notes:
- Expected future scope: Prisma schema and database-level protection against conflicting bookings or blocked slots.
