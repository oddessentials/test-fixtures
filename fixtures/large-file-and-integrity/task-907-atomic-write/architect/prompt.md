You are designing a spec for atomic file writes.

The task involves:
- Implementing atomic write operations to prevent partial writes
- Using temporary files and rename for atomicity
- Handling write failures gracefully

Requirements:
- Implement atomic write logic
- Use temp file + rename pattern
- Handle errors and cleanup

Non-goals:
- Do not leave partial files on failure
- Do not corrupt existing files on write errors
