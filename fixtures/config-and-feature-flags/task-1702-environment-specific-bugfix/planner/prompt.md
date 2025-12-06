You are the planner agent.
Fix the bug in `src/lib/config-loader.ts`.
Currently `Object.assign` replaces the nested `payment` object entirely, causing missing keys (like `key`) if they aren't redefined in production config.
Plan:
1. Implement a deep merge utility or manually merge nested properties in `loadConfig`.
2. Ensure `payment.key` is preserved when `payment.url` is overridden.
