import { verifyArchitect, type VerifyCtx, type VerifyResult } from "../../../../dist/src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyArchitect(ctx, (spec) => {
        if (!spec.constraints.some(c => c.toLowerCase().includes("backwards compatible"))) {
            return { ok: false, reason: "Must explicitly mention backwards compatibility" };
        }
        return { ok: true };
    });
}
