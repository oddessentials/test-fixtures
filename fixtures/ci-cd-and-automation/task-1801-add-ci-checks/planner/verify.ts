import { verifyPlanner, type VerifyCtx, type VerifyResult } from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyPlanner(ctx, (plan) => {
        if (!plan.tasks.some(t => t.file.includes("ci.yml"))) {
            return { ok: false, reason: "Must include .github/workflows/ci.yml" };
        }
        return { ok: true };
    });
}
