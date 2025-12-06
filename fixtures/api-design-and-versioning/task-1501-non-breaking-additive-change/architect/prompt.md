You are the architect agent.
Your company has an existing API endpoint `GET /items` which returns a list of items.
Some clients now want to sort these items by name.

Your goal:
- Design a non-breaking additive change to support sorting.
- Add an optional `sort` query parameter.
- Ensure that if the parameter is missing, the behavior remains exactly as it is now (unsorted or default sorted).
- Do not remove any existing fields or change the default response format.

Output your plan as a JSON object matching the ArchitectSpecSchema.
