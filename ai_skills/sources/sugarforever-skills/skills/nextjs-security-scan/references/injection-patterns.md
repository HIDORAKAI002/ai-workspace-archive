# Injection Vulnerability Patterns

## Overview

Injection vulnerabilities occur when untrusted data is sent to an interpreter as part of a command or query. This includes SQL injection, NoSQL injection, command injection, and LDAP injection.

## OWASP Classification
- **Category**: A03:2025 - Injection
- **CWEs**: CWE-89 (SQL), CWE-78 (OS Command), CWE-943 (NoSQL)

---

## SQL Injection

### Critical Patterns

**Severity**: CRITICAL

```typescript
// ❌ VULNERABLE - String concatenation
const query = "SELECT * FROM users WHERE id = " + userId;
const query = `SELECT * FROM users WHERE email = '${email}'`;

// ❌ VULNERABLE - Template literals in queries
db.query(`DELETE FROM posts WHERE id = ${postId}`);

// ❌ VULNERABLE - Raw queries with user input
prisma.$queryRaw`SELECT * FROM users WHERE name = ${name}`;
connection.query("SELECT * FROM products WHERE category = '" + category + "'");
```

**Regex Patterns**:
```regex
(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER)\s+.*\$\{
(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER)\s+.*\+\s*\w+
\.query\s*\(\s*['"`].*\$\{
\$queryRaw\s*`[^`]*\$\{
```

**Safe Alternatives**:
```typescript
// ✅ SAFE - Parameterized queries (Prisma)
const user = await prisma.user.findUnique({
  where: { id: userId }
});

// ✅ SAFE - Prepared statements
const [rows] = await connection.execute(
  'SELECT * FROM users WHERE id = ?',
  [userId]
);

// ✅ SAFE - Prisma queryRaw with Prisma.sql
import { Prisma } from '@prisma/client';
const result = await prisma.$queryRaw(
  Prisma.sql`SELECT * FROM users WHERE id = ${userId}`
);
```

---

## NoSQL Injection (MongoDB)

### Critical Patterns

**Severity**: CRITICAL

```typescript
// ❌ VULNERABLE - Direct object from user input
const user = await User.findOne({ username: req.body.username });
// Attacker can send: { "username": { "$gt": "" } }

// ❌ VULNERABLE - $where with user input
db.collection.find({ $where: `this.name == '${userInput}'` });

// ❌ VULNERABLE - Aggregation with user input
db.collection.aggregate([{ $match: JSON.parse(userInput) }]);
```

**Regex Patterns**:
```regex
\.(find|findOne|findMany|updateOne|deleteOne)\s*\(\s*\{[^}]*req\.(body|query|params)
\$where\s*:.*\$\{
JSON\.parse\s*\([^)]*req\.(body|query|params)
```

**Safe Alternatives**:
```typescript
// ✅ SAFE - Validate and sanitize input
import mongoSanitize from 'express-mongo-sanitize';

// ✅ SAFE - Type validation with Zod
import { z } from 'zod';
const schema = z.object({
  username: z.string().min(1).max(50)
});
const { username } = schema.parse(req.body);
const user = await User.findOne({ username });

// ✅ SAFE - Explicit field access
const user = await User.findOne({
  username: String(req.body.username)
});
```

---

## Command Injection

### Critical Patterns

**Severity**: CRITICAL

```typescript
// ❌ VULNERABLE - exec with user input
import { exec } from 'child_process';
exec(`ls ${userInput}`);
exec('grep ' + searchTerm + ' /var/log/app.log');

// ❌ VULNERABLE - execSync
execSync(`convert ${filename} output.png`);

// ❌ VULNERABLE - spawn with shell: true
spawn('sh', ['-c', `echo ${userInput}`], { shell: true });
```

**Regex Patterns**:
```regex
exec(Sync)?\s*\([^)]*\$\{
exec(Sync)?\s*\([^)]*\+
spawn\s*\([^)]*shell\s*:\s*true
```

**Safe Alternatives**:
```typescript
// ✅ SAFE - Use spawn with array arguments (no shell)
import { spawn } from 'child_process';
spawn('ls', ['-la', sanitizedPath]);

// ✅ SAFE - Use execFile
import { execFile } from 'child_process';
execFile('convert', [filename, 'output.png']);

// ✅ SAFE - Validate input against allowlist
const allowedCommands = ['status', 'version', 'help'];
if (!allowedCommands.includes(userCommand)) {
  throw new Error('Invalid command');
}
```

---

## Path Traversal

### Critical Patterns

**Severity**: HIGH

```typescript
// ❌ VULNERABLE - Direct path concatenation
const filePath = `/uploads/${req.params.filename}`;
fs.readFile(path.join(baseDir, userInput));

// ❌ VULNERABLE - No validation
res.sendFile(req.query.file);
```

**Regex Patterns**:
```regex
(readFile|writeFile|readFileSync|writeFileSync)\s*\([^)]*req\.(body|query|params)
sendFile\s*\([^)]*req\.(body|query|params)
path\.join\s*\([^)]*req\.(body|query|params)
```

**Safe Alternatives**:
```typescript
// ✅ SAFE - Validate and normalize path
import path from 'path';

const safePath = (baseDir: string, userInput: string): string => {
  const normalized = path.normalize(userInput).replace(/^(\.\.[\/\\])+/, '');
  const fullPath = path.join(baseDir, normalized);

  // Ensure path stays within base directory
  if (!fullPath.startsWith(path.resolve(baseDir))) {
    throw new Error('Path traversal detected');
  }
  return fullPath;
};

// ✅ SAFE - Use allowlist
const allowedFiles = ['report.pdf', 'summary.pdf'];
if (!allowedFiles.includes(filename)) {
  throw new Error('File not allowed');
}
```

---

## LDAP Injection

### Critical Patterns

**Severity**: HIGH

```typescript
// ❌ VULNERABLE
const filter = `(uid=${username})`;
const filter = '(cn=' + searchTerm + ')';
```

**Regex Pattern**:
```regex
\([\w]+=.*\$\{
\([\w]+=.*\+
```

**Safe Alternative**:
```typescript
// ✅ SAFE - Escape special characters
const escapeLDAP = (str: string): string => {
  return str.replace(/[\\*()\\x00]/g, (char) => '\\' + char.charCodeAt(0).toString(16));
};
const filter = `(uid=${escapeLDAP(username)})`;
```

---

## Header Injection

### Critical Patterns

**Severity**: MEDIUM

```typescript
// ❌ VULNERABLE - User input in headers
res.setHeader('X-Custom', userInput);
res.redirect(req.query.redirect);  // Open redirect
```

**Regex Pattern**:
```regex
setHeader\s*\([^,]+,\s*req\.(body|query|params)
redirect\s*\(\s*req\.(body|query|params)
```

---

## Scan Checklist

- [ ] Search for string concatenation in SQL queries
- [ ] Search for template literals in database queries
- [ ] Search for `$queryRaw` without Prisma.sql
- [ ] Search for MongoDB queries with direct user input
- [ ] Search for `$where` operator usage
- [ ] Search for `exec`, `execSync`, `spawn` with user input
- [ ] Search for file operations with user-controlled paths
- [ ] Search for `res.redirect` with user input
- [ ] Verify parameterized queries are used throughout
- [ ] Verify input validation with Zod or similar

---

## Recommended Libraries

| Library | Purpose | Install |
|---------|---------|---------|
| zod | Input validation | `npm install zod` |
| express-mongo-sanitize | MongoDB injection prevention | `npm install express-mongo-sanitize` |
| validator | String validation | `npm install validator` |
| sqlstring | SQL escaping | `npm install sqlstring` |
