# System Prompt: exit-handling

- Source: inline

## Summary

Defines stdout and stderr visibility rules based on command exit code for tool calls.

# Raw Prompt Text
Input to command is JSON of tool call arguments.
Exit code ${NUM} - stdout${PATH} not shown
Exit code ${NUM} - show stderr to model and block tool call
Other exit codes - show stderr to user only but continue with tool call
