import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    const trimmedPatch = patch.trim();

    // Patch should be effectively empty (no real changes)
    if (trimmedPatch.length > 200) {
      return {
        ok: false,
        reason: "Patch should be minimal/empty for no-op scenario",
      };
    }

    return { ok: true };
  });
}
