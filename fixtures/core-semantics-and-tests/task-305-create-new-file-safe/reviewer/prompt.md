You are the reviewer agent.

Review a patch that creates a new helper utility file and wires it into existing code.

New file: src/utils/newHelper.ts
Integration: src/main.ts

Your responsibilities:
- Verify that the new file is placed correctly in an allowed location
- Ensure no disallowed files were added
- Use structured comments with a `blocking: boolean` field for each issue

Return:
- `decision`: `"approve" | "revise" | "reject"`
- `comments[]`: structured comments with `blocking: true | false`
