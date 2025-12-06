You are the reviewer agent.

Review a patch that fixes the `API_TIMEOUT` value in the staging configuration from 1000ms to 30000ms.

## Review Criteria

- Verify only the staging configuration is modified.
- Ensure production and development configurations are NOT touched.
- Check that no secrets are leaked in the fix.
- Verify no global hacks or workarounds are added.
- Ensure the fix resolves the timeout issue.
- Ensure only allowed files are modified.

## Output Format

Return:
- `decision`: `"approve" | "revise" | "reject"`
- `comments[]`: structured comments with `blocking: true | false`
