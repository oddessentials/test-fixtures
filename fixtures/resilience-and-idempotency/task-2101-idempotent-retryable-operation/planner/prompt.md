# Architect Plan
Implement idempotency and retries in `src/services/payment.ts`.
Use `src/utils/retry.ts` for retry logic (create if needed).
Store idempotency keys in a mock DB/Map.

# Context
Existing code makes a single raw call.
Files:
- src/services/payment.ts
- src/tests/payment.test.ts
