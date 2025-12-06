import { verifyArchitect, type VerifyCtx, type VerifyResult } from "../../../../dist/src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyArchitect(ctx, (spec) => {
        if (!spec.highLevelSummary.toLowerCase().includes("merge") && !spec.highLevelSummary.toLowerCase().includes("override")) {
            return { ok: false, reason: "Summary must mention merging or overrides" };
        }
        return { ok: true };
    });
}
