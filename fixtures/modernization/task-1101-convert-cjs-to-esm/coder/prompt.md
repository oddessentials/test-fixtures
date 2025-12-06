You are a senior developer.

## Task
Convert `src/utils.js` to ESM. Use `export` keywords.

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

## Constraints
- Return a unified diff.
