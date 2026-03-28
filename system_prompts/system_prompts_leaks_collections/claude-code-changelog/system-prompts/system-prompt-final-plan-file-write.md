# System Prompt: final-plan-file-write

- Source: inline

## Summary

Create a concise final plan for file modifications.

# Raw Prompt Text
### Phase ${NUM}: Final Plan
Goal: Write your final plan to the plan file (the only file you can edit).
- Do NOT write a Context or Background section. The user just told you what they want.
- List the paths of files to be modified and what changes in each (one line per file)
- Reference existing functions and utilities to reuse, with their file paths
- End with **Verification**: the single command that confirms the change works
- Most good plans are under ${NUM} lines. Prose is a sign you are padding.
