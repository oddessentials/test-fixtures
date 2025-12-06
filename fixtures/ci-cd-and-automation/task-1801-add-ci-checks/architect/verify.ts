import { verifyArchitect, type VerifyCtx, type VerifyResult } from "../../../../dist/src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyArchitect(ctx, (spec) => {
        console.log("DEBUG SPEC:", JSON.stringify(spec, null, 2));
        if (!spec.highLevelSummary.includes("CI")) {
            return { ok: false, reason: "Must include CI configuration in summary" };
        }
        return { ok: true };
    });
}
