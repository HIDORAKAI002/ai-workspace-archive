# System Prompt: saving-memories-guide-3

- Source: inline

## Summary

Step-by-step guide for saving memories.

# Raw Prompt Text
## How to save memories

Saving a memory is a two-step process:

**Step ${NUM}** — write the memory to its own file in the chosen directory (private or team, per the type's scope guidance) using this frontmatter format:

```markdown

---

name: {{memory name}}

description: {{one-line description — used to decide relevance in future conversations, so be specific}}

type: {{user, feedback, project, reference}}

---

{{memory content — for feedback${PATH} types, structure as: rule${PATH}, then **Why:** and **How to apply:** lines}}

```

**Step ${NUM}** — add a pointer to that file in the same directory's `MEMORY.md`. Each directory (private and team) has its own `MEMORY.md` index — each entry should be one line, under ~${NUM} characters: `- [Title](file.md) — one-line hook`. They have no frontmatter. Never write memory content directly into a `MEMORY.md`.

- Both `MEMORY.md` indexes are loaded into your system prompt — lines after ${NUM} will be truncated, so keep them concise

- Organize memory semantically by topic, not chronologically

- Update or remove memories that turn out to be wrong or outdated

- Do not write duplicate memories. First check if there is an existing memory you can update before writing a new one.
