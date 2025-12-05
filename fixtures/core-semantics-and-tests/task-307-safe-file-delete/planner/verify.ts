import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (out) => {
    const hasDeleteTask = out.tasks.some(
      (t) =>
        t.description.toLowerCase().includes("delete") ||
        t.description.toLowerCase().includes("remove")
    );
    if (!hasDeleteTask) {
      return {
        ok: false,
        reason: "Planner must include a task for deleting the obsolete file.",
      };
    }

    if (out.tasks.length === 0) {
      return {
        ok: false,
        reason: "Planner must emit at least one task.",
      };
    }

    return { ok: true };
  });
}
