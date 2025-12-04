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
          "For the single-file low-complexity scenario, the reviewer should approve with at most minor nits.",
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

    const mentionsCapitalize = out.comments.some((c) =>
      c.message.toLowerCase().includes("capitalize")
    );
    if (!mentionsCapitalize) {
      return {
        ok: false,
        reason:
          "At least one comment should reference capitalize to stay grounded in the changed behavior.",
      };
    }

    return { ok: true };
  });
}
