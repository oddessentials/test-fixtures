import {
    verifyPlanner,
    type VerifyCtx,
    type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyPlanner(ctx, (out) => {
        const hasUpgrade = out.tasks.some(t => t.file === "package.json" && t.description.includes("18"));
        const hasRefactor = out.tasks.some(t => t.file === "src/index.js" && t.description.includes("createRoot"));

        if (!hasUpgrade) return { ok: false, reason: "Missing dependency upgrade task" };
        if (!hasRefactor) return { ok: false, reason: "Missing code migration task" };

        return { ok: true };
    });
}
