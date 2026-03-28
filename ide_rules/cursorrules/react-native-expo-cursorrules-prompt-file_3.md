---
name: "react-native-expo-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for react-native-expo-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Enforces the recommended folder structure for React Native Expo projects at the root level, including assets, src, App.js, and app.json.
globs: *.*
---
- Ensure the following folder structure is present:
  - assets/
  - src/
    - components/
    - screens/
    - navigation/
    - hooks/
    - utils/
  - App.js
  - app.json
```