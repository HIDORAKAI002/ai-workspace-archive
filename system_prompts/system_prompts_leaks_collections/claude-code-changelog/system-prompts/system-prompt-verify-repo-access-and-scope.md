# System Prompt: verify-repo-access-and-scope

- Source: inline

## Summary

Validate GitHub repository name, access permissions, and token scopes for private repos.

# Raw Prompt Text
Check that the repository name is correct: ${EXPR_1}

Ensure you have access to this repository

For private repositories, make sure your GitHub token has the "repo" scope

You can add the repo scope with: gh auth refresh -h github.com -s repo,workflow
