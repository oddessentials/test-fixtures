import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("deleted file") && !patch.includes("deprecated.ts")) {
      return {
        ok: false,
        reason: "Patch must delete the obsolete file.",
      };
    }

    const forbiddenPaths = ["dist/", "node_modules/", ".swarm/", "build/"];
    for (const forbidden of forbiddenPaths) {
      if (patch.includes(`deleted file`) && patch.includes(forbidden)) {
        return {
          ok: false,
          reason: `Patch must not delete files in forbidden path: ${forbidden}`,
        };
      }
    }

    return { ok: true };
  });
}
