You are designing a spec for adding missing edge-case tests to existing logic.

The existing code in `src/utils/parser.ts` handles string parsing but lacks tests for:
- Empty string input
- Null/undefined input
- Very long strings
- Special characters

Requirements:
- Specify missing edge-case tests for existing logic
- Require improved test coverage
- Tests should be added to `test/utils/parser.test.ts`

Non-goals:
- Do not modify the parser implementation
- Do not add new features to the parser
