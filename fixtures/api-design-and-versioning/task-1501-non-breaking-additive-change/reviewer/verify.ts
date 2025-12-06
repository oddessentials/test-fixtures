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
          "For a correct non-breaking additive change, the reviewer should approve.",
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
          "For a correct backwards-compatible change, there should be no blocking comments.",
      };
    }

    const mentionsBackwardsCompat = out.comments.some(
      (c) =>
        c.message.toLowerCase().includes("backwards") ||
        c.message.toLowerCase().includes("backward") ||
        c.message.toLowerCase().includes("optional") ||
        c.message.toLowerCase().includes("compatibility")
    );
    if (!mentionsBackwardsCompat) {
      return {
        ok: false,
        reason:
          "At least one comment should reference backwards compatibility or the optional nature of the change.",
      };
    }

    return { ok: true };
  });
}
