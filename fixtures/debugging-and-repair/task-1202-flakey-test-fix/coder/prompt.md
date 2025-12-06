You are a senior developer.

## Task
Fix the flaky test in `test/flaky.test.js`.

## Files
`test/flaky.test.js`:
```js
test('fetches data', () => {
  const data = fetchData();
  expect(data).toBe('success');
});
```

## Constraints
- Return a unified diff.
