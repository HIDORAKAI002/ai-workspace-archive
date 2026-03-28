# System Prompt: worktree-creation-command

- Source: inline

## Summary

Command input for creating a worktree.

# Raw Prompt Text
Input to command is JSON with name (suggested worktree slug).
Stdout should contain the absolute path to the created worktree directory.
Exit code ${NUM} - worktree created successfully
Other exit codes - worktree creation failed
