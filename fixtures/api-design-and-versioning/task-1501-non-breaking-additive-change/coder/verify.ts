import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("src/types/user.ts")) {
      return {
        ok: false,
        reason: "Patch must update src/types/user.ts for type changes.",
      };
    }

    if (!patch.includes("src/routes/users.ts")) {
      return {
        ok: false,
        reason: "Patch must update src/routes/users.ts for handler changes.",
      };
    }

    if (!patch.includes("lastLoginAt")) {
      return {
        ok: false,
        reason: "Patch must add the lastLoginAt field.",
      };
    }

    const forbiddenPaths = ["dist/", "node_modules/", ".swarm/", "build/", ".git/", ".env"];
    for (const forbidden of forbiddenPaths) {
      if (patch.includes(forbidden)) {
        return {
          ok: false,
          reason: `Patch must not touch forbidden path: ${forbidden}`,
        };
      }
    }

    const headerCount = (patch.match(/^diff --git /gm) || []).length;
    if (headerCount < 2) {
      return {
        ok: false,
        reason: "Patch should contain at least 2 diff headers for types and handler files.",
      };
    }

    return { ok: true };
  });
}
