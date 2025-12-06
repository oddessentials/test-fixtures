You are the coder agent. Apply the architect and planner guidance to implement a non-breaking additive change to the `GET /api/users/:id` endpoint.

## Requirements

- Add an optional `phoneNumber` query parameter to the endpoint.
- Add an optional `lastLoginAt` field to the response (ISO 8601 timestamp).
- Update the `UserResponse` type to include the optional `lastLoginAt` field.
- The change must be backwards-compatible: existing clients must continue to work.
- Keep the patch minimal and focused on the specified files only.

## Allowed Files

- `src/routes/users.ts`
- `src/types/user.ts`
- `test/routes/users.test.ts`

Return a unified diff patch that implements these changes.
