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
        reason: "Reviewer should approve accurate dependency documentation.",
      };
    }

    if (out.comments.length === 0) {
      return {
        ok: false,
        reason: "Reviewer should include at least one comment about dependencies.",
      };
    }

    return { ok: true };
  });
}
