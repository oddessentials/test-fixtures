import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("provenance") && !patch.includes("origin") && !patch.includes("Origin")) {
      return {
        ok: false,
        reason: "Patch must include provenance documentation.",
      };
    }

    return { ok: true };
  });
}
