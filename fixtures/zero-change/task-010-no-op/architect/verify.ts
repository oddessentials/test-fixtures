import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("correct") && !summary.includes("no change")) {
      return {
        ok: false,
        reason: "highLevelSummary should acknowledge correctness or no changes needed",
      };
    }

    if (spec.recommendedFileStructure.length > 0) {
      return {
        ok: false,
        reason: "recommendedFileStructure should be empty for no-op scenario",
      };
    }

    return { ok: true };
  });
}
