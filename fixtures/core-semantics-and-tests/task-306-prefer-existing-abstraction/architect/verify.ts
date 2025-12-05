import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("reuse") && !summary.includes("existing")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention reusing existing utilities",
      };
    }

    if (!summary.includes("not") || !summary.includes("new")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention not creating new helpers",
      };
    }

    return { ok: true };
  });
}
