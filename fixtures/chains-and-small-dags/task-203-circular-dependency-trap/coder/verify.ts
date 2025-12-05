import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("types.ts") && !patch.includes("shared")) {
      return {
        ok: false,
        reason: "Patch must introduce a shared types module to break the cycle.",
      };
    }

    if (!patch.includes("auth.ts")) {
      return {
        ok: false,
        reason: "Patch must update auth.ts to use shared types.",
      };
    }

    if (!patch.includes("user.ts")) {
      return {
        ok: false,
        reason: "Patch must update user.ts to use shared types.",
      };
    }

    return { ok: true };
  });
}
