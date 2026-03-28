# Next.js Specific Security Vulnerabilities

## Overview

Next.js has specific security considerations due to its hybrid rendering model, Server Components, Server Actions, and middleware architecture. This document covers Next.js-specific vulnerabilities and recent CVEs.

---

## Recent Critical CVEs

### CVE-2025-29927 - Middleware Authorization Bypass

**Severity**: CRITICAL (CVSS 9.1)
**Affected Versions**: All versions before patches
**Status**: Patched

**Description**: Attackers can bypass middleware-based security checks by adding an `x-middleware-subrequest` header to requests.

**Detection**:
```typescript
// ❌ VULNERABLE - Relying solely on middleware for auth
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('session');
  if (!token) {
    return NextResponse.redirect('/login');
  }
}

// No additional auth check in the protected route
```

**Remediation**:
1. Upgrade Next.js to patched version
2. Never rely solely on middleware for authentication
3. Implement defense in depth

```typescript
// ✅ SAFE - Multi-layer authentication
// middleware.ts (first layer)
export function middleware(request: NextRequest) {
  const token = request.cookies.get('session');
  if (!token) {
    return NextResponse.redirect('/login');
  }
}

// page.tsx or API route (second layer)
export default async function ProtectedPage() {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }
  // ...
}
```

---

### CVE-2025-55182 / CVE-2025-66478 - React Server Components Vulnerability

**Severity**: CRITICAL
**Affected Versions**: Next.js ≥14.3.0-canary.77, ≥15, ≥16
**Status**: Patched

**Description**: Remote code execution vulnerability in React Server Components (react-server-dom-*).

**Remediation**:
1. Upgrade to patched Next.js version immediately
2. Rotate all application secrets after patching
3. Review server logs for suspicious activity

---

## Server Components Data Exposure

### Patterns to Detect

**Severity**: HIGH

```typescript
// ❌ VULNERABLE - Passing sensitive data to Client Components
// Server Component
async function UserProfile() {
  const user = await db.user.findUnique({
    include: { passwordHash: true }  // Includes sensitive data!
  });

  return <ClientProfileCard user={user} />;  // Leaked to client!
}

// ❌ VULNERABLE - Exposing API keys
async function DataFetcher() {
  const data = await fetch(url, {
    headers: { 'Authorization': process.env.API_KEY }
  });

  // If this becomes a Client Component, API_KEY might leak
  return <div>{JSON.stringify(data)}</div>;
}
```

**Safe Alternative**:
```typescript
// ✅ SAFE - Only pass necessary data
async function UserProfile() {
  const user = await db.user.findUnique({
    select: {
      id: true,
      name: true,
      email: true
      // No sensitive fields
    }
  });

  return <ClientProfileCard user={user} />;
}
```

---

## Server Actions Security Issues

### Missing Server Action Validation

**Severity**: HIGH

```typescript
// ❌ VULNERABLE - No input validation
'use server'

export async function createPost(formData: FormData) {
  const title = formData.get('title');
  const content = formData.get('content');

  await db.post.create({
    data: { title, content }  // Unvalidated input!
  });
}
```

**Safe Alternative**:
```typescript
// ✅ SAFE - With validation
'use server'

import { z } from 'zod';

const postSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(10000)
});

export async function createPost(formData: FormData) {
  const result = postSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content')
  });

  if (!result.success) {
    return { error: result.error.flatten() };
  }

  await db.post.create({ data: result.data });
}
```

### Server Action Size Limits

```typescript
// next.config.js - Set appropriate limits
module.exports = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',  // Prevent DoS via large payloads
      allowedOrigins: ['example.com']  // CSRF protection
    }
  }
}
```

---

## Environment Variable Exposure

### Patterns to Detect

**Severity**: CRITICAL

```typescript
// ❌ VULNERABLE - Server env in client code
// Client Component
'use client'

export function ApiCaller() {
  // This won't work AND indicates a security misunderstanding
  const apiKey = process.env.API_KEY;
}

// ❌ VULNERABLE - Exposing server vars via NEXT_PUBLIC_
// .env
NEXT_PUBLIC_DATABASE_URL=postgresql://...  // WRONG!
NEXT_PUBLIC_API_SECRET=sk-...  // WRONG!
```

**Detection Regex**:
```regex
NEXT_PUBLIC_.*SECRET
NEXT_PUBLIC_.*KEY
NEXT_PUBLIC_.*PASSWORD
NEXT_PUBLIC_.*TOKEN
NEXT_PUBLIC_.*DATABASE
```

**Safe Pattern**:
```bash
# .env - Server-only (no NEXT_PUBLIC_ prefix)
DATABASE_URL=postgresql://...
API_SECRET=sk-...

# .env - Client-safe only
NEXT_PUBLIC_APP_URL=https://example.com
NEXT_PUBLIC_ANALYTICS_ID=GA-123
```

---

## Security Headers Configuration

### Missing Headers

**Severity**: MEDIUM

```typescript
// ❌ MISSING - No security headers configured
// next.config.js
module.exports = {
  // No headers configuration
}
```

**Safe Alternative**:
```typescript
// ✅ SAFE - Comprehensive security headers
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders
      }
    ];
  }
};
```

---

## Image Component Vulnerabilities

### Patterns to Detect

**Severity**: MEDIUM

```typescript
// ❌ VULNERABLE - Unrestricted remote images
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }  // Too permissive!
    ]
  }
}

// ❌ VULNERABLE - User-controlled image src
<Image src={userProvidedUrl} alt="User image" />
```

**Safe Alternative**:
```typescript
// ✅ SAFE - Restricted domains
module.exports = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.example.com' },
      { protocol: 'https', hostname: 'images.example.com' }
    ]
  }
}

// ✅ SAFE - Validate image URLs
const isAllowedImageHost = (url: string) => {
  const allowed = ['cdn.example.com', 'images.example.com'];
  try {
    const { hostname } = new URL(url);
    return allowed.includes(hostname);
  } catch {
    return false;
  }
};
```

---

## Redirect and Rewrite Vulnerabilities

### Open Redirect

**Severity**: MEDIUM

```typescript
// ❌ VULNERABLE - Open redirect
// app/api/redirect/route.ts
export async function GET(request: Request) {
  const url = request.nextUrl.searchParams.get('url');
  return NextResponse.redirect(url!);  // Open redirect!
}

// ❌ VULNERABLE - redirect() with user input
import { redirect } from 'next/navigation';

export default function Page({ searchParams }) {
  if (someCondition) {
    redirect(searchParams.next);  // Open redirect!
  }
}
```

**Safe Alternative**:
```typescript
// ✅ SAFE - Validate redirect URL
const ALLOWED_HOSTS = ['example.com', 'app.example.com'];

function safeRedirect(url: string): string {
  try {
    const parsed = new URL(url, 'https://example.com');
    if (ALLOWED_HOSTS.includes(parsed.hostname)) {
      return parsed.toString();
    }
  } catch {}
  return '/';  // Default to home
}

export async function GET(request: Request) {
  const url = request.nextUrl.searchParams.get('url') || '/';
  return NextResponse.redirect(safeRedirect(url));
}
```

---

## Scan Checklist

- [ ] Next.js version is up to date (check for CVEs)
- [ ] Middleware is not sole authentication layer
- [ ] Server Components don't leak sensitive data to client
- [ ] Server Actions have input validation
- [ ] Server Actions have authentication checks
- [ ] No sensitive env vars use NEXT_PUBLIC_ prefix
- [ ] Security headers are configured
- [ ] Image domains are restricted
- [ ] No open redirects
- [ ] serverActions.bodySizeLimit is configured
- [ ] serverActions.allowedOrigins is configured

---

## Version Check Commands

```bash
# Check Next.js version
npm list next

# Check for outdated packages
npm outdated

# Check for known vulnerabilities
npm audit
```
