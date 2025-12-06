You are designing a feature rollout behind a configuration flag.

## Context

The application has an existing feature flag system using a `config/flags.ts` file. A new "dark mode" feature needs to be added to the user settings page, but it should be gated behind a feature flag for gradual rollout.

## Requirements

- Add the new dark mode feature behind an existing flag system.
- When the flag is **disabled** (`ENABLE_DARK_MODE=false`), the application must behave **identically to current production** - no UI changes, no new functionality visible.
- When the flag is **enabled** (`ENABLE_DARK_MODE=true`), users should see a dark mode toggle in their settings.
- The feature flag integration must be clean and not pollute the codebase with excessive conditionals.
- Tests must cover both flag states (enabled and disabled).

## Non-goals

- Do **not** hardcode `.env` changes or commit environment-specific values.
- Do **not** modify the core flag system implementation.
- Do **not** add features unrelated to dark mode.

## Allowed Files

- `src/config/flags.ts` (add new flag definition)
- `src/components/Settings.tsx` (integrate flag check)
- `src/components/DarkModeToggle.tsx` (new component)
- `test/components/Settings.test.tsx` (tests for both flag states)
