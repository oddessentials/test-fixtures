import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("sensitive") && !summary.includes("secret")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention sensitive files or secrets",
      };
    }

    return { ok: true };
  });
}
