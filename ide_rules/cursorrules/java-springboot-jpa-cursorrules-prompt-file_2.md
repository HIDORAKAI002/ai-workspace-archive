---
name: "java-springboot-jpa-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for java-springboot-jpa-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Sets standards for Data Transfer Objects (DTOs), typically records, including parameter validation in compact canonical constructors.
globs: **/src/main/java/com/example/dtos/*.java
---
- Must be of type record, unless specified in a prompt otherwise.
- Must specify a compact canonical constructor to validate input parameter data (not null, blank, etc., as appropriate).
```