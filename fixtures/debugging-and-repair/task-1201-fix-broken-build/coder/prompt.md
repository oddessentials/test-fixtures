You are a senior developer.

## Task
Fix the TS error in `src/main.ts`.

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

## Constraints
- Return a unified diff.
