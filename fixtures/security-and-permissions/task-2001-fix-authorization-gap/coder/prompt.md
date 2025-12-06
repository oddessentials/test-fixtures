# Plan
1. Edit `src/routes/adminRoutes.ts`: Add a check for `req.user.role === 'ADMIN'`. If not, return status 403.
2. Edit `src/tests/adminRoutes.test.ts`: Add a test case ensuring 403 is returned for non-admin users.

# Context
The architect has identified that removing the gap is critical.
Please implement the changes.
