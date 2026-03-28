---
name: "graphical-apps-development-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for graphical-apps-development-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules for Panel views, specifying that Panel should be used for the visualization layer.
globs: /**/*_view.py
---
- Use Panel to create the visualization layer and run the GUI.
- Views should consist of Panel objects.
- Panel objects can be styled with Python and CSS.
```