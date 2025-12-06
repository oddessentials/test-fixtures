import {
    verifyCoder,
    type VerifyCtx,
    type VerifyResult
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyCoder(ctx, (patch) => {
        if (!patch.includes("400")) {
            return { ok: false, message: "Patch should return 400 for invalid input" };
        }
        if (!patch.includes("replace") && !patch.includes("sanitize")) {
            return { ok: false, message: "Patch should sanitize input" };
        }
        return { ok: true };
    });
}
