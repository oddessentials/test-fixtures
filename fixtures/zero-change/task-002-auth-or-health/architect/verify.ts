import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    if (spec.apis.length === 0) {
      return {
        ok: false,
        reason: "Must define at least one API (health endpoint)",
      };
    }

    const healthApi = spec.apis.find((api) =>
      api.path?.toLowerCase().includes("health")
    );
    if (!healthApi) {
      return {
        ok: false,
        reason: "Must define a health endpoint API",
      };
    }

    if (spec.recommendedFileStructure.length === 0) {
      return {
        ok: false,
        reason: "Must recommend file structure for implementation",
      };
    }

    return { ok: true };
  });
}
