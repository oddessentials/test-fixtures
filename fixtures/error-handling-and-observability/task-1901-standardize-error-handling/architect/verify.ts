import { verifyArchitect, type VerifyCtx, type VerifyResult } from "../../../../dist/src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyArchitect(ctx, (spec) => {
        if (!spec.recommendedFileStructure.some(f => f.includes("AppError.ts"))) {
            return { ok: false, reason: "Must include AppError.ts in recommended structure" };
        }
        return { ok: true };
    });
}
