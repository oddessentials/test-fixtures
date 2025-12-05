import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("normalizePath") && !patch.includes("pathNormalizer")) {
      return {
        ok: false,
        reason: "Patch must include path normalization.",
      };
    }

    if (!patch.includes("edgeCases") && !patch.includes("handleEdgeCases")) {
      return {
        ok: false,
        reason: "Patch must include edge case handling.",
      };
    }

    return { ok: true };
  });
}
