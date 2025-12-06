You are a tech lead dealing with a flaky test.

## Context
Architect's Summary: "Fix race condition in `test/flaky.test.js` by awaiting the async `fetchData` call."

## Files
`test/flaky.test.js`:
```js
test('fetches data', () => {
  const data = fetchData();
  expect(data).toBe('success');
});
```

## Task
Plan the fix.
