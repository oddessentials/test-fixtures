import { verifyCoder, type VerifyCtx, type VerifyResult } from "../../../../dist/src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyCoder(ctx, (patch) => {
        if (!patch.includes("class AppError extends Error") || !patch.includes("isOperational = true")) {
            return { ok: false, reason: "Must implement AppError correctly" };
        }
        return { ok: true };
    });
}
