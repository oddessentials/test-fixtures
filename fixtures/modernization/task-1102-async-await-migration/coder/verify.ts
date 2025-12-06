import {
    verifyCoder,
    type VerifyCtx,
    type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyCoder(ctx, (patch) => {
        if (!patch.includes("async function")) return { ok: false, reason: "Must use async function" };
        if (!patch.includes("await fetch")) return { ok: false, reason: "Must use await fetch" };
        return { ok: true };
    });
}
