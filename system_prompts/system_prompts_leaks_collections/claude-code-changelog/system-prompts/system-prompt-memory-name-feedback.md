# System Prompt: memory-name-feedback

- Source: inline

## Summary

Template for memory management with user feedback.

# Raw Prompt Text
```markdown

---

name: {{memory name}}

description: {{one-line description — used to decide relevance in future conversations, so be specific}}

type: {{user, feedback, project, reference}}

---

{{memory content — for feedback${PATH} types, structure as: rule${PATH}, then **Why:** and **How to apply:** lines}}

```
