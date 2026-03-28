# System Prompt: task-exit-handling

- Source: inline

## Summary

Multiple prompts (2)

# Raw Prompt Text
Input to command is JSON with task_id, task_subject, task_description, teammate_name, and team_name.
Exit code ${NUM} - stdout${PATH} not shown
Exit code ${NUM} - show stderr to model and prevent task creation
Other exit codes - show stderr to user only
