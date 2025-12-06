Using the architect's specification for an environment-specific bugfix, produce a plan to fix the `API_TIMEOUT` value in the staging configuration.

## Constraints

- Only the staging configuration may be modified.
- Production and development configurations must not be touched.
- Tasks must target only the allowed files: `config/staging.json`, `test/config/staging.test.ts`.
- Include tasks for fixing the configuration value and validating the fix.
- Do not produce tasks that add global hacks or workarounds.
