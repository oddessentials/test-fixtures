import { verifyPlanner, type VerifyCtx, type VerifyResult } from "../../../../dist/src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyPlanner(ctx, (plan) => {
        if (!plan.tasks.some(t => t.file.includes("AppError.ts"))) {
            return { ok: false, reason: "Must include AppError.ts" };
        }
        return { ok: true };
    });
}
