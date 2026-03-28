---
name: "unity-cursor-ai-c-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for unity-cursor-ai-c-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Applies general rules to all C# scripts within the Unity project for the tower defense game.
globs: Assets/**/*.cs
---
- The context for this code, in addition to the file itself and the wider project, is that I am making a tower defense style game that uses a Nintendo Ringcon as the controller.
- Players place turrets and then use exercise to charge up those turrets.
- I'm working in C# and Unity 2021.3.18f1.
- I'm refactoring the entire project, because I wrote much of it in a sprint, and I'm not sure how well it will work in the long run. I also want to be able to extend it more easily.
```