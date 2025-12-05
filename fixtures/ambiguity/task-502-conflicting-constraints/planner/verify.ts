import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (out) => {
    const hasUnknownTask = out.tasks.some((t) => t.type === "unknown");
    if (!hasUnknownTask) {
      return {
        ok: false,
        reason: "Planner must emit an 'unknown' task type for conflicting constraints.",
      };
    }

    if (out.ambiguities.length === 0) {
      return {
        ok: false,
        reason: "Planner must document the conflicting constraints in ambiguities.",
      };
    }

    const documentsConflict = out.ambiguities.some(
      (a) => a.toLowerCase().includes("conflict") || a.toLowerCase().includes("mutually")
    );
    if (!documentsConflict) {
      return {
        ok: false,
        reason: "Planner must explicitly document the constraint conflict.",
      };
    }

    return { ok: true };
  });
}
