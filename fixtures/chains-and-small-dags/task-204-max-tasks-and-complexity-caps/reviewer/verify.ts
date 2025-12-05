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
        reason: "Reviewer should approve a patch that respects constraints.",
      };
    }

    if (out.comments.length === 0) {
      return {
        ok: false,
        reason: "Reviewer should include at least one comment about constraint compliance.",
      };
    }

    const blocking = out.comments.filter((c) => c.blocking);
    if (blocking.length > 0) {
      return {
        ok: false,
        reason: "All comments should be non-blocking for a constraint-compliant patch.",
      };
    }

    const mentionsConstraint = out.comments.some(
      (c) =>
        c.message.toLowerCase().includes("constraint") ||
        c.message.toLowerCase().includes("maxtasks") ||
        c.message.toLowerCase().includes("limit") ||
        c.message.toLowerCase().includes("cap")
    );
    if (!mentionsConstraint) {
      return {
        ok: false,
        reason: "At least one comment should reference the constraints or limits.",
      };
    }

    return { ok: true };
  });
}
