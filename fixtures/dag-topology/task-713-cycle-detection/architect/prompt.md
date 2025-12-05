You are designing a spec for cycle detection in task dependencies.

The task involves:
- Detecting circular dependencies in task graphs
- Preventing cycles from being created
- Reporting cycle errors clearly

Requirements:
- Describe the cycle detection approach
- Handle various cycle patterns (A→B→A, A→B→C→A, etc.)
- Provide clear error messages

Non-goals:
- Do not allow cycles to be created
- Do not silently ignore cycles
