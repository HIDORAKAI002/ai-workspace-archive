# System Prompt: find-keychain-password-current-user

- Source: inline

## Summary

Retrieve a macOS keychain generic password for the current user and service.

# Raw Prompt Text
security find-generic-password -a $USER -w -s "${EXPR_1}"
