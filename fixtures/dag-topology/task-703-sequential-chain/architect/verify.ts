import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("sequential") && !summary.includes("chain")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention sequential chain",
      };
    }

    if (spec.recommendedFileStructure.length < 3) {
      return {
        ok: false,
        reason: "recommendedFileStructure must include multiple steps for chain",
      };
    }

    return { ok: true };
  });
}
