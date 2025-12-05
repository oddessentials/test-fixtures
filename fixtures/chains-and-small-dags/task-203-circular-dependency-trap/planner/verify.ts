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
        reason: "Planner must emit at least 2 tasks to break the circular dependency.",
      };
    }

    const taskIds = new Set(out.tasks.map((t) => t.id));
    for (const task of out.tasks) {
      for (const dep of task.dependsOn) {
        if (dep === task.id) {
          return {
            ok: false,
            reason: `Task ${task.id} cannot depend on itself.`,
          };
        }
        if (!taskIds.has(dep)) {
          return {
            ok: false,
            reason: `Task ${task.id} depends on unknown task ${dep}.`,
          };
        }
      }
    }

    const visited = new Set<string>();
    const recursionStack = new Set<string>();
    const taskMap = new Map(out.tasks.map((t) => [t.id, t]));

    function hasCycle(taskId: string): boolean {
      if (recursionStack.has(taskId)) return true;
      if (visited.has(taskId)) return false;

      visited.add(taskId);
      recursionStack.add(taskId);

      const task = taskMap.get(taskId);
      if (task) {
        for (const dep of task.dependsOn) {
          if (hasCycle(dep)) return true;
        }
      }

      recursionStack.delete(taskId);
      return false;
    }

    for (const task of out.tasks) {
      if (hasCycle(task.id)) {
        return {
          ok: false,
          reason: "Task graph contains a cycle, which is not allowed.",
        };
      }
    }

    return { ok: true };
  });
}
