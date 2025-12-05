import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("trace") && !summary.includes("origin") && !summary.includes("provenance")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention tracing, origin, or provenance",
      };
    }

    return { ok: true };
  });
}
