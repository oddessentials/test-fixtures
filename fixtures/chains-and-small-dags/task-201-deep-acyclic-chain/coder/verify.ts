import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    const requiredFiles = [
      "src/pipeline/reader.ts",
      "src/pipeline/parser.ts",
      "src/pipeline/transformer.ts",
      "src/pipeline/writer.ts",
    ];

    for (const file of requiredFiles) {
      if (!patch.includes(file)) {
        return {
          ok: false,
          reason: `Patch must include changes to ${file}.`,
        };
      }
    }

    const headerCount = (patch.match(/^diff --git /gm) || []).length;
    if (headerCount < 4) {
      return {
        ok: false,
        reason: "Patch must contain at least 4 diff headers for the pipeline chain.",
      };
    }

    return { ok: true };
  });
}
