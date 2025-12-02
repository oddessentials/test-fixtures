import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    // Must mention the target file
    if (!patch.includes("src/utils/isEven.ts")) {
      return {
        ok: false,
        reason: "Patch must target src/utils/isEven.ts.",
      };
    }

    // Must contain the corrected implementation
    if (!patch.includes("return n % 2 === 0;")) {
      return {
        ok: false,
        reason: "Patch must implement isEven using n % 2 === 0.",
      };
    }

    // Very lightweight sanity: only one diff header
    const headerCount = (patch.match(/^diff --git /gm) || []).length;
    if (headerCount !== 1) {
      return {
        ok: false,
        reason: "Patch must contain exactly one diff header.",
      };
    }

    return { ok: true };
  });
}
