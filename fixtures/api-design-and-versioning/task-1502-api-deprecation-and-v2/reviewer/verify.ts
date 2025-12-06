import { verifyReviewer, type VerifyCtx, type VerifyResult } from "../../../../dist/src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyReviewer(ctx, (review) => {
        if (review.decision !== "approve") {
            return { ok: false, reason: "Should approve valid v2/deprecation patch" };
        }
        return { ok: true };
    });
}
