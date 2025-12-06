import {
    verifyArchitect,
    type VerifyCtx,
    type VerifyResult
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyArchitect(ctx, (parsed) => {
        const summary = parsed.highLevelSummary.toLowerCase();
        if (!summary.includes("idempotency") && !summary.includes("key")) {
            return { ok: false, message: "Summary should mention idempotency" };
        }
        if (!summary.includes("retry") && !summary.includes("retries")) {
            return { ok: false, message: "Summary should mention retries" };
        }
        return { ok: true };
    });
}
