import {
    verifyArchitect,
    type VerifyCtx,
    type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyArchitect(ctx, (spec) => {
        const summary = spec.highLevelSummary.toLowerCase();
        if (!summary.includes("async") && !summary.includes("await")) {
            return { ok: false, reason: "Must mention async/await" };
        }
        return { ok: true };
    });
}
