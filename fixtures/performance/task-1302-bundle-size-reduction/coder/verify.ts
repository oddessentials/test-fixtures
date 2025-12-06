import {
    verifyCoder,
    type VerifyCtx,
    type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyCoder(ctx, (patch) => {
        if (!patch.includes("src/index.ts")) {
            return { ok: false, reason: "Patch must modify src/index.ts" };
        }
        if (!patch.includes("import uniq from") && !patch.includes("import { uniq } from")) {
            return { ok: false, reason: "Patch must import uniq explicitly" };
        }
        return { ok: true };
    });
}
