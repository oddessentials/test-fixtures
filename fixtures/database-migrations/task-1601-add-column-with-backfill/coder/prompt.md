You are the coder agent.
Create migration `migrations/002_add_column.sql` to add `category_id` (int, nullable) to `items`.
And `scripts/backfill.ts` to update `items` setting `category_id = 1` where it is null.
And `migrations/003_enforce_not_null.sql` to set `category_id` not null.
