import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (out) => {
    for (const task of out.tasks) {
      if (!task.file.startsWith("src/utils/")) {
        return {
          ok: false,
          reason: `Task ${task.id} targets ${task.file} which is outside allowed scope (src/utils/).`,
        };
      }

      if (task.file.includes("api/") || task.file.includes("config")) {
        return {
          ok: false,
          reason: `Task ${task.id} targets forbidden path: ${task.file}`,
        };
      }
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
