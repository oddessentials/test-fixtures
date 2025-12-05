import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (out) => {
    if (out.tasks.length < 1) {
      return {
        ok: false,
        reason: "Planner must emit at least 1 task for large file handling.",
      };
    }

    const hasLargeFileTask = out.tasks.some(
      (t) =>
        t.description.toLowerCase().includes("large") ||
        t.description.toLowerCase().includes("chunk") ||
        t.file.toLowerCase().includes("large") ||
        t.file.toLowerCase().includes("chunk")
    );
    if (!hasLargeFileTask) {
      return {
        ok: false,
        reason: "Planner must include a task for large file or chunk handling.",
      };
    }

    return { ok: true };
  });
}
