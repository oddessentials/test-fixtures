You are a senior software architect.

## Context
A security audit has identified a critical vulnerability in the `lodash` dependency (version 4.17.15) used in our project. The vulnerability allows prototype pollution.
The security team recommends upgrading `lodash` to version `4.17.21`.

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
Describe the architectural changes needed to fix this vulnerability.

## Constraints
- Upgrade `lodash` to exactly `4.17.21`.
- Do **not** upgrade `express` or any other dependencies.
- Do **not** change any application code unless the API has changed (it hasn't).
- Explicitly state the non-goal of general dependency updates.
