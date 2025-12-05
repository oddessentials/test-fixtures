You are designing a spec for a data processing pipeline with sequential dependencies.

The pipeline consists of four stages that must execute in order:
1. `src/pipeline/reader.ts` - Reads raw data from input
2. `src/pipeline/parser.ts` - Parses the raw data into structured format
3. `src/pipeline/transformer.ts` - Transforms the parsed data
4. `src/pipeline/writer.ts` - Writes the final output

Requirements:
- Each stage depends on the output of the previous stage
- The chain must be strictly linear: reader -> parser -> transformer -> writer
- No circular dependencies are allowed

Non-goals:
- Do not add parallel processing
- Do not modify any configuration files
- Do not add new pipeline stages
