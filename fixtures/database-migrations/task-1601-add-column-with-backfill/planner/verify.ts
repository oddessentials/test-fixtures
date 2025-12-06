import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (out) => {
    if (out.tasks.length < 3) {
      return {
        ok: false,
        reason: "Planner must emit at least 3 tasks for the multi-step migration.",
      };
    }

    const allowedFiles = [
      "migrations/001-add-phone-number-nullable.sql",
      "migrations/002-backfill-phone-number.sql",
      "migrations/003-enforce-phone-number-not-null.sql",
      "src/models/user.ts",
      "test/models/user.test.ts",
    ];

    for (const task of out.tasks) {
      if (!allowedFiles.includes(task.file)) {
        return {
          ok: false,
          reason: `Task targets disallowed file: ${task.file}. Only ${allowedFiles.join(", ")} are allowed.`,
        };
      }
    }

    const hasMigrationTasks = out.tasks.filter((t) => t.file.includes("migration")).length >= 3;
    if (!hasMigrationTasks) {
      return {
        ok: false,
        reason: "Must include at least 3 migration tasks for the multi-step approach.",
      };
    }

    const hasModelTask = out.tasks.some((t) => t.file === "src/models/user.ts");
    if (!hasModelTask) {
      return {
        ok: false,
        reason: "Must include a task to update the User model.",
      };
    }

    if (out.invalidTaskCount !== 0) {
      return {
        ok: false,
        reason: "invalidTaskCount must be 0 for a well-defined migration task.",
      };
    }

    return { ok: true };
  });
}
