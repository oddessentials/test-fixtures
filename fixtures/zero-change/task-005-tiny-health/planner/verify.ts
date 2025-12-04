import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (plan) => {
    if (plan.tasks.length !== 1) {
      return {
        ok: false,
        reason: "Should have exactly one task for minimal scenario",
      };
    }

    if (plan.tasks[0].complexity !== "low") {
      return {
        ok: false,
        reason: "Minimal health endpoint should be low complexity",
      };
    }

    return { ok: true };
  });
}
