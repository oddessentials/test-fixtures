import {
  verifyReviewer,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyReviewer(ctx, (review) => {
    if (review.decision === "reject") {
      return {
        ok: false,
        reason: "Should not reject when correctly handling impossible requirements",
      };
    }

    // Must have blocking field on all comments
    for (const comment of review.comments) {
      if (typeof comment.blocking !== "boolean") {
        return {
          ok: false,
          reason: "All comments must have explicit blocking field",
        };
      }
    }

    return { ok: true };
  });
}
