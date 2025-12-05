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
        reason: "Reviewer must include at least one comment about the missing context.",
      };
    }

    const acknowledgesMissing = out.comments.some(
      (c) =>
        c.message.toLowerCase().includes("not exist") ||
        c.message.toLowerCase().includes("missing") ||
        c.message.toLowerCase().includes("clarification")
    );
    if (!acknowledgesMissing) {
      return {
        ok: false,
        reason: "Reviewer must acknowledge the missing context.",
      };
    }

    return { ok: true };
  });
}
