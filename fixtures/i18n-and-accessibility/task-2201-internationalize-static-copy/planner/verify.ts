import {
    verifyPlanner,
    type VerifyCtx,
    type VerifyResult
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyPlanner(ctx, (parsed) => {
        const tasks = parsed.tasks;
        if (tasks.length < 2) {
            return { ok: false, message: "Expected 2 tasks: update json and update component" };
        }
        const hasJson = tasks.some(t => t.file.includes("en.json"));
        if (!hasJson) {
            return { ok: false, message: "Must update locale file" };
        }
        return { ok: true };
    });
}
