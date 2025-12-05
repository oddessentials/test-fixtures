import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (out) => {
    if (out.tasks.length < 4) {
      return {
        ok: false,
        reason: "Planner must emit at least 4 tasks for the pipeline chain.",
      };
    }

    const taskIds = out.tasks.map((t) => t.id);
    for (let i = 1; i < out.tasks.length; i++) {
      const task = out.tasks[i];
      if (task.dependsOn.length === 0) {
        return {
          ok: false,
          reason: `Task ${task.id} must depend on a previous task in the chain.`,
        };
      }
      const depId = task.dependsOn[0];
      if (!taskIds.includes(depId)) {
        return {
          ok: false,
          reason: `Task ${task.id} depends on unknown task ${depId}.`,
        };
      }
    }

    const firstTask = out.tasks[0];
    if (firstTask.dependsOn.length !== 0) {
      return {
        ok: false,
        reason: "First task in chain must have no dependencies.",
      };
    }

    if (out.ambiguities.length !== 0) {
      return {
        ok: false,
        reason: "ambiguities must be empty for a clear pipeline chain.",
      };
    }

    return { ok: true };
  });
}
