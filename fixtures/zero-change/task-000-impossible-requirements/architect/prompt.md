You are designing a spec for a new stateless microservice that must handle user authentication.

Requirements:

- The service must be completely stateless with no persistent storage.
- The service must remember user sessions across restarts.
- The service must authenticate users without any external dependencies.
- The service must store user credentials securely in a database.

Non-goals:

- Do **not** use JWT tokens or session cookies.
- Do **not** rely on external authentication providers.
