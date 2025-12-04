// src/schemas/reviewer.ts
import { z } from "zod";

export const reviewerCommentSchema = z.object({
  message: z.string(),
  path: z.string().optional(),
  line: z.number().int().positive().optional(),
  blocking: z.boolean(),
});

export const reviewerOutputSchema = z.object({
  decision: z.enum(["approve", "revise", "reject"]),
  comments: z.array(reviewerCommentSchema),
});

export type ReviewerComment = z.infer<typeof reviewerCommentSchema>;
export type ReviewerOutput = z.infer<typeof reviewerOutputSchema>;
