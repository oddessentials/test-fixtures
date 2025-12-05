You are the coder agent. Apply the architect and planner guidance to implement
changes across the four pipeline stages in order.

Requirements:
- Update each stage file in dependency order
- reader.ts must be updated first (no dependencies)
- parser.ts depends on reader.ts changes
- transformer.ts depends on parser.ts changes
- writer.ts depends on transformer.ts changes
- Keep changes minimal and focused on each stage's responsibility

Return a unified diff patch that updates all four pipeline files in order.
