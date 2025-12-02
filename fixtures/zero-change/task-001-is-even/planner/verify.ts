import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (out) => {
    if (out.tasks.length !== 1) {
      return {
        ok: false,
        reason: "Planner must emit exactly one task for is-even sanity check.",
      };
    }

    const task = out.tasks[0];

    if (task.type !== "fix") {
      return { ok: false, reason: 'Task type must be "fix".' };
    }

    if (task.complexity !== "low") {
      return { ok: false, reason: 'Task complexity must be "low".' };
    }

    if (task.file !== "src/utils/isEven.ts") {
      return { ok: false, reason: "Task must target src/utils/isEven.ts." };
    }

    if (task.dependsOn.length !== 0) {
      return {
        ok: false,
        reason: "dependsOn must be empty for this trivial single-step fix.",
      };
    }

    if (out.ambiguities.length !== 0) {
      return {
        ok: false,
        reason: "ambiguities must be empty for a trivial is-even fix.",
      };
    }

    if (out.invalidTaskCount !== 0) {
      return {
        ok: false,
        reason: "invalidTaskCount must be 0.",
      };
    }

    return { ok: true };
  });
}
