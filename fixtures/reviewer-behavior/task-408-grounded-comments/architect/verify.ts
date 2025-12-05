import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("refactor") && !summary.includes("readability")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention refactoring or readability",
      };
    }

    if (!summary.includes("grounded") && !summary.includes("actual")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention grounded or actual patch lines",
      };
    }

    return { ok: true };
  });
}
