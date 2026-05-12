# LBC Status

Project: LBC - Laundry Booking Condo

Current task: LBC-001 - Define MVP Scope and Business Rules

Status: READY

Protocol state:
- Only one task is READY.
- LBC-002 is not READY.
- No application code, dependencies, schema, migration, or seed has been created.
- No Tailwind configuration or deploy configuration has been created.
- No commit or push has been made.
- PostgreSQL is the approved primary database.
- MongoDB is outside the current decision.

Scope guard:
- Files authorized for LBC-001 are documentation and ops files only.
- `docs/architecture/stack-decision.md` is now authorized for LBC-001 because the stack decision is official.
- Repository guard must be checked before changes: `pwd`, `.git`, `git status --short --untracked-files=all`, and `git branch --show-current`.

Completion evidence checklist:
- MVP scope documented.
- Business rules documented.
- Reservation conflict rule documented.
- Formal overlap rule documented.
- Official stack decision documented.
- Time storage rule documented: store in UTC and display in the condominium operational timezone.
- Resident and administrator flows documented.
- Validation criteria documented.
- Operational handoff files created.
- Local DONE must not be declared without evidence.
- Remote DONE must not be declared without push and origin synchronization verification.
