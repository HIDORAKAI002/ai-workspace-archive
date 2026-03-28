# System Prompt: when-not-to-use

- Source: inline

## Summary

Guidelines for using the Read tool instead of Agent.

# Raw Prompt Text
When NOT to use the Agent tool:
- If you want to read a specific file path, use the Read tool or ${EXPR_1} loaded with errors instead of the Agent tool, to find the match more quickly
- If you are searching for a specific class definition like "class Foo", use ${EXPR_2} instead, to find the match more quickly
- If you are searching for code within a specific file or set of ${NUM}-${NUM} files, use the Read tool instead of the Agent tool, to find the match more quickly
- Other tasks that are not related to the agent descriptions above
