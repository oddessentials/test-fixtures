import {
    verifyPlanner,
    type VerifyCtx,
    type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyPlanner(ctx, (plan) => {
        if (plan.tasks.length !== 1) {
            return { ok: false, reason: "Plan should have exactly 1 task" };
        }
        const task = plan.tasks[0];
        if (task.type !== "refactor" && task.type !== "fix") {
            return { ok: false, reason: "Task type should be refactor or fix" };
        }
        if (task.file !== "src/types/user.ts") {
            return { ok: false, reason: "Task must target src/types/user.ts" };
        }
        return { ok: true };
    });
}
