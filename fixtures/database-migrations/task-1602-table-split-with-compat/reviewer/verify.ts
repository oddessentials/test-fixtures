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
          "For a correct table split implementation with compatibility, the reviewer should approve.",
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
          "For a correct table split implementation, there should be no blocking comments.",
      };
    }

    const mentionsCompatibility = out.comments.some(
      (c) =>
        c.message.toLowerCase().includes("compatibility") ||
        c.message.toLowerCase().includes("dual-write") ||
        c.message.toLowerCase().includes("dual write") ||
        c.message.toLowerCase().includes("migration")
    );
    if (!mentionsCompatibility) {
      return {
        ok: false,
        reason:
          "At least one comment should reference compatibility, dual-write, or migration strategy.",
      };
    }

    return { ok: true };
  });
}
