You are designing a spec for a large refactoring project with explicit constraints.

The project involves updating a legacy codebase with many files, but the scope is constrained:
- Maximum 3 tasks allowed (maxTasks: 3)
- Maximum complexity: medium (no high-complexity tasks)
- Focus on the most critical files only

Files that could be updated:
- `src/legacy/database.ts` - Critical database layer
- `src/legacy/api.ts` - Critical API layer
- `src/legacy/utils.ts` - Utility functions
- `src/legacy/config.ts` - Configuration (lower priority)
- `src/legacy/logging.ts` - Logging (lower priority)

Requirements:
- Respect the maxTasks constraint of 3
- Do not emit high-complexity tasks
- Prioritize critical files over lower priority ones

Non-goals:
- Do not plan more than 3 tasks
- Do not include high-complexity work
