You are the reviewer agent.

Review a patch that moves a file and updates all imports.

Move: src/helpers/utils.ts → src/utils/helpers.ts

Your responsibilities:
- Verify all import paths are updated correctly
- Ensure no broken imports remain
- Use structured comments with a `blocking: boolean` field for each issue

Return:
- `decision`: `"approve" | "revise" | "reject"`
- `comments[]`: structured comments with `blocking: true | false`
