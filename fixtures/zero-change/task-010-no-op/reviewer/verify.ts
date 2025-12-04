import {
  verifyReviewer,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyReviewer(ctx, (review) => {
    for (const comment of review.comments) {
      if (typeof comment.blocking !== "boolean") {
        return {
          ok: false,
          reason: "All comments must have explicit blocking field",
        };
      }
    }

    if (review.decision === "reject") {
      return {
        ok: false,
        reason: "Should not reject when correctly identifying no changes needed",
      };
    }

    const commentText = review.comments.map((c) => c.message.toLowerCase()).join(" ");
    if (commentText && !commentText.includes("no change") && !commentText.includes("correct")) {
      return {
        ok: false,
        reason: "Comments should acknowledge correctness or no changes needed",
      };
    }

    return { ok: true };
  });
}
