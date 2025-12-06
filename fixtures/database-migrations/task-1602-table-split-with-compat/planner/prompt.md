Using the architect's specification for a table split migration, produce a plan to split the `orders` table into `orders` and `order_shipping` tables while maintaining compatibility.

## Constraints

- The migration must maintain a compatibility window where existing queries continue to work.
- Tasks must target only the allowed files: `migrations/001-create-order-shipping-table.sql`, `migrations/002-copy-shipping-data.sql`, `src/models/order.ts`, `src/models/order-shipping.ts`, `test/models/order.test.ts`.
- Include tasks for creating the new table, copying data, implementing dual-write logic, and tests.
- Do not produce tasks that remove the old shipping columns (that's a future cleanup task).
