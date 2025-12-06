import { verifyArchitect, type VerifyCtx, type VerifyResult } from "../../../../dist/src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyArchitect(ctx, (spec) => {
        if (!spec.roadmap.some(t => t.title.toLowerCase().includes("dual write"))) {
            return { ok: false, reason: "Must include dual write step" };
        }
        return { ok: true };
    });
}
