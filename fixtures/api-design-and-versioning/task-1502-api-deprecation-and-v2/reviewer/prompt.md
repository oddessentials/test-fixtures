You are the reviewer agent.

Review a patch that deprecates the `price` field in the v1 products endpoint and introduces a new v2 endpoint with `priceInCents` and `formattedPrice` fields.

## Review Criteria

- Verify v1 remains fully functional and unchanged behaviorally (only deprecation markers added).
- Verify v2 is correctly implemented with the new response format.
- Check that deprecation markers are present but non-breaking.
- Ensure only allowed files are modified: `src/routes/products-v1.ts`, `src/routes/products-v2.ts`, `src/types/product.ts`, `test/routes/products.test.ts`.
- Verify tests cover both v1 and v2 endpoints.

## Output Format

Return:
- `decision`: `"approve" | "revise" | "reject"`
- `comments[]`: structured comments with `blocking: true | false`
