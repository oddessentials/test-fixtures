You are a senior code reviewer.

## Task
Review the build fix.

## Patch
```diff
diff --git a/src/main.ts b/src/main.ts
index 1234567..8901234 100644
--- a/src/main.ts
+++ b/src/main.ts
@@ -4,5 +4,5 @@
 
 const config: Config = {
-  retries: "3" // Error here
+  retries: 3
 };
```

## Considerations
- Does it fix the type error?
