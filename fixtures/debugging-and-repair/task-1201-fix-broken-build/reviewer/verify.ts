import {
    verifyReviewer,
    type VerifyCtx,
    type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyReviewer(ctx, (output) => {
        if (output.decision !== "approve") return { ok: false, reason: "Should approve" };
        return { ok: true };
    });
}
