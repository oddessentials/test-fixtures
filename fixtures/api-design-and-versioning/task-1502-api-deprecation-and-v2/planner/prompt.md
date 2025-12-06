Using the architect's specification for API versioning, produce a plan to deprecate the `price` field in v1 and introduce a new v2 products endpoint.

## Constraints

- v1 must remain fully functional; no removal of existing behavior.
- Tasks must target only the allowed files: `src/routes/products-v1.ts`, `src/routes/products-v2.ts`, `src/types/product.ts`, `test/routes/products.test.ts`.
- Include tasks for adding deprecation markers to v1, creating the v2 endpoint, updating types, and adding tests for both versions.
- Do not produce tasks that remove the v1 endpoint or the `price` field from v1.
