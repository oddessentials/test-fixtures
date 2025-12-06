You are designing a fix for a bug that only affects the staging environment.

## Context

The application has environment-specific configuration files:
- `config/production.json` - Production environment settings
- `config/staging.json` - Staging environment settings
- `config/development.json` - Development environment settings

A bug has been discovered where the staging environment has an incorrect `API_TIMEOUT` value of `1000` (1 second) instead of the correct `30000` (30 seconds), causing API calls to timeout prematurely in staging.

## Requirements

- Fix the `API_TIMEOUT` value in the staging configuration only.
- The production configuration **must not be touched** under any circumstances.
- The development configuration should not be modified.
- Validate that the fix resolves the timeout issue in staging.

## Non-goals

- Do **not** modify production secrets or configuration values.
- Do **not** add global hacks or workarounds that affect all environments.
- Do **not** change the configuration loading mechanism.
- Do **not** leak any secrets in the fix.

## Allowed Files

- `config/staging.json` (fix the timeout value)
- `test/config/staging.test.ts` (validate the fix)

Note: The staging config file is explicitly allowed for this task per the Configuration & Non-Source File Safety Rule. Production and development configs remain forbidden.
