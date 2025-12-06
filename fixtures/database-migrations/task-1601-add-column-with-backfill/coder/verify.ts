import { verifyCoder, type VerifyCtx, type VerifyResult } from "../../../../dist/src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyCoder(ctx, (patch) => {
        if (!patch.includes("ALTER TABLE items ADD COLUMN category_id")) {
            return { ok: false, reason: "Patch must add column" };
        }
        if (!patch.includes("UPDATE items SET category_id")) {
            return { ok: false, reason: "Patch must backfill data" };
        }
        return { ok: true };
    });
}
