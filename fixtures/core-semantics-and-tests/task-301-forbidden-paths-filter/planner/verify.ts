import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (out) => {
    const forbiddenPaths = ["dist/", "node_modules/", ".swarm/", "build/", ".git/"];

    for (const task of out.tasks) {
      for (const forbidden of forbiddenPaths) {
        if (task.file.includes(forbidden.replace("/", ""))) {
          return {
            ok: false,
            reason: `Task ${task.id} targets forbidden path: ${task.file}`,
          };
        }
      }

      if (!task.file.startsWith("src/")) {
        return {
          ok: false,
          reason: `Task ${task.id} must target src/ directory, got: ${task.file}`,
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
