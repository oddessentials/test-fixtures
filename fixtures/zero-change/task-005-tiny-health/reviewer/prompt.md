Review this minimal patch:

```diff
diff --git a/app.js b/app.js
index 0000000..1111111 100644
--- a/app.js
+++ b/app.js
@@ -2,4 +2,6 @@ const express = require('express');
 const app = express();
 
 app.get('/', (req, res) => res.send('Hello'));
+app.get('/health', (req, res) => res.json({ ok: true }));
 
 app.listen(3000);
```
