import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (out) => {
    if (out.tasks.length < 2) {
      return {
        ok: false,
        reason: "Planner must emit at least 2 tasks for two-file decomposition.",
      };
    }

    const hasUtilTask = out.tasks.some(
      (t) => t.file.includes("utils") || t.file.includes("format")
    );
    if (!hasUtilTask) {
      return {
        ok: false,
        reason: "Planner must include a task for the utility file.",
      };
    }

    const hasTestTask = out.tasks.some((t) => t.file.includes("test"));
    if (!hasTestTask) {
      return {
        ok: false,
        reason: "Planner must include a task for tests.",
      };
    }

    return { ok: true };
  });
}
