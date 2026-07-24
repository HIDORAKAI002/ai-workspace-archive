/**
 * End-to-end contract tests for ECC's read-only Itô compute handoff.
 */

const assert = require("assert")
const fs = require("fs")
const os = require("os")
const path = require("path")
const { spawnSync } = require("child_process")

const REPO_ROOT = path.join(__dirname, "..", "..")
const ECC_SCRIPT = path.join(REPO_ROOT, "scripts", "ecc.js")
const ITO_SCRIPT = path.join(REPO_ROOT, "scripts", "ito.js")
const DESK_URL = "https://compute.itomarkets.com/desk"

function runCli(args, options = {}) {
  return spawnSync(process.execPath, [ECC_SCRIPT, ...args], {
    cwd: REPO_ROOT,
    encoding: "utf8",
    env: {
      ...process.env,
      NODE_ENV: "test",
      ...(options.env || {}),
    },
  })
}

function parseJson(result, expectedStatus = 0) {
  assert.strictEqual(result.status, expectedStatus, result.stderr)
  return JSON.parse(result.stdout)
}

function runTest(name, fn) {
  try {
    fn()
    console.log(`  ✓ ${name}`)
    return true
  } catch (error) {
    console.log(`  ✗ ${name}`)
    console.error(`    ${error.message}`)
    return false
  }
}

function makeBrowserProbe() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "ecc-ito-browser-"))
  const log = path.join(dir, "opened-url.txt")
  const envLog = path.join(dir, "browser-env.txt")
  const executable = path.join(dir, process.platform === "win32" ? "browser-probe.cmd" : "browser-probe")
  if (process.platform === "win32") {
    fs.writeFileSync(executable, `@echo off\r\n<nul set /p =%1>"${log}"\r\nset >"${envLog}"\r\n`)
  } else {
    fs.writeFileSync(executable, `#!/bin/sh\nprintf '%s' "$1" > "${log}"\nenv > "${envLog}"\n`)
    fs.chmodSync(executable, 0o755)
  }
  return { dir, envLog, executable, log }
}

function main() {
  console.log("\n=== Testing ECC × Itô sandbox handoff ===\n")

  const tests = [
    ["maps the exact CLI request into a structured sandbox intent", () => {
      const payload = parseJson(runCli([
        "ito",
        "rent",
        "--accelerator", "h100",
        "--count", "1",
        "--hours", "24",
        "--no-open",
        "--json",
      ]))

      assert.strictEqual(payload.schemaVersion, "ito.compute.handoff.v1")
      assert.strictEqual(payload.success, true)
      assert.strictEqual(payload.state, "manual_handoff")
      assert.deepStrictEqual(payload.data.intent, {
        accelerator: "h100",
        count: 1,
        hours: 24,
      })
      assert.deepStrictEqual(payload.data.provenance, {
        source: "ecc-cli",
        command: "ecc ito rent",
      })
      assert.strictEqual(payload.data.authority.environment, "sandbox")
      assert.strictEqual(payload.data.authority.readOnly, true)
      assert.strictEqual(payload.data.authority.liveRfq, false)
      assert.strictEqual(payload.data.authority.procurementMutation, false)
      assert.strictEqual(payload.data.authority.quoteAcceptance, false)
      assert.strictEqual(payload.data.authority.fundsApproval, false)
      assert.strictEqual(payload.data.authority.orderCreation, false)
      assert.strictEqual(payload.data.handoff.transport, "manual_copy")
      assert.strictEqual(payload.data.handoff.destination, "ito-desk")
      assert.strictEqual(payload.data.handoff.acceptedByIto, false)
      assert.strictEqual(payload.data.handoff.signInMayBeRequired, true)
      assert.match(payload.data.handoff.message, /1 × H100/)
      assert.match(payload.data.handoff.message, /24 hours/)
      assert.match(payload.data.handoff.message, /ECC CLI/)
      assert.match(payload.data.handoff.message, /sandbox-only/)
      assert.strictEqual(payload.links.desk, DESK_URL)
      assert.strictEqual(payload.data.opened, false)
      assert.strictEqual(payload.data.priceQuote, null)
      assert.strictEqual(payload.data.orderId, null)
    }],
    ["global dry-run emits the same handoff and never opens a browser", () => {
      const probe = makeBrowserProbe()
      try {
        const payload = parseJson(runCli([
          "--dry-run",
          "ito",
          "rent",
          "--accelerator", "h100",
          "--count", "1",
          "--hours", "24",
          "--json",
        ], {
          env: { ECC_ITO_BROWSER_EXECUTABLE: probe.executable },
        }))

        assert.strictEqual(payload.data.dryRun, true)
        assert.strictEqual(payload.data.opened, false)
        assert.ok(!fs.existsSync(probe.log), "dry-run must not invoke the browser executable")
      } finally {
        fs.rmSync(probe.dir, { recursive: true, force: true })
      }
    }],
    ["local dry-run is equivalent and rejects an open request", () => {
      const probe = makeBrowserProbe()
      try {
        const payload = parseJson(runCli([
          "ito",
          "rent",
          "--accelerator", "h100",
          "--count", "1",
          "--hours", "24",
          "--dry-run",
          "--json",
        ], {
          env: { ECC_ITO_BROWSER_EXECUTABLE: probe.executable },
        }))

        assert.strictEqual(payload.data.dryRun, true)
        assert.strictEqual(payload.data.opened, false)
        assert.ok(!fs.existsSync(probe.log), "local dry-run must not invoke the browser executable")
      } finally {
        fs.rmSync(probe.dir, { recursive: true, force: true })
      }
    }],
    ["browser handoff opens only the allowlisted desk URL without inherited secrets", () => {
      const probe = makeBrowserProbe()
      try {
        const payload = parseJson(runCli([
          "ito",
          "rent",
          "--accelerator", "h100",
          "--count", "1",
          "--hours", "24",
          "--json",
        ], {
          env: {
            ECC_ITO_BROWSER_EXECUTABLE: probe.executable,
            ITO_API_KEY: "parent-api-key-must-not-cross",
            ITO_SERVICE_TOKEN: "parent-token-must-not-cross",
            TEST_PASSWORD: "parent-password-must-not-cross",
          },
        }))

        assert.strictEqual(payload.data.opened, true)
        assert.strictEqual(fs.readFileSync(probe.log, "utf8"), DESK_URL)
        assert.strictEqual(payload.links.desk, DESK_URL)
        const childEnvironment = fs.readFileSync(probe.envLog, "utf8")
        assert.doesNotMatch(childEnvironment, /parent-api-key-must-not-cross/)
        assert.doesNotMatch(childEnvironment, /parent-token-must-not-cross/)
        assert.doesNotMatch(childEnvironment, /parent-password-must-not-cross/)
      } finally {
        fs.rmSync(probe.dir, { recursive: true, force: true })
      }
    }],
    ["direct Ito execution strips secrets from the browser child", () => {
      const probe = makeBrowserProbe()
      try {
        const result = spawnSync(process.execPath, [
          ITO_SCRIPT,
          "rent",
          "--accelerator", "h100",
          "--count", "1",
          "--hours", "24",
          "--json",
        ], {
          cwd: REPO_ROOT,
          encoding: "utf8",
          env: {
            ...process.env,
            NODE_ENV: "test",
            ECC_ITO_BROWSER_EXECUTABLE: probe.executable,
            ITO_API_KEY: "direct-api-key-must-not-cross",
            ITO_SERVICE_TOKEN: "direct-token-must-not-cross",
            TEST_PASSWORD: "direct-password-must-not-cross",
          },
        })
        const payload = parseJson(result)
        assert.strictEqual(payload.data.opened, true)
        const childEnvironment = fs.readFileSync(probe.envLog, "utf8")
        assert.doesNotMatch(childEnvironment, /direct-api-key-must-not-cross/)
        assert.doesNotMatch(childEnvironment, /direct-token-must-not-cross/)
        assert.doesNotMatch(childEnvironment, /direct-password-must-not-cross/)
      } finally {
        fs.rmSync(probe.dir, { recursive: true, force: true })
      }
    }],
    ["fails closed on missing, unsupported, duplicate, and out-of-range intent", () => {
      for (const args of [
        ["ito", "rent", "--count", "1", "--hours", "24", "--no-open", "--json"],
        ["ito", "rent", "--accelerator", "a100", "--count", "1", "--hours", "24", "--no-open", "--json"],
        ["ito", "rent", "--accelerator", "h100", "--count", "0", "--hours", "24", "--no-open", "--json"],
        ["ito", "rent", "--accelerator", "h100", "--count", "1", "--hours", "721", "--no-open", "--json"],
        ["ito", "rent", "--accelerator", "h100", "--accelerator", "h100-sxm", "--count", "1", "--hours", "24", "--no-open", "--json"],
        ["ito", "dashboard", "--accelerator", "h100", "--count", "1", "--hours", "24", "--no-open", "--json"],
      ]) {
        const result = runCli(args)
        assert.notStrictEqual(result.status, 0, args.join(" "))
        const payload = JSON.parse(result.stdout)
        assert.strictEqual(payload.success, false)
        assert.strictEqual(payload.state, "invalid_request")
        assert.strictEqual(payload.data, null)
        assert.strictEqual(payload.error.code, "INVALID_ARGUMENT")
      }
    }],
    ["does not inspect credentials or contain a mutating transport", () => {
      const payload = parseJson(runCli([
        "ito",
        "rent",
        "--accelerator", "h100",
        "--count", "1",
        "--hours", "24",
        "--no-open",
        "--json",
      ], {
        env: {
          ITO_API_KEY: "must-not-be-read",
          ITO_SERVICE_TOKEN: "must-not-be-read",
        },
      }))

      assert.strictEqual(payload.data.authenticated, null)
      const source = fs.readFileSync(path.join(REPO_ROOT, "scripts", "ito.js"), "utf8")
      assert.doesNotMatch(source, /ITO_API_KEY|ITO_SERVICE_TOKEN|procurement\/orders|authorization/i)
      assert.doesNotMatch(source, /\bfetch\s*\(|https?\.request|child_process\.exec\b/)
    }],
    ["human output stops before the economic boundary", () => {
      const result = runCli([
        "ito",
        "rent",
        "--accelerator", "h100",
        "--count", "1",
        "--hours", "24",
        "--no-open",
      ])

      assert.strictEqual(result.status, 0, result.stderr)
      assert.match(result.stdout, /manual copy/i)
      assert.match(result.stdout, /sandbox-only/i)
      assert.match(result.stdout, /sign-in may be required/i)
      assert.doesNotMatch(result.stdout, /signed-in/i)
      assert.match(result.stdout, /does not file an RFQ/i)
      assert.match(result.stdout, /Stop before ["“]Pay & buy["”]/i)
      assert.match(result.stdout, /no supported structured ECC intake/i)
    }],
    ["npm welcome remains POSIX-safe around apostrophes", () => {
      const npmExecutable = process.platform === "win32" ? "npm.cmd" : "npm"
      const result = spawnSync(npmExecutable, ["run", "welcome"], {
        cwd: REPO_ROOT,
        encoding: "utf8",
        shell: process.platform === "win32",
      })
      assert.strictEqual(result.status, 0, result.stderr)
      assert.match(result.stdout, /Itô/)
    }],
  ]

  let passed = 0
  let failed = 0
  for (const [name, fn] of tests) {
    if (runTest(name, fn)) passed += 1
    else failed += 1
  }

  console.log(`\nPassed: ${passed}`)
  console.log(`Failed: ${failed}`)
  process.exit(failed > 0 ? 1 : 0)
}

main()
