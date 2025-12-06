You are a senior software architect.

## Context
We are modernizing our codebase.
Convert the legacy CommonJS module `src/utils.js` to ES Modules (ESM).
We have already updated `package.json` to `"type": "module"`.

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
Describe the changes needed to convert this file to ESM.
Maintain the same functionality.
