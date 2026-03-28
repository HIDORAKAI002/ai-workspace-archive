# System Prompt: handle-subagent-exit-codes

- Source: inline

## Summary

Routes stdout and stderr visibility based on subagent exit codes from a JSON command input.

# Raw Prompt Text
Input to command is JSON with agent_id, agent_type, and agent_transcript_path.
Exit code ${NUM} - stdout${PATH} not shown
Exit code ${NUM} - show stderr to subagent and continue having it run
Other exit codes - show stderr to user only
