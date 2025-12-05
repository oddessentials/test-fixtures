import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (out) => {
    const hasProvenanceTask = out.tasks.some(
      (t) =>
        t.description.toLowerCase().includes("provenance") ||
        t.description.toLowerCase().includes("trace") ||
        t.description.toLowerCase().includes("origin")
    );
    if (!hasProvenanceTask) {
      return {
        ok: false,
        reason: "Planner must include a task for documenting provenance.",
      };
    }

    return { ok: true };
  });
}
