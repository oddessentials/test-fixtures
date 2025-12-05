import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("forbiddenPaths") && !patch.includes("FORBIDDEN")) {
      return {
        ok: false,
        reason: "Patch must include forbidden paths definition.",
      };
    }

    if (!patch.includes("checkForbiddenPath") && !patch.includes("pathMatcher")) {
      return {
        ok: false,
        reason: "Patch must include path matching logic.",
      };
    }

    return { ok: true };
  });
}
