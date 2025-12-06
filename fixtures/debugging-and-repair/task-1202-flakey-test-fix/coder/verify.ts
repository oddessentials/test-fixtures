import {
    verifyCoder,
    type VerifyCtx,
    type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyCoder(ctx, (patch) => {
        if (!patch.includes("async")) return { ok: false, reason: "Must make test async" };
        if (!patch.includes("await")) return { ok: false, reason: "Must await promise" };
        return { ok: true };
    });
}
