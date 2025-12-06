import {
    verifyCoder,
    type VerifyCtx,
    type VerifyResult
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyCoder(ctx, (patch) => {
        if (!patch.includes("aria-label")) {
            return { ok: false, message: "Patch should add aria-label" };
        }
        if (!patch.includes("<button") && !patch.includes("type=\"submit\"")) {
            return { ok: false, message: "Patch should use button element" };
        }
        return { ok: true };
    });
}
