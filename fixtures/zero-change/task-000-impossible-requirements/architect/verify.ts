import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("contradict")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention contradictory requirements",
      };
    }

    if (spec.recommendedFileStructure.length > 0) {
      return {
        ok: false,
        reason: "recommendedFileStructure should be empty for infeasible scenario",
      };
    }

    return { ok: true };
  });
}
