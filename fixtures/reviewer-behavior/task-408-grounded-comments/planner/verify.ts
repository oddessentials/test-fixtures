import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (out) => {
    const hasRefactorTask = out.tasks.some(
      (t) =>
        t.type === "refactor" ||
        t.description.toLowerCase().includes("refactor") ||
        t.description.toLowerCase().includes("readability")
    );
    if (!hasRefactorTask) {
      return {
        ok: false,
        reason: "Planner must include a refactor task for readability improvements.",
      };
    }

    return { ok: true };
  });
}
