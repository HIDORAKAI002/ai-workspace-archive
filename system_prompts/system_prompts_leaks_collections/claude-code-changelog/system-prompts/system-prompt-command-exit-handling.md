# System Prompt: command-exit-handling

- Source: inline

## Summary

Defines JSON input expectations and exit code behaviors.

# Raw Prompt Text
Input to command is JSON with original user prompt text.
Exit code ${NUM} - stdout shown to Claude
Exit code ${NUM} - block processing, erase original prompt, and show stderr to user only
Other exit codes - show stderr to user only
