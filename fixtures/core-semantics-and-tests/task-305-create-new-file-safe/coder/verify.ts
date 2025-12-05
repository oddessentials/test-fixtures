import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("newHelper.ts") && !patch.includes("new file")) {
      return {
        ok: false,
        reason: "Patch must create the new helper file.",
      };
    }

    if (!patch.includes("src/main.ts")) {
      return {
        ok: false,
        reason: "Patch must wire the new utility into main.ts.",
      };
    }

    const forbiddenPaths = ["dist/", "node_modules/", ".swarm/", "build/"];
    for (const forbidden of forbiddenPaths) {
      if (patch.includes(forbidden)) {
        return {
          ok: false,
          reason: `Patch must not create files in forbidden path: ${forbidden}`,
        };
      }
    }

    return { ok: true };
  });
}
