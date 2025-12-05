import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (out) => {
    if (out.tasks.length < 3) {
      return {
        ok: false,
        reason: "Planner must emit at least 3 tasks for sequential chain.",
      };
    }

    const hasRoot = out.tasks.some((t) => t.dependsOn.length === 0);
    if (!hasRoot) {
      return {
        ok: false,
        reason: "Chain must have a root task with no dependencies.",
      };
    }

    const hasSequentialDeps = out.tasks.filter((t) => t.dependsOn.length === 1).length >= 2;
    if (!hasSequentialDeps) {
      return {
        ok: false,
        reason: "Chain must have sequential dependencies (each task depends on one previous task).",
      };
    }

    return { ok: true };
  });
}
