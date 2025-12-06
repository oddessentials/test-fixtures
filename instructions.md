# **Fixture Kit – Team Implementation Guide**

**How to Build Complete Fixtures for Every Topic and Task**

This guide explains exactly how to create fixtures under `/fixtures/` for all topics, tasks, and agents described in the master JSON. The goal is a fully populated, schema-valid, deterministic fixture suite.

Follow this process consistently for every task in the api-design-and-versioning, database-migrations, and config-and-feature-flags topics.

---

# **1. Directory Layout (Authoritative)**

Each task must follow this structure:

```
fixtures/
└── <topic-id>/
    └── <task-id>-<short-slug>/
        ├── architect/
        │   ├── prompt.md
        │   ├── expected.json
        │   ├── verify.ts
        │   └── repo/          # optional
        ├── planner/
        │   ├── prompt.md
        │   ├── expected.json
        │   ├── verify.ts
        │   └── repo/
        ├── coder/
        │   ├── prompt.md
        │   ├── expected.patch
        │   ├── verify.ts
        │   └── repo/
        └── reviewer/
            ├── prompt.md
            ├── expected.json
            ├── verify.ts
            └── repo/
```

**Notes:**

* `<topic-id>` and `<task-id>` come directly from the master JSON.
* Adding a readable slug (`.../task-001-is-even/`) is recommended.
* `repo/` is included only when a scenario requires source files.
* fixtures/zero-change/task-001-is-even/* is already completed and serves as a template for new tasks.
* Never try to update src/schemas/*.


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

---

# **2. The Repeatable 5-Step Process (Do This for Every Task)**

| Step  | Action                                 | Files                                      | Criteria                                           |
| ----- | -------------------------------------- | ------------------------------------------ | -------------------------------------------------- |
| **1** | Read the task description in the JSON  | —                                          | Understand what each agent must demonstrate        |
| **2** | Create the directory skeleton          | `fixtures/<topic>/<task>/` + agent folders | IDs match JSON exactly                             |
| **3** | Write `prompt.md` for each agent       | 4 prompts                                  | Contains only what that agent receives as input    |
| **4** | Write golden expected output           | `expected.json` or `expected.patch`        | Must pass Zod schema validation                    |
| **5** | Write `verify.ts` using shared helpers | 4 verifiers                                | `npm run verify` produces `OK` for all four agents |

---

# **3. `verify.ts` Template (Use for All Agents)**

Swap the helper depending on the agent:

```ts
import type { VerifyCtx, VerifyResult } from "test-fixtures/fixture-helpers";
import { verifyArchitect } from "test-fixtures/fixture-helpers"; // or verifyPlanner, verifyCoder, verifyReviewer

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (parsed, ctx) => {
    // Add scenario-specific semantic checks here.
    // Schema validation is handled by the helper.
    return { ok: true };
  });
}
```

**You only add semantic rules** specific to that scenario (task count, complexity, allowed file targets, blocking comments, etc.).

---

# **4. Workflow for Contributors**

Recommended daily process:

```bash
git pull
git checkout -b fixtures/<topic-id>/<task-id>

# create the prompts, expected outputs, verify.ts, and repo/ if required

npm run verify                # fails until all four agents are implemented
npm run verify -- --update    # only when confident the goldens are correct

git add .
git commit -m "feat(fixtures): add <topic>/<task-id> full fixture suite"
git push -u origin HEAD
# open PR; CI runs "npm run ci"
```

**Important:**
Use `--update` only when intentionally regenerating goldens (e.g., after updating prompts or expected outputs).

---

# **5. Rules to Follow for All Fixtures**

### General

* Do not invent APIs, files, fields, or behaviors not present in `repo/`.
* No edits to forbidden paths unless explicitly allowed:
  `dist/`, `node_modules/`, `.swarm/`, `build/`, `.git/`, `.env`, sensitive configs.
* Patch must be minimal, targeted, and atomic.
* JSON must be pretty-printed with 2 spaces.
* `expected.patch` must apply cleanly (`git apply --check`).

### Architect

* Must conform to `ArchitectSpecSchema`.
* Must reflect the constraints and scope defined in the JSON.

### Planner

* Must conform to `plannerOutputSchema`.
* Must respect scenario constraints (maxTasks, complexity caps, cycle avoidance).
* May emit `"unknown"` tasks for ambiguous or infeasible areas as required.

### Coder

* Must conform to `coderOutputSchema` (non-empty unified diff).
* Patch must touch only allowed files.
* No speculative changes.

### Reviewer

* Must conform to `reviewerOutputSchema`.
* Every comment must include:

  ```json
  "blocking": true | false
  ```
* Comments must be grounded in actual patch lines.

---

# **6. Example Outline (Task: `task-001-is-even`)**

```
fixtures/zero-change/task-001-is-even/
  architect/prompt.md
  architect/expected.json
  architect/verify.ts
  planner/prompt.md
  planner/expected.json
  planner/verify.ts
  coder/prompt.md
  coder/expected.patch
  coder/verify.ts
  reviewer/prompt.md
  reviewer/expected.json
  reviewer/verify.ts
```

* Architect defines a tiny utility.
* Planner emits 1 low-complexity fix task.
* Coder outputs minimal patch correcting logic.
* Reviewer approves with grounded comments.

Running:

```bash
npm run verify
```

produces:

```
zero-change/task-001-is-even/architect OK
zero-change/task-001-is-even/planner OK
zero-change/task-001-is-even/coder OK
zero-change/task-001-is-even/reviewer OK
```

---

# **7. Completion Criteria**

A full run of:

```bash
npm run verify
```

should produce one `OK` line for every `(topic × task × agent)` combination.

When all are green, the fixture suite fully covers the entire JSON roadmap with deterministic, schema-valid, scenario-correct goldens.

---

# 8. Fixture Verify File Import Rule

**All `verify.ts` files must import fixture helpers from the *source* tree, using this exact relative path:**

```ts
import {
  verifyArchitect,
  verifyPlanner,
  verifyCoder,
  verifyReviewer,
  type VerifyCtx,
  type VerifyResult
} from "../../../../src/fixture-helpers";
```

**Do NOT import from `dist/`** and do NOT change the relative depth.
Every verify file lives four directories below project root, so this path is always correct.