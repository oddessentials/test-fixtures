import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (out) => {
    const types = out.tasks.map((t) => t.type);
    const complexities = out.tasks.map((t) => t.complexity);

    if (!types.includes("fix")) {
      return {
        ok: false,
        reason: "Planner must include at least one fix task.",
      };
    }

    if (!types.includes("refactor")) {
      return {
        ok: false,
        reason: "Planner must include at least one refactor task.",
      };
    }

    if (!types.includes("feature")) {
      return {
        ok: false,
        reason: "Planner must include at least one feature task.",
      };
    }

    const hasLow = complexities.includes("low");
    const hasMedium = complexities.includes("medium");
    if (!hasLow || !hasMedium) {
      return {
        ok: false,
        reason: "Planner must include varied complexity levels (low and medium).",
      };
    }

    const hasHigh = complexities.includes("high");
    if (hasHigh) {
      return {
        ok: false,
        reason: "Planner must not include high-complexity tasks per spec.",
      };
    }

    return { ok: true };
  });
}
