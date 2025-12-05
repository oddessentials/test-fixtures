import {
  verifyReviewer,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyReviewer(ctx, (out) => {
    if (out.comments.length === 0) {
      return {
        ok: false,
        reason: "Reviewer must include at least one comment for security-critical changes.",
      };
    }

    const hasBlockingField = out.comments.every((c) => typeof c.blocking === "boolean");
    if (!hasBlockingField) {
      return {
        ok: false,
        reason: "All comments must include a blocking field for security reviews.",
      };
    }

    return { ok: true };
  });
}
