You are the coder agent. Apply the architect and planner guidance to implement a feature behind a feature flag.

## Requirements

- Add the `ENABLE_DARK_MODE` flag definition to the flags config.
- Create a new `DarkModeToggle` component.
- Update the `Settings` component to conditionally render the toggle based on the flag.
- When the flag is disabled, the Settings page must look identical to current production.
- Do not hardcode .env values or modify the core flag system.
- Keep the patch minimal and focused on the specified files only.

## Allowed Files

- `src/config/flags.ts`
- `src/components/Settings.tsx`
- `src/components/DarkModeToggle.tsx`
- `test/components/Settings.test.tsx`

Return a unified diff patch that implements these changes.
