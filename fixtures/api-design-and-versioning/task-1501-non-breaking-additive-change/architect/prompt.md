You are designing a non-breaking additive change to an existing REST API endpoint.

## Context

The application has an existing `GET /api/users/:id` endpoint that returns user profile data. The current response schema includes `id`, `name`, and `email` fields.

## Requirements

- Add an **optional** `phoneNumber` query parameter to filter users who have a phone number on file.
- Add an **optional** `lastLoginAt` field to the response that returns the user's last login timestamp (ISO 8601 format) when available.
- The change **must be backwards-compatible**: existing clients that do not send the new query parameter or do not expect the new response field must continue to work without modification.
- No existing field may be removed, renamed, or have its type changed.

## Non-goals

- Do **not** add any new endpoints.
- Do **not** modify any other existing endpoints.
- Do **not** change the authentication or authorization logic.
- Do **not** alter the database schema.

## Allowed Files

- `src/routes/users.ts` (handler logic)
- `src/types/user.ts` (request/response types)
- `test/routes/users.test.ts` (tests)
