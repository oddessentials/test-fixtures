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
        reason: "Reviewer should approve a patch that respects forbidden paths.",
      };
    }

    if (out.comments.length === 0) {
      return {
        ok: false,
        reason: "Reviewer should include at least one comment about path compliance.",
      };
    }

    const blocking = out.comments.filter((c) => c.blocking);
    if (blocking.length > 0) {
      return {
        ok: false,
        reason: "All comments should be non-blocking for a compliant patch.",
      };
    }

    return { ok: true };
  });
}
