Using the architect's spec for resolving circular dependencies between auth and user modules,
produce a task list that breaks the cycle without creating an illegal dependency graph.

The apparent circular dependency:
- auth.ts needs user data
- user.ts needs auth checks

Requirements:
- Must avoid emitting a cycle in dependsOn
- Either break the cycle with 'unknown' tasks or introduce a shared types module
- The final task graph must be acyclic
