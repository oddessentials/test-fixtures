Add the absolute minimal health check endpoint to this tiny service.

Requirements:

- Add GET `/health` that returns `{ "ok": true }`
- No authentication needed
- As simple as possible

Non-goals:

- Do **not** add logging or monitoring
- Do **not** add tests (this is a smoke test variant)
- Keep it absolutely minimal
