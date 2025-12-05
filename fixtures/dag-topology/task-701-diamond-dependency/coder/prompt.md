You are the coder agent. Apply the architect and planner guidance to implement
the diamond dependency pattern.

Requirements:
- Create src/tasks/taskA.ts (root, no dependencies)
- Create src/tasks/taskB.ts (depends on A)
- Create src/tasks/taskC.ts (depends on A)
- Create src/tasks/taskD.ts (depends on B and C)

Return a unified diff patch that implements the diamond pattern.
