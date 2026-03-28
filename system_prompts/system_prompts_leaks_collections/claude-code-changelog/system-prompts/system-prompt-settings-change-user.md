# System Prompt: settings-exit-user-change

- Source: inline

## Summary

Input for changing user settings in the session.

# Raw Prompt Text
Input to command is JSON with source (user_settings, project_settings, local_settings, policy_settings, skills) and file_path.
Exit code ${NUM} - allow the change
Exit code ${NUM} - block the change from being applied to the session
Other exit codes - show stderr to user only
