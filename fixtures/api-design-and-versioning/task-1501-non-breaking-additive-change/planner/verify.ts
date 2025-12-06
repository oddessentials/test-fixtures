import { verifyPlanner, type VerifyCtx, type VerifyResult } from "../../../../dist/src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyPlanner(ctx, (plan) => {
        if (plan.tasks.length !== 1) {
            return { ok: false, reason: "Expected exactly 1 task" };
        }
        if (!plan.tasks[0].filePaths?.includes("src/items.ts")) {
            return { ok: false, reason: "Task must target src/items.ts" };
        }
        return { ok: true };
    });
}
