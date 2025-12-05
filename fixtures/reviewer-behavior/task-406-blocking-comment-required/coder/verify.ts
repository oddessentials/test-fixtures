import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("query.ts")) {
      return {
        ok: false,
        reason: "Patch must modify src/db/query.ts.",
      };
    }

    if (!patch.includes("param") && !patch.includes("$1")) {
      return {
        ok: false,
        reason: "Patch must use parameterized queries to fix SQL injection.",
      };
    }

    return { ok: true };
  });
}
