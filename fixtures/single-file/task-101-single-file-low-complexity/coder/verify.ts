import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    // Must mention the target file
    if (!patch.includes("src/utils/capitalize.ts")) {
      return {
        ok: false,
        reason: "Patch must target src/utils/capitalize.ts.",
      };
    }

    // Must contain proper capitalization logic
    if (!patch.includes("toUpperCase()") || !patch.includes("toLowerCase()")) {
      return {
        ok: false,
        reason: "Patch must implement capitalize using toUpperCase and toLowerCase.",
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
