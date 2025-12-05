import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("move") && !summary.includes("import")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention moving file or updating imports",
      };
    }

    if (spec.recommendedFileStructure.length < 2) {
      return {
        ok: false,
        reason: "recommendedFileStructure must include multiple files for import updates",
      };
    }

    return { ok: true };
  });
}
