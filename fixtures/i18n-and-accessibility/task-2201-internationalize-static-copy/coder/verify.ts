import {
    verifyCoder,
    type VerifyCtx,
    type VerifyResult
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyCoder(ctx, (patch) => {
        if (!patch.includes("welcome_message")) {
            return { ok: false, message: "Patch should add welcome_message key" };
        }
        if (!patch.includes("t('welcome_message')") && !patch.includes('t("welcome_message")')) {
            return { ok: false, message: "Patch should use translation function" };
        }
        return { ok: true };
    });
}
