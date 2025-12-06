You are the planner agent.
Plan the split of `users` -> `users` + `profiles`.
Steps:
1. Create `profiles` table.
2. Code: Dual write (insert/update both).
3. Script: Backfill existing data.
4. Code: Switch reads to `profiles`.
5. Drop columns from `users`.

Generate tasks.
