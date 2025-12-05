import {
  verifyArchitect,
  type VerifyCtx,
  type VerifyResult,
} from "@kit/fixture-helpers";

export function verify(ctx: VerifyCtx): VerifyResult {
  return verifyArchitect(ctx, (spec) => {
    const summary = spec.highLevelSummary.toLowerCase();

    if (!summary.includes("forbidden") && !summary.includes("safe")) {
      return {
        ok: false,
        reason: "highLevelSummary must mention forbidden or safe paths",
      };
    }

    const files = spec.recommendedFileStructure;
    const forbiddenPaths = ["dist/", "node_modules/", ".swarm/", "build/", ".git/"];
    
    for (const file of files) {
      for (const forbidden of forbiddenPaths) {
        if (file.includes(forbidden.replace("/", ""))) {
          return {
            ok: false,
            reason: `recommendedFileStructure must not include forbidden path: ${forbidden}`,
          };
        }
      }
    }

    return { ok: true };
  });
}
