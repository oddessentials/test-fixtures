import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("transform.ts")) {
      return {
        ok: false,
        reason: "Patch must modify src/utils/transform.ts.",
      };
    }

    return { ok: true };
  });
}
