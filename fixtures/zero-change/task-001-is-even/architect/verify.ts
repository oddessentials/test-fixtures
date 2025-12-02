import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("iseven")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention isEven",
      };
    }

    if (!summary.includes("do not change any other functions")) {
      return {
        ok: false,
        reason:
          "highLevelSummary must state non-goal: do not change other functions",
      };
    }

    return { ok: true };
  });
}
