#!/usr/bin/env node

"use strict";

const { spawnSync } = require("child_process");
const { createSafeItoEnvironment } = require("./lib/ito-environment");

const DESK_URL = "https://compute.itomarkets.com/desk";
const SCHEMA_VERSION = "ito.compute.handoff.v1";
const SUPPORTED_ACCELERATORS = Object.freeze({
  h100: "h100",
  "h100-pcie": "h100-pcie",
  "h100-sxm": "h100-sxm",
});
const REQUIRED_INTENT_OPTIONS = Object.freeze([
  "accelerator",
  "count",
  "hours",
]);

function showHelp() {
  console.log(`
ECC × Itô compute handoff

Usage:
  ecc ito rent --accelerator <h100|h100-pcie|h100-sxm> --count <1-64> --hours <1-720> [options]

Options:
  --dry-run   Emit the exact handoff without opening a browser
  --no-open   Emit the exact handoff for manual browser navigation
  --json      Emit the versioned response envelope as JSON
  --help      Show this help

Example:
  ecc ito rent --accelerator h100 --count 1 --hours 24

This command creates a sandbox-only, read-only intent. It opens the Itô desk
for manual copy; sign-in may be required. It does not send the intent into Itô,
file an RFQ, request or accept a quote, call a procurement endpoint, approve
funds, or place an order. Stop before "Pay & buy".
`);
}

function readValue(args, index, option) {
  const value = args[index + 1];
  if (value === undefined || value.startsWith("--")) {
    throw new Error(`--${option} requires a value`);
  }
  return value;
}

function parseInteger(raw, option, minimum, maximum) {
  if (!/^[0-9]+$/.test(raw)) {
    throw new Error(`--${option} must be an integer between ${minimum} and ${maximum}`);
  }
  const value = Number(raw);
  if (!Number.isSafeInteger(value) || value < minimum || value > maximum) {
    throw new Error(`--${option} must be an integer between ${minimum} and ${maximum}`);
  }
  return value;
}

function parseAccelerator(raw) {
  const normalized = String(raw).trim().toLowerCase();
  const accelerator = SUPPORTED_ACCELERATORS[normalized];
  if (!accelerator) {
    throw new Error(
      "--accelerator must be one of h100, h100-pcie, or h100-sxm"
    );
  }
  return accelerator;
}

function parseArgs(argv) {
  const args = [...argv];
  if (args.includes("--help") || args.includes("-h")) {
    return { help: true };
  }

  const command = args.shift();
  if (command !== "rent") {
    throw new Error(`unsupported Itô command: ${command || "(missing)"}`);
  }

  const values = {
    accelerator: null,
    count: null,
    hours: null,
    dryRun: false,
    json: false,
    noOpen: false,
  };
  const seen = new Set();

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--dry-run") {
      if (seen.has("dry-run")) throw new Error("--dry-run may only be provided once");
      seen.add("dry-run");
      values.dryRun = true;
      continue;
    }
    if (arg === "--json") {
      if (seen.has("json")) throw new Error("--json may only be provided once");
      seen.add("json");
      values.json = true;
      continue;
    }
    if (arg === "--no-open") {
      if (seen.has("no-open")) throw new Error("--no-open may only be provided once");
      seen.add("no-open");
      values.noOpen = true;
      continue;
    }

    const option = arg.startsWith("--") ? arg.slice(2) : "";
    if (!REQUIRED_INTENT_OPTIONS.includes(option)) {
      throw new Error(`unsupported option: ${arg}`);
    }
    if (seen.has(option)) {
      throw new Error(`--${option} may only be provided once`);
    }
    seen.add(option);
    const raw = readValue(args, index, option);
    if (option === "accelerator") values.accelerator = parseAccelerator(raw);
    if (option === "count") values.count = parseInteger(raw, option, 1, 64);
    if (option === "hours") values.hours = parseInteger(raw, option, 1, 720);
    index += 1;
  }

  const missing = REQUIRED_INTENT_OPTIONS.filter((option) => values[option] === null);
  if (missing.length > 0) {
    throw new Error(
      `missing required rental intent option${missing.length === 1 ? "" : "s"}: `
      + missing.map((option) => `--${option}`).join(", ")
    );
  }

  return {
    help: false,
    command,
    options: Object.freeze({
      ...values,
      dryRun: values.dryRun || process.env.ECC_DRY_RUN === "1",
    }),
  };
}

function buildHandoffMessage(intent) {
  const accelerator = intent.accelerator.toUpperCase();
  return [
    "[ECC sandbox-only compute handoff]",
    `Source: ECC CLI. Need ${intent.count} × ${accelerator} for ${intent.hours} hours.`,
    "Treat this as a read-only requirement for review.",
    "Do not file an RFQ, request or accept a quote, place an order, approve funds, or contact a counterparty without a separate explicit human action in Itô.",
  ].join(" ");
}

function createEnvelope({ success, state, data, error }) {
  return Object.freeze({
    schemaVersion: SCHEMA_VERSION,
    success,
    state,
    data,
    error,
    links: Object.freeze({ desk: DESK_URL }),
  });
}

function createInvalidEnvelope(message) {
  return createEnvelope({
    success: false,
    state: "invalid_request",
    data: null,
    error: Object.freeze({
      code: "INVALID_ARGUMENT",
      message,
    }),
  });
}

function defaultOpenUrl(url) {
  let executable;
  let args;
  const testExecutable = process.env.NODE_ENV === "test"
    ? process.env.ECC_ITO_BROWSER_EXECUTABLE
    : null;

  if (testExecutable) {
    if (process.platform === "win32" && /\.(?:bat|cmd)$/i.test(testExecutable)) {
      executable = process.env.ComSpec || "cmd.exe";
      args = ["/d", "/s", "/c", testExecutable, url];
    } else {
      executable = testExecutable;
      args = [url];
    }
  } else if (process.platform === "darwin") {
    executable = "open";
    args = [url];
  } else if (process.platform === "win32") {
    executable = "cmd.exe";
    args = ["/d", "/s", "/c", "start", "", url];
  } else {
    executable = "xdg-open";
    args = [url];
  }

  const result = spawnSync(executable, args, {
    env: { ...createSafeItoEnvironment(process.env) },
    stdio: "ignore",
    windowsHide: true,
    shell: false,
  });
  return !result.error && result.status === 0;
}

function createHandoff(options, openUrl = defaultOpenUrl) {
  const shouldOpen = !options.dryRun && !options.noOpen;
  const opened = shouldOpen ? openUrl(DESK_URL) : false;
  const intent = Object.freeze({
    accelerator: options.accelerator,
    count: options.count,
    hours: options.hours,
  });

  return createEnvelope({
    success: true,
    state: "manual_handoff",
    data: Object.freeze({
      authenticated: null,
      dryRun: options.dryRun,
      opened,
      intent,
      provenance: Object.freeze({
        source: "ecc-cli",
        command: "ecc ito rent",
      }),
      authority: Object.freeze({
        environment: "sandbox",
        readOnly: true,
        liveRfq: false,
        procurementMutation: false,
        quoteAcceptance: false,
        fundsApproval: false,
        orderCreation: false,
        outreach: false,
      }),
      handoff: Object.freeze({
        transport: "manual_copy",
        destination: "ito-desk",
        acceptedByIto: false,
        signInMayBeRequired: true,
        message: buildHandoffMessage(intent),
        limitation: "Itô /desk currently exposes no supported structured ECC intake or deep-link contract.",
      }),
      approvalGate: 'Stop before "Pay & buy".',
      priceQuote: null,
      orderId: null,
    }),
    error: null,
  });
}

function renderText(payload) {
  const { data } = payload;
  const browserState = data.dryRun
    ? "Dry-run: browser not opened."
    : data.opened
      ? "Opened the Itô desk; sign-in may be required."
      : "Browser not opened; sign-in may be required at the Itô desk.";
  return [
    "ECC × Itô sandbox compute handoff",
    "",
    browserState,
    `Desk: ${payload.links.desk}`,
    "Transport: manual copy; Itô has not accepted this intent.",
    `Message: ${data.handoff.message}`,
    `Limitation: ${data.handoff.limitation}`,
    `Approval gate: ${data.approvalGate}`,
    "",
    "ECC does not file an RFQ, request or accept a quote, use credentials, approve funds, create an order, or contact a counterparty.",
  ].join("\n");
}

function main(argv = process.argv.slice(2), dependencies = {}) {
  let parsed;
  try {
    parsed = parseArgs(argv);
  } catch (error) {
    const payload = createInvalidEnvelope(error.message);
    if (argv.includes("--json")) console.log(JSON.stringify(payload, null, 2));
    else console.error(`Error: ${error.message}`);
    return 1;
  }

  if (parsed.help) {
    showHelp();
    return 0;
  }

  const payload = createHandoff(parsed.options, dependencies.openUrl);
  if (parsed.options.json) console.log(JSON.stringify(payload, null, 2));
  else console.log(renderText(payload));
  return 0;
}

if (require.main === module) {
  process.exitCode = main();
}

module.exports = Object.freeze({
  DESK_URL,
  SCHEMA_VERSION,
  buildHandoffMessage,
  createHandoff,
  createInvalidEnvelope,
  main,
  parseAccelerator,
  parseArgs,
  renderText,
});
