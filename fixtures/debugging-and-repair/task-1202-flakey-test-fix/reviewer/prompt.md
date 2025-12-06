You are a senior code reviewer.

## Task
Review the flaky test fix.

## Patch
```diff
diff --git a/test/flaky.test.js b/test/flaky.test.js
index 1234567..8901234 100644
--- a/test/flaky.test.js
+++ b/test/flaky.test.js
@@ -1,4 +1,4 @@
-test('fetches data', () => {
-  const data = fetchData();
+test('fetches data', async () => {
+  const data = await fetchData();
   expect(data).toBe('success');
 });
```

## Considerations
- Does it fix the race condition?
