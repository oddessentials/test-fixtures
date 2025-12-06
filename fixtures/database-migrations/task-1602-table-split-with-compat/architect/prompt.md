You are designing a database migration to split a large table into two normalized tables while maintaining compatibility during the migration window.

## Context

The application has an `orders` table that contains both order metadata and shipping information in a single table. The columns are: `id`, `customer_id`, `total_amount`, `status`, `shipping_address`, `shipping_city`, `shipping_zip`, `shipping_country`, `created_at`.

## Requirements

- Split the `orders` table into two normalized tables:
  1. `orders` table: `id`, `customer_id`, `total_amount`, `status`, `created_at`
  2. `order_shipping` table: `id`, `order_id` (FK), `address`, `city`, `zip`, `country`
- Implement a **compatibility window** strategy:
  1. Create the new `order_shipping` table
  2. Implement dual-write logic (write to both old columns and new table)
  3. Incrementally copy existing data to the new table
  4. Eventually remove the old shipping columns (not in this migration)
- Existing queries must continue to work during the migration window.
- No data loss is acceptable.

## Non-goals

- Do **not** remove the old shipping columns from `orders` in this migration (that's a future cleanup task).
- Do **not** break existing queries that read shipping data from the `orders` table.
- Do **not** modify unrelated tables.

## Allowed Files

- `migrations/001-create-order-shipping-table.sql` (create new table)
- `migrations/002-copy-shipping-data.sql` (copy existing data)
- `src/models/order.ts` (model updates with dual-write logic)
- `src/models/order-shipping.ts` (new model)
- `test/models/order.test.ts` (tests)

Note: Migration files are explicitly allowed for this task per the Configuration & Non-Source File Safety Rule.
