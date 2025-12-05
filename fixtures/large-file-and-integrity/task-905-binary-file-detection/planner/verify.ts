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
        reason: "Planner must emit at least 1 task for binary file detection.",
      };
    }

    const hasBinaryTask = out.tasks.some(
      (t) =>
        t.description.toLowerCase().includes("binary") ||
        t.file.toLowerCase().includes("binary")
    );
    if (!hasBinaryTask) {
      return {
        ok: false,
        reason: "Planner must include a task for binary file handling.",
      };
    }

    return { ok: true };
  });
}
