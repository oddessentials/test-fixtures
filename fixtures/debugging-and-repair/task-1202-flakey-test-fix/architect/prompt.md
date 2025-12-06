You are a senior software architect.

## Context
The test `test/flaky.test.js` is flakey. It fails about 50% of the time.
It seems to be a race condition where the test checks for the result before the async operation completes.

## Files
`test/flaky.test.js`:
```js
test('fetches data', () => {
  const data = fetchData();
  expect(data).toBe('success');
});
```

## Task
Describe how to fix the test to be deterministic.
