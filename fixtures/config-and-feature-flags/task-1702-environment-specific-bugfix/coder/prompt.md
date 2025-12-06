You are the coder agent. Apply the architect and planner guidance to fix the staging-only configuration bug.

## Requirements

- Update the `API_TIMEOUT` value in `config/staging.json` from `1000` to `30000`.
- Do **not** touch production or development configuration files.
- Add a test to validate the correct timeout value in staging.
- Keep the patch minimal and focused on the specified files only.

## Allowed Files

- `config/staging.json`
- `test/config/staging.test.ts`

Return a unified diff patch that implements these changes.
