import {
  verifyReviewer,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyReviewer(ctx, (out) => {
    if (out.decision !== "approve") {
      return {
        ok: false,
        reason:
          "For the is-even sanity check, the reviewer should approve with at most minor nits.",
      };
    }

    if (out.comments.length === 0) {
      return {
        ok: false,
        reason:
          "Reviewer should include at least one (non-blocking) comment to exercise the comments schema.",
      };
    }

    const blocking = out.comments.filter((c) => c.blocking);
    if (blocking.length > 0) {
      return {
        ok: false,
        reason:
          "All reviewer comments for this trivial fix must be non-blocking (blocking: false).",
      };
    }

    const mentionsIsEven = out.comments.some((c) =>
      c.message.toLowerCase().includes("iseven")
    );
    if (!mentionsIsEven) {
      return {
        ok: false,
        reason:
          "At least one comment should reference isEven to stay grounded in the changed behavior.",
      };
    }

    return { ok: true };
  });
}
