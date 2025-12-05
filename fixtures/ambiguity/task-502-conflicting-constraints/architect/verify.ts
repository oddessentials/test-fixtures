import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("conflict") && !summary.includes("contradict") && !summary.includes("mutually exclusive")) {
      return {
        ok: false,
        reason: "highLevelSummary must acknowledge conflicting or contradictory constraints",
      };
    }

    return { ok: true };
  });
}
