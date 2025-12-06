# Bundle Size Reduction

The `src/index.ts` file imports the entire `lodash` library using `import * as _`, which increases bundle size significantly.

## Request

Refactor the import to use a granular import for `uniq` (e.g., `import uniq from 'lodash/uniq'`) to enable tree-shaking or simply reduce what is included.
Verify that the function behavior remains the same.

## Non-goals

Do not change the exported function signature.
