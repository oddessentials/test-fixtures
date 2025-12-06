You are the architect agent.
We currently have a `GET /v1/users` endpoint returning `{ username: string }`.
We want to transition to `displayName` instead of `username` because "username" is ambiguous.

Goal:
- Introduce `GET /v2/users` which returns `{ displayName: string }`.
- Mark `username` in `v1` as deprecated.
- `v1` must continue to work exactly as before.
- `v2` should be the new recommended way.

Output your plan as a JSON object matching the ArchitectSpecSchema.
