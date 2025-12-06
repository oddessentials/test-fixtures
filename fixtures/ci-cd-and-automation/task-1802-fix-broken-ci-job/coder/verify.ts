import { verifyCoder, type VerifyCtx, type VerifyResult } from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyCoder(ctx, (patch) => {
        if (patch.includes("+export function logData(data: any)")) {
            return { ok: false, reason: "Should remove 'any'" };
        }
        if (!patch.includes(": unknown")) {
            return { ok: false, reason: "Should use 'unknown'" };
        }
        return { ok: true };
    });
}
