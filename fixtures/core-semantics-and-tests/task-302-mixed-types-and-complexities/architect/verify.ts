import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("fix") && !summary.includes("bug")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention bug fix",
      };
    }

    if (!summary.includes("refactor")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention refactor",
      };
    }

    if (!summary.includes("feature") && !summary.includes("cach")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention feature or caching",
      };
    }

    return { ok: true };
  });
}
