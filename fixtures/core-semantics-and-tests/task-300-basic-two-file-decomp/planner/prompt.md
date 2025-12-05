Using the architect's spec for a string formatting utility, produce a task list
that properly decomposes the work into utility, main code, and test updates.

The decomposition should be:
1. Create the utility function in src/utils/format.ts
2. Update main code in src/main.ts to use the utility
3. Add tests in test/format.test.ts

Requirements:
- Emit a small chain linking utility change, main code update, and test update
- Ensure proper dependency ordering
