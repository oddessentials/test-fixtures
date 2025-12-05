import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("binaryDetector") && !patch.includes("isBinaryFile")) {
      return {
        ok: false,
        reason: "Patch must include binary detection logic.",
      };
    }

    if (!patch.includes("fileTypeHandler") && !patch.includes("getFileTypeInfo")) {
      return {
        ok: false,
        reason: "Patch must include file type handler.",
      };
    }

    return { ok: true };
  });
}
