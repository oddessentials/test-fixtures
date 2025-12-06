import { verifyCoder, type VerifyCtx, type VerifyResult } from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyCoder(ctx, (patch) => {
        if (!patch.includes("name: CI") || !patch.includes("runs-on: ubuntu-latest") || !patch.includes("npm run build")) {
            return { ok: false, reason: "Must include standard CI steps" };
        }
        return { ok: true };
    });
}
