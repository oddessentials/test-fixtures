You are designing a spec for a task with missing context.

The request references things that don't exist:
- "Update the UserService class"
- But there is no UserService class in the codebase
- The referenced file or class cannot be found

Requirements:
- Acknowledge the missing context
- Document what information is needed
- Do not invent the missing code

Non-goals:
- Do not create a UserService from scratch
- Do not assume what the UserService should look like
