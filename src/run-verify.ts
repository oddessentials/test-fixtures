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

const GOLDEN_CONFIG_FILENAME = "golden-fixtures.config.json";
const DEFAULT_CONCURRENCY = 4;

type FixtureAgentDir = {
  topic: string;
  task: string;
  agent: AgentKind;
  dir: string;
};

type CliOptions = {
  update: boolean;
  help: boolean;
  golden: boolean;
  strictRealAgents: boolean;
  filter: string | null;
  concurrency: number | null;
};

function parseArgs(rawArgs: string[]): CliOptions {
  let update = false;
  let help = false;
  let golden = false;
  let strictRealAgents = false;
  const filters: string[] = [];
  let concurrency: number | null = null;

  for (let i = 0; i < rawArgs.length; i++) {
    const arg = rawArgs[i];

    if (arg === "--update") {
      update = true;
    } else if (arg === "--help" || arg === "-h") {
      help = true;
    } else if (arg === "--golden") {
      golden = true;
    } else if (arg === "--strict-real-agents") {
      strictRealAgents = true;
    } else if (arg === "--concurrency") {
      const next = rawArgs[i + 1];
      if (!next || next.startsWith("-")) {
        console.error("Missing value for --concurrency. Example: --concurrency 4");
        process.exit(1);
      }
      const parsed = Number.parseInt(next, 10);
      if (!Number.isFinite(parsed) || parsed <= 0) {
        console.error(`Invalid concurrency value: ${next}`);
        process.exit(1);
      }
      concurrency = parsed;
      i++; // consume value
    } else if (arg.startsWith("--concurrency=")) {
      const value = arg.slice("--concurrency=".length);
      const parsed = Number.parseInt(value, 10);
      if (!Number.isFinite(parsed) || parsed <= 0) {
        console.error(`Invalid concurrency value: ${value}`);
        process.exit(1);
      }
      concurrency = parsed;
    } else if (arg.startsWith("-")) {
      console.error(`Unknown option: ${arg}`);
      console.error("Run with --help to see available options.");
      process.exit(1);
    } else {
      filters.push(arg);
    }
  }

  if (filters.length > 1) {
    console.error(
      `Too many positional arguments: ${filters.join(" ")}\n` +
        "Use at most one filter substring, e.g.:\n" +
        "  node dist/run-verify.js planner\n" +
        "  node dist/run-verify.js task-2001"
    );
    process.exit(1);
  }

  return {
    update,
    help,
    golden,
    strictRealAgents,
    filter: filters[0] ?? null,
    concurrency,
  };
}

const parsed = parseArgs(process.argv.slice(2));
const UPDATE_MODE = parsed.update;
const HELP_MODE = parsed.help;
const GOLDEN_MODE = parsed.golden;
const STRICT_REAL_AGENTS_MODE = parsed.strictRealAgents;
const filter = parsed.filter;
const CONCURRENCY = parsed.concurrency ?? DEFAULT_CONCURRENCY;

function printHelp() {
  console.log(
    [
      "Usage:",
      "  node dist/run-verify.js [options] [filter]",
      "",
      "Options:",
      "  --update               Snapshot/update expected outputs from actuals",
      "  --golden               Run only curated golden-path fixtures",
      "  --strict-real-agents   Require real agent execution (no bootstrap mode)",
      "  --concurrency N        Run up to N fixtures in parallel (default: 4)",
      "                         You may also use --concurrency=N.",
      "  --help, -h             Show this help message",
      "",
      "Arguments:",
      "  filter                 Optional substring filter applied to",
      "                         '<topic>/<task>/<agent>' labels.",
      "",
      "Golden fixtures config:",
      `  Golden mode reads labels from ${GOLDEN_CONFIG_FILENAME} at the project root.`,
      '  Expected shape:',
      '    { "fixtures": ["topic/task/agent", "..."] }',
      "",
      "Execution modes:",
      "  Default: use expected values as actuals (bootstrap mode).",
      "           This makes the harness usable before agent wiring.",
      "  --strict-real-agents: require real agent execution; the harness will",
      "                        fail unless getActualOutput(...) is implemented.",
      "",
      "Examples:",
      "  # Run all fixtures in bootstrap mode (expected as actual)",
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
      "",
      "  # Run only golden-path fixtures (using golden-fixtures.config.json)",
      "  node dist/run-verify.js --golden",
      "",
      "  # Run golden-path planner fixtures with higher concurrency",
      "  node dist/run-verify.js --golden --concurrency 8 planner",
      "",
      "  # Strict mode (will require agent wiring in getActualOutput)",
      "  node dist/run-verify.js --strict-real-agents",
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

type GoldenConfig = {
  fixtures: string[];
};

function loadGoldenFixturesConfig(allLabels: Set<string>): Set<string> {
  const configPath = path.join(ROOT, GOLDEN_CONFIG_FILENAME);

  if (!fs.existsSync(configPath)) {
    console.error(
      `Golden mode requested, but ${GOLDEN_CONFIG_FILENAME} was not found at:\n` +
        `  ${configPath}\n` +
        'Expected shape:\n' +
        '  { "fixtures": ["topic/task/agent", "..."] }'
    );
    process.exit(1);
  }

  let parsed: GoldenConfig;
  try {
    parsed = loadJson(configPath) as GoldenConfig;
  } catch (err) {
    console.error(
      `Failed to parse ${GOLDEN_CONFIG_FILENAME} as JSON:\n  ${String(err)}`
    );
    process.exit(1);
  }

  if (
    !parsed ||
    !Array.isArray(parsed.fixtures) ||
    parsed.fixtures.length === 0
  ) {
    console.error(
      `${GOLDEN_CONFIG_FILENAME} must have a non-empty "fixtures" array.\n` +
        'Example:\n' +
        '  { "fixtures": ["topic/task/agent"] }'
    );
    process.exit(1);
  }

  const trimmed = parsed.fixtures.map((s) => s.trim()).filter(Boolean);
  if (trimmed.length === 0) {
    console.error(
      `${GOLDEN_CONFIG_FILENAME} only contains empty/whitespace fixture labels.`
    );
    process.exit(1);
  }

  const missing = trimmed.filter((label) => !allLabels.has(label));
  if (missing.length > 0) {
    console.error(
      `${GOLDEN_CONFIG_FILENAME} references fixtures that do not exist:\n` +
        missing.map((m) => `  - ${m}`).join("\n") +
        "\n\n" +
        "Ensure these labels match real paths under fixtures/<topic>/<task>/<agent>."
    );
    process.exit(1);
  }

  return new Set(trimmed);
}

type ActualRequest = {
  topic: string;
  task: string;
  agent: AgentKind;
  agentDir: string;
  expected: unknown;
};

async function getActualOutput(req: ActualRequest): Promise<unknown> {
  if (!STRICT_REAL_AGENTS_MODE) {
    // Default bootstrap mode: use expected as actual.
    // This keeps the harness usable before agent wiring.
    return req.expected;
  }

  // Strict mode: require real agent execution.
  // eslint-disable-next-line no-throw-literal
  throw new Error(
    `STRICT REAL AGENTS MODE ENABLED: no actual agent execution wired for ` +
      `${req.topic}/${req.task}/${req.agent}.\n` +
      "Implement getActualOutput(...) to invoke your agents, or run without\n" +
      "--strict-real-agents to use bootstrap mode (expected as actual)."
  );
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

  const expected =
    kind === "json" ? (loadJson(expectedPath) as unknown) : loadText(expectedPath);

  const actual = await getActualOutput({
    topic,
    task,
    agent,
    agentDir,
    expected,
  });

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

async function runWithConcurrency(
  fixtures: FixtureAgentDir[],
  concurrency: number
): Promise<void> {
  const limit =
    Number.isFinite(concurrency) && concurrency > 0 ? Math.floor(concurrency) : 1;

  for (let i = 0; i < fixtures.length; i += limit) {
    const batch = fixtures.slice(i, i + limit);
    await Promise.allSettled(
      batch.map((f) =>
        runOneFixtureAgent(f.topic, f.task, f.agent, f.dir)
      )
    );
  }
}

async function main() {
  if (HELP_MODE) {
    printHelp();
    return;
  }

  if (!STRICT_REAL_AGENTS_MODE) {
    console.log(
      "[run-verify] BOOTSTRAP MODE ACTIVE – using expected outputs as actuals.\n" +
        "Pass --strict-real-agents once your agents are wired into getActualOutput(...)."
    );
  }

  const fixtures = discoverFixtureAgentDirs();

  const allLabels = new Set(
    fixtures.map((f) => `${f.topic}/${f.task}/${f.agent}`)
  );

  const goldenSet = GOLDEN_MODE ? loadGoldenFixturesConfig(allLabels) : null;

  const selected: FixtureAgentDir[] = [];

  for (const f of fixtures) {
    const label = `${f.topic}/${f.task}/${f.agent}`;

    if (GOLDEN_MODE && goldenSet && !goldenSet.has(label)) {
      continue;
    }

    if (filter && !label.includes(filter)) {
      continue;
    }

    selected.push(f);
  }

  if (selected.length === 0) {
    console.error(
      "No fixtures matched the current selection criteria.\n" +
        `  golden: ${GOLDEN_MODE ? "on" : "off"}\n` +
        `  filter: ${filter ?? "<none>"}\n` +
        `  total discovered fixtures: ${fixtures.length}\n` +
        (GOLDEN_MODE
          ? `  golden config: ${GOLDEN_CONFIG_FILENAME}\n`
          : "") +
        "Adjust your golden-fixtures.config.json, filter, or fixture set and retry."
    );
    process.exitCode = 1;
    return;
  }

  await runWithConcurrency(selected, CONCURRENCY);
}

main().catch((err) => {
  console.error("Verification run failed with error:", err);
  process.exitCode = 1;
});
