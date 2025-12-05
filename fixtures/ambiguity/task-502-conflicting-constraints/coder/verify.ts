import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("conflict") && !patch.includes("Conflict")) {
      return {
        ok: false,
        reason: "Patch must acknowledge the constraint conflict.",
      };
    }

    return { ok: true };
  });
}
