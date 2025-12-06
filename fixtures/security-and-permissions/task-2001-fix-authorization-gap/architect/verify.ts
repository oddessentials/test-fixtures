import {
    verifyArchitect,
    type VerifyCtx,
    type VerifyResult
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyArchitect(ctx, (parsed) => {
        const summary = parsed.highLevelSummary.toLowerCase();
        if (!summary.includes("admin") && !summary.includes("role")) {
            return { ok: false, message: "Architect summary should mention check for ADMIN role" };
        }
        return { ok: true };
    });
}
