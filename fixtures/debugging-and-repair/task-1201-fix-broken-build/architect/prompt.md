You are a senior software architect.

## Context
The build is failing with a TypeScript error:
`src/main.ts:10:5 - error TS2322: Type 'string' is not assignable to type 'number'.`

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
Diagnose and describe the fix for this build error.
