---
name: "android-jetpack-compose-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for android-jetpack-compose-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Applies general best practices for Android Jetpack Compose development within the main application code.
globs: app/src/main/java/com/package/**/*.kt
---
- Adapt to existing project architecture while maintaining clean code principles.
- Follow Material Design 3 guidelines and components.
- Implement clean architecture with domain, data, and presentation layers.
- Use Kotlin coroutines and Flow for asynchronous operations.
- Implement dependency injection using Hilt.
- Follow unidirectional data flow with ViewModel and UI State.
- Use Compose navigation for screen management.
- Implement proper state hoisting and composition.
```