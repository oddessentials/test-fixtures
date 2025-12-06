You are the coder agent.
Create the CI workflow file `.github/workflows/ci.yml`.
Content should include:
- Name: CI
- On: push (main), pull_request (main)
- Jobs: build
  - runs-on: ubuntu-latest
  - steps: checkout, setup-node (v3, node-version 18), npm ci, npm run lint, npm test, npm run build.
