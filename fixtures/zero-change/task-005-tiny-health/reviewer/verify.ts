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

    if (review.decision === "revise" || review.decision === "reject") {
      return {
        ok: false,
        reason: "Minimal correct implementation should be approved",
      };
    }

    return { ok: true };
  });
}
