import { verifyCoder, type VerifyCtx, type VerifyResult } from "../../../../dist/src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyCoder(ctx, (patch) => {
        if (!patch.includes("@deprecated")) {
            return { ok: false, reason: "Patch must include deprecation notice" };
        }
        if (!patch.includes("getUsersV2")) {
            return { ok: false, reason: "Patch must implement getUsersV2" };
        }
        return { ok: true };
    });
}
