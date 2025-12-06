import { verifyPlanner, type VerifyCtx, type VerifyResult } from "../../../../dist/src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyPlanner(ctx, (plan) => {
        if (!plan.tasks.some(t => t.filePaths.includes("src/lib/config-loader.ts"))) {
            return { ok: false, reason: "Must modify config-loader.ts" };
        }
        return { ok: true };
    });
}
