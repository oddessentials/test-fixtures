import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("split") && !summary.includes("normalize")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention table splitting or normalization",
      };
    }

    if (!summary.includes("compatibility") && !summary.includes("dual-write") && !summary.includes("dual write")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention compatibility window or dual-write strategy",
      };
    }

    if (spec.dataModels.length < 2) {
      return {
        ok: false,
        reason: "Must define at least two data models (Order and OrderShipping)",
      };
    }

    const hasOrderModel = spec.dataModels.some(
      (model) => model.name.toLowerCase().includes("order") && !model.name.toLowerCase().includes("shipping")
    );
    const hasShippingModel = spec.dataModels.some(
      (model) => model.name.toLowerCase().includes("shipping")
    );

    if (!hasOrderModel || !hasShippingModel) {
      return {
        ok: false,
        reason: "Must define both Order and OrderShipping data models",
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
