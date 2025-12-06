import {
    verifyArchitect,
    type VerifyCtx,
    type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyArchitect(ctx, (spec) => {
        const summary = spec.highLevelSummary.toLowerCase();

        if (!summary.includes("set") && !summary.includes("map") && !summary.includes("o(n)")) {
            return {
                ok: false,
                reason: "highLevelSummary must mention Set, Map, or O(N) complexity improvement",
            };
        }
        return { ok: true };
    });
}
