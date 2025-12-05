import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("not exist") && !summary.includes("missing") && !summary.includes("cannot")) {
      return {
        ok: false,
        reason: "highLevelSummary must acknowledge missing context or non-existent reference",
      };
    }

    return { ok: true };
  });
}
