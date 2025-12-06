# Architect Plan
Update `registerUser` in `src/services/registration.ts`.
Wrap `createWallet` in try-catch.
On error, call `deleteUser(userId)`.
Rethrow error.

# Context
Existing code calls create functions sequentially without error handling.
Files:
- src/services/registration.ts
- src/tests/registration.test.ts
