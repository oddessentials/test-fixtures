import { verifyArchitect, type VerifyCtx, type VerifyResult } from "../../../../dist/src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyArchitect(ctx, (spec) => {
        if (!spec.roadmap.some(t => t.title.toLowerCase().includes("backfill"))) {
            return { ok: false, reason: "Roadmap must include backfill step" };
        }
        return { ok: true };
    });
}
