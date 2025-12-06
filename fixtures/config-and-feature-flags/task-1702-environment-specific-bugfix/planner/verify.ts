import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (out) => {
    if (out.tasks.length < 1) {
      return {
        ok: false,
        reason: "Planner must emit at least 1 task for the staging config fix.",
      };
    }

    const allowedFiles = [
      "config/staging.json",
      "test/config/staging.test.ts",
    ];

    for (const task of out.tasks) {
      if (!allowedFiles.includes(task.file)) {
        return {
          ok: false,
          reason: `Task targets disallowed file: ${task.file}. Only ${allowedFiles.join(", ")} are allowed.`,
        };
      }
    }

    const forbiddenFiles = ["config/production.json", "config/development.json"];
    for (const task of out.tasks) {
      if (forbiddenFiles.includes(task.file)) {
        return {
          ok: false,
          reason: `Task targets forbidden file: ${task.file}. Production and development configs must not be modified.`,
        };
      }
    }

    const hasStagingTask = out.tasks.some(
      (t) => t.file === "config/staging.json"
    );
    if (!hasStagingTask) {
      return {
        ok: false,
        reason: "Must include a task to fix the staging configuration.",
      };
    }

    const hasHighComplexity = out.tasks.some((t) => t.complexity === "high");
    if (hasHighComplexity) {
      return {
        ok: false,
        reason: "A simple config fix should not require high complexity tasks.",
      };
    }

    if (out.invalidTaskCount !== 0) {
      return {
        ok: false,
        reason: "invalidTaskCount must be 0 for a well-defined config fix.",
      };
    }

    return { ok: true };
  });
}
