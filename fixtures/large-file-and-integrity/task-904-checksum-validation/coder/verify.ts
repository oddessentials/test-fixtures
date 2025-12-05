import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("checksumComputer") && !patch.includes("computeChecksum")) {
      return {
        ok: false,
        reason: "Patch must include checksum computation.",
      };
    }

    if (!patch.includes("validator") && !patch.includes("validateChecksum")) {
      return {
        ok: false,
        reason: "Patch must include validation logic.",
      };
    }

    return { ok: true };
  });
}
