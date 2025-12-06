Using the architect's specification for a feature-flagged rollout, produce a plan to add a dark mode feature behind the `ENABLE_DARK_MODE` feature flag.

## Constraints

- When the flag is disabled, the application must behave identically to current production.
- Tasks must target only the allowed files: `src/config/flags.ts`, `src/components/Settings.tsx`, `src/components/DarkModeToggle.tsx`, `test/components/Settings.test.tsx`.
- Include tasks for flag definition, component integration, new component creation, and tests for both flag states.
- Do not produce tasks that hardcode .env values or modify the core flag system.
