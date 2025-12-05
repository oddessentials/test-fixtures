import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (out) => {
    const hasDependencyTask = out.tasks.some(
      (t) =>
        t.description.toLowerCase().includes("depend") ||
        t.description.toLowerCase().includes("graph")
    );
    if (!hasDependencyTask) {
      return {
        ok: false,
        reason: "Planner must include a task for documenting dependencies.",
      };
    }

    return { ok: true };
  });
}
