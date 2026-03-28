# System Prompt: read-large-pdf-pages

- Source: inline

## Summary

Instructs reading a large PDF by page ranges with per-request limits.

# Raw Prompt Text
PDF file: ${EXPR_1} (${EXPR_2} pages, ${EXPR_3}GB). This PDF is too large to read all at once. You MUST use the Read tool with the pages parameter to read specific page ranges (e.g., pages: "${NUM}-${NUM}"). Do NOT call Read without the pages parameter or it will fail. Start by reading the first few pages to understand the structure, then read more as needed. Maximum ${NUM} pages per request.
