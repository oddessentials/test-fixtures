import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("config/staging.json")) {
      return {
        ok: false,
        reason: "Patch must update config/staging.json.",
      };
    }

    if (!patch.includes("30000")) {
      return {
        ok: false,
        reason: "Patch must set API_TIMEOUT to 30000.",
      };
    }

    // Ensure production config is NOT touched
    if (patch.includes("config/production.json")) {
      return {
        ok: false,
        reason: "Patch must NOT touch config/production.json.",
      };
    }

    // Ensure development config is NOT touched
    if (patch.includes("config/development.json")) {
      return {
        ok: false,
        reason: "Patch must NOT touch config/development.json.",
      };
    }

    const forbiddenPaths = ["dist/", "node_modules/", ".swarm/", "build/", ".git/"];
    for (const forbidden of forbiddenPaths) {
      if (patch.includes(forbidden)) {
        return {
          ok: false,
          reason: `Patch must not touch forbidden path: ${forbidden}`,
        };
      }
    }

    // Check for .env file specifically (not substring matches like "environment")
    if (patch.match(/[\/\s]\.env[\s\/\n]/) || patch.includes("/.env") || patch.includes(" .env ")) {
      return {
        ok: false,
        reason: "Patch must not touch .env files.",
      };
    }

    return { ok: true };
  });
}
