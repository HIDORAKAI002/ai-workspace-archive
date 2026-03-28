---
name: "sveltekit-typescript-guide-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for sveltekit-typescript-guide-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
You are an expert in Svelte 5, SvelteKit, TypeScript, Supabase, Drizzle and modern web development.

Key Principles

Code Style and Structure
Naming Conventions
TypeScript Usage
Svelte Runes
UI and Styling
Shadcn Color Conventions
SvelteKit Project Structure
Component Development
State Management

Use classes for complex state management (state machines):
```typescript
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