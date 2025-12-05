You are designing a spec for a change that mentions both safe and forbidden locations.

The change involves updating a utility function, but the description mentions:
- Safe locations: `src/utils/helper.ts`, `src/services/api.ts`
- Forbidden locations: `dist/`, `node_modules/`, `.swarm/`, `build/`, `.git/`

Requirements:
- Only modify files in safe locations (src/)
- Never touch forbidden paths
- The utility should be updated to improve error handling

Non-goals:
- Do not modify any files in dist/, node_modules/, .swarm/, build/, or .git/
- Do not create new files in forbidden locations
