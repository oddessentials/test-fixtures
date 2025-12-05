import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("forbidden") && !summary.includes("protected")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention forbidden or protected paths",
      };
    }

    return { ok: true };
  });
}
