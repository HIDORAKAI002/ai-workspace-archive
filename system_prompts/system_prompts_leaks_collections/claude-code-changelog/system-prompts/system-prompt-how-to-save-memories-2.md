# System Prompt: how-to-save-memories-2

- Source: inline

## Summary

Guidelines for organizing and storing memories.

# Raw Prompt Text
## How to save memories

Write each memory to its own file (e.g., `user_role.md`, `feedback_testing.md`) using this frontmatter format:

```markdown

---

name: {{memory name}}

description: {{one-line description — used to decide relevance in future conversations, so be specific}}

type: {{user, feedback, project, reference}}

---

{{memory content — for feedback${PATH} types, structure as: rule${PATH}, then **Why:** and **How to apply:** lines}}

```

- Organize memory semantically by topic, not chronologically

- Update or remove memories that turn out to be wrong or outdated

- Do not write duplicate memories. First check if there is an existing memory you can update before writing a new one.
