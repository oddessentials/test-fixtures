You are designing a spec for a diamond dependency pattern.

The task involves:
- Task A depends on nothing
- Tasks B and C both depend on A
- Task D depends on both B and C (diamond pattern)

Requirements:
- Describe the diamond dependency structure
- Ensure proper execution order
- Handle the convergence point correctly

Non-goals:
- Do not create circular dependencies
- Do not skip intermediate tasks
