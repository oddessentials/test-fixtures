You are designing a spec for a module system where two modules appear to have circular dependencies.

Scenario:
- `src/modules/auth.ts` provides authentication utilities
- `src/modules/user.ts` provides user management utilities
- Auth needs user data for validation
- User needs auth for permission checks

This could be misinterpreted as A depends on B and B depends on A (circular).

Requirements:
- Identify the apparent circular dependency
- Propose a solution that breaks the cycle (e.g., shared interface, dependency injection)
- The system must remain acyclic

Non-goals:
- Do not merge the modules into one file
- Do not remove either module's functionality
