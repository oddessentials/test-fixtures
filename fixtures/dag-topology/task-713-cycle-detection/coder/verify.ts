import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("cycleDetector") && !patch.includes("cycle")) {
      return {
        ok: false,
        reason: "Patch must include cycle detection implementation.",
      };
    }

    if (!patch.includes("detectCycle") && !patch.includes("dfs")) {
      return {
        ok: false,
        reason: "Patch must include cycle detection function.",
      };
    }

    return { ok: true };
  });
}
