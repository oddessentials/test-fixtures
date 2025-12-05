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
        reason: "Planner must emit at least 1 task for forbidden path detection.",
      };
    }

    const hasForbiddenTask = out.tasks.some(
      (t) =>
        t.description.toLowerCase().includes("forbidden") ||
        t.file.toLowerCase().includes("forbidden")
    );
    if (!hasForbiddenTask) {
      return {
        ok: false,
        reason: "Planner must include a task for forbidden path handling.",
      };
    }

    return { ok: true };
  });
}
