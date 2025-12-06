import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("src/types/product.ts")) {
      return {
        ok: false,
        reason: "Patch must update src/types/product.ts for type changes.",
      };
    }

    if (!patch.includes("src/routes/products-v2.ts")) {
      return {
        ok: false,
        reason: "Patch must create src/routes/products-v2.ts for the v2 endpoint.",
      };
    }

    if (!patch.toLowerCase().includes("deprecated")) {
      return {
        ok: false,
        reason: "Patch must include deprecation markers.",
      };
    }

    if (!patch.includes("priceInCents") || !patch.includes("formattedPrice")) {
      return {
        ok: false,
        reason: "Patch must add priceInCents and formattedPrice fields to v2.",
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
