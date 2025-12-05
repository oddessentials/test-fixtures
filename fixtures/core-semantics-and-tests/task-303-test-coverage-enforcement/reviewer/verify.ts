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
        reason: "Reviewer should approve comprehensive edge-case tests.",
      };
    }

    if (out.comments.length === 0) {
      return {
        ok: false,
        reason: "Reviewer should include at least one comment about test coverage.",
      };
    }

    const blocking = out.comments.filter((c) => c.blocking);
    if (blocking.length > 0) {
      return {
        ok: false,
        reason: "All comments should be non-blocking for comprehensive tests.",
      };
    }

    const mentionsTests = out.comments.some(
      (c) =>
        c.message.toLowerCase().includes("test") ||
        c.message.toLowerCase().includes("edge") ||
        c.message.toLowerCase().includes("coverage")
    );
    if (!mentionsTests) {
      return {
        ok: false,
        reason: "At least one comment should reference tests or coverage.",
      };
    }

    return { ok: true };
  });
}
