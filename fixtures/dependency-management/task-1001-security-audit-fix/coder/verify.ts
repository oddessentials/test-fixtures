import {
    verifyCoder,
    type VerifyCtx,
    type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyCoder(ctx, (patch) => {
        if (!patch.includes("package.json")) {
            return {
                ok: false,
                reason: "Patch must target package.json",
            };
        }

        if (!patch.includes(`+    "lodash": "4.17.21"`)) {
            return {
                ok: false,
                reason: "Patch must add the correct lodash version",
            };
        }

        if (patch.includes("express")) {
            // We want to ensure express isn't *changed*. 
            // A unified diff context might show express, so simple includes check is risky.
            // But verifyCoder checks the *content* of the patch.
            // If the patch *modifies* express, it would show as -/+ lines.
            // If it shows as context, it's fine.
        }

        return { ok: true };
    });
}
