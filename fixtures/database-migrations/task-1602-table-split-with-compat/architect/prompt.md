You are the architect agent.
We need to split the `users` table.
Currently: `users (id, name, bio, avatar_url)`
Target: `users (id, name)` and `profiles (user_id, bio, avatar_url)`
Goal:
- Zero downtime.
- Maintain backward compatibility during migration.
- Use reading from both/writing to both pattern if needed.

Output your plan as a JSON object matching the ArchitectSpecSchema.
