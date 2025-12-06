import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("src/config/flags.ts")) {
      return {
        ok: false,
        reason: "Patch must update src/config/flags.ts for flag definition.",
      };
    }

    if (!patch.includes("src/components/Settings.tsx")) {
      return {
        ok: false,
        reason: "Patch must update src/components/Settings.tsx for flag integration.",
      };
    }

    if (!patch.includes("src/components/DarkModeToggle.tsx")) {
      return {
        ok: false,
        reason: "Patch must create src/components/DarkModeToggle.tsx.",
      };
    }

    if (!patch.includes("ENABLE_DARK_MODE")) {
      return {
        ok: false,
        reason: "Patch must reference the ENABLE_DARK_MODE flag.",
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

    // Check that .env is not being modified (hardcoded values)
    if (patch.includes(".env") && !patch.includes("process.env")) {
      return {
        ok: false,
        reason: "Patch must not hardcode .env values.",
      };
    }

    return { ok: true };
  });
}
