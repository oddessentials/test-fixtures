import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    const headerCount = (patch.match(/^diff --git /gm) || []).length;
    if (headerCount < 3) {
      return {
        ok: false,
        reason: "Patch must create at least 3 files for sequential chain.",
      };
    }

    if (!patch.includes("step1") || !patch.includes("step4")) {
      return {
        ok: false,
        reason: "Patch must include first and last steps of the chain.",
      };
    }

    return { ok: true };
  });
}
