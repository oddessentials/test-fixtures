# Bundle Size Reduction Implementation

Refactor `src/index.ts` to reduce bundle size by using granular imports.

## Plan

1. Replace `import * as _ from 'lodash'` with `import uniq from 'lodash/uniq'`.
2. Update usage of `_.uniq` to `uniq`.
3. Do not change function signature.

## Files
`src/index.ts`
