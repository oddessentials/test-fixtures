import {
    verifyArchitect,
    type VerifyCtx,
    type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyArchitect(ctx, (spec) => {
        const summary = spec.highLevelSummary.toLowerCase();
        if (!summary.includes("import") && !summary.includes("bundle") && !summary.includes("tree-shake")) {
            return {
                ok: false,
                reason: "Summary must mention import refactoring or bundle size",
            };
        }
        return { ok: true };
    });
}
