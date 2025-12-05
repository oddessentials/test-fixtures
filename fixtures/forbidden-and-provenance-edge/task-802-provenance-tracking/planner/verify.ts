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
        reason: "Planner must emit at least 1 task for provenance tracking.",
      };
    }

    const hasProvenanceTask = out.tasks.some(
      (t) =>
        t.description.toLowerCase().includes("provenance") ||
        t.file.toLowerCase().includes("provenance")
    );
    if (!hasProvenanceTask) {
      return {
        ok: false,
        reason: "Planner must include a task for provenance handling.",
      };
    }

    return { ok: true };
  });
}
