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
        reason: "Planner must emit at least 1 task for sensitive config protection.",
      };
    }

    const hasSensitiveTask = out.tasks.some(
      (t) =>
        t.description.toLowerCase().includes("sensitive") ||
        t.description.toLowerCase().includes("secret") ||
        t.file.toLowerCase().includes("sensitive") ||
        t.file.toLowerCase().includes("secret")
    );
    if (!hasSensitiveTask) {
      return {
        ok: false,
        reason: "Planner must include a task for sensitive file or secret handling.",
      };
    }

    return { ok: true };
  });
}
