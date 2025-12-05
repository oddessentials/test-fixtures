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
        reason: "Reviewer must include at least one grounded comment.",
      };
    }

    const hasGroundedComments = out.comments.every(
      (c) => c.path && typeof c.line === "number"
    );
    if (!hasGroundedComments) {
      return {
        ok: false,
        reason: "All comments must be grounded with path and line number.",
      };
    }

    const hasBlockingField = out.comments.every((c) => typeof c.blocking === "boolean");
    if (!hasBlockingField) {
      return {
        ok: false,
        reason: "All comments must include a blocking field.",
      };
    }

    return { ok: true };
  });
}
