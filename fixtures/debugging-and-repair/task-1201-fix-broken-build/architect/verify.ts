import {
    verifyArchitect,
    type VerifyCtx,
    type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyArchitect(ctx, (spec) => {
        const summary = spec.highLevelSummary.toLowerCase();
        if (!summary.includes("type mismatch") && !summary.includes("number")) {
            return { ok: false, reason: "Must mention type error fix" };
        }
        return { ok: true };
    });
}
