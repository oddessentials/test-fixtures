import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("circular") && !summary.includes("cycle")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention circular dependency or cycle",
      };
    }

    if (!summary.includes("break") && !summary.includes("resolve")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention breaking or resolving the cycle",
      };
    }

    return { ok: true };
  });
}
