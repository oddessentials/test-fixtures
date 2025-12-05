import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("constraint") && !summary.includes("maximum") && !summary.includes("limit")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention constraints or limits",
      };
    }

    if (!summary.includes("3") && !summary.includes("three")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention the maxTasks constraint of 3",
      };
    }

    return { ok: true };
  });
}
