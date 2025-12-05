import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (out) => {
    if (out.tasks.length < 4) {
      return {
        ok: false,
        reason: "Planner must emit at least 4 tasks for diamond pattern.",
      };
    }

    const hasRootTask = out.tasks.some((t) => t.dependsOn.length === 0);
    if (!hasRootTask) {
      return {
        ok: false,
        reason: "Planner must include a root task with no dependencies.",
      };
    }

    const hasConvergenceTask = out.tasks.some((t) => t.dependsOn.length >= 2);
    if (!hasConvergenceTask) {
      return {
        ok: false,
        reason: "Planner must include a convergence task depending on multiple tasks.",
      };
    }

    return { ok: true };
  });
}
