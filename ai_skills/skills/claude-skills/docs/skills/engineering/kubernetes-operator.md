---
title: "Kubernetes Operator — Build Operators That Reconcile Correctly"
description: "End-to-end Kubernetes Operator discipline for Claude Code: CRD design, reconcile-loop patterns, and OperatorHub Capability Levels. 3 stdlib Python tools (CRD validator, reconcile linter, capability auditor), 4 references, CRD + Go skeletons that pass the linters. NOT a generic k8s skill — specifically the Operator pattern."
---

# Kubernetes Operator

<div class="page-meta" markdown>
<span class="meta-badge">:material-rocket-launch: Engineering - POWERFUL</span>
<span class="meta-badge">:material-identifier: `kubernetes-operator`</span>
<span class="meta-badge">:material-github: <a href="https://github.com/alirezarezvani/claude-skills/tree/main/engineering/kubernetes-operator">Source</a></span>
</div>

<div class="install-banner" markdown>
<span class="install-label">Install:</span> <code>claude /plugin install kubernetes-operator</code>
</div>

End-to-end discipline for building Kubernetes Operators correctly. Catches the recurring reconcile-loop bugs (missing finalizers, blocking calls, status drift, RBAC over-grants, no requeue) before they reach a cluster.

## When to use

- Building a new Kubernetes Operator (controller for a CRD)
- Reviewing an existing operator for capability-level gaps
- Auditing a CRD spec for status/conditions/finalizer correctness
- Choosing a framework (controller-runtime / kubebuilder / operator-sdk / metacontroller / KOPF)
- Designing the API surface of a Custom Resource
- Hardening RBAC, leader election, or webhook validation

## When NOT to use

- Plain Helm chart packaging → use `helm-chart-builder`
- Standard kubectl operations / blue-green deploys → use `senior-devops`
- General k8s security posture → use `cloud-security`

## Core principle: an operator is a reconcile loop

```
observe(actual) → desired = read(spec) → diff(actual, desired) → act → update(status)
                                                                          ↓
                                                                   requeue / done
```

## The 3 Python tools

All stdlib-only.

### `crd_validator.py`

Validates a CRD YAML against operator-pattern best practices: status subresource, structural schema, conditions array, printer columns, version policy.

```bash
python scripts/crd_validator.py --crd config/crd/myapp.yaml
```

### `reconcile_lint.py`

Lints Go reconcile functions for anti-patterns: `time.Sleep` (blocks queue), spec mutation (should be status), missing requeue on errors, oversized reconcile functions, finalizer add without remove.

```bash
python scripts/reconcile_lint.py --controller controllers/myapp_controller.go
```

### `operator_capability_audit.py`

Scores against OperatorHub Capability Levels (1-5):
- **L1** Basic Install — CRD + controller + Deployment
- **L2** Seamless Upgrades — conversion webhook + PDB + leader election
- **L3** Full Lifecycle — finalizers + status conditions + backup/restore
- **L4** Deep Insights — metrics + Prometheus rules
- **L5** Auto Pilot — autoscaling + autotuning + anomaly detection

```bash
python scripts/operator_capability_audit.py --operator-dir .
```

Reports current level + concrete next-level advancement steps.

## Framework chooser

| Framework | Language | Best for |
|---|---|---|
| **controller-runtime** | Go | Library-only, full control |
| **kubebuilder** | Go | Standard Go scaffolding |
| **operator-sdk** | Go / Helm / Ansible | OpenShift / OLM / mixed paradigm |
| **metacontroller** | Any | Polyglot, webhook-based |
| **KOPF** | Python | Python shops, async-first |

See `references/tooling_landscape.md` for full comparison + decision tree.

## Asset templates

- `assets/crd_template.yaml` — production CRD with status subresource, conditions, printer columns (passes `crd_validator.py`)
- `assets/reconcile_skeleton.go` — Go controller with idempotency, conditions, finalizers, requeue patterns (passes `reconcile_lint.py`)

## Slash command

`/operator-audit` — Run all 3 tools on an operator repo and produce a markdown report.

## Reference docs

- `references/operator_pattern.md` — what an operator IS, when to use vs alternatives
- `references/crd_design.md` — CRD design principles, versioning, conversion webhooks
- `references/reconcile_loop.md` — reconcile patterns, error handling, idempotency
- `references/tooling_landscape.md` — framework comparison + decision tree

## Verifiable success

A team using this skill should achieve:

- 100% of new CRDs pass `crd_validator.py` before merge
- All reconcile functions pass `reconcile_lint.py` strict mode
- Operators reach OperatorHub Capability Level 3 before public release
- Mean time to fix a reconcile bug: <1 day (no infinite loops in production)
