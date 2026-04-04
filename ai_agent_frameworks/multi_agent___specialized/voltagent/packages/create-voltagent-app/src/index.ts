#!/usr/bin/env node
import { runCLI } from "./cli";

runCLI().catch((error: unknown) => {
  console.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
