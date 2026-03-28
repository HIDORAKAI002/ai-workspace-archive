---
allowed-tools: Read, Grep, Glob, Bash(git:*), Bash(find:*), Bash(grep:*), Bash(wc:*), Task
description: Security-focused code review
argument-hint: [files, directories, commit range, or branch]
---

# Security Review

You are coordinating a security-focused code review.

## Scope

Determine what to review from `$ARGUMENTS`:
- Git ref / range → `git diff --name-only $ARGUMENTS` and `git diff $ARGUMENTS`
- File paths / directories → those files
- Empty → all tracked files with uncommitted changes, or the last commit

## Execution

Spawn the `security-reviewer` agent with the full list of files and diff content.
Ask it to perform an exhaustive security audit.

Additionally, run these checks yourself before the agent returns:

1. **Secrets scan**: `grep -rn -E '(password|secret|token|api_key|private_key|BEGIN (RSA|OPENSSH|PGP))' <files>`
2. **Dangerous patterns**: `grep -rn -E '(eval\(|exec\(|system\(|popen\(|pickle\.load|yaml\.load[^_])' <files>`
3. **Hardcoded IPs/URLs**: `grep -rn -E 'https?://[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+' <files>`

## Report

Synthesize the agent's findings with your own grep results. Remove duplicates.
Present findings sorted by severity with confidence scores. Use the same
structured format as `/deep-review`.
