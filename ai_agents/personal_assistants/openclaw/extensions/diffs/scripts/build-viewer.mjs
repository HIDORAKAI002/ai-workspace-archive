#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../scripts/build-diffs-viewer-runtime.mjs",
);
const result = spawnSync(process.execPath, [scriptPath, "curated"], { stdio: "inherit" });
if (result.error) {
  throw result.error;
}
if (result.signal) {
  console.error(`build-diffs-viewer-runtime exited with signal ${result.signal}`);
  process.exit(1);
}
process.exit(result.status ?? 0);
