# Tool Prompt: get-accessibility-tree

- Name: read_page

## Summary

Return an accessibility tree snapshot with options to limit scope and output size.

# Raw Prompt Text
Get an accessibility tree representation of elements on the page. By default returns all elements including non-visible ones. Output is limited to ${NUM} characters by default. If the output exceeds this limit, you will receive an error asking you to specify a smaller depth or focus on a specific element using ref_id. Optionally filter for only interactive elements. If you don't have a valid tab ID, use tabs_context_mcp first to get available tabs.
