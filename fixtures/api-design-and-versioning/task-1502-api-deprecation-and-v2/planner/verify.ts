import { verifyPlanner, type VerifyCtx, type VerifyResult } from "../../../../dist/src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyPlanner(ctx, (plan) => {
        if (plan.tasks.length < 2) {
            return { ok: false, reason: "Should have separate tasks for V2 and deprecation" };
        }
        return { ok: true };
    });
}
