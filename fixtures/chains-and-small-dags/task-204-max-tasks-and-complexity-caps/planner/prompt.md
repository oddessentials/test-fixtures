Using the architect's spec for a constrained legacy refactoring project, produce a task list
that respects the explicit constraints.

Constraints:
- maxTasks: 3 (do not emit more than 3 tasks)
- Maximum complexity: medium (no high-complexity tasks allowed)
- Prioritize critical files: database.ts, api.ts over config.ts, logging.ts

Requirements:
- Produce a trimmed task list that respects maxTasks
- Avoid emitting tasks beyond the allowed complexity cap
- Deliberately leave some clearly-remaining work unplanned when it exceeds the cap
