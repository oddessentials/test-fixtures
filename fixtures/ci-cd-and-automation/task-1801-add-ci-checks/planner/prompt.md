You are the planner agent.
Plan the creation of the CI workflow.
Steps:
1. Create `.github/workflows/ci.yml`
2. Define `name: CI`
3. Add triggers: `push: branches: [main]`, `pull_request: branches: [main]`
4. Add job `build` with steps: `checkout`, `setup-node (18)`, `npm ci`, `npm run lint`, `npm test`, `npm run build`.
