import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    if (spec.apis.length !== 1) {
      return {
        ok: false,
        reason: "Should define exactly one API for minimal scenario",
      };
    }

    if (spec.recommendedFileStructure.length > 2) {
      return {
        ok: false,
        reason: "File structure should be minimal (1-2 files max)",
      };
    }

    return { ok: true };
  });
}
