The `registerUser` function performs two steps:
1. `createUser(email)`
2. `createWallet(userId)`

If `createWallet` fails, the user remains in the system without a wallet, which is an invalid state.
Please update `registerUser` to catch errors from `createWallet`. If it fails, call `deleteUser(userId)` to roll back the first step, then re-throw the error.
Ensure `deleteUser` is called even if `createWallet` throws a network error.
