---
name: "typescript-nestjs-best-practices-cursorrules-promp Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for typescript-nestjs-best-practices-cursorrules-promp

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Prescribes the structure and components within NestJS modules, including controllers, models, DTOs, and services, ensuring API encapsulation.
globs: src/modules/**/*.*
---
- One module per main domain/route.
- One controller for its route.
- And other controllers for secondary routes.
- A models folder with data types.
- DTOs validated with class-validator for inputs.
- Declare simple types for outputs.
- A services module with business logic and persistence.
- One service per entity.
```