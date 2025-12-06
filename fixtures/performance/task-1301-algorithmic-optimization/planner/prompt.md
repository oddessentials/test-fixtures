# Algorithmic Optimization Plan

The architect has identified a performance bottleneck in `src/utils/arrayUtils.ts` (O(N^2) complexity in `findDuplicates`).

## Request

Create a plan to refactor `findDuplicates` to use a Set-based approach (O(N)).
Ensure the function signature remains unchanged.
Verify that the implementation passes tests (or in this case, simply compiles and runs).

## Context

The file `src/utils/arrayUtils.ts` exists and contains the slow implementation.
