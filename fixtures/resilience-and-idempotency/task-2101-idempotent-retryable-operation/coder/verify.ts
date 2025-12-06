import {
    verifyCoder,
    type VerifyCtx,
    type VerifyResult
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyCoder(ctx, (patch) => {
        if (!patch.includes("idempotencyKey")) {
            return { ok: false, message: "Patch should check idempotencyKey" };
        }
        if (!patch.includes("for") && !patch.includes("retry")) {
            return { ok: false, message: "Patch should implement retry loop" };
        }
        return { ok: true };
    });
}
