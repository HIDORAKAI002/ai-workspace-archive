# System Prompt: delete-keychain-generic-password

- Source: inline

## Summary

Run macOS security command to delete a generic password for account and service.

# Raw Prompt Text
security delete-generic-password -a "${EXPR_1}" -s "${EXPR_2}"
