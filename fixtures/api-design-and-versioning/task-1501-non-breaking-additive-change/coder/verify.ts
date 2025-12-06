import { verifyCoder, type VerifyCtx, type VerifyResult } from "../../../../dist/src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyCoder(ctx, (patch) => {
        if (!patch.includes("query.sort === 'name'")) {
            return { ok: false, reason: "Patch must check for sort query param" };
        }
        return { ok: true };
    });
}
