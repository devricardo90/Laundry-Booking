# Demo Data Presets Strategy

## Problem Statement
The current MVP interface requires users to manually input UUIDs for `residentId` and `laundryRoomId`. This creates significant friction during demonstrations and local testing, as it requires opening a database client or seed file to copy-paste identifiers.

## Chosen MVP Approach: Frontend-Hardcoded Presets
To minimize architectural complexity and avoid backend changes in this phase, we will implement **hardcoded frontend development/demo presets** in the Angular UI.

### Strategy Details
- **Data Source:** Presets will be based on the existing known development seed data (e.g., Laundry Room A, Development Resident).
- **Mechanism:** A simple UI selection (e.g., a "Load Demo Data" button or a dropdown) will auto-fill the existing UUID input fields.
- **No Backend Changes:** No new API endpoints will be created for fetching presets.
- **No Database Changes:** The database schema and seed remain untouched.
- **No Authentication:** This strategy does not implement sessions or real user authentication; it is strictly a UI/UX helper for the current anonymous flow.

## Expected Implementation Behavior (LBC-006B)
1.  **Resident Selection:** Choosing a resident preset will fill the `residentId` field.
2.  **Laundry Room Selection:** Choosing a laundry room preset will fill the `laundryRoomId` field.
3.  **Visual Indicators:** Presets must be clearly labeled as "Demo Helpers" or "Development Presets" to distinguish them from real user input.
4.  **API Compatibility:** The booking flow must remain fully compatible with the existing `POST /bookings` and `GET /availability` endpoints.

## Boundaries and Constraints
- **Security:** Presets are NOT a security feature and provide no access control.
- **Production:** This is a development/demo helper and must not be treated as a production authentication solution.
- **Dependencies:** No new NPM packages or libraries shall be introduced.
- **Backend Independence:** The Fastify API must remain unaware of the preset logic.

## Exit Criteria for LBC-006B (Implementation)
- User can select a demo Resident and Laundry Room in the Angular UI via a click.
- User can complete the full booking flow (check availability -> book -> list -> cancel) without manually copying any UUID.
- Existing API behavior and response shapes remain unchanged.
- `pnpm lint`, `pnpm typecheck`, and `pnpm build` must pass.
- A browser smoke test confirms the flow is functional and friction-free.
