import {
    verifyPlanner,
    type VerifyCtx,
    type VerifyResult
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyPlanner(ctx, (parsed) => {
        const tasks = parsed.tasks;
        if (tasks.length < 1) {
            return { ok: false, message: "Expected at least 1 task" };
        }
        const hasComponent = tasks.some(t => t.file.includes("SignupForm"));
        if (!hasComponent) {
            return { ok: false, message: "Must update SignupForm" };
        }
        return { ok: true };
    });
}
