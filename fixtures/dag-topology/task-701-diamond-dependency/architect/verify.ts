import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("diamond") && !summary.includes("depend")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention diamond dependency pattern",
      };
    }

    if (spec.recommendedFileStructure.length < 4) {
      return {
        ok: false,
        reason: "recommendedFileStructure must include at least 4 tasks for diamond pattern",
      };
    }

    return { ok: true };
  });
}
