# **Fixture Kit — Unified Contract & Contributor Guide**

_(Architect • Planner • Coder • Reviewer)_

This repository contains the **official golden fixture kit** for all four agents in the Swarm autonomous software-engineering system:

- **architect** – high-level system design
- **planner** – deterministic task decomposition
- **coder** – minimal, unified-diff patch generation
- **reviewer** – structured code reviews with blocking/non-blocking comments

Fixtures in this repo define **truth**, ensure **schema discipline**, and guarantee **agent-to-agent compatibility** across the entire pipeline.

---

# **1. Purpose of This Kit**

This kit allows **any contributor**—internal or external—to:

- Write deterministic, spec-valid fixtures
- Verify that fixtures match the **locked agent schemas**
- Test completeness and correctness with `npm run verify`
- Refresh expected outputs safely via snapshot mode
- Add new tasks/topics without touching any runner logic

Fixtures enforce:

- **Schema correctness** (ArchitectSpec, PlannerOutput, CoderOutput, ReviewerOutput)
- **Determinism** (same inputs → same outputs)
- **Forbidden-path hygiene** (no `dist/`, `.swarm/`, `node_modules/`, etc.)
- **Non-fabrication** (no invented APIs, files, or metadata)
- **Semantic correctness** (refactor-only constraints, atomic patches, task graphs)
- **Cross-agent interoperability** (architect → planner → coder → reviewer)

This is the **unified contract** for all agents.

---

# **2. Directory Layout**

All fixtures live under:

```
fixtures/<topic>/<task-id-descriptive-name>/
  architect/
    prompt.md
    expected.json
    verify.ts
    repo/...
  planner/
    prompt.md
    expected.json
    verify.ts
    repo/...
  coder/
    prompt.md
    expected.patch
    verify.ts
    repo/...
  reviewer/
    prompt.md
    expected.json
    verify.ts
    repo/...
```

### Rules

- Filenames are intentionally generic (`prompt.md`, `expected.json`, `expected.patch`, `verify.ts`).
- `repo/` is optional and contains only the minimal source context needed for the task.
- Agent folder names define the agent; no additional naming conventions are required.

---

# **3. Running Fixture Validation**

This command:

- Discovers all fixtures automatically
- Loads each agent’s expected output
- Validates it against the correct Zod schema
- Runs the agent’s `verify.ts` using `actual === expected` (self-test)

```bash
npm run verify
```

You should see output like:

```
zero-change/task-001-is-even/architect OK
zero-change/task-001-is-even/planner OK
zero-change/task-001-is-even/coder OK
zero-change/task-001-is-even/reviewer OK
```

If anything violates the agent schema or scenario logic, it will fail with a clear reason.

---

## **Snapshot Mode (optional)**

When you intentionally improve prompts or expected outputs:

```bash
npm run verify -- --update
```

This regenerates each `expected.json` / `expected.patch` as the new golden snapshot.

---

# **4. Authoring New Fixtures**

For each agent folder (architect/planner/coder/reviewer):

1. **Write `prompt.md`**
   What that agent should receive—no more, no less.

2. **Write `expected.json` or `expected.patch`**
   Must match the official schemas exported by this kit.

3. **Write `verify.ts`**
   A thin wrapper around shared helpers:

   - schema validation (via Zod)
   - semantic checks (e.g., “no new features”, “single low-complexity task”, “atomic patch”)
   - forbidden-path safety

4. **Add a `repo/` folder** only if your scenario requires source context.

5. Run:

```bash
npm run verify
```

If adding a new task or topic, nothing else needs updating—discovery is automatic.

---

# **5. Verification Logic (What Verifiers Must Enforce)**

Every `verify.ts` receives:

```ts
{
  taskDir: string,
  actual: any,
  expected: any
}
```

and must enforce:

- **Schema discipline**
  Output must match the locked agent schema.

- **Determinism**
  No randomization, timestamps, or unstable ordering.

- **Forbidden-path hygiene**
  No patches or plans touching `dist/`, `build/`, `.swarm/`, `.git/`, `node_modules/`, etc.

- **Non-fabrication**
  No invented APIs, tests, behaviors, paths, or metadata.

- **Semantic correctness**
  Behavior must follow the scenario’s contract (e.g. refactor-only, multi-hunk atomicity, backup rules).

Return example:

```ts
{
  ok: true;
}
```

or

```ts
{ ok: false, reason: "bad complexity value" }
```

---

# **6. Philosophy of This Suite**

- **Correctness** > convenience

- **Schemas are versioned contracts**
  (Add fields as optional; avoid breaking changes.)

- **Determinism is non-negotiable**
  Output must not depend on environment or ordering.

- **Honesty**
  Models cannot hallucinate structure, APIs, metadata, or files.

- **Composability**
  All agents interoperate cleanly:
  architect → planner → coder → reviewer → swarm

This suite is the _baseline for multi-agent evaluation and integration_.

---

# **7. Extending the Fixture Suite**

To add a new scenario:

```
fixtures/<topic>/task-XYZ-name/
  architect/
  planner/
  coder/
  reviewer/
```

Each folder requires:

- `prompt.md`
- `expected.json` or `expected.patch`
- `verify.ts`
- (optional) `repo/`

Then run:

```bash
npm run verify
```

If all pass, your scenario is valid.

---

# **8. TL;DR for Contributors**

```
git clone <repo>
npm install
npm run verify                     # run all fixtures
npm run verify -- --update         # refresh goldens
# add new tasks under fixtures/...
npm run verify                     # all tasks auto-discovered
```

## **Why `npm run verify -- --update` Exists (for Contributors)**

Fixtures in this repo use **golden outputs** (`expected.json` / `expected.patch`) that represent the _correct_ result for each scenario. Over time, these goldens can become **outdated** when we intentionally improve schemas, prompts, or agent contracts. When that happens, running `npm run verify` will fail across many fixtures—not because the fixtures are wrong, but because the **spec evolved**.

Instead of editing dozens or hundreds of files by hand, contributors use:

```bash
npm run verify -- --update
```

This command automatically regenerates each fixture’s `expected.*` file using the **new** schema and normalization rules. It updates only what legitimately changed and keeps everything consistent with the latest contract. After running it, `npm run verify` will pass again.

Think of it like Jest’s snapshot updates:

> _You write a fixture once, and snapshot mode keeps it healthy whenever the spec evolves._

# Exceptions
## Documentation-Only Patch Rule
-----------------------------
Documentation-only or comment-only patches are explicitly permitted when the architect clearly requests documentation improvements (e.g., TSDoc, README updates, inline comments). Such patches remain subject to all other rules: minimal, atomic, no forbidden paths, and no runtime behavior changes.


## Configuration & Non-Source File Safety Rule
-------------------------------------------
When a task requires modifying configuration, environment, workflow, or other normally-forbidden files, the architect MUST:

  1. Explicitly list *every* configuration or non-source file that is permitted
     to be modified for this task (e.g., .github/workflows/ci.yml,
     config/staging.json, migrations/001-add-users.sql).

  2. Reaffirm that all other configuration, environment, or non-source files
     remain forbidden. No sibling files or directories are implicitly allowed.

This explicit-file-whitelist requirement ensures the planner, coder, and reviewer
operate with a deterministic and safe scope, preventing accidental or speculative
changes outside the architect’s intent.