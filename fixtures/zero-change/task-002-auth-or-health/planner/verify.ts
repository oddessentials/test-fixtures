import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (plan) => {
    if (plan.tasks.length < 1 || plan.tasks.length > 2) {
      return {
        ok: false,
        reason: "Should have 1-2 tasks (endpoint + optional test)",
      };
    }

    const complexities = plan.tasks.map((t) => t.complexity);
    if (complexities.some((c) => c === "high")) {
      return {
        ok: false,
        reason: "Health endpoint tasks should be low or medium complexity",
      };
    }

    return { ok: true };
  });
}
