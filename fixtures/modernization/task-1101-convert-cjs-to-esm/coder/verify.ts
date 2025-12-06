import {
    verifyCoder,
    type VerifyCtx,
    type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyCoder(ctx, (patch) => {
        if (!patch.includes("export const")) return { ok: false, reason: "Must use export const" };

        // Check if module.exports is added back (fail)
        // We want to ensure it is removed, so it should be in deleted lines, but not added lines.
        // Simple string check matches deleted lines.

        const lines = patch.split('\n');
        const addsModuleExports = lines.some(l => l.startsWith('+') && l.includes('module.exports'));

        if (addsModuleExports) return { ok: false, reason: "Must remove module.exports (not add it)" };

        return { ok: true };
    });
}
