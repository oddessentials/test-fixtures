import { verifyCoder, type VerifyCtx, type VerifyResult } from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyCoder(ctx, (patch) => {
        if (!patch.includes("JSON.stringify")) {
            return { ok: false, reason: "Must implement JSON logging" };
        }
        return { ok: true };
    });
}
