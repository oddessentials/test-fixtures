You are designing a spec for functionality that must reuse an existing utility.

The existing utility `src/utils/existing.ts` provides string formatting functions.
New functionality needs string formatting but must NOT create new helpers.

Requirements:
- New functionality must reuse the existing utility in src/utils/existing.ts
- Must not introduce new helpers or utility functions
- Adapt existing utilities rather than creating new ones

Non-goals:
- Do not create new utility files
- Do not duplicate existing functionality
- Do not add new helper functions
