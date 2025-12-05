import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("atomic") && !summary.includes("write")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention atomic writes",
      };
    }

    return { ok: true };
  });
}
