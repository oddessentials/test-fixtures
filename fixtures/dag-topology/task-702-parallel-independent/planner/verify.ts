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
        reason: "Planner must emit at least 2 parallel tasks.",
      };
    }

    const allIndependent = out.tasks.every((t) => t.dependsOn.length === 0);
    if (!allIndependent) {
      return {
        ok: false,
        reason: "All tasks must be independent with empty dependsOn arrays.",
      };
    }

    return { ok: true };
  });
}
