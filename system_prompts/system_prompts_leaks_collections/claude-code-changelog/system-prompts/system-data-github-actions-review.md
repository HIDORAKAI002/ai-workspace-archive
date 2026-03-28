# System Prompt: review-pull-request

- Source: inline

## Summary

GitHub Actions PR workflow checking out repo and running Claude code-review plugin.

# Raw Prompt Text
name: Claude Code Review

on:
  pull_request:
    types: [opened, synchronize, ready_for_review, reopened]
    # Optional: Only run on specific file changes
    # paths:
    #   - "src/**/*.ts"
    #   - "src/**/*.tsx"
    #   - "src/**/*.js"
    #   - "src/**/*.jsx"

jobs:
  claude-review:
    # Optional: Filter by PR author
    # if: |
    #   github.event.pull_request.user.login == 'external-contributor' ||
    #   github.event.pull_request.user.login == 'new-developer' ||
    #   github.event.pull_request.author_association == 'FIRST_TIME_CONTRIBUTOR'

    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: read
      issues: read
      id-token: write

    steps:
      - name: Checkout repository
        uses: actions${PATH}@v4
        with:
          fetch-depth: ${NUM}

      - name: Run Claude Code Review
        id: claude-review
        uses: anthropics${PATH}@v1
        with:
          anthropic_api_key: ${EXPR_1}
          plugin_marketplaces: '${URL}
          plugins: 'code-review@claude-code-plugins'
          prompt: '${PATH}:code-review ${EXPR_2}${PATH}${EXPR_3}'
          # See ${URL}
          # or ${URL} for available options
