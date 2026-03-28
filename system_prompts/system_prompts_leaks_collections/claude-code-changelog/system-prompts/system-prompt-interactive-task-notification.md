# System Prompt: interactive-task-notification

- Source: inline

## Summary

Notification for handling blocked interactive tasks.

# Raw Prompt Text
<task-notification>
<task-id>${EXPR_1}<${PATH}>${EXPR_2}
<output-file>${EXPR_3}<${PATH}>
<summary>${EXPR_4}<${PATH}>
<${PATH}>
Last output:
${EXPR_5}

The command is likely blocked on an interactive prompt. Kill this task and re-run with piped input (e.g., `echo y | command`) or a non-interactive flag if one exists.
