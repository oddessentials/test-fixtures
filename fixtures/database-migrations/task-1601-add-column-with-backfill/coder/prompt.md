You are the coder agent. Apply the architect and planner guidance to implement a safe multi-step database migration.

## Requirements

- Create three migration files following the safe pattern:
  1. `migrations/001-add-phone-number-nullable.sql`: Add phone_number as nullable
  2. `migrations/002-backfill-phone-number.sql`: Backfill existing rows
  3. `migrations/003-enforce-phone-number-not-null.sql`: Enforce NOT NULL
- Update the User model to include the phone_number field.
- The migration must be non-destructive with zero data loss.
- Keep the patch minimal and focused on the specified files only.

## Allowed Files

- `migrations/001-add-phone-number-nullable.sql`
- `migrations/002-backfill-phone-number.sql`
- `migrations/003-enforce-phone-number-not-null.sql`
- `src/models/user.ts`
- `test/models/user.test.ts`

Return a unified diff patch that implements these changes.
