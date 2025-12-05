import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("Depend") && !patch.includes("depend")) {
      return {
        ok: false,
        reason: "Patch must include dependency documentation.",
      };
    }

    return { ok: true };
  });
}
