import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (out) => {
    const hasNewFileTask = out.tasks.some(
      (t) =>
        t.description.toLowerCase().includes("create") ||
        t.description.toLowerCase().includes("new")
    );
    if (!hasNewFileTask) {
      return {
        ok: false,
        reason: "Planner must include a task for creating a new file.",
      };
    }

    const forbiddenPaths = ["dist/", "node_modules/", ".swarm/", "build/"];
    for (const task of out.tasks) {
      for (const forbidden of forbiddenPaths) {
        if (task.file.includes(forbidden.replace("/", ""))) {
          return {
            ok: false,
            reason: `Task ${task.id} creates file in forbidden path: ${task.file}`,
          };
        }
      }
    }

    return { ok: true };
  });
}
