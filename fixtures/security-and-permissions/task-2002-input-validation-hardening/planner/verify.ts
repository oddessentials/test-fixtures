import {
    verifyPlanner,
    type VerifyCtx,
    type VerifyResult
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyPlanner(ctx, (parsed) => {
        const tasks = parsed.tasks;
        if (tasks.length < 2) {
            return { ok: false, message: "Expected validation task and test task" };
        }
        return { ok: true };
    });
}
