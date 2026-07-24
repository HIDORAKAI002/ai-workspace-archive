# ECC × Itô Sandbox Handoff Evidence

Date: 2026-07-23

Branch: `agent/ecc-ito-sandbox-handoff`

Base commit: `a3130f9ebfaeed075df5d5b52538acb0ee4bcdf8`

## Result

The canonical ECC CLI now supports:

```text
ecc ito rent --accelerator h100 --count 1 --hours 24
```

The command emits an `ito.compute.handoff.v1` envelope containing the exact
accelerator, count, and duration, `ecc-cli` provenance, and a read-only sandbox
authority ceiling. It opens only `https://compute.itomarkets.com/desk`.

No supported Itô deep link or non-mutating structured external-intake endpoint
exists yet. The contract therefore reports `transport: manual_copy`,
`acceptedByIto: false`, and `signInMayBeRequired: true`. It never claims that
opening the page delivered the intent.

The CLI does not read credentials, call the network, file an RFQ, request or
accept a quote, call procurement, approve funds, create an order, perform
outreach, deploy, push, or merge. The human boundary remains before
`Pay & buy`.

## Security boundary

Both subprocess boundaries use an explicit system-environment allowlist:

1. `ecc` to the `ito` command.
2. `ito` to the OS browser opener.

The allowlist retains only runtime essentials such as path, home, temporary
directory, locale, terminal, and desktop-session variables. ECC dry-run and
test controls are passed only to the Itô command where needed. Browser-probe
tests inject API-key, service-token, and password sentinels and prove none
reach the browser child.

## Eval evidence

Focused handoff:

```text
node tests/scripts/ito-handoff.test.js
```

Result: 9 passed, 0 failed.

Covered scenarios:

- exact H100, count 1, 24-hour mapping;
- provenance and sandbox authority;
- global and local dry-run with zero browser invocation;
- exact allowlisted browser URL and sanitized child environment;
- direct Itô invocation with sanitized browser environment;
- missing, duplicate, unsupported, and out-of-range input rejection;
- absence of credential or mutating transports;
- human-readable approval boundary;
- POSIX-safe npm welcome output.

CLI and package regressions:

```text
node tests/scripts/ecc.test.js
node tests/scripts/npm-publish-surface.test.js
```

Results: 21 passed and 2 passed, with 0 failures.

Full repository suite:

```text
npm test
```

Result: 3,155 passed, 0 failed.

Static and security gates:

```text
npm run lint
npm run security:ioc-scan -- --root .
git diff --check
```

Results: all passed; the IOC scan inspected 207 files.

Packaged-bin execution:

```text
npm pack --pack-destination <temporary-directory>
node <unpacked-package>/scripts/ecc.js --dry-run ito rent \
  --accelerator h100 --count 1 --hours 24 --json
```

Result: the packed `ecc-universal-2.0.0.tgz` included executable `ecc.js` and
`ito.js`; the unpacked command returned the exact intent with `dryRun: true`,
`opened: false`, and `transport: manual_copy`.

## Changed surfaces

- `scripts/ito.js`
- `scripts/lib/ito-environment.js`
- `scripts/ecc.js`
- `package.json`
- `tests/scripts/ito-handoff.test.js`
- `tests/scripts/npm-publish-surface.test.js`
- `docs/design/ecc-ito-compute-integration.md`
- this evidence record

## Remaining limitation

ECC cannot automatically prefill or deliver this structured intent until Itô
publishes a safe, authenticated, non-mutating intake or deep-link contract.
Adding such a contract belongs in Itô and must preserve its existing human
approval gates. This ECC slice deliberately does not invent another UI,
transport, credential, or procurement path.
