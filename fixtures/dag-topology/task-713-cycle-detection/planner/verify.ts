import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (out) => {
    if (out.tasks.length < 1) {
      return {
        ok: false,
        reason: "Planner must emit at least 1 task for cycle detection.",
      };
    }

    const hasCycleTask = out.tasks.some(
      (t) =>
        t.description.toLowerCase().includes("cycle") ||
        t.file.toLowerCase().includes("cycle")
    );
    if (!hasCycleTask) {
      return {
        ok: false,
        reason: "Planner must include a task for cycle detection.",
      };
    }

    return { ok: true };
  });
}
