import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("ProvenanceRecord") && !patch.includes("provenance")) {
      return {
        ok: false,
        reason: "Patch must include provenance types.",
      };
    }

    if (!patch.includes("recordChange") && !patch.includes("tracker")) {
      return {
        ok: false,
        reason: "Patch must include tracking logic.",
      };
    }

    return { ok: true };
  });
}
