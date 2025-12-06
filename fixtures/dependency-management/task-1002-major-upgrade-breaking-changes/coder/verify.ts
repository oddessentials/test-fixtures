import {
    verifyCoder,
    type VerifyCtx,
    type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyCoder(ctx, (patch) => {
        if (!patch.includes("react-dom/client")) {
            return { ok: false, reason: "Must import from react-dom/client" };
        }
        if (!patch.includes("createRoot")) {
            return { ok: false, reason: "Must use createRoot" };
        }
        return { ok: true };
    });
}
