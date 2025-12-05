import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("chunkProcessor") && !patch.includes("processChunks")) {
      return {
        ok: false,
        reason: "Patch must include chunk processor.",
      };
    }

    if (!patch.includes("largeFileHandler") && !patch.includes("handleLargeFile")) {
      return {
        ok: false,
        reason: "Patch must include large file handler.",
      };
    }

    return { ok: true };
  });
}
