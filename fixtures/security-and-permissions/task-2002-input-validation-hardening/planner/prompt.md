# Architect Plan
Modify `src/controllers/comments.ts` to validate `content`:
1. Required, String, Length 1-500.
2. Sanitize HTML.
Return 400 if invalid.

# Context
Existing code handles the request but blindly saves data.
Files:
- src/controllers/comments.ts
- src/tests/comments.test.ts
