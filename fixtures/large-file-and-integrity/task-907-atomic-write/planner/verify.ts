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
        reason: "Planner must emit at least 1 task for atomic writes.",
      };
    }

    const hasAtomicTask = out.tasks.some(
      (t) =>
        t.description.toLowerCase().includes("atomic") ||
        t.file.toLowerCase().includes("atomic")
    );
    if (!hasAtomicTask) {
      return {
        ok: false,
        reason: "Planner must include a task for atomic write handling.",
      };
    }

    return { ok: true };
  });
}
