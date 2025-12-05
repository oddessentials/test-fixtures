import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (out) => {
    const hasTestTask = out.tasks.some(
      (t) => t.file.includes("test") || t.description.toLowerCase().includes("test")
    );
    if (!hasTestTask) {
      return {
        ok: false,
        reason: "Planner must include at least one task for adding or improving tests.",
      };
    }

    const modifiesParser = out.tasks.some(
      (t) => t.file === "src/utils/parser.ts" && t.type !== "unknown"
    );
    if (modifiesParser) {
      return {
        ok: false,
        reason: "Planner must not modify the parser implementation per spec.",
      };
    }

    return { ok: true };
  });
}
