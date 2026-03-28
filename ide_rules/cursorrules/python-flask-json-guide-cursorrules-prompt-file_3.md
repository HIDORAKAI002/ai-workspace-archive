---
name: "python-flask-json-guide-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for python-flask-json-guide-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Ensures proper JSON data handling when working with Drawscape Factorio.
globs: **/*.py
---
- When dealing with JSON data for Drawscape Factorio, use the `json` module to load the data from a file.
- Ensure proper error handling and file path management for JSON files.
- Use the loaded JSON data as input for the `importFUE5` function within the Drawscape Factorio module.
```