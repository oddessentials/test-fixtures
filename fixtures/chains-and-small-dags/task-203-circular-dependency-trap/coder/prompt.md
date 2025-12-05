You are the coder agent. Apply the architect and planner guidance to break the
circular dependency between auth and user modules.

Requirements:
- Create a shared types module to hold common interfaces
- Update auth.ts to import from shared types instead of user.ts
- Update user.ts to import from shared types instead of auth.ts
- Do not introduce new circular dependencies

Return a unified diff patch that resolves the circular dependency.
