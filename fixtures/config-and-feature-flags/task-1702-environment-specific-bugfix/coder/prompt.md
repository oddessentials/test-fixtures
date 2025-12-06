You are the coder agent.
The `loadConfig` function uses `Object.assign` which performs a shallow copy. This clobbers the `payment` object defaults when `production` overrides provide only `url`.
Fix this by manually merging `payment` or using a deep merge approach.
For this task, manual merge is fine:
`payment: { ...base.payment, ...prod.payment }`
