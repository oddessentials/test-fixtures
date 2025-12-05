import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("new file") && !patch.includes("validation.ts")) {
      return {
        ok: false,
        reason: "Patch must create the shared validation module.",
      };
    }

    const headerCount = (patch.match(/^diff --git /gm) || []).length;
    if (headerCount < 2) {
      return {
        ok: false,
        reason: "Patch must modify multiple files for extraction.",
      };
    }

    if (!patch.includes("import")) {
      return {
        ok: false,
        reason: "Patch must update imports in consuming files.",
      };
    }

    return { ok: true };
  });
}
