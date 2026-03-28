# Tool Prompt: find-page-elements

- Name: find

## Summary

Locate page elements by natural-language purpose or text and return reusable references.

# Raw Prompt Text
Find elements on the page using natural language. Can search for elements by their purpose (e.g., "search bar", "login button") or by text content (e.g., "organic mango product"). Returns up to ${NUM} matching elements with references that can be used with other tools. If more than ${NUM} matches exist, you'll be notified to use a more specific query. If you don't have a valid tab ID, use tabs_context_mcp first to get available tabs.
