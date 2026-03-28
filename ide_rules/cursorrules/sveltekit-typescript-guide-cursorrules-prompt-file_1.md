---
name: "sveltekit-typescript-guide-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for sveltekit-typescript-guide-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Enforces the use of classes for complex state management (state machines) in Svelte components. Applies specifically to `.svelte.ts` files.
globs: **/*.svelte.ts
---
- Use classes for complex state management (state machines):
typescript
// counter.svelte.ts
class Counter {
  count = $state(0);
  incrementor = $state(1);
  increment() {
    this.count += this.incrementor;
  }
  resetCount() {
    this.count = 0;
  }
  resetIncrementor() {
    this.incrementor = 1;
  }
}
export const counter = new Counter();
```