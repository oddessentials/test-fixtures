import {
    verifyArchitect,
    type VerifyCtx,
    type VerifyResult
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyArchitect(ctx, (parsed) => {
        const summary = parsed.highLevelSummary.toLowerCase();
        if (!summary.includes("validate") && !summary.includes("check")) {
            return { ok: false, message: "Summary should mention validation" };
        }
        if (!summary.includes("html") && !summary.includes("xss") && !summary.includes("sanitiz")) {
            return { ok: false, message: "Summary should mention sanitization or XSS prevention" };
        }
        return { ok: true };
    });
}
