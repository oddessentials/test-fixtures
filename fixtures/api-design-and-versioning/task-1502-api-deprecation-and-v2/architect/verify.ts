import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("deprecat")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention deprecation",
      };
    }

    if (!summary.includes("v1") || !summary.includes("v2")) {
      return {
        ok: false,
        reason: "highLevelSummary must reference both v1 and v2",
      };
    }

    if (spec.apis.length < 2) {
      return {
        ok: false,
        reason: "Must define at least two API endpoints (v1 and v2)",
      };
    }

    const hasV1 = spec.apis.some(
      (api) => api.path?.includes("v1") || api.name.includes("v1")
    );
    const hasV2 = spec.apis.some(
      (api) => api.path?.includes("v2") || api.name.includes("v2")
    );

    if (!hasV1 || !hasV2) {
      return {
        ok: false,
        reason: "Must define both v1 and v2 endpoints",
      };
    }

    return { ok: true };
  });
}
