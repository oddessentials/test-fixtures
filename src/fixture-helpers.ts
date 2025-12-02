import { ArchitectSpecSchema, type ArchitectSpec } from "./schemas/architect";
import { plannerOutputSchema, type PlannerOutput } from "./schemas/planner";
import { coderOutputSchema, type CoderOutput } from "./schemas/coder";
import { reviewerOutputSchema, type ReviewerOutput } from "./schemas/reviewer";

export type AgentKind = "architect" | "planner" | "coder" | "reviewer";

export type VerifyCtx = {
  taskDir: string;
  actual: any;
  expected: any;
};

export type VerifyResult = { ok: boolean; reason?: string };

export type CustomCheck<T> = (parsed: T, ctx: VerifyCtx) => VerifyResult;

/** Shared helper for architect fixtures */
export function verifyArchitect(
  ctx: VerifyCtx,
  check: CustomCheck<ArchitectSpec>
): VerifyResult {
  const parsed = ArchitectSpecSchema.safeParse(ctx.actual);
  if (!parsed.success) {
    return {
      ok: false,
      reason:
        "Architect output failed schema validation: " +
        JSON.stringify(parsed.error.format()),
    };
  }
  return check(parsed.data, ctx);
}

/** Shared helper for planner fixtures */
export function verifyPlanner(
  ctx: VerifyCtx,
  check: CustomCheck<PlannerOutput>
): VerifyResult {
  const parsed = plannerOutputSchema.safeParse(ctx.actual);
  if (!parsed.success) {
    return {
      ok: false,
      reason:
        "Planner output failed schema validation: " +
        JSON.stringify(parsed.error.format()),
    };
  }
  return check(parsed.data, ctx);
}

/** Shared helper for coder fixtures */
export function verifyCoder(
  ctx: VerifyCtx,
  check: CustomCheck<CoderOutput>
): VerifyResult {
  const parsed = coderOutputSchema.safeParse(ctx.actual);
  if (!parsed.success) {
    return {
      ok: false,
      reason:
        "Coder output failed schema validation: " +
        JSON.stringify(parsed.error.format()),
    };
  }
  return check(parsed.data, ctx);
}

/** Shared helper for reviewer fixtures */
export function verifyReviewer(
  ctx: VerifyCtx,
  check: CustomCheck<ReviewerOutput>
): VerifyResult {
  const parsed = reviewerOutputSchema.safeParse(ctx.actual);
  if (!parsed.success) {
    return {
      ok: false,
      reason:
        "Reviewer output failed schema validation: " +
        JSON.stringify(parsed.error.format()),
    };
  }
  return check(parsed.data, ctx);
}
