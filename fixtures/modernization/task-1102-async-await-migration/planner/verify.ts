import {
    verifyPlanner,
    type VerifyCtx,
    type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyPlanner(ctx, (out) => {
        if (out.tasks.length !== 1) return { ok: false, reason: "Should have 1 task" };
        if (out.tasks[0].file !== "src/api.js") return { ok: false, reason: "Target file mismatch" };
        return { ok: true };
    });
}
