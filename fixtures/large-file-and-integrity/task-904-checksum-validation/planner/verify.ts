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
        reason: "Planner must emit at least 1 task for checksum validation.",
      };
    }

    const hasChecksumTask = out.tasks.some(
      (t) =>
        t.description.toLowerCase().includes("checksum") ||
        t.description.toLowerCase().includes("hash") ||
        t.file.toLowerCase().includes("checksum") ||
        t.file.toLowerCase().includes("integrity")
    );
    if (!hasChecksumTask) {
      return {
        ok: false,
        reason: "Planner must include a task for checksum or integrity handling.",
      };
    }

    return { ok: true };
  });
}
