import {
    verifyPlanner,
    type VerifyCtx,
    type VerifyResult
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyPlanner(ctx, (parsed) => {
        const tasks = parsed.tasks;
        if (tasks.length < 2) {
            return { ok: false, message: "Expected at least 2 tasks" };
        }
        const hasPayment = tasks.some(t => t.file.includes("payment.ts"));
        if (!hasPayment) {
            return { ok: false, message: "Must update payment service" };
        }
        return { ok: true };
    });
}
