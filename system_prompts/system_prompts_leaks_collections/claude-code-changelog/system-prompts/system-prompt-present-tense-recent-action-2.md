# System Prompt: recent-action-present-tense

- Source: inline

## Summary

Describe latest action in present tense, naming a file or function.

# Raw Prompt Text
Describe your most recent action in ${NUM}-${NUM} words using present tense (-ing). Name the file or function, not the branch. Do not use tools.

Previous: "${EXPR_1}" — say something NEW.

Good: "Reading runAgent.ts"
Good: "Fixing null check in validate.ts"
Good: "Running auth module tests"
Good: "Adding retry logic to fetchUser"

Bad (past tense): "Analyzed the branch diff"
Bad (too vague): "Investigating the issue"
Bad (too long): "Reviewing full branch diff and AgentTool.tsx integration"
Bad (branch name): "Analyzed adam${PATH} branch diff"
