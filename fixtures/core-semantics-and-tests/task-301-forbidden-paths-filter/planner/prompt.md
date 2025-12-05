Using the architect's spec for updating a utility with forbidden path constraints,
produce a task list that only targets allowed locations.

Safe locations: src/
Forbidden locations: dist/, node_modules/, .swarm/, build/, .git/

Requirements:
- Only produce tasks pointing at allowed roots such as src/
- Never include tasks that target forbidden paths
