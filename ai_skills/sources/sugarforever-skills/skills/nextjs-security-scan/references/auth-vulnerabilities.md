# Authentication & Authorization Vulnerability Patterns

## Overview

Authentication failures and broken access control are consistently ranked in the OWASP Top 10. These vulnerabilities can lead to unauthorized access, privilege escalation, and data breaches.

## OWASP Classification
- **A01:2025** - Broken Access Control
- **A07:2025** - Authentication Failures
- **CWEs**: CWE-287, CWE-306, CWE-862, CWE-863

---

## Missing Authentication in Server Actions

### Critical Patterns

**Severity**: CRITICAL

```typescript
// ❌ VULNERABLE - No auth check in Server Action
'use server'

export async function deleteUser(userId: string) {
  await db.user.delete({ where: { id: userId } });
  // Anyone can delete any user!
}

// ❌ VULNERABLE - No auth check in data mutation
'use server'

export async function updateProfile(data: ProfileData) {
  await db.profile.update({
    where: { id: data.id },
    data: data
  });
}
```

**Detection Pattern**:
Look for Server Actions (`'use server'`) without authentication checks.

**Regex Pattern**:
```regex
['"]use server['"][\s\S]*?export\s+(async\s+)?function\s+\w+
```
Then verify the function body contains auth checks.

**Safe Alternative**:
```typescript
// ✅ SAFE - With authentication
'use server'

import { auth } from '@/lib/auth';

export async function deleteUser(userId: string) {
  const session = await auth();
  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  // Also check authorization
  if (session.user.role !== 'admin') {
    throw new Error('Forbidden');
  }

  await db.user.delete({ where: { id: userId } });
}
```

---

## Missing Authentication in API Routes

### Critical Patterns

**Severity**: CRITICAL

```typescript
// ❌ VULNERABLE - App Router API without auth
// app/api/users/route.ts
export async function DELETE(request: Request) {
  const { userId } = await request.json();
  await db.user.delete({ where: { id: userId } });
  return Response.json({ success: true });
}

// ❌ VULNERABLE - Pages Router API without auth
// pages/api/admin/users.ts
export default async function handler(req, res) {
  const users = await db.user.findMany();
  res.json(users);
}
```

**Detection**: Look for API route files without auth middleware or session checks.

**Safe Alternative**:
```typescript
// ✅ SAFE - App Router with auth
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { userId } = await request.json();

  // Authorization check
  if (session.user.id !== userId && session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  await db.user.delete({ where: { id: userId } });
  return NextResponse.json({ success: true });
}
```

---

## Insecure Direct Object Reference (IDOR)

### Critical Patterns

**Severity**: HIGH

```typescript
// ❌ VULNERABLE - No ownership check
export async function getDocument(docId: string) {
  return await db.document.findUnique({ where: { id: docId } });
  // Any user can access any document!
}

// ❌ VULNERABLE - Using user-provided ID without verification
export async function updateOrder(orderId: string, data: OrderData) {
  await db.order.update({
    where: { id: orderId },
    data
  });
}
```

**Safe Alternative**:
```typescript
// ✅ SAFE - With ownership verification
export async function getDocument(docId: string) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const document = await db.document.findUnique({
    where: {
      id: docId,
      userId: session.user.id  // Ownership check
    }
  });

  if (!document) {
    throw new Error('Document not found');
  }

  return document;
}
```

---

## Weak Password Requirements

### Patterns to Detect

**Severity**: MEDIUM

```typescript
// ❌ VULNERABLE - No password validation
const password = formData.get('password');
await createUser({ email, password });

// ❌ VULNERABLE - Weak validation
if (password.length < 4) {
  throw new Error('Password too short');
}
```

**Safe Alternative**:
```typescript
// ✅ SAFE - Strong password validation
import { z } from 'zod';

const passwordSchema = z.string()
  .min(12, 'Password must be at least 12 characters')
  .regex(/[A-Z]/, 'Must contain uppercase letter')
  .regex(/[a-z]/, 'Must contain lowercase letter')
  .regex(/[0-9]/, 'Must contain number')
  .regex(/[^A-Za-z0-9]/, 'Must contain special character');

// Or use zxcvbn for strength estimation
import zxcvbn from 'zxcvbn';
const result = zxcvbn(password);
if (result.score < 3) {
  throw new Error('Password is too weak');
}
```

---

## Insecure Session Management

### Patterns to Detect

**Severity**: HIGH

```typescript
// ❌ VULNERABLE - Session token in URL
const url = `/dashboard?session=${sessionToken}`;

// ❌ VULNERABLE - Long session expiry
const session = await createSession({
  expiresIn: '365d'  // Too long!
});

// ❌ VULNERABLE - No secure cookie flags
res.setHeader('Set-Cookie', `session=${token}`);
```

**Safe Alternative**:
```typescript
// ✅ SAFE - Proper cookie configuration
import { cookies } from 'next/headers';

cookies().set('session', token, {
  httpOnly: true,      // Prevent XSS access
  secure: true,        // HTTPS only
  sameSite: 'lax',     // CSRF protection
  maxAge: 60 * 60 * 24 // 24 hours max
});
```

---

## Missing CSRF Protection

### Patterns to Detect

**Severity**: HIGH

```typescript
// ❌ VULNERABLE - Form without CSRF token (Pages Router)
<form action="/api/transfer" method="POST">
  <input name="amount" />
  <button type="submit">Transfer</button>
</form>

// ❌ VULNERABLE - State-changing GET request
export async function GET(request: Request) {
  const userId = request.nextUrl.searchParams.get('id');
  await db.user.delete({ where: { id: userId } });
}
```

**Safe Alternative**:
```typescript
// ✅ SAFE - Server Actions have built-in CSRF protection
<form action={transferMoney}>
  <input name="amount" />
  <button type="submit">Transfer</button>
</form>

// ✅ SAFE - Use POST for mutations
export async function POST(request: Request) {
  // Mutations via POST only
}
```

---

## JWT Vulnerabilities

### Patterns to Detect

**Severity**: HIGH

```typescript
// ❌ VULNERABLE - No algorithm verification
const decoded = jwt.decode(token);  // Never use decode() for verification!

// ❌ VULNERABLE - Algorithm confusion
jwt.verify(token, publicKey);  // Could accept 'none' algorithm

// ❌ VULNERABLE - Weak secret
const token = jwt.sign(payload, 'secret123');

// ❌ VULNERABLE - Sensitive data in payload
const token = jwt.sign({ password: user.password }, secret);
```

**Safe Alternative**:
```typescript
// ✅ SAFE - Proper JWT verification
import jwt from 'jsonwebtoken';

const decoded = jwt.verify(token, process.env.JWT_SECRET!, {
  algorithms: ['HS256'],  // Explicit algorithm
  issuer: 'your-app',
  audience: 'your-api'
});

// ✅ SAFE - Use strong secret (256+ bits)
// Generate with: openssl rand -base64 32
```

---

## Privilege Escalation

### Patterns to Detect

**Severity**: CRITICAL

```typescript
// ❌ VULNERABLE - User can set their own role
export async function updateUser(data: { id: string, role: string }) {
  await db.user.update({
    where: { id: data.id },
    data: { role: data.role }  // User controls role!
  });
}

// ❌ VULNERABLE - Mass assignment
export async function updateProfile(userId: string, data: any) {
  await db.user.update({
    where: { id: userId },
    data  // All fields from user input!
  });
}
```

**Safe Alternative**:
```typescript
// ✅ SAFE - Allowlist fields
export async function updateProfile(userId: string, data: ProfileInput) {
  const session = await auth();
  if (session?.user.id !== userId) {
    throw new Error('Forbidden');
  }

  // Only allow specific fields
  await db.user.update({
    where: { id: userId },
    data: {
      name: data.name,
      bio: data.bio,
      // role is NOT included
    }
  });
}
```

---

## Scan Checklist

- [ ] All Server Actions have authentication checks
- [ ] All API routes have authentication checks
- [ ] Authorization verifies resource ownership (IDOR)
- [ ] Password requirements meet minimum strength
- [ ] Session cookies use httpOnly, secure, sameSite
- [ ] JWT uses explicit algorithm verification
- [ ] No sensitive data in JWT payloads
- [ ] CSRF protection on all state-changing operations
- [ ] No mass assignment vulnerabilities
- [ ] Role/privilege changes require admin authorization

---

## Recommended Libraries

| Library | Purpose | Install |
|---------|---------|---------|
| next-auth | Authentication for Next.js | `npm install next-auth` |
| @auth/core | Auth.js core | `npm install @auth/core` |
| bcrypt | Password hashing | `npm install bcrypt` |
| zxcvbn | Password strength | `npm install zxcvbn` |
| jose | JWT handling | `npm install jose` |
