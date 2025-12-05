import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("rename") && !patch.includes("utils/helpers")) {
      return {
        ok: false,
        reason: "Patch must show file rename or new path.",
      };
    }

    const headerCount = (patch.match(/^diff --git /gm) || []).length;
    if (headerCount < 2) {
      return {
        ok: false,
        reason: "Patch must update multiple files for import changes.",
      };
    }

    return { ok: true };
  });
}
