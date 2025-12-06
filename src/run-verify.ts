// src/run-verify.ts
import * as path from "path";
import * as fs from "fs";
import { fileURLToPath } from "url";
import type { VerifyCtx, VerifyResult, AgentKind } from "./fixture-helpers";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, "..");
const FIXTURES_ROOT = path.join(ROOT, "fixtures");
const AGENTS: AgentKind[] = ["architect", "planner", "coder", "reviewer"];

type FixtureAgentDir = {
  topic: string;
  task: string;
  agent: AgentKind;
  dir: string;
};

// Parse CLI arguments correctly and forever
const args = process.argv.slice(2);
const UPDATE_MODE = args.includes("--update");
const HELP_MODE = args.includes("--help") || args.includes("-h");

// First non-flag, non-update arg is treated as a simple substring filter
const filter =
  args.find((arg) => arg !== "--update" && !arg.startsWith("-")) ?? null;

function printHelp() {
  console.log(
    [
      "Usage:",
      "  node dist/run-verify.js [--update] [filter]",
      "",
      "Options:",
      "  --update         Snapshot/update expected outputs from actuals",
      "  --help, -h       Show this help message",
      "",
      "Arguments:",
      "  filter           Optional substring filter applied to",
      "                   '<topic>/<task>/<agent>' labels.",
      "",
      "Examples:",
      "  # Run all fixtures",
      "  node dist/run-verify.js",
      "",
      "  # Run only planner fixtures",
      "  node dist/run-verify.js planner",
      "",
      "  # Run only fixtures for a specific task",
      "  node dist/run-verify.js task-2001",
      "",
      "  # Update snapshots for a single task",
      "  node dist/run-verify.js --update task-2001",
    ].join("\n")
  );
}

function loadJson(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function loadText(filePath: string) {
  return fs.readFileSync(filePath, "utf8");
}

function writeJson(filePath: string, value: unknown) {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2) + "\n", "utf8");
}

function writeText(filePath: string, value: string) {
  fs.writeFileSync(filePath, value, "utf8");
}

function isDirectory(p: string) {
  try {
    return fs.statSync(p).isDirectory();
  } catch {
    return false;
  }
}

function discoverFixtureAgentDirs(): FixtureAgentDir[] {
  const results: FixtureAgentDir[] = [];

  if (!fs.existsSync(FIXTURES_ROOT)) return results;

  const topics = fs
    .readdirSync(FIXTURES_ROOT)
    .filter((name: string) => isDirectory(path.join(FIXTURES_ROOT, name)));

  for (const topic of topics) {
    const topicDir = path.join(FIXTURES_ROOT, topic);
    const tasks = fs
      .readdirSync(topicDir)
      .filter((name: string) => isDirectory(path.join(topicDir, name)));

    for (const task of tasks) {
      const taskDir = path.join(topicDir, task);
      for (const agent of AGENTS) {
        const agentDir = path.join(taskDir, agent);
        const verifyPath = path.join(agentDir, "verify.ts");

        if (isDirectory(agentDir) && fs.existsSync(verifyPath)) {
          results.push({ topic, task, agent, dir: agentDir });
        }
      }
    }
  }

  return results;
}

function getExpectedPaths(agentDir: string, agent: AgentKind) {
  if (agent === "coder") {
    return {
      expectedPath: path.join(agentDir, "expected.patch"),
      kind: "patch" as const,
    };
  }
  return {
    expectedPath: path.join(agentDir, "expected.json"),
    kind: "json" as const,
  };
}

async function runOneFixtureAgent(
  topic: string,
  task: string,
  agent: AgentKind,
  agentDir: string
) {
  const { expectedPath, kind } = getExpectedPaths(agentDir, agent);
  const verifyPath = path.join(agentDir, "verify.ts");

  if (!fs.existsSync(expectedPath)) {
    console.warn(
      `[${topic}/${task}/${agent}] skipping: expected file not found (${path.basename(
        expectedPath
      )})`
    );
    return;
  }

  const expected = kind === "json" ? loadJson(expectedPath) : loadText(expectedPath);

  // Golden-master mode: for now, feed expected back in as actual.
  // In a real system, "actual" would be the real agent output.
  const actual = expected;

  const ctx: VerifyCtx = {
    taskDir: path.dirname(agentDir),
    actual,
    expected,
  };

  if (UPDATE_MODE) {
    if (kind === "json") {
      writeJson(expectedPath, actual);
    } else {
      writeText(expectedPath, String(actual));
    }
    console.log(`[${topic}/${task}/${agent}] snapshot updated`);
    return;
  }

  const verifyModuleUrl = pathToFileUrl(verifyPath);
  const verifyModule = (await import(verifyModuleUrl.href)) as {
    verify: (ctx: VerifyCtx) => VerifyResult;
  };

  const result = verifyModule.verify(ctx);
  const label = `${topic}/${task}/${agent}`;

  if (!result.ok) {
    console.error(`[${label}] FAIL: ${result.reason ?? "no reason provided"}`);
    process.exitCode = 1;
  } else {
    console.log(`[${label}] OK`);
  }
}

function pathToFileUrl(p: string) {
  let resolved = path.resolve(p);
  if (process.platform === "win32") {
    resolved = resolved.replace(/\\/g, "/");
    if (!resolved.startsWith("/")) resolved = "/" + resolved;
  }
  return new URL(`file://${resolved}`);
}

async function main() {
  if (HELP_MODE) {
    printHelp();
    return;
  }

  const fixtures = discoverFixtureAgentDirs();

  if (fixtures.length === 0) {
    console.warn("No fixtures found under fixtures/<topic>/<task>/<agent>");
    return;
  }

  let ranCount = 0;

  for (const f of fixtures) {
    const label = `${f.topic}/${f.task}/${f.agent}`;

    // Simple, future-proof substring filtering on full label
    if (filter && !label.includes(filter)) {
      continue;
    }

    // eslint-disable-next-line no-await-in-loop
    await runOneFixtureAgent(f.topic, f.task, f.agent, f.dir);
    ranCount++;
  }

  if (filter && ranCount === 0) {
    console.error(`No fixtures matched filter: ${filter}`);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error("Verification run failed with error:", err);
  process.exitCode = 1;
});
