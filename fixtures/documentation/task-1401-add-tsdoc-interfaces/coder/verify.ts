import {
    verifyCoder,
    type VerifyCtx,
    type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyCoder(ctx, (patch) => {
        if (!patch.includes("src/types/user.ts")) {
            return { ok: false, reason: "Patch must modify src/types/user.ts" };
        }
        if (!patch.includes("/**") || !patch.includes("User interface")) {
            return { ok: false, reason: "Patch must include TSDoc comments" };
        }
        return { ok: true };
    });
}
