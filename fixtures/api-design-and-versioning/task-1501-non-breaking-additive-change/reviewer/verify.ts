import { verifyReviewer, type VerifyCtx, type VerifyResult } from "../../../../dist/src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyReviewer(ctx, (review) => {
        if (review.decision !== "approve") {
            return { ok: false, reason: "Reviewer must approve valid additive change" };
        }
        return { ok: true };
    });
}
