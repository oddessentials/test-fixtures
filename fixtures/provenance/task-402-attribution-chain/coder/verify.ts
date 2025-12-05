import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("attribution") && !patch.includes("Attribution")) {
      return {
        ok: false,
        reason: "Patch must include attribution documentation.",
      };
    }

    if (!patch.includes("License") && !patch.includes("license")) {
      return {
        ok: false,
        reason: "Patch must include license information.",
      };
    }

    return { ok: true };
  });
}
