Implement validation in `src/controllers/comments.ts`:
- Check `content` is string, length 1-500.
- Sanitize HTML tags (e.g. `content.replace(/<[^>]*>/g, '')`).
- Return 400 if invalid.
Add tests in `src/tests/comments.test.ts`.
