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
        reason: "Reviewer must include at least one comment about the ambiguity.",
      };
    }

    const acknowledgesAmbiguity = out.comments.some(
      (c) =>
        c.message.toLowerCase().includes("ambiguous") ||
        c.message.toLowerCase().includes("clarification")
    );
    if (!acknowledgesAmbiguity) {
      return {
        ok: false,
        reason: "Reviewer must acknowledge the ambiguity in the request.",
      };
    }

    return { ok: true };
  });
}
