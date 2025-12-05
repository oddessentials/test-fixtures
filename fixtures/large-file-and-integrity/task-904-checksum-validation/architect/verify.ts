import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("checksum") && !summary.includes("hash") && !summary.includes("integrity")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention checksum, hash, or integrity",
      };
    }

    return { ok: true };
  });
}
