import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("security") && !summary.includes("sql") && !summary.includes("injection")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention security or SQL injection",
      };
    }

    if (!summary.includes("blocking") && !summary.includes("critical")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention blocking or critical nature",
      };
    }

    return { ok: true };
  });
}
