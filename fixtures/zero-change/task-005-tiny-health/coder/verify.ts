import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    // Should be very small patch
    if (patch.length > 300) {
      return {
        ok: false,
        reason: "Patch should be minimal for tiny health endpoint",
      };
    }

    if (!patch.includes("health")) {
      return {
        ok: false,
        reason: "Patch must add health endpoint",
      };
    }

    return { ok: true };
  });
}
