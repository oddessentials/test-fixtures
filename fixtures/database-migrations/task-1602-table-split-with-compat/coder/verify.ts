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
        reason: "Patch must include the first migration file (create table).",
      };
    }

    if (!patch.includes("migrations/002")) {
      return {
        ok: false,
        reason: "Patch must include the second migration file (copy data).",
      };
    }

    if (!patch.includes("src/models/order-shipping.ts")) {
      return {
        ok: false,
        reason: "Patch must create src/models/order-shipping.ts for the new model.",
      };
    }

    if (!patch.includes("src/models/order.ts")) {
      return {
        ok: false,
        reason: "Patch must update src/models/order.ts for dual-write logic.",
      };
    }

    if (!patch.includes("order_shipping")) {
      return {
        ok: false,
        reason: "Patch must reference the order_shipping table.",
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
