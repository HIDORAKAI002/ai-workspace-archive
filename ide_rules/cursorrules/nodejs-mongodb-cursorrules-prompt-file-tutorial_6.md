---
name: "nodejs-mongodb-cursorrules-prompt-file-tutorial Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for nodejs-mongodb-cursorrules-prompt-file-tutorial

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Applies to all backend files, enforces Node.js with Express.js for the backend, MongoDB with Mongoose ODM for the database, and JWT for authentication.
globs: /backend/**/*.*
---
- Backend: Node.js with Express.js
- Database: MongoDB with Mongoose ODM
- Authentication: JSON Web Tokens (JWT)
- Ensure secure, efficient code following RESTful API best practices.
- Implement proper error handling and input validation.
```