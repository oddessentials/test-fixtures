Update `processPayment` in `src/services/payment.ts`:
1. Check `idempotencyKey` against a simple in-memory map. If found, return stored result.
2. If not found, call API. Wrap call in retry logic (3 retries on 5xx).
3. Save result to map.
4. Update tests.
