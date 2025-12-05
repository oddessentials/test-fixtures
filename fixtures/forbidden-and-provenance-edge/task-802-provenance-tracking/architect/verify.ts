import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("provenance") && !summary.includes("tracking")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention provenance or tracking",
      };
    }

    return { ok: true };
  });
}
