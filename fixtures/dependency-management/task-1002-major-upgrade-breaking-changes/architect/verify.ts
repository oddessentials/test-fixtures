import {
    verifyArchitect,
    type VerifyCtx,
    type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyArchitect(ctx, (spec) => {
        const summary = spec.highLevelSummary.toLowerCase();

        if (!summary.includes("react 18")) {
            return { ok: false, reason: "Must mention React 18" };
        }
        if (!summary.includes("createroot")) {
            return { ok: false, reason: "Must mention createRoot" };
        }

        return { ok: true };
    });
}
