import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("format.ts") && !patch.includes("utils")) {
      return {
        ok: false,
        reason: "Patch must include the utility file.",
      };
    }

    if (!patch.includes("main.ts")) {
      return {
        ok: false,
        reason: "Patch must include main code update.",
      };
    }

    if (!patch.includes("test")) {
      return {
        ok: false,
        reason: "Patch must include test file.",
      };
    }

    const headerCount = (patch.match(/^diff --git /gm) || []).length;
    if (headerCount < 2) {
      return {
        ok: false,
        reason: "Patch must contain at least 2 diff headers for decomposition.",
      };
    }

    return { ok: true };
  });
}
