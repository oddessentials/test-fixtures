import {
    verifyPlanner,
    type VerifyCtx,
    type VerifyResult
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyPlanner(ctx, (parsed) => {
        // parsed is the full object { tasks: [], ... }
        const tasks = parsed.tasks;
        if (tasks.length < 2) {
            return { ok: false, message: "Expected at least 2 tasks (implementation and test)" };
        }
        const hasRoute = tasks.some(t => t.file.includes("adminRoutes.ts"));
        const hasTest = tasks.some(t => t.file.includes("test"));

        if (!hasRoute || !hasTest) {
            return { ok: false, message: "Missing route update or test update task" };
        }
        return { ok: true };
    });
}
