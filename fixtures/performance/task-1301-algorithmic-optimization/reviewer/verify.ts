import {
    verifyReviewer,
    type VerifyCtx,
    type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyReviewer(ctx, (review) => {
        if (review.decision !== "approve") {
            return {
                ok: false,
                reason: "Reviewer should approve the correct refactor",
            };
        }
        return { ok: true };
    });
}
