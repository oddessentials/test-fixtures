import {
  verifyReviewer,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyReviewer(ctx, (review) => {
    // Must have blocking field on all comments
    for (const comment of review.comments) {
      if (typeof comment.blocking !== "boolean") {
        return {
          ok: false,
          reason: "All comments must have explicit blocking field",
        };
      }
    }

    // Comments should be grounded in actual changes
    const hasGroundedComment = review.comments.some(
      (c) => c.path && c.path.includes("server.ts")
    );
    if (review.comments.length > 0 && !hasGroundedComment) {
      return {
        ok: false,
        reason: "Comments should reference actual changed files",
      };
    }

    return { ok: true };
  });
}
