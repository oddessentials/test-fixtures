import { verifyReviewer, type VerifyCtx, type VerifyResult } from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyReviewer(ctx, (review) => {
        if (review.decision !== "approve") {
            return { ok: false, reason: "Valid changes should be approved" };
        }
        return { ok: true };
    });
}
