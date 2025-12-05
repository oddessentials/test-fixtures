Using the architect's spec for a sequential data processing pipeline, produce a task list
that implements changes across the four pipeline stages in the correct dependency order.

The pipeline stages are:
1. reader.ts - Reads raw data
2. parser.ts - Parses data (depends on reader)
3. transformer.ts - Transforms data (depends on parser)
4. writer.ts - Writes output (depends on transformer)

Requirements:
- Build a linear dependsOn chain with no cycles
- Each task must depend on the previous task in the chain
- Use correct ordering: reader -> parser -> transformer -> writer
