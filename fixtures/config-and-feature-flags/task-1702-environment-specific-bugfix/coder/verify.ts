import { verifyCoder, type VerifyCtx, type VerifyResult } from "../../../../dist/src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyCoder(ctx, (patch) => {
        if (!patch.includes("...base.payment") || !patch.includes("...prod.payment")) {
            return { ok: false, reason: "Must merge payment object properties" };
        }
        return { ok: true };
    });
}
