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
          "For a correct environment-specific config fix, the reviewer should approve.",
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
          "For a correct config fix, there should be no blocking comments.",
      };
    }

    const mentionsEnvironment = out.comments.some(
      (c) =>
        c.message.toLowerCase().includes("staging") ||
        c.message.toLowerCase().includes("production") ||
        c.message.toLowerCase().includes("environment") ||
        c.message.toLowerCase().includes("config")
    );
    if (!mentionsEnvironment) {
      return {
        ok: false,
        reason:
          "At least one comment should reference the environment or configuration.",
      };
    }

    return { ok: true };
  });
}
