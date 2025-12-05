import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("sensitivePatterns") && !patch.includes("SENSITIVE")) {
      return {
        ok: false,
        reason: "Patch must include sensitive patterns definition.",
      };
    }

    if (!patch.includes("secretDetector") && !patch.includes("detectSecrets")) {
      return {
        ok: false,
        reason: "Patch must include secret detection logic.",
      };
    }

    return { ok: true };
  });
}
