import { verifyPlanner, type VerifyCtx, type VerifyResult } from "../../../../dist/src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyPlanner(ctx, (plan) => {
        if (plan.tasks.length < 3) {
            return { ok: false, reason: "Must have at least 3 steps (add, backfill, enforce)" };
        }
        return { ok: true };
    });
}
