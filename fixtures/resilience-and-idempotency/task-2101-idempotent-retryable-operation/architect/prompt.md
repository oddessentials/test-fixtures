The `processPayment` function in `src/services/payment.ts` calls an external API. It is currently unreliable.
Please implement:
1. Idempotency: Use the `idempotencyKey` provided in the arguments. Check if we already processed this key. If so, return the stored result. If not, proceed.
2. Retries: Wrap the external API call. Retry up to 3 times if it fails with a network error or 5xx status. Do not retry on 4xx.
3. Persistence: Save the result (success or failure) associated with the key so future calls return it.
