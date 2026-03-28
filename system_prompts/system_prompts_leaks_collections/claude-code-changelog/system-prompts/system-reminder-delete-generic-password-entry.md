# System Prompt: delete-generic-password-entry

- Source: inline

## Summary

Shows command to delete a generic password entry for the current user.

# Raw Prompt Text
security delete-generic-password -a $USER -s "${EXPR_1}"
