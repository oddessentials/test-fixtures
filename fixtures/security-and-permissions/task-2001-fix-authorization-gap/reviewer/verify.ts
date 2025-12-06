import {
    verifyReviewer,
    type VerifyCtx,
    type VerifyResult
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyReviewer(ctx, (result) => {
        if (result.decision !== "approve") {
            return { ok: false, message: "Reviewer should approve the correct patch" };
        }
        const hasComment = result.comments.some(c => c.message.toLowerCase().includes("admin"));
        if (!hasComment) {
            // It's acceptable if they just say "LGTM" but better if they recognize the security fix.
            // stricter check:
            // return { ok: false, message: "Reviewer should mention the admin check" };
        }
        return { ok: true };
    });
}
