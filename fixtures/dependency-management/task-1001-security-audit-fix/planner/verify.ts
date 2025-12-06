import {
    verifyPlanner,
    type VerifyCtx,
    type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
    return verifyPlanner(ctx, (out) => {
        const updateTask = out.tasks.find((t) =>
            t.description.toLowerCase().includes("lodash")
        );

        if (!updateTask) {
            return {
                ok: false,
                reason: "Must include a task to update lodash",
            };
        }

        // Check constraints
        if (out.tasks.length > 3) {
            return { ok: false, reason: "Plan is too bloated for a single dep update" };
        }

        return { ok: true };
    });
}
