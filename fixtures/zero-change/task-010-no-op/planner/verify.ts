import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (plan) => {
    // Should have zero tasks or a single unknown/no-op task
    if (plan.tasks.length === 0) {
      return { ok: true };
    }

    if (plan.tasks.length === 1) {
      const task = plan.tasks[0];
      if (task.type === "unknown" || task.file === "") {
        return { ok: true };
      }
    }

    return {
      ok: false,
      reason: "No-op scenario should have zero tasks or single unknown task with no file target",
    };
  });
}
