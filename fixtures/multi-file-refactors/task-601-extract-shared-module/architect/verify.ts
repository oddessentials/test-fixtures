import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("extract") && !summary.includes("shared")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention extracting or shared module",
      };
    }

    if (spec.recommendedFileStructure.length < 2) {
      return {
        ok: false,
        reason: "recommendedFileStructure must include multiple files for extraction",
      };
    }

    return { ok: true };
  });
}
