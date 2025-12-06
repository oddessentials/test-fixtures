You are the coder agent. Apply the architect and planner guidance to implement API versioning with deprecation.

## Requirements

- Add deprecation JSDoc annotation to the `price` field in the v1 response type.
- Create a new `GET /api/v2/products/:id` endpoint that returns `priceInCents` and `formattedPrice` instead of `price`.
- The v1 endpoint must remain fully functional; do not remove or change its behavior.
- Update types to include both v1 and v2 response schemas.
- Keep the patch minimal and focused on the specified files only.

## Allowed Files

- `src/routes/products-v1.ts`
- `src/routes/products-v2.ts`
- `src/types/product.ts`
- `test/routes/products.test.ts`

Return a unified diff patch that implements these changes.
