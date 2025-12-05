import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("depend") && !summary.includes("track")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention dependencies or tracking",
      };
    }

    return { ok: true };
  });
}
