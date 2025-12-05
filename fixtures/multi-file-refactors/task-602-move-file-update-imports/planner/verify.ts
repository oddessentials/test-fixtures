import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (out) => {
    if (out.tasks.length < 2) {
      return {
        ok: false,
        reason: "Planner must emit multiple tasks for file move and import updates.",
      };
    }

    const hasMoveTask = out.tasks.some(
      (t) =>
        t.description.toLowerCase().includes("move") ||
        t.description.toLowerCase().includes("import")
    );
    if (!hasMoveTask) {
      return {
        ok: false,
        reason: "Planner must include a task for moving the file or updating imports.",
      };
    }

    return { ok: true };
  });
}
