You are the planner agent.
The file `src/utils.ts` has a lint error: `data: any`.
Plan to fix this by treating `data` as `unknown` (safer) or a specific type, and handling it correctly.
For this generic logger, `unknown` is appropriate.
Steps:
1. Update `src/utils.ts` to change `any` to `unknown`.
