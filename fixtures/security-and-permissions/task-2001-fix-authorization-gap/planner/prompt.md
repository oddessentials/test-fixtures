# Context
The user wants to restrict `/api/admin/system-stats` to ADMIN role only.
The architect recommends adding a check in `src/routes/adminRoutes.ts` and adding a test case.

# Architect Plan
Identify the route handler for `/api/admin/system-stats` and insert a check to verify that `req.user.role` is 'ADMIN'. If not, return a 403 Forbidden error. Ensure no changes are made to the global `authenticate` middleware.
