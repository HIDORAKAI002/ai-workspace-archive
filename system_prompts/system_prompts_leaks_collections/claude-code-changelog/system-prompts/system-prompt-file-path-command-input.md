# System Prompt: file-path-command-input

- Source: inline

## Summary

JSON input structure for command execution.

# Raw Prompt Text
Input to command is JSON with file_path, memory_type (User, Project, Local, Managed), load_reason (session_start, nested_traversal, path_glob_match, include, compact), globs (optional — the paths: frontmatter patterns that matched), trigger_file_path (optional — the file Claude touched that caused the load), and parent_file_path (optional — the file that @-included this one).
Exit code ${NUM} - command completes successfully
Other exit codes - show stderr to user only
This hook is observability-only and does not support blocking.
