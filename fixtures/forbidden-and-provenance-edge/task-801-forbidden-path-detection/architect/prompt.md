You are designing a spec for forbidden path detection.

The task involves:
- Detecting edits to forbidden paths (dist/, node_modules/, .git/, etc.)
- Preventing modifications to protected files
- Reporting violations clearly

Requirements:
- Define the list of forbidden paths
- Implement path matching logic
- Provide clear error messages

Non-goals:
- Do not allow edits to forbidden paths
- Do not silently ignore violations
