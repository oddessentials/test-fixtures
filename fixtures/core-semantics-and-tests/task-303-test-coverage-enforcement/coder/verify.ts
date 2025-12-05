import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    if (!patch.includes("test") && !patch.includes(".test.ts")) {
      return {
        ok: false,
        reason: "Patch must include test file changes.",
      };
    }

    const edgeCases = ["empty", "null", "undefined", "long", "special"];
    let coveredCases = 0;
    for (const edgeCase of edgeCases) {
      if (patch.toLowerCase().includes(edgeCase)) {
        coveredCases++;
      }
    }

    if (coveredCases < 3) {
      return {
        ok: false,
        reason: "Patch must cover at least 3 edge cases (empty, null, undefined, long, special).",
      };
    }

    if (patch.includes("src/utils/parser.ts") && !patch.includes("test")) {
      return {
        ok: false,
        reason: "Patch must not modify the parser implementation.",
      };
    }

    return { ok: true };
  });
}
