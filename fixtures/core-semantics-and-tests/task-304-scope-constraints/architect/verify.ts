import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("constraint") && !summary.includes("scope")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention constraints or scope",
      };
    }

    if (!summary.includes("utils")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention src/utils as allowed scope",
      };
    }

    const files = spec.recommendedFileStructure;
    for (const file of files) {
      if (file.includes("api/") || file.includes("config")) {
        return {
          ok: false,
          reason: "recommendedFileStructure must not include forbidden paths",
        };
      }
    }

    return { ok: true };
  });
}
