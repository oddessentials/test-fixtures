Using the architect's spec for scope-constrained utility updates, produce a task list
that targets only the allowed locations.

Allowed: src/utils/
Forbidden: src/api/, configuration files

Requirements:
- Emit tasks that target only the allowed locations
- Do not include tasks outside the constrained scope
