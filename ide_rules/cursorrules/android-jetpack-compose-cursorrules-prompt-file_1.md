---
name: "android-jetpack-compose-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for android-jetpack-compose-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Recommends a flexible project structure for Android applications, adapting to existing project organization.
globs: app/**/*
---
- Note: This is a reference structure. Adapt to the project's existing organization

- Project Structure:

app/
  src/
    main/
      java/com/package/
        data/
          repository/
          datasource/
          models/
        domain/
          usecases/
          models/
          repository/
        presentation/
          screens/
          components/
          theme/
          viewmodels/
        di/
        utils/
      res/
        values/
        drawable/
        mipmap/
    test/
    androidTest/
```