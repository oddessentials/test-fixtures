import { verifyArchitect, type VerifyCtx, type VerifyResult } from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyArchitect(ctx, (spec) => {
        if (!spec.highLevelSummary.includes("any")) {
            return { ok: false, reason: "Must mention fixing 'any' type" };
        }
        return { ok: true };
    });
}
