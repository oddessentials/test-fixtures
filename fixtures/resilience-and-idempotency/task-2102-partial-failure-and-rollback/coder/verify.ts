import {
    verifyCoder,
    type VerifyCtx,
    type VerifyResult
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyCoder(ctx, (patch) => {
        if (!patch.includes("try") || !patch.includes("catch")) {
            return { ok: false, message: "Patch should use try-catch" };
        }
        if (!patch.includes("deleteUser")) {
            return { ok: false, message: "Patch should call deleteUser" };
        }
        return { ok: true };
    });
}
