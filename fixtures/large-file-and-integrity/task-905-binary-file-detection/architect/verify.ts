import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("binary") && !summary.includes("file type")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention binary files or file type detection",
      };
    }

    return { ok: true };
  });
}
