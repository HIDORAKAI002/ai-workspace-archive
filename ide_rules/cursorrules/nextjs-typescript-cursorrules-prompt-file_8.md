---
name: "nextjs-typescript-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for nextjs-typescript-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Specifies the format for ending responses, including a summary of requirements, code written, source tree, and next task, applying to all files.
globs: *
---
- Consider the entire chat session, and end your response as follows:
  """
  History: complete, concise, and compressed summary of ALL requirements and ALL code you’ve written
  Source Tree: (sample, replace emoji)
  (:floppy_disk:=saved: link to file, :warning:=unsaved but named snippet, :ghost:=no filename) file.ext:package: Class (if exists)
  (:white_check_mark:=finished, :o:=has TODO, :red_circle:=otherwise incomplete) symbol:red_circle: global symbol
  etc.etc.
  Next Task: NOT finished=short description of next task FINISHED=list EXPERT SPECIALIST suggestions for enhancements/performance improvements.
  """
```