import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (out) => {
    if (out.tasks.length < 2) {
      return {
        ok: false,
        reason: "Planner must emit multiple tasks for a multi-file refactor.",
      };
    }

    const hasRenameTask = out.tasks.some(
      (t) =>
        t.description.toLowerCase().includes("rename") ||
        t.type === "refactor"
    );
    if (!hasRenameTask) {
      return {
        ok: false,
        reason: "Planner must include rename/refactor tasks.",
      };
    }

    const uniqueFiles = new Set(out.tasks.map((t) => t.file));
    if (uniqueFiles.size < 2) {
      return {
        ok: false,
        reason: "Planner must target multiple files for a multi-file refactor.",
      };
    }

    return { ok: true };
  });
}
