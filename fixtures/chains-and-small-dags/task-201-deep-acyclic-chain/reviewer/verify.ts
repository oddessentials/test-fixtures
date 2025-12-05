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
        reason: "Reviewer should approve a correctly implemented pipeline chain.",
      };
    }

    if (out.comments.length === 0) {
      return {
        ok: false,
        reason: "Reviewer should include at least one comment about the chain structure.",
      };
    }

    const blocking = out.comments.filter((c) => c.blocking);
    if (blocking.length > 0) {
      return {
        ok: false,
        reason: "All comments should be non-blocking for a correct pipeline implementation.",
      };
    }

    const mentionsChain = out.comments.some(
      (c) =>
        c.message.toLowerCase().includes("chain") ||
        c.message.toLowerCase().includes("pipeline") ||
        c.message.toLowerCase().includes("sequential") ||
        c.message.toLowerCase().includes("dependencies")
    );
    if (!mentionsChain) {
      return {
        ok: false,
        reason: "At least one comment should reference the pipeline chain or dependencies.",
      };
    }

    return { ok: true };
  });
}
