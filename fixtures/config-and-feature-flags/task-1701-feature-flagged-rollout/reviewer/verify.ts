import {
  verifyReviewer,
  type VerifyCtx,
  type VerifyResult,
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyReviewer(ctx, (out) => {
    if (out.decision !== "approve") {
      return {
        ok: false,
        reason:
          "For a correct feature flag implementation, the reviewer should approve.",
      };
    }

    if (out.comments.length === 0) {
      return {
        ok: false,
        reason:
          "Reviewer should include at least one comment to exercise the comments schema.",
      };
    }

    const hasBlockingComment = out.comments.some((c) => c.blocking === true);
    if (hasBlockingComment) {
      return {
        ok: false,
        reason:
          "For a correct feature flag implementation, there should be no blocking comments.",
      };
    }

    const mentionsFlag = out.comments.some(
      (c) =>
        c.message.toLowerCase().includes("flag") ||
        c.message.toLowerCase().includes("regression") ||
        c.message.toLowerCase().includes("disabled") ||
        c.message.toLowerCase().includes("enabled")
    );
    if (!mentionsFlag) {
      return {
        ok: false,
        reason:
          "At least one comment should reference the feature flag or regression testing.",
      };
    }

    return { ok: true };
  });
}
