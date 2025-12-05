You are designing a spec for sensitive config protection.

The task involves:
- Protecting sensitive configuration files (.env, credentials.json, etc.)
- Preventing accidental exposure of secrets
- Detecting potential secret leaks in patches

Requirements:
- Define sensitive file patterns
- Implement detection logic
- Provide clear warnings

Non-goals:
- Do not allow commits of sensitive files
- Do not silently ignore potential leaks
