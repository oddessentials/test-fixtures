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
        reason: "Planner must emit at least 1 task for edge case handling.",
      };
    }

    const hasEdgeTask = out.tasks.some(
      (t) =>
        t.description.toLowerCase().includes("edge") ||
        t.description.toLowerCase().includes("normal") ||
        t.file.toLowerCase().includes("edge") ||
        t.file.toLowerCase().includes("normal")
    );
    if (!hasEdgeTask) {
      return {
        ok: false,
        reason: "Planner must include a task for edge case or normalization handling.",
      };
    }

    return { ok: true };
  });
}
