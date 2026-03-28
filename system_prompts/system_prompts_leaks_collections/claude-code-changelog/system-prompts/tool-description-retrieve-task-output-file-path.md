# Tool Prompt: retrieve-task-output-file-path

- Name: TaskOutput

## Summary

Fetches output from a completed task.

# Raw Prompt Text
DEPRECATED: Prefer using the Read tool on the task's output file path instead. Background tasks return their output file path in the tool result, and you receive a <task-notification> with the same path when the task completes — Read that file directly.

- Retrieves output from a running or completed task (background shell, agent, or remote session)
- Takes a task_id parameter identifying the task
- Returns the task output along with status information
- Use block=true (default) to wait for task completion
- Use block=false for non-blocking check of current status
- Task IDs can be found using the ${PATH} command
- Works with all task types: background shells, async agents, and remote sessions
