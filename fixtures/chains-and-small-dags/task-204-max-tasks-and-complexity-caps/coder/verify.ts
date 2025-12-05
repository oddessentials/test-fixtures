import {
  verifyCoder,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyCoder(ctx, (patch) => {
    const allowedFiles = ["database.ts", "api.ts", "utils.ts"];
    const forbiddenFiles = ["config.ts", "logging.ts"];

    for (const file of forbiddenFiles) {
      if (patch.includes(file)) {
        return {
          ok: false,
          reason: `Patch must not touch ${file} due to scope constraints.`,
        };
      }
    }

    let touchedCount = 0;
    for (const file of allowedFiles) {
      if (patch.includes(file)) {
        touchedCount++;
      }
    }

    if (touchedCount === 0) {
      return {
        ok: false,
        reason: "Patch must touch at least one of the allowed files.",
      };
    }

    const headerCount = (patch.match(/^diff --git /gm) || []).length;
    if (headerCount > 3) {
      return {
        ok: false,
        reason: "Patch must not exceed 3 file changes due to maxTasks constraint.",
      };
    }

    return { ok: true };
  });
}
