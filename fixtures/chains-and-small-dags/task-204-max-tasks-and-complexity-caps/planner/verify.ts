import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (out) => {
    if (out.tasks.length > 3) {
      return {
        ok: false,
        reason: "Planner must respect maxTasks constraint of 3.",
      };
    }

    const highComplexity = out.tasks.filter((t) => t.complexity === "high");
    if (highComplexity.length > 0) {
      return {
        ok: false,
        reason: "Planner must not emit high-complexity tasks due to complexity cap.",
      };
    }

    if (out.tasks.length === 0) {
      return {
        ok: false,
        reason: "Planner must emit at least one task.",
      };
    }

    return { ok: true };
  });
}
