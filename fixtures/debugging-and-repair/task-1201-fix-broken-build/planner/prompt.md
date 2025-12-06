You are a tech lead dealing with a broken build.

## Context
Architect's Summary: "Fix type mismatch in `src/main.ts` by assigning a number to `retries` instead of a string."

## Files
`src/main.ts`:
```ts
interface Config {
  retries: number;
}

const config: Config = {
  retries: "3" // Error here
};
```

## Task
Plan the fix.
