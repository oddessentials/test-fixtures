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
        reason: "Reviewer must include at least one comment about the conflict.",
      };
    }

    const acknowledgesConflict = out.comments.some(
      (c) =>
        c.message.toLowerCase().includes("conflict") ||
        c.message.toLowerCase().includes("clarification")
    );
    if (!acknowledgesConflict) {
      return {
        ok: false,
        reason: "Reviewer must acknowledge the conflicting constraints.",
      };
    }

    return { ok: true };
  });
}
