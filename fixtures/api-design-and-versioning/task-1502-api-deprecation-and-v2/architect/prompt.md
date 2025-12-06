You are designing an API versioning strategy that deprecates a field in v1 and introduces a v2 endpoint.

## Context

The application has an existing `GET /api/v1/products/:id` endpoint that returns product data. The current response includes a `price` field (number) that represents the price in cents.

## Requirements

- Mark the `price` field in v1 as **deprecated** (add deprecation annotation/comment).
- Create a new `GET /api/v2/products/:id` endpoint that returns `priceInCents` (number) and `formattedPrice` (string, e.g., "$19.99") instead of the deprecated `price` field.
- The v1 endpoint **must remain fully functional** during the transition period. Existing clients using v1 must continue to work without modification.
- v2 must not include the deprecated `price` field.

## Non-goals

- Do **not** remove the v1 endpoint or the `price` field from v1.
- Do **not** change the behavior of v1 beyond adding deprecation markers.
- Do **not** modify any other endpoints or introduce unrelated changes.

## Allowed Files

- `src/routes/products-v1.ts` (v1 handler with deprecation)
- `src/routes/products-v2.ts` (new v2 handler)
- `src/types/product.ts` (request/response types for both versions)
- `test/routes/products.test.ts` (tests for both versions)
