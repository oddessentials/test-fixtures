import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("Missing") && !patch.includes("missing") && !patch.includes("not exist")) {
      return {
        ok: false,
        reason: "Patch must acknowledge the missing context.",
      };
    }

    return { ok: true };
  });
}
