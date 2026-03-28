---
name: "android-jetpack-compose-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for android-jetpack-compose-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Outlines performance optimization guidelines for Android Jetpack Compose applications.
globs: app/src/main/java/com/package/**/*.kt
---
- Minimize recomposition using proper keys.
- Use proper lazy loading with LazyColumn and LazyRow.
- Implement efficient image loading.
- Use proper state management to prevent unnecessary updates.
- Follow proper lifecycle awareness.
- Implement proper memory management.
- Use proper background processing.
```