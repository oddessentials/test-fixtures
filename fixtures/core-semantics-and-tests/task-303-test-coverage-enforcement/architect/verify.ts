import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("test") && !summary.includes("coverage")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention tests or coverage",
      };
    }

    if (!summary.includes("edge") && !summary.includes("missing")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention edge cases or missing tests",
      };
    }

    const files = spec.recommendedFileStructure;
    const hasTest = files.some((f) => f.includes("test"));
    if (!hasTest) {
      return {
        ok: false,
        reason: "recommendedFileStructure must include a test file",
      };
    }

    return { ok: true };
  });
}
