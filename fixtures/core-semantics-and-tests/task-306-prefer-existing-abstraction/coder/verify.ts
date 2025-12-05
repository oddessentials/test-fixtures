import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("import") || !patch.includes("existing")) {
      return {
        ok: false,
        reason: "Patch must import from the existing utility.",
      };
    }

    const createsNewUtil =
      patch.includes("src/utils/new") ||
      (patch.includes("new file") && patch.includes("utils/") && !patch.includes("features/"));
    if (createsNewUtil) {
      return {
        ok: false,
        reason: "Patch must not create new utility files.",
      };
    }

    return { ok: true };
  });
}
