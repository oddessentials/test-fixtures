import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("clarification") && !patch.includes("Clarification")) {
      return {
        ok: false,
        reason: "Patch must acknowledge the need for clarification.",
      };
    }

    return { ok: true };
  });
}
