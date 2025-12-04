Please review the following patch:

```diff
diff --git a/src/server.ts b/src/server.ts
index 0000000..1111111 100644
--- a/src/server.ts
+++ b/src/server.ts
@@ -4,7 +4,9 @@ const app = express();
 app.use(express.json());
 
-// TODO: Add health endpoint here
+app.get('/health', (req, res) => {
+  res.status(200).json({ status: 'ok' });
+});
 
 app.get('/api/users', (req, res) => {
   res.json({ users: [] });
diff --git a/test/routes/health.test.ts b/test/routes/health.test.ts
new file mode 100644
index 0000000..2222222
--- /dev/null
+++ b/test/routes/health.test.ts
@@ -0,0 +1,12 @@
+import request from 'supertest';
+import app from '../../src/server';
+
+describe('GET /health', () => {
+  it('should return status ok', async () => {
+    const response = await request(app).get('/health');
+    
+    expect(response.status).toBe(200);
+    expect(response.body).toEqual({ status: 'ok' });
+  });
+});
```

Context: Adding a simple health check endpoint as specified in the requirements.
