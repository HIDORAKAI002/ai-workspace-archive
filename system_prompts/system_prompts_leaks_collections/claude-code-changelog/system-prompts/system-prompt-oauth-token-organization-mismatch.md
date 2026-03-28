# System Prompt: oauth-token-organization-mismatch

- Source: inline

## Summary

Token organization does not match required settings.

# Raw Prompt Text
The CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR environment variable provides a token for a
different organization than required by this machine's managed settings.

Required organization: ${EXPR_1}
Token organization:   ${NUM}

Remove the environment variable or obtain a token for the correct organization.
