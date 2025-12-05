Using the architect's spec for a diamond dependency pattern, produce a task list
that correctly models the diamond structure.

Pattern:
- Task A: root (no dependencies)
- Tasks B, C: depend on A
- Task D: depends on both B and C

Requirements:
- Emit tasks with correct dependency structure
- Ensure no circular dependencies
