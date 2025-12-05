import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("validators") && !patch.includes("input.ts")) {
      return {
        ok: false,
        reason: "Patch must include the validator fix.",
      };
    }

    if (!patch.includes("services") && !patch.includes("data.ts")) {
      return {
        ok: false,
        reason: "Patch must include the service refactor.",
      };
    }

    if (!patch.includes("cache") && !patch.includes("memory.ts")) {
      return {
        ok: false,
        reason: "Patch must include the caching feature.",
      };
    }

    const headerCount = (patch.match(/^diff --git /gm) || []).length;
    if (headerCount < 3) {
      return {
        ok: false,
        reason: "Patch must contain at least 3 diff headers for mixed tasks.",
      };
    }

    return { ok: true };
  });
}
