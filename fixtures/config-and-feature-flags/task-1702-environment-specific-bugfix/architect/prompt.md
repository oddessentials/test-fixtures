You are the architect agent.
We have a bug report: "The application crashes in production because it tries to connect to the payment gateway using test credentials."
Root cause: The configuration loader does not correctly override nested properties for the 'production' environment.
Goal:
- Fix the configuration loading logic to support deep merging or correct overrides.
- Ensure production environment uses correct credentials.

Output your plan as a JSON object.
