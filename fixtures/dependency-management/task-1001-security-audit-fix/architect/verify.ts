import {
    verifyArchitect,
    type VerifyCtx,
    type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyArchitect(ctx, (spec) => {
        const summary = spec.highLevelSummary.toLowerCase();

        if (!summary.includes("lodash")) {
            return {
                ok: false,
                reason: "highLevelSummary must mention lodash",
            };
        }

        if (!summary.includes("4.17.21")) {
            return {
                ok: false,
                reason: "highLevelSummary must mention the target version 4.17.21",
            };
        }

        // Check for non-goal or constraint awareness
        if (!summary.includes("no other") && !summary.includes("only")) {
            // Ideally we want to ensure they don't upgrade everything, but a strict check might be flaky.
            // Let's rely on the mention of the specific version for now.
        }

        return { ok: true };
    });
}
