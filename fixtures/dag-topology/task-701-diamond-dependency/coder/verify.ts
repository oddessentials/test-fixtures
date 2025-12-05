import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    const headerCount = (patch.match(/^diff --git /gm) || []).length;
    if (headerCount < 4) {
      return {
        ok: false,
        reason: "Patch must create at least 4 files for diamond pattern.",
      };
    }

    if (!patch.includes("taskA") || !patch.includes("taskD")) {
      return {
        ok: false,
        reason: "Patch must include root task A and convergence task D.",
      };
    }

    return { ok: true };
  });
}
