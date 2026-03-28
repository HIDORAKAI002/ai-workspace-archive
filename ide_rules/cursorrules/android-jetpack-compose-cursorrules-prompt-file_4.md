---
name: "android-jetpack-compose-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for android-jetpack-compose-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Defines testing guidelines for Android Jetpack Compose components, ViewModels, and UseCases.
globs: app/src/test/java/com/package/**/*.kt
---
- Write unit tests for ViewModels and UseCases.
- Implement UI tests using Compose testing framework.
- Use fake repositories for testing.
- Implement proper test coverage.
- Use proper testing coroutine dispatchers.
```