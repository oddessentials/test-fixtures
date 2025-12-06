import {
    verifyCoder,
    type VerifyCtx,
    type VerifyResult
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyCoder(ctx, (patch) => {
        if (!patch.includes("403") && !patch.includes("Forbidden")) {
            return { ok: false, message: "Patch must implement 403 Forbidden check" };
        }
        if (!patch.includes("role") && !patch.includes("ADMIN")) {
            return { ok: false, message: "Patch check for ADMIN role" };
        }
        return { ok: true };
    });
}
