---
name: "vue3-composition-api-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for vue3-composition-api-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: General guidelines for Vue 3 components using the Composition API. This includes best practices and recommendations for component structure and reactive state management.
globs: src/**/*.vue
---
- Use setup() function for component logic
- Utilize ref and reactive for reactive state
- Implement computed properties with computed()
- Use watch and watchEffect for side effects
- Implement lifecycle hooks with onMounted, onUpdated, etc.
- Utilize provide/inject for dependency injection
```