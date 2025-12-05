import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (out) => {
    const hasSecurityTask = out.tasks.some(
      (t) =>
        t.description.toLowerCase().includes("sql") ||
        t.description.toLowerCase().includes("injection") ||
        t.description.toLowerCase().includes("security")
    );
    if (!hasSecurityTask) {
      return {
        ok: false,
        reason: "Planner must include a task for fixing the security vulnerability.",
      };
    }

    const hasFixType = out.tasks.some((t) => t.type === "fix");
    if (!hasFixType) {
      return {
        ok: false,
        reason: "Planner must include a fix task for the security issue.",
      };
    }

    return { ok: true };
  });
}
