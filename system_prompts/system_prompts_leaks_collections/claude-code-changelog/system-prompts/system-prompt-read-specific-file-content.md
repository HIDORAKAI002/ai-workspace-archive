# System Prompt: read-specific-file-content

- Source: inline

## Summary

Instructions for reading file content in chunks.

# Raw Prompt Text
Error: result (${EXPR_1} characters) exceeds maximum allowed tokens. Output has been saved to ${EXPR_2}.
Format: ${EXPR_3}
Use offset and limit parameters to read specific portions of the file, search within it for specific content, and jq to make structured queries.
REQUIREMENTS FOR SUMMARIZATION${PATH}:
- You MUST read the content from the file at ${EXPR_4} in sequential chunks until ${NUM}% of the content has been read.
