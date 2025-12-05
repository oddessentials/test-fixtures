import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (out) => {
    if (out.tasks.length < 1) {
      return {
        ok: false,
        reason: "Planner must emit at least 1 task for file locking.",
      };
    }

    const hasLockTask = out.tasks.some(
      (t) =>
        t.description.toLowerCase().includes("lock") ||
        t.file.toLowerCase().includes("lock")
    );
    if (!hasLockTask) {
      return {
        ok: false,
        reason: "Planner must include a task for lock handling.",
      };
    }

    return { ok: true };
  });
}
