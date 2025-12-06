import { verifyPlanner, type VerifyCtx, type VerifyResult } from "../../../../dist/src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyPlanner(ctx, (plan) => {
        if (plan.tasks.length < 5) {
            return { ok: false, reason: "Task list looks incomplete for safe split" };
        }
        return { ok: true };
    });
}
