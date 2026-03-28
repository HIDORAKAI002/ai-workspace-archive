# System Prompt: preserve-intentional-file-changes

- Source: inline

## Summary

Honor intentional modifications to EXPR_1; consider listed diffs without mentioning them to user.

# Raw Prompt Text
Note: ${EXPR_1} was modified, either by the user or by a linter. This change was intentional, so make sure to take it into account as you proceed (ie. don't revert it unless the user asks you to). Don't tell the user this, since they are already aware. Here are the relevant changes (shown with line numbers):
${EXPR_2}
