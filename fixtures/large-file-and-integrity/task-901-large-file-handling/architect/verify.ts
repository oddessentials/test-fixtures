import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("large") && !summary.includes("chunk")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention large files or chunked processing",
      };
    }

    return { ok: true };
  });
}
