# CI/CD

Reference standards for pipeline/workflow configuration (GitLab CI, GitHub Actions).

---

## Common (both platforms)

- YAML syntax errors (invalid structure, incorrect indentation). [Blocking]
- Hardcoded sensitive data — use platform variables (CI/CD vars, GitHub secrets). [Blocking]
- Hardcoded environment-specific URLs (staging, production). [Important]
- Job/workflow names not clear or descriptive. [Suggestion]
- Trigger conditions not matching intended branches/events. [Important]
- Cache configuration with bad patterns (e.g. caching node_modules without key). [Important]
- Job dependencies or execution order incorrect. [Important]

## GitLab CI (.gitlab-ci.yml)

- GitLab: `only` / `rules` conditions incorrect or missing. [Important]
- GitLab: `artifacts` or `cache` configuration incorrect. [Important]
- GitLab: `needs` / `dependencies` incorrect. [Important]

## GitHub Actions (.github/workflows/*)

- GitHub: `on:` triggers (push, pull_request, workflow_dispatch) incorrect or missing. [Important]
- GitHub: hardcoded sensitive data instead of `secrets.*`. [Blocking]
- GitHub: over-permissive `permissions`. [Important]
- GitHub: invalid or insecure `actions/checkout`, `actions/cache` usage. [Important]
- GitHub: job dependency not via `needs:`. [Suggestion]

### Critical verification checkpoints

- Are all sensitive data and URLs externalized to platform variables?
- Do jobs run on the correct branches and events?
- Is cache keyed correctly to avoid stale or incorrect cache?
- Are job dependencies (needs/dependencies) correct for execution order?
