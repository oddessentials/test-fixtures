You are the architect agent.
We need to roll out a new "dark mode" feature, but safely.
Goal:
- Use a feature flag `ENABLE_DARK_MODE`.
- Default to false.
- Allow enabling via configuration (environment variable).
- Ensure the codebase cleanly separates the new feature path.

Output your plan as a JSON object matching the ArchitectSpecSchema.
