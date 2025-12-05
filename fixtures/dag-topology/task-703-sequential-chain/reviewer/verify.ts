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
        reason: "Reviewer must include at least one comment about the sequential chain.",
      };
    }

    return { ok: true };
  });
}
