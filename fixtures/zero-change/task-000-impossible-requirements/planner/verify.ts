import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (plan) => {
    if (plan.tasks.length === 0) {
      return { ok: true };
    }

    if (plan.tasks.length === 1 && plan.tasks[0].type === "unknown") {
      return { ok: true };
    }

    return {
      ok: false,
      reason: "Plan should have zero tasks or a single unknown task for impossible requirements",
    };
  });
}
