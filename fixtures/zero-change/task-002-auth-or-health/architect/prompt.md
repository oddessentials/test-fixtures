You are designing a spec for a simple web service that needs a `/health` endpoint.

Requirements:

- Add a GET `/health` endpoint that returns `{ "status": "ok" }` with 200 status.
- The endpoint should require no authentication.
- Add a corresponding test for the health endpoint.

Non-goals:

- Do **not** add any other endpoints or features.
- Do **not** modify existing business logic.
- Do **not** change the server configuration or port.
