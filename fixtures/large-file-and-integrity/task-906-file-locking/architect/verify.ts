import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("lock") && !summary.includes("concurrent")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention locking or concurrent access",
      };
    }

    return { ok: true };
  });
}
