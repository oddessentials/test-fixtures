import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("lockTypes") && !patch.includes("FileLock")) {
      return {
        ok: false,
        reason: "Patch must include lock types.",
      };
    }

    if (!patch.includes("lockManager") && !patch.includes("acquireLock")) {
      return {
        ok: false,
        reason: "Patch must include lock manager.",
      };
    }

    return { ok: true };
  });
}
