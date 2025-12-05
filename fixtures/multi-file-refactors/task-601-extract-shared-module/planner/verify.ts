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
        reason: "Planner must emit multiple tasks for extracting shared module.",
      };
    }

    const hasCreateTask = out.tasks.some(
      (t) =>
        t.description.toLowerCase().includes("create") ||
        t.description.toLowerCase().includes("shared")
    );
    if (!hasCreateTask) {
      return {
        ok: false,
        reason: "Planner must include a task for creating the shared module.",
      };
    }

    return { ok: true };
  });
}
