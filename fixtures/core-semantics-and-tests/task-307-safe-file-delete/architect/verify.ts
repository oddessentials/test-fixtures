import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("delete") && !summary.includes("remove")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention deleting or removing the file",
      };
    }

    if (!summary.includes("safe") && !summary.includes("obsolete") && !summary.includes("deprecated")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention safe deletion or obsolete/deprecated file",
      };
    }

    return { ok: true };
  });
}
