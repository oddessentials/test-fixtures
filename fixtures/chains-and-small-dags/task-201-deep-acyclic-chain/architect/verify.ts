import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("pipeline") && !summary.includes("sequential")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention pipeline or sequential processing",
      };
    }

    if (!summary.includes("chain") && !summary.includes("depends")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention dependency chain",
      };
    }

    const files = spec.recommendedFileStructure;
    if (files.length < 4) {
      return {
        ok: false,
        reason: "recommendedFileStructure must include at least 4 pipeline stages",
      };
    }

    return { ok: true };
  });
}
