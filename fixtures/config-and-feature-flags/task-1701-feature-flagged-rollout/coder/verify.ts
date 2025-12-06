import { verifyCoder, type VerifyCtx, type VerifyResult } from "../../../../dist/src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyCoder(ctx, (patch) => {
        if (!patch.includes("ENABLE_DARK_MODE")) {
            return { ok: false, reason: "Must add ENABLE_DARK_MODE to config" };
        }
        if (!patch.includes("config.ENABLE_DARK_MODE ?")) {
            return { ok: false, reason: "Must use flag in theme logic" };
        }
        return { ok: true };
    });
}
