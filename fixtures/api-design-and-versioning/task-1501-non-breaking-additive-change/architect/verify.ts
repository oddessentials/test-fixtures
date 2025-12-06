import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("backwards-compatible") && !summary.includes("backward-compatible")) {
      return {
        ok: false,
        reason: "highLevelSummary must emphasize backwards compatibility",
      };
    }

    if (!summary.includes("optional")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention that the new field/parameter is optional",
      };
    }

    if (spec.apis.length === 0) {
      return {
        ok: false,
        reason: "Must define at least one API endpoint",
      };
    }

    const hasUsersEndpoint = spec.apis.some(
      (api) => api.path?.includes("/api/users") || api.name.includes("/api/users")
    );
    if (!hasUsersEndpoint) {
      return {
        ok: false,
        reason: "Must reference the /api/users endpoint",
      };
    }

    return { ok: true };
  });
}
