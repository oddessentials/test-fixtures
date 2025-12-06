Using the architect's specification for a non-breaking additive API change, produce a plan to add an optional `phoneNumber` query parameter and an optional `lastLoginAt` response field to the `GET /api/users/:id` endpoint.

## Constraints

- The change must be backwards-compatible.
- Tasks must target only the allowed files: `src/routes/users.ts`, `src/types/user.ts`, `test/routes/users.test.ts`.
- Do not produce tasks that remove or rename existing fields.
- Do not produce tasks that alter established semantics.
- Include tasks for updating handler logic, request/response types, and tests.
