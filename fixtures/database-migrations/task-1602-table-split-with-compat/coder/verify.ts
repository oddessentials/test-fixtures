import { verifyCoder, type VerifyCtx, type VerifyResult } from "../../../../dist/src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyCoder(ctx, (patch) => {
        if (!patch.includes("CREATE TABLE profiles")) {
            return { ok: false, reason: "Must create profiles table" };
        }
        if (!patch.includes("INSERT INTO profiles")) {
            return { ok: false, reason: "Must write to profiles (dual write)" };
        }
        return { ok: true };
    });
}
