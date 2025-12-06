import {
    verifyPlanner,
    type VerifyCtx,
    type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyPlanner(ctx, (plan) => {
        if (plan.tasks.length !== 1) {
            return {
                ok: false,
                reason: "Plan should have exactly 1 task",
            };
        }
        const task = plan.tasks[0];
        if (task.type !== "refactor") {
            return {
                ok: false,
                reason: "Task type must be refactor",
            };
        }
        if (task.file !== "src/index.ts") {
            return {
                ok: false,
                reason: "Task must target src/index.ts",
            };
        }
        return { ok: true };
    });
}
