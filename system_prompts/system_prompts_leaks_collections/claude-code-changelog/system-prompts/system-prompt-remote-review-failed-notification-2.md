# System Prompt: remote-review-failed-notification-2

- Source: inline

## Summary

Notification for a failed remote review task.

# Raw Prompt Text
<task-notification>
<task-id>${EXPR_1}<${PATH}>
<task-type>remote_agent<${PATH}>
<status>failed<${PATH}>
<summary>Remote review failed: ${EXPR_2}<${PATH}>
<${PATH}>
Remote review did not produce output (${EXPR_3}). Tell the user to retry ${PATH}, or use ${PATH} for a local review instead.
