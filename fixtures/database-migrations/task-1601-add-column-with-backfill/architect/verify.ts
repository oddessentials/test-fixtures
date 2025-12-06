import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("nullable") && !summary.includes("null")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention the nullable-first approach",
      };
    }

    if (!summary.includes("backfill")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention the backfill step",
      };
    }

    if (!summary.includes("non-destructive") && !summary.includes("no data loss") && !summary.includes("data loss")) {
      return {
        ok: false,
        reason: "highLevelSummary must emphasize non-destructive migration or no data loss",
      };
    }

    if (spec.dataModels.length === 0) {
      return {
        ok: false,
        reason: "Must define at least one data model (User)",
      };
    }

    const hasUserModel = spec.dataModels.some(
      (model) => model.name.toLowerCase().includes("user")
    );
    if (!hasUserModel) {
      return {
        ok: false,
        reason: "Must define the User data model",
      };
    }

    const hasMigrationFiles = spec.recommendedFileStructure.some(
      (file) => file.includes("migration")
    );
    if (!hasMigrationFiles) {
      return {
        ok: false,
        reason: "Must include migration files in recommendedFileStructure",
      };
    }

    return { ok: true };
  });
}
