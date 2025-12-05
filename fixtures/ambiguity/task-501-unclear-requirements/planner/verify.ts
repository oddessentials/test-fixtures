import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (out) => {
    const hasUnknownTask = out.tasks.some((t) => t.type === "unknown");
    if (!hasUnknownTask) {
      return {
        ok: false,
        reason: "Planner must emit an 'unknown' task type for ambiguous requirements.",
      };
    }

    if (out.ambiguities.length === 0) {
      return {
        ok: false,
        reason: "Planner must document ambiguities in the request.",
      };
    }

    return { ok: true };
  });
}
