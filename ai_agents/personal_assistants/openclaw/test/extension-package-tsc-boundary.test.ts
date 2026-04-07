import { spawnSync } from "node:child_process";
import { rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  collectOptInExtensionPackageBoundaries,
  readExtensionPackageBoundaryTsconfig,
} from "../scripts/lib/extension-package-boundary.ts";

const REPO_ROOT = resolve(import.meta.dirname, "..");
const PREPARE_BOUNDARY_ARTIFACTS_BIN = resolve(
  REPO_ROOT,
  "scripts/prepare-extension-package-boundary-artifacts.mjs",
);
const require = createRequire(import.meta.url);
const TSC_BIN = require.resolve("typescript/bin/tsc");
const OPT_IN_EXTENSION_IDS = collectOptInExtensionPackageBoundaries(REPO_ROOT);
const CANARY_EXTENSION_IDS = [
  ...new Map(
    OPT_IN_EXTENSION_IDS.map((extensionId) => [
      JSON.stringify(readExtensionPackageBoundaryTsconfig(extensionId, REPO_ROOT)),
      extensionId,
    ]),
  ).values(),
];

function runNode(args: string[], timeout: number) {
  return spawnSync(process.execPath, args, {
    cwd: REPO_ROOT,
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
    timeout,
  });
}

describe("opt-in extension package TypeScript boundaries", () => {
  it("typechecks each opt-in extension cleanly through @openclaw/plugin-sdk", () => {
    const prepareResult = runNode([PREPARE_BOUNDARY_ARTIFACTS_BIN], 420_000);
    expect(prepareResult.status, `${prepareResult.stdout}\n${prepareResult.stderr}`).toBe(0);

    for (const extensionId of OPT_IN_EXTENSION_IDS) {
      const result = runNode(
        [TSC_BIN, "-p", resolve(REPO_ROOT, "extensions", extensionId, "tsconfig.json"), "--noEmit"],
        120_000,
      );
      expect(result.status, `${extensionId}\n${result.stdout}\n${result.stderr}`).toBe(0);
    }
  }, 300_000);

  it("fails when opt-in extensions import src/cli through a relative path", () => {
    for (const extensionId of CANARY_EXTENSION_IDS) {
      const extensionRoot = resolve(REPO_ROOT, "extensions", extensionId);
      const canaryPath = resolve(extensionRoot, "__rootdir_boundary_canary__.ts");
      const tsconfigPath = resolve(extensionRoot, "tsconfig.rootdir-canary.json");

      try {
        writeFileSync(
          canaryPath,
          'import * as foo from "../../src/cli/acp-cli.ts";\nvoid foo;\nexport {};\n',
          "utf8",
        );
        writeFileSync(
          tsconfigPath,
          JSON.stringify(
            {
              extends: "./tsconfig.json",
              include: ["./__rootdir_boundary_canary__.ts"],
              exclude: [],
            },
            null,
            2,
          ),
          "utf8",
        );

        const result = runNode([TSC_BIN, "-p", tsconfigPath, "--noEmit"], 120_000);
        const output = `${result.stdout}\n${result.stderr}`;
        expect(result.status).not.toBe(0);
        expect(output).toContain("TS6059");
        expect(output).toContain("src/cli/acp-cli.ts");
      } finally {
        rmSync(canaryPath, { force: true });
        rmSync(tsconfigPath, { force: true });
      }
    }
  });
});
