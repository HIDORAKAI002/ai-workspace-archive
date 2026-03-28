# Tool Prompt: exact-file-string-replace

- Name: Edit

## Summary

Tool guidance for exact in-file string replacements requiring a prior read and unique match.

# Raw Prompt Text
Performs exact string replacements in files.

Usage:${EXPR_1}
- When editing text from Read tool output, ensure you preserve the exact indentation (tabs${PATH}) as it appears AFTER the line number prefix. The line number prefix format is: ${EXPR_2}. Everything after that is the actual file content to match. Never include any part of the line number prefix in the old_string or new_string.
- ALWAYS prefer editing existing files in the codebase. NEVER write new files unless explicitly required.
- Only use emojis if the user explicitly requests it. Avoid adding emojis to files unless asked.
- The edit will FAIL if `old_string` is not unique in the file. Either provide a larger string with more surrounding context to make it unique or use `replace_all` to change every instance of `old_string`.
- Use `replace_all` for replacing and renaming strings across the file. This parameter is useful if you want to rename a variable for instance.
