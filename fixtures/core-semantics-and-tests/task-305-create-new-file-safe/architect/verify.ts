import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("new") && !summary.includes("create")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention creating a new file",
      };
    }

    if (!summary.includes("helper") && !summary.includes("utility")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention helper or utility",
      };
    }

    const files = spec.recommendedFileStructure;
    const hasNewFile = files.some((f) => f.includes("newHelper") || f.includes("new"));
    if (!hasNewFile) {
      return {
        ok: false,
        reason: "recommendedFileStructure must include the new file",
      };
    }

    return { ok: true };
  });
}
