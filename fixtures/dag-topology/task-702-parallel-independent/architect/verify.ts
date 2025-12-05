import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("parallel") && !summary.includes("independent")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention parallel or independent tasks",
      };
    }

    if (spec.recommendedFileStructure.length < 2) {
      return {
        ok: false,
        reason: "recommendedFileStructure must include multiple parallel tasks",
      };
    }

    return { ok: true };
  });
}
