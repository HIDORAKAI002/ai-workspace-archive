# System Prompt: find-keychain-generic-password

- Source: inline

## Summary

Retrieve a macOS keychain generic password for a specified account and service.

# Raw Prompt Text
security find-generic-password -a "${EXPR_1}" -w -s "${EXPR_2}"
