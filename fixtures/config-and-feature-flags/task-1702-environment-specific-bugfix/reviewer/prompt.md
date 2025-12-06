You are the reviewer agent.
Review the fix in `src/lib/config-loader.ts`.
The developer changed the merge logic to preserve nested properties in `payment`.
Verify:
- Does it correctly merge `base.payment` and `prod.payment`?
- Are we still using `base` and `prod` for other top-level keys?
Approve if correct.
