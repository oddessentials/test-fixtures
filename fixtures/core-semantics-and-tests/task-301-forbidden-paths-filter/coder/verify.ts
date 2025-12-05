import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    const forbiddenPaths = ["dist/", "node_modules/", ".swarm/", "build/", ".git/"];

    for (const forbidden of forbiddenPaths) {
      if (patch.includes(forbidden)) {
        return {
          ok: false,
          reason: `Patch must not touch forbidden path: ${forbidden}`,
        };
      }
    }

    if (!patch.includes("src/")) {
      return {
        ok: false,
        reason: "Patch must only modify files in src/ directory.",
      };
    }

    return { ok: true };
  });
}
