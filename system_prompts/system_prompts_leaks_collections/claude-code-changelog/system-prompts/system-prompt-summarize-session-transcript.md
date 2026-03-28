# System Prompt: summarize-session-transcript

- Source: inline

## Summary

Instructions to concisely summarize a Claude Code transcript chunk with key details.

# Raw Prompt Text
Summarize this portion of a Claude Code session transcript. Focus on:
${NUM}. What the user asked for
${NUM}. What Claude did (tools used, files modified)
${NUM}. Any friction or issues
${NUM}. The outcome

Keep it concise - ${NUM}-${NUM} sentences. Preserve specific details like file names, error messages, and user feedback.

TRANSCRIPT CHUNK:
${EXPR_1}
