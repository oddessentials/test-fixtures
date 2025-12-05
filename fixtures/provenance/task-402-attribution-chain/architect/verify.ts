import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("attribution") && !summary.includes("license")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention attribution or license",
      };
    }

    return { ok: true };
  });
}
