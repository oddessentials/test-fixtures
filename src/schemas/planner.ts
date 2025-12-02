import { z } from "zod";

export const plannerTaskSchema = z.object({
  id: z.string(),
  description: z.string(),
  file: z.string(),
  type: z.enum(["refactor", "fix", "feature", "unknown"]).default("unknown"),
  complexity: z.enum(["low", "medium", "high"]).default("medium"),
  dependsOn: z.array(z.string()).optional().default([]),
  provenance: z.record(z.string(), z.unknown()).optional(),
});

export type PlannerTask = z.infer<typeof plannerTaskSchema>;

export const plannerOutputSchema = z.object({
  tasks: z.array(plannerTaskSchema).min(1),
  ambiguities: z.array(z.string()).optional().default([]),
  invalidTaskCount: z.number().int().nonnegative().optional().default(0),
});

export type PlannerOutput = z.infer<typeof plannerOutputSchema>;
