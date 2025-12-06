import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("staging")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention staging environment",
      };
    }

    if (!summary.includes("production") && !summary.includes("prod")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention that production must not be touched",
      };
    }

    if (!summary.includes("timeout") && !summary.includes("api_timeout")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention the timeout fix",
      };
    }

    const hasStagingConfig = spec.recommendedFileStructure.some(
      (file) => file.includes("staging")
    );
    if (!hasStagingConfig) {
      return {
        ok: false,
        reason: "Must include staging config file in recommendedFileStructure",
      };
    }

    const hasProductionConfig = spec.recommendedFileStructure.some(
      (file) => file.includes("production")
    );
    if (hasProductionConfig) {
      return {
        ok: false,
        reason: "Must NOT include production config file in recommendedFileStructure",
      };
    }

    return { ok: true };
  });
}
