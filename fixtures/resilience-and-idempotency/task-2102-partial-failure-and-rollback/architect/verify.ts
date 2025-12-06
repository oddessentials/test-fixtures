import {
    verifyArchitect,
    type VerifyCtx,
    type VerifyResult
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyArchitect(ctx, (parsed) => {
        const summary = parsed.highLevelSummary.toLowerCase();
        if (!summary.includes("rollback") && !summary.includes("compensat")) {
            return { ok: false, message: "Summary should mention rollback or compensation" };
        }
        return { ok: true };
    });
}
