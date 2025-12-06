You are the architect agent.
We need to add a non-nullable column `category_id` to the `items` table.
The table is large, so we cannot lock it for long.
Goal:
- Use a safe multi-step migration strategy.
- 1. Add column as nullable.
- 2. Backfill data.
- 3. Add NOT NULL constraint.

Output your plan as a JSON object matching the ArchitectSpecSchema.
