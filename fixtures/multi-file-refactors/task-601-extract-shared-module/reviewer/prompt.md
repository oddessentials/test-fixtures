You are the reviewer agent.

Review a patch that extracts shared validation logic into a new module.

New shared module: src/utils/validation.ts
Updated files: src/forms/login.ts, src/forms/register.ts

Your responsibilities:
- Verify the shared module is properly structured
- Ensure all files are updated to use the shared module
- Use structured comments with a `blocking: boolean` field for each issue

Return:
- `decision`: `"approve" | "revise" | "reject"`
- `comments[]`: structured comments with `blocking: true | false`
