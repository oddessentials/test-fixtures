The endpoint `GET /api/admin/system-stats` is currently accessible to any authenticated user. It exposes sensitive system metrics.
Please restrict this endpoint so that only users with the `ADMIN` role can access it.
Do not modify the authentication middleware or any other endpoints.
Just add the authorization check to this specific route handler.
