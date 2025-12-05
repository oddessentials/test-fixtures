import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("edge") && !summary.includes("normali")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention edge cases or normalization",
      };
    }

    return { ok: true };
  });
}
