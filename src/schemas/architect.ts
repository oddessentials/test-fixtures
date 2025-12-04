// src/schemas/architect.ts
import { z } from "zod";

export const ArchitectApiSchema = z.object({
  name: z.string(),
  description: z.string(),
  method: z
    .enum(["GET", "POST", "PUT", "PATCH", "DELETE"])
    .nullable()
    .optional(),
  path: z.string().nullable().optional(),
  authRequired: z.boolean().nullable().optional(),
});

export const ArchitectRelationSchema = z.object({
  field: z.string(),
  target: z.string(),
  type: z.enum(["one-to-many", "many-to-one", "one-to-one"]),
});

export const ArchitectDataModelSchema = z.object({
  name: z.string(),
  fields: z.array(z.string()),
  primaryKey: z.string().nullable().optional(),
  indexes: z.array(z.string()).nullable().optional(),
  relations: z.array(ArchitectRelationSchema).nullable().optional(),
});

export const ArchitectSpecSchema = z.object({
  highLevelSummary: z.string(),
  pagesOrScreens: z.array(z.string()),
  apis: z.array(ArchitectApiSchema),
  dataModels: z.array(ArchitectDataModelSchema),
  recommendedFileStructure: z.array(z.string()),
});

export type ArchitectSpec = z.infer<typeof ArchitectSpecSchema>;
