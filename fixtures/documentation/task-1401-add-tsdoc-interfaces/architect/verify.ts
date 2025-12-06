import {
    verifyArchitect,
    type VerifyCtx,
    type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyArchitect(ctx, (spec) => {
        const summary = spec.highLevelSummary.toLowerCase();
        if (!summary.includes("tsdoc") && !summary.includes("comment") && !summary.includes("documentation")) {
            return {
                ok: false,
                reason: "Summary must mention TSDoc or documentation",
            };
        }
        return { ok: true };
    });
}
