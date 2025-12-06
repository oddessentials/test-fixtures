import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("flag") && !summary.includes("feature")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention feature flag",
      };
    }

    if (!summary.includes("disabled") && !summary.includes("off")) {
      return {
        ok: false,
        reason: "highLevelSummary must describe behavior when flag is disabled",
      };
    }

    if (!summary.includes("dark mode") && !summary.includes("darkmode")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention the dark mode feature",
      };
    }

    const hasConfigFile = spec.recommendedFileStructure.some(
      (file) => file.includes("config") || file.includes("flag")
    );
    if (!hasConfigFile) {
      return {
        ok: false,
        reason: "Must include config/flags file in recommendedFileStructure",
      };
    }

    const hasTestFile = spec.recommendedFileStructure.some(
      (file) => file.includes("test")
    );
    if (!hasTestFile) {
      return {
        ok: false,
        reason: "Must include test file in recommendedFileStructure",
      };
    }

    return { ok: true };
  });
}
