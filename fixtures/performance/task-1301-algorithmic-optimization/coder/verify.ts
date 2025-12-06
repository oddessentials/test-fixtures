import {
    verifyCoder,
    type VerifyCtx,
    type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyCoder(ctx, (patch) => {
        // Basic check: file modified
        if (!patch.includes("src/utils/arrayUtils.ts")) {
            return {
                ok: false,
                reason: "Patch must modify src/utils/arrayUtils.ts",
            };
        }
        // Content check
        if (!patch.includes("new Set")) {
            return {
                ok: false,
                reason: "Patch must introduce Set usage",
            };
        }
        return { ok: true };
    });
}
