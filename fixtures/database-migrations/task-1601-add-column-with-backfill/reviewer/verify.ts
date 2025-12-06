import { verifyReviewer, type VerifyCtx, type VerifyResult } from "../../../../dist/src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyReviewer(ctx, (review) => {
        if (review.decision !== "approve") {
            return { ok: false, reason: "Valid migration chain should be approved" };
        }
        return { ok: true };
    });
}
