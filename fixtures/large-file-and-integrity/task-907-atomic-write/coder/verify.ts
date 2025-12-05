import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("atomicWriter") && !patch.includes("atomicWrite")) {
      return {
        ok: false,
        reason: "Patch must include atomic writer.",
      };
    }

    if (!patch.includes("rename") && !patch.includes("temp")) {
      return {
        ok: false,
        reason: "Patch must use temp file + rename pattern for atomicity.",
      };
    }

    return { ok: true };
  });
}
