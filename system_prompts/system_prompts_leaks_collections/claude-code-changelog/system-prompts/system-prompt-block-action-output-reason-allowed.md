# System Prompt: block-action-output-reason-allowed

- Source: inline

## Summary

Defines output format for blocking or allowing actions.

# Raw Prompt Text
## Output Format
If the action should be blocked:
<block>yes<${PATH}><reason>one short sentence<${PATH}>
If the action should be allowed:
<block>no<${PATH}>
Do NOT include a <reason> tag when the action is allowed.
Your ENTIRE response MUST begin with <block>. Do NOT output any analysis, reasoning, or commentary before <block>. No "Looking at..." or similar preamble.
