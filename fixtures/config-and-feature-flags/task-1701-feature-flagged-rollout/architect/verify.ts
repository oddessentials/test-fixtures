import { verifyArchitect, type VerifyCtx, type VerifyResult } from "../../../../dist/src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyArchitect(ctx, (spec) => {
        if (!spec.roadmap.some(t => t.title.toLowerCase().includes("config"))) {
            return { ok: false, reason: "Roadmap must include config update for flag" };
        }
        return { ok: true };
    });
}
