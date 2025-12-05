You are designing a spec for work that is feasible but explicitly constrained in scope.

The work involves updating internal utilities, but with strict constraints:
- Allowed: Only touch `src/utils/` directory
- Forbidden: Never touch public API endpoints in `src/api/`
- Forbidden: Never modify configuration files

Requirements:
- Mark the work as feasible
- Explicitly constrain scope to src/utils only
- State that public API must not be touched

Non-goals:
- Do not modify public API endpoints
- Do not change configuration files
- Do not expand scope beyond src/utils
