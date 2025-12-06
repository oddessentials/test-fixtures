import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("migrations/001")) {
      return {
        ok: false,
        reason: "Patch must include the first migration file (add nullable column).",
      };
    }

    if (!patch.includes("migrations/002")) {
      return {
        ok: false,
        reason: "Patch must include the second migration file (backfill).",
      };
    }

    if (!patch.includes("migrations/003")) {
      return {
        ok: false,
        reason: "Patch must include the third migration file (enforce NOT NULL).",
      };
    }

    if (!patch.includes("src/models/user.ts")) {
      return {
        ok: false,
        reason: "Patch must update src/models/user.ts for model changes.",
      };
    }

    if (!patch.includes("phone_number")) {
      return {
        ok: false,
        reason: "Patch must add the phone_number field.",
      };
    }

    if (!patch.toLowerCase().includes("null")) {
      return {
        ok: false,
        reason: "Patch must reference NULL constraints in the migration.",
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

    return { ok: true };
  });
}
