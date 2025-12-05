import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("rename")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention renaming",
      };
    }

    if (spec.recommendedFileStructure.length < 2) {
      return {
        ok: false,
        reason: "recommendedFileStructure must include multiple files for a multi-file refactor",
      };
    }

    return { ok: true };
  });
}
