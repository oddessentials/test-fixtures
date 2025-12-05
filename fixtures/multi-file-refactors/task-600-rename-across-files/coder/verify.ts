import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    const headerCount = (patch.match(/^diff --git /gm) || []).length;
    if (headerCount < 2) {
      return {
        ok: false,
        reason: "Patch must modify multiple files for a multi-file refactor.",
      };
    }

    if (!patch.includes("fetchUserProfile")) {
      return {
        ok: false,
        reason: "Patch must include the new function name fetchUserProfile.",
      };
    }

    return { ok: true };
  });
}
