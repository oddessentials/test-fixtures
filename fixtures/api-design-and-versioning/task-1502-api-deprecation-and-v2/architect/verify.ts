import { verifyArchitect, type VerifyCtx, type VerifyResult } from "../../../../dist/src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyArchitect(ctx, (spec) => {
        if (!spec.constraints.some(c => c.toLowerCase().includes("v1"))) {
            return { ok: false, reason: "Must mention v1 constraints" };
        }
        return { ok: true };
    });
}
