---
name: "android-jetpack-compose-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for android-jetpack-compose-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Enforces specific UI-related guidelines for Jetpack Compose within the presentation layer.
globs: app/src/main/java/com/package/presentation/**/*.kt
---
- Use remember and derivedStateOf appropriately.
- Implement proper recomposition optimization.
- Use proper Compose modifiers ordering.
- Follow composable function naming conventions.
- Implement proper preview annotations.
- Use proper state management with MutableState.
- Implement proper error handling and loading states.
- Use proper theming with MaterialTheme.
- Follow accessibility guidelines.
- Implement proper animation patterns.
```