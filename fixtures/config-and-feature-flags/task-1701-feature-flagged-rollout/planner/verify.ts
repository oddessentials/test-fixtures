import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (out) => {
    if (out.tasks.length < 3) {
      return {
        ok: false,
        reason: "Planner must emit at least 3 tasks for feature flag integration.",
      };
    }

    const allowedFiles = [
      "src/config/flags.ts",
      "src/components/Settings.tsx",
      "src/components/DarkModeToggle.tsx",
      "test/components/Settings.test.tsx",
    ];

    for (const task of out.tasks) {
      if (!allowedFiles.includes(task.file)) {
        return {
          ok: false,
          reason: `Task targets disallowed file: ${task.file}. Only ${allowedFiles.join(", ")} are allowed.`,
        };
      }
    }

    const hasFlagTask = out.tasks.some(
      (t) => t.file === "src/config/flags.ts" || t.description.toLowerCase().includes("flag")
    );
    if (!hasFlagTask) {
      return {
        ok: false,
        reason: "Must include a task to add the flag definition.",
      };
    }

    const hasSettingsTask = out.tasks.some(
      (t) => t.file === "src/components/Settings.tsx"
    );
    if (!hasSettingsTask) {
      return {
        ok: false,
        reason: "Must include a task to integrate the flag in Settings.",
      };
    }

    const hasHighComplexity = out.tasks.some((t) => t.complexity === "high");
    if (hasHighComplexity) {
      return {
        ok: false,
        reason: "Feature flag integration should not require high complexity tasks.",
      };
    }

    if (out.invalidTaskCount !== 0) {
      return {
        ok: false,
        reason: "invalidTaskCount must be 0 for a well-defined feature flag task.",
      };
    }

    return { ok: true };
  });
}
