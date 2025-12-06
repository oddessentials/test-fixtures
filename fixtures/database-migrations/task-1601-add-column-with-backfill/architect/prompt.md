You are designing a safe database migration to add a non-nullable column to an existing table.

## Context

The application has a `users` table with columns `id`, `email`, and `name`. A new `phone_number` column needs to be added as a non-nullable field.

## Requirements

- Implement a **safe multi-step migration** strategy:
  1. **Step 1**: Add the column as nullable first
  2. **Step 2**: Backfill existing rows with a default value or computed value
  3. **Step 3**: Enforce NOT NULL constraint after backfill is complete
- The migration must be **non-destructive**: no data loss is acceptable.
- Application code must be updated to handle the new column.
- Tests must verify the new schema behavior.

## Non-goals

- Do **not** alter unrelated tables or columns.
- Do **not** use a single-step migration that adds NOT NULL directly (this would fail on existing rows).
- Do **not** delete or modify existing data beyond the backfill.

## Allowed Files

- `migrations/001-add-phone-number-nullable.sql` (step 1: add nullable column)
- `migrations/002-backfill-phone-number.sql` (step 2: backfill data)
- `migrations/003-enforce-phone-number-not-null.sql` (step 3: enforce constraint)
- `src/models/user.ts` (model updates)
- `test/models/user.test.ts` (tests)

Note: Migration files are explicitly allowed for this task per the Configuration & Non-Source File Safety Rule.
