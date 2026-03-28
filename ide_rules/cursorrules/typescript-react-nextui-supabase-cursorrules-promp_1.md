---
name: "typescript-react-nextui-supabase-cursorrules-promp Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for typescript-react-nextui-supabase-cursorrules-promp

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Specific rules for authentication flows, including login, signup, and logout actions on landing pages.
globs: frontend/app/(landing-page)/**/*action.ts
---
- Implement login functionality using email/password or GitHub OAuth.
- Implement signup functionality for new users with email and password.
- Implement logout functionality to end user sessions.
```