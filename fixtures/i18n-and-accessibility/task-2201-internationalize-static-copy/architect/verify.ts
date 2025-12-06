import {
    verifyArchitect,
    type VerifyCtx,
    type VerifyResult
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyArchitect(ctx, (parsed) => {
        const summary = parsed.highLevelSummary.toLowerCase();
        if (!summary.includes("locales") && !summary.includes("json")) {
            return { ok: false, message: "Summary should mention locale file" };
        }
        return { ok: true };
    });
}
