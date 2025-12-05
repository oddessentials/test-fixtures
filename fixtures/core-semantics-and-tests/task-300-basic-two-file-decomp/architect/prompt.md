You are designing a spec for a change that naturally splits into utility, main code, and tests.

The change involves adding a string formatting utility:
- `src/utils/format.ts` - New utility function for string formatting
- `src/main.ts` - Main code that uses the utility
- `test/format.test.ts` - Tests for the utility

Requirements:
- Define the utility function signature and behavior
- Specify how main code should use the utility
- Require tests for the new functionality

Non-goals:
- Do not modify existing utilities
- Do not change the project structure
