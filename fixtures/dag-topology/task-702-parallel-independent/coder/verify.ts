import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    const headerCount = (patch.match(/^diff --git /gm) || []).length;
    if (headerCount < 2) {
      return {
        ok: false,
        reason: "Patch must create at least 2 parallel task files.",
      };
    }

    if (patch.includes("import") && patch.includes("from")) {
      const importLines = patch.match(/import.*from.*task/gi) || [];
      if (importLines.length > 0) {
        return {
          ok: false,
          reason: "Parallel tasks should not import from each other.",
        };
      }
    }

    return { ok: true };
  });
}
