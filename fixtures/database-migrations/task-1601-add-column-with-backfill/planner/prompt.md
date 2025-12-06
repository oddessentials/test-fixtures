Using the architect's specification for a safe database migration, produce a plan to add a non-nullable `phone_number` column to the `users` table using a multi-step approach.

## Constraints

- The migration must follow the safe multi-step pattern: add nullable -> backfill -> enforce NOT NULL.
- Tasks must target only the allowed files: `migrations/001-add-phone-number-nullable.sql`, `migrations/002-backfill-phone-number.sql`, `migrations/003-enforce-phone-number-not-null.sql`, `src/models/user.ts`, `test/models/user.test.ts`.
- Do not produce tasks that could cause data loss.
- Include tasks for all three migration steps, model updates, and tests.
