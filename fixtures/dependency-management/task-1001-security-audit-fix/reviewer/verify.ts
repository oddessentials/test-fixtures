import {
    verifyReviewer,
    type VerifyCtx,
    type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyReviewer(ctx, (output) => {
        if (output.decision !== "approve") {
            return {
                ok: false,
                reason: "The patch is correct and should be approved",
            };
        }

        // Check key phrases in comments instead of summary
        const hasLodashComment = output.comments.some(c =>
            c.message.toLowerCase().includes("lodash") ||
            c.message.toLowerCase().includes("version")
        );

        if (!hasLodashComment && output.comments.length > 0) {
            // loose check
        }

        return { ok: true };
    });
}
