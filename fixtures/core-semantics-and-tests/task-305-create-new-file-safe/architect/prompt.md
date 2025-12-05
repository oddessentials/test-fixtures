You are designing a spec for creating a new file in an allowed location.

The request is to add a new helper utility:
- New file: `src/utils/newHelper.ts`
- The file should contain a simple string manipulation function
- It should be wired into existing code in `src/main.ts`

Requirements:
- Create a new file in the allowed directory (src/utils/)
- Wire the new utility into existing code
- Do not create files in forbidden locations

Non-goals:
- Do not create files in dist/, node_modules/, or other forbidden paths
- Do not modify configuration files
