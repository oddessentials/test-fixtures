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
        reason: "Planner must emit at least 3 tasks for types, v1 deprecation, and v2 creation.",
      };
    }

    const allowedFiles = [
      "src/routes/products-v1.ts",
      "src/routes/products-v2.ts",
      "src/types/product.ts",
      "test/routes/products.test.ts",
    ];

    for (const task of out.tasks) {
      if (!allowedFiles.includes(task.file)) {
        return {
          ok: false,
          reason: `Task targets disallowed file: ${task.file}. Only ${allowedFiles.join(", ")} are allowed.`,
        };
      }
    }

    const hasV2Task = out.tasks.some(
      (t) => t.file === "src/routes/products-v2.ts" || t.description.toLowerCase().includes("v2")
    );
    if (!hasV2Task) {
      return {
        ok: false,
        reason: "Must include a task to create the v2 endpoint.",
      };
    }

    const hasDeprecationTask = out.tasks.some(
      (t) => t.description.toLowerCase().includes("deprecat")
    );
    if (!hasDeprecationTask) {
      return {
        ok: false,
        reason: "Must include a task to add deprecation markers to v1.",
      };
    }

    if (out.invalidTaskCount !== 0) {
      return {
        ok: false,
        reason: "invalidTaskCount must be 0 for a well-defined versioning task.",
      };
    }

    return { ok: true };
  });
}
