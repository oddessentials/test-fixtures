import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("utility") && !summary.includes("format")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention utility or format",
      };
    }

    const files = spec.recommendedFileStructure;
    if (files.length < 2) {
      return {
        ok: false,
        reason: "recommendedFileStructure must include at least 2 files for decomposition",
      };
    }

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
