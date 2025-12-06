import {
  verifyPlanner,
  type VerifyCtx,
  type VerifyResult,
} from "../../../../src/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyPlanner(ctx, (out) => {
    if (out.tasks.length < 4) {
      return {
        ok: false,
        reason: "Planner must emit at least 4 tasks for table split with compatibility.",
      };
    }

    const allowedFiles = [
      "migrations/001-create-order-shipping-table.sql",
      "migrations/002-copy-shipping-data.sql",
      "src/models/order.ts",
      "src/models/order-shipping.ts",
      "test/models/order.test.ts",
    ];

    for (const task of out.tasks) {
      if (!allowedFiles.includes(task.file)) {
        return {
          ok: false,
          reason: `Task targets disallowed file: ${task.file}. Only ${allowedFiles.join(", ")} are allowed.`,
        };
      }
    }

    const hasCreateTableTask = out.tasks.some(
      (t) => t.file.includes("001") || t.description.toLowerCase().includes("create")
    );
    if (!hasCreateTableTask) {
      return {
        ok: false,
        reason: "Must include a task to create the new order_shipping table.",
      };
    }

    const hasCopyDataTask = out.tasks.some(
      (t) => t.file.includes("002") || t.description.toLowerCase().includes("copy")
    );
    if (!hasCopyDataTask) {
      return {
        ok: false,
        reason: "Must include a task to copy existing shipping data.",
      };
    }

    const hasShippingModelTask = out.tasks.some(
      (t) => t.file === "src/models/order-shipping.ts"
    );
    if (!hasShippingModelTask) {
      return {
        ok: false,
        reason: "Must include a task to create the OrderShipping model.",
      };
    }

    if (out.invalidTaskCount !== 0) {
      return {
        ok: false,
        reason: "invalidTaskCount must be 0 for a well-defined table split task.",
      };
    }

    return { ok: true };
  });
}
