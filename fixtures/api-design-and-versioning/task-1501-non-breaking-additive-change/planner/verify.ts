import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (out) => {
    if (out.tasks.length < 2) {
      return {
        ok: false,
        reason: "Planner must emit at least 2 tasks for types and handler updates.",
      };
    }

    const allowedFiles = [
      "src/routes/users.ts",
      "src/types/user.ts",
      "test/routes/users.test.ts",
    ];

    for (const task of out.tasks) {
      if (!allowedFiles.includes(task.file)) {
        return {
          ok: false,
          reason: `Task targets disallowed file: ${task.file}. Only ${allowedFiles.join(", ")} are allowed.`,
        };
      }
    }

    const hasTypesTask = out.tasks.some((t) => t.file === "src/types/user.ts");
    if (!hasTypesTask) {
      return {
        ok: false,
        reason: "Must include a task to update types in src/types/user.ts.",
      };
    }

    const hasHandlerTask = out.tasks.some((t) => t.file === "src/routes/users.ts");
    if (!hasHandlerTask) {
      return {
        ok: false,
        reason: "Must include a task to update handler in src/routes/users.ts.",
      };
    }

    const hasHighComplexity = out.tasks.some((t) => t.complexity === "high");
    if (hasHighComplexity) {
      return {
        ok: false,
        reason: "Non-breaking additive changes should not require high complexity tasks.",
      };
    }

    if (out.invalidTaskCount !== 0) {
      return {
        ok: false,
        reason: "invalidTaskCount must be 0 for a well-defined additive change.",
      };
    }

    return { ok: true };
  });
}
