import {
    verifyCoder,
    type VerifyCtx,
    type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyCoder(ctx, (patch) => {
        // Check that we are adding the number
        if (!patch.includes("retries: 3")) return { ok: false, reason: "Must set number value" };

        // Check that we are NOT adding the string (simple string check would match deleted line)
        // So we look for the line starting with +
        if (patch.includes('+  retries: "3"')) return { ok: false, reason: "Must not use string value" };

        return { ok: true };
    });
}
