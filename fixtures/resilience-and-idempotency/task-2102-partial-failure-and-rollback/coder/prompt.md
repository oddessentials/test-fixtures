Update `registerUser` in `src/services/registration.ts`:
1. Call `createUser`.
2. Try calling `createWallet`.
3. If `createWallet` fails, catch error, call `deleteUser` to rollback `createUser`, then throw error.
4. Update tests.
