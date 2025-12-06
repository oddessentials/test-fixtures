You are a tech lead planning a migration to ESM.

## Context
Architect's Summary: "Convert `src/utils.js` from CommonJS to ESM by replacing `module.exports` with named exports."

## Files
`src/utils.js`:
```js
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

module.exports = {
  add,
  subtract
};
```

## Task
Plan the conversion.
