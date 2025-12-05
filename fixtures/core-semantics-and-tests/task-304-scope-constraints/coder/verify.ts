import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("src/utils/")) {
      return {
        ok: false,
        reason: "Patch must modify files in src/utils/ directory.",
      };
    }

    if (patch.includes("src/api/")) {
      return {
        ok: false,
        reason: "Patch must not touch public API endpoints in src/api/.",
      };
    }

    if (patch.includes("config") && !patch.includes("src/utils/")) {
      return {
        ok: false,
        reason: "Patch must not modify configuration files.",
      };
    }

    return { ok: true };
  });
}
