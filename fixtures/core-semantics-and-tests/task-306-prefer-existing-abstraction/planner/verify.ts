import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (out) => {
    const createsNewUtil = out.tasks.some(
      (t) =>
        t.file.includes("utils/new") ||
        (t.description.toLowerCase().includes("create") &&
          t.description.toLowerCase().includes("util"))
    );
    if (createsNewUtil) {
      return {
        ok: false,
        reason: "Planner must not create new utility files when existing ones should be reused.",
      };
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
