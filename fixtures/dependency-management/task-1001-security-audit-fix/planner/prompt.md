You are a tech lead planning the fix for the `lodash` vulnerability.

## Context
Architect's Summary: "Update `lodash` from 4.17.15 to 4.17.21 to resolve a prototype pollution vulnerability. No other dependencies should be changed."

## Files
`package.json`:
```json
{
  "name": "my-service",
  "dependencies": {
    "lodash": "4.17.15",
    "express": "4.17.1"
  }
}
```

## Task
Produce a development plan to implement this fix.
The plan should be concise and focused only on this update.
