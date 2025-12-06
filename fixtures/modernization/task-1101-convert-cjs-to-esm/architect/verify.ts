import {
    verifyArchitect,
    type VerifyCtx,
    type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyArchitect(ctx, (spec) => {
        const summary = spec.highLevelSummary.toLowerCase();
        if (!summary.includes("esm") && !summary.includes("es modules")) {
            return { ok: false, reason: "Must mention ESM conversion" };
        }
        return { ok: true };
    });
}
