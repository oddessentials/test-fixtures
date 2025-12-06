Review the patch.
Verify:
1. Idempotency is enforced.
2. Retries happen only on 5xx or network errors.
3. No Infinite loops.
