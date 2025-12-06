import {
    verifyReviewer,
    type VerifyCtx,
    type VerifyResult
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyReviewer(ctx, (result) => {
        if (result.decision !== "approve") {
            return { ok: false, message: "Reviewer should approve valid patch" };
        }
        return { ok: true };
    });
}
