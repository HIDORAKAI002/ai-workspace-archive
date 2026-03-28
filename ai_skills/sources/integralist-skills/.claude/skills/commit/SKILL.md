---
name: commit
description: Create git commits with intelligent file grouping. Use when committing changes.
allowed-tools: Bash(git add:*), Bash(git diff:*), Bash(git commit:*)
---

# Commit

## Context

- Status: !`git status`
- Staged: !`git diff --cached`
- Unstaged: !`git diff`
- Recent commits: !`git log -5 --oneline 2>/dev/null || echo "(none)"`
- Branch: !`git branch --show-current`
- File stats: !`git diff --stat HEAD 2>/dev/null || git diff --stat --cached`

## Process

1. **Review context above:**

   - Check for: merge conflicts, large files,
     sensitive patterns (`*.env`, `*secret*`, `*credential*`, `*.key`)
   - Warn if on main/master branch

1. **Analyze files for grouping:**

   - Identify file purposes: config, docs, source, tests, scripts, assets
   - Identify relationships: files that reference each other, same module/feature
   - Identify change types: new files, modifications, renames

1. **Decide on commits:**

   ```text
   All files single purpose → one commit, no prompt
   Files split into obvious groups → sequential commits, no prompt
   Grouping ambiguous → prompt with 2-3 options
   ```

1. **If prompting, use AskUserQuestion with options:**

   - Option 1: All in one commit (describe contents)
   - Option 2: Suggested split (describe each group)
   - Option 3: One per file (only if ≤5 files)

1. **For each commit group:**

   - Stage specific files: `git add <file1> <file2>` (never `-A` or `.`)

   - Verify staged: `git diff --cached --name-only`

   - Commit with HEREDOC:

     ```bash
     git commit -m "$(cat <<'EOF'
     Subject line

     Optional body.
     EOF
     )"
     ```

1. **If pre-commit hook modifies files:** review the changes. Only amend if they're mechanical (formatting, linting). If substantive or unclear, ask before amending.

## Grouping Examples

**Clear single purpose (no prompt):**

- 3 test files → one commit
- README + docs/ files → one commit
- Single feature's source files → one commit

**Obvious split (no prompt, sequential commits):**

- Source files + their tests → 2 commits
- Config + docs + implementation → 3 commits
- Core feature + supporting utilities → 2 commits

**Ambiguous (prompt):**

- Mixed docs, config, and source with unclear boundaries
- Files that could logically go in multiple groups
- Large change set with no obvious structure

## Commit Message Style

- State what changed and why
- Use counts: "3 files" not "several files"
- Active voice, specific language

## Safety

- NEVER commit secrets (.env, credentials, keys)
- NEVER skip hooks without user request
- NEVER force operations without user consent
