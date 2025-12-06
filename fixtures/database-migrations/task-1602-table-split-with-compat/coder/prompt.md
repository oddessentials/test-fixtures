You are the coder agent. Apply the architect and planner guidance to implement a table split migration with compatibility window.

## Requirements

- Create migration to add the new `order_shipping` table with foreign key to `orders`.
- Create migration to copy existing shipping data from `orders` to `order_shipping`.
- Create the `OrderShipping` model with proper type definitions.
- Update the `Order` model to implement dual-write logic during the compatibility window.
- The migration must be non-destructive with zero data loss.
- Keep the patch minimal and focused on the specified files only.

## Allowed Files

- `migrations/001-create-order-shipping-table.sql`
- `migrations/002-copy-shipping-data.sql`
- `src/models/order.ts`
- `src/models/order-shipping.ts`
- `test/models/order.test.ts`

Return a unified diff patch that implements these changes.
