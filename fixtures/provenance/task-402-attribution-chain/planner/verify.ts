import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (out) => {
    const hasAttributionTask = out.tasks.some(
      (t) =>
        t.description.toLowerCase().includes("attribution") ||
        t.description.toLowerCase().includes("license")
    );
    if (!hasAttributionTask) {
      return {
        ok: false,
        reason: "Planner must include a task for attribution or license compliance.",
      };
    }

    return { ok: true };
  });
}
