You are the coder agent.
Produce patches for:
1. `migrations/002_create_profiles.sql`: Create profiles(user_id, bio, avatar_url).
2. `src/models/User.ts`: Update `save()` to write to both tables.
3. `migrations/003_drop_columns.sql`: Drop bio, avatar_url from users.
This is a simplification (skipping backfill/read-switch for this fixture patch).
