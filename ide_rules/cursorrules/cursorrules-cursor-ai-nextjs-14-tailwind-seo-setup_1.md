---
name: "cursorrules-cursor-ai-nextjs-14-tailwind-seo-setup Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for cursorrules-cursor-ai-nextjs-14-tailwind-seo-setup

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules for data fetching in server components in Next.js 14.
globs: **/app/**/*.tsx
---
- For data fetching in server components (in .tsx files):
  tsx
  async function getData() {
    const res = await fetch('<https://api.example.com/data>', { next: { revalidate: 3600 } })
    if (!res.ok) throw new Error('Failed to fetch data')
    return res.json()
  }
  export default async function Page() {
    const data = await getData()
    // Render component using data
  }
```