// src/schemas/coder.ts
import { z } from "zod";

/**
 * Minimal coder output: a single unified diff string.
 * In a real system this could evolve into a richer structure,
 * but for this starter kit we treat the patch as the whole output.
 */
export const coderOutputSchema = z
  .string()
  .min(1, "Patch must be a non-empty unified diff.");

export type CoderOutput = z.infer<typeof coderOutputSchema>;
