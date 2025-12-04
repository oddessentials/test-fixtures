import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    const lowerPatch = patch.toLowerCase();

    if (!lowerPatch.includes("health")) {
      return {
        ok: false,
        reason: "Patch must implement health endpoint",
      };
    }

    // Should not touch forbidden paths
    const forbiddenPaths = ["dist/", "node_modules/", ".swarm/", "build/"];
    for (const forbidden of forbiddenPaths) {
      if (lowerPatch.includes(forbidden)) {
        return {
          ok: false,
          reason: `Patch must not touch forbidden path: ${forbidden}`,
        };
      }
    }

    return { ok: true };
  });
}
