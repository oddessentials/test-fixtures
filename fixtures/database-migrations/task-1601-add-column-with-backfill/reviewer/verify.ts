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
          "For a correct multi-step migration implementation, the reviewer should approve.",
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
          "For a correct migration implementation, there should be no blocking comments.",
      };
    }

    const mentionsMigration = out.comments.some(
      (c) =>
        c.message.toLowerCase().includes("migration") ||
        c.message.toLowerCase().includes("nullable") ||
        c.message.toLowerCase().includes("backfill") ||
        c.message.toLowerCase().includes("data loss")
    );
    if (!mentionsMigration) {
      return {
        ok: false,
        reason:
          "At least one comment should reference the migration strategy or data safety.",
      };
    }

    return { ok: true };
  });
}
