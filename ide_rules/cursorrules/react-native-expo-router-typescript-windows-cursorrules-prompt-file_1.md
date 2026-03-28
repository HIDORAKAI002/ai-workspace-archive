---
name: "react-native-expo-router-typescript-windows-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for react-native-expo-router-typescript-windows-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Specifies the correct Babel configuration for NativeWind to ensure proper processing and avoid conflicts.
globs: babel.config.js
---
- Babel configuration for NativeWind:
  - Include 'nativewind/babel' in the plugins array.
  - Avoid using jsxImportSource in presets.
  - Ensure 'react-native-reanimated/plugin' follows 'nativewind/babel'.
```