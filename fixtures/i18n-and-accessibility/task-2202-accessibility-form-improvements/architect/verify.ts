import {
    verifyArchitect,
    type VerifyCtx,
    type VerifyResult
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyArchitect(ctx, (parsed) => {
        const summary = parsed.highLevelSummary.toLowerCase();
        if (!summary.includes("accessibility") && !summary.includes("aria") && !summary.includes("label")) {
            return { ok: false, message: "Summary should mention accessibility improvements" };
        }
        return { ok: true };
    });
}
