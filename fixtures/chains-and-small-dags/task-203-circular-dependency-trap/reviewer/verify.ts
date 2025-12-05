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
        reason: "Reviewer should approve a correctly resolved circular dependency.",
      };
    }

    if (out.comments.length === 0) {
      return {
        ok: false,
        reason: "Reviewer should include at least one comment about the cycle resolution.",
      };
    }

    const blocking = out.comments.filter((c) => c.blocking);
    if (blocking.length > 0) {
      return {
        ok: false,
        reason: "All comments should be non-blocking for a correct cycle resolution.",
      };
    }

    const mentionsCycle = out.comments.some(
      (c) =>
        c.message.toLowerCase().includes("circular") ||
        c.message.toLowerCase().includes("cycle") ||
        c.message.toLowerCase().includes("dependency")
    );
    if (!mentionsCycle) {
      return {
        ok: false,
        reason: "At least one comment should reference the circular dependency resolution.",
      };
    }

    return { ok: true };
  });
}
