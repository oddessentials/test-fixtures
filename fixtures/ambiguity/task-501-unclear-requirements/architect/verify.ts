import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("ambiguous") && !summary.includes("unclear") && !summary.includes("clarification")) {
      return {
        ok: false,
        reason: "highLevelSummary must acknowledge ambiguity or need for clarification",
      };
    }

    return { ok: true };
  });
}
