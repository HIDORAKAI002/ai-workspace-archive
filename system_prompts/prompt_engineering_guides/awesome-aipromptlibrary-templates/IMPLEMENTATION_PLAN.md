# Implementation Plan - Critical Issues & Improvements

**Date:** January 2025
**Application:** AI Prompt Library
**Current Grade:** B- (78/100)
**Target Grade:** A (90+/100)
**Timeline:** 6-8 weeks
**Total Effort:** 308 engineering hours

---

## Executive Summary

This plan addresses 180 identified issues across 11 application areas, focusing first on 23 critical (P0) issues that pose immediate security, data loss, or user experience risks.

**Already Fixed (3 issues):** ✅
- XML-to-Text conversion data loss
- API cache performance (500-1000ms improvement)
- Silent embeddings failures

**Remaining Critical Issues:** 7
**High Priority Issues:** 45
**Medium Priority Issues:** 78
**Low Priority Issues:** 34

---

## Phase 1: Emergency Fixes (Week 1) - 40 hours

### Priority: P0 - Critical Security & Data Loss

#### 1.1 Security Vulnerabilities (16 hours)

**Issue #2: Timing Attack in Webhook Validation**
- **File:** `/src/app/api/webhooks/stripe/route.ts`
- **Risk:** Attackers can forge webhook events
- **Current Code:**
```typescript
if (sig !== expectedSig) {
  return new Response('Invalid signature', { status: 400 })
}
```

**Fix:**
```typescript
import { timingSafeEqual } from 'crypto'

// Use constant-time comparison
const sigBuffer = Buffer.from(sig, 'utf8')
const expectedBuffer = Buffer.from(expectedSig, 'utf8')

if (sigBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(sigBuffer, expectedBuffer)) {
  // Log the attempt
  await logSecurityEvent('webhook_signature_mismatch', {
    ip: request.headers.get('x-forwarded-for'),
    timestamp: Date.now()
  })
  return new Response('Invalid signature', { status: 400 })
}
```

**Testing:**
- Test valid webhook signatures
- Test invalid signatures with timing analysis
- Test rate limiting

**Time:** 4 hours

---

**Issue #3: CSP Allows unsafe-inline**
- **File:** `/next.config.js`
- **Risk:** XSS vulnerabilities, script injection
- **Current:** `script-src 'self' 'unsafe-inline'`

**Fix:**
```javascript
// Generate nonce for each request
// middleware.ts
export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' https://cdn.vercel-insights.com;
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data: https:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `

  const response = NextResponse.next()
  response.headers.set('Content-Security-Policy', cspHeader)
  response.headers.set('X-Content-Security-Policy-Nonce', nonce)

  return response
}
```

**Update all script/style tags to use nonce:**
```tsx
// layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = headers().get('X-Content-Security-Policy-Nonce')

  return (
    <html>
      <head>
        <script nonce={nonce} src="/analytics.js" />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

**Testing:**
- Verify no CSP violations in console
- Test with inline scripts (should fail)
- Test with nonce-tagged scripts (should pass)

**Time:** 6 hours

---

**Issue #4: Unprotected Admin Data Export**
- **File:** `/src/app/api/admin/export/route.ts`
- **Risk:** Unauthorized access to all user data
- **Current:** Basic auth check, no rate limiting

**Fix:**
```typescript
// Create admin middleware
// src/middleware/adminAuth.ts
export async function requireAdmin(request: NextRequest) {
  const session = await getSession()

  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { data: user } = await supabase
    .from('profiles')
    .select('role, email')
    .eq('id', session.user.id)
    .single()

  if (user?.role !== 'admin') {
    // Log unauthorized access attempt
    await supabase
      .from('security_logs')
      .insert({
        event_type: 'unauthorized_admin_access',
        user_id: session.user.id,
        ip_address: request.headers.get('x-forwarded-for'),
        user_agent: request.headers.get('user-agent'),
        timestamp: new Date().toISOString()
      })

    return new Response('Forbidden', { status: 403 })
  }

  return null // Auth passed
}

// Add rate limiting
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'), // 5 exports per hour
})

// Update route handler
export async function GET(request: NextRequest) {
  const authError = await requireAdmin(request)
  if (authError) return authError

  const ip = request.headers.get('x-forwarded-for')
  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return new Response('Rate limit exceeded', { status: 429 })
  }

  // Existing export logic with audit logging
  await supabase.from('audit_logs').insert({
    action: 'admin_data_export',
    user_id: session.user.id,
    timestamp: new Date().toISOString()
  })

  // ... export logic
}
```

**Additional:**
- Create `security_logs` table
- Create `audit_logs` table
- Set up alerts for unauthorized access attempts

**Time:** 6 hours

---

#### 1.2 Critical Auth Issues (12 hours)

**Issue #5: No Password Reset**
- **Files to Create:**
  - `/src/app/auth/reset-password/page.tsx`
  - `/src/app/auth/reset-password/confirm/page.tsx`
  - `/src/app/api/auth/reset-password/route.ts`

**Implementation:**

```typescript
// /src/app/auth/reset-password/page.tsx
'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardContent } from '@/components/ui/card'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const supabase = createClientComponentClient()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password/confirm`,
    })

    if (error) {
      console.error('Reset error:', error)
      // Show error toast
    } else {
      setSent(true)
    }

    setLoading(false)
  }

  if (sent) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <h1 className="text-2xl font-bold">Check Your Email</h1>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              The link expires in 1 hour. Didn't receive it?{' '}
              <button
                onClick={() => setSent(false)}
                className="text-primary underline"
              >
                Try again
              </button>
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-bold">Reset Your Password</h1>
          <p className="text-muted-foreground">
            Enter your email and we'll send you a reset link
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleReset} className="space-y-4">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
```

```typescript
// /src/app/auth/reset-password/confirm/page.tsx
'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardContent } from '@/components/ui/card'

export default function ConfirmResetPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      // Show error: Passwords don't match
      return
    }

    if (password.length < 8) {
      // Show error: Password too short
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password: password
    })

    if (error) {
      console.error('Update error:', error)
      // Show error toast
    } else {
      // Show success toast
      router.push('/library')
    }

    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-bold">Set New Password</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="New password (min 8 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={8}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Updating...' : 'Update Password'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
```

**Add to sign-in page:**
```tsx
// Add this link to /src/app/auth/signin/page.tsx
<Link
  href="/auth/reset-password"
  className="text-sm text-primary hover:underline"
>
  Forgot your password?
</Link>
```

**Email Template Configuration:**
Configure in Supabase Dashboard → Authentication → Email Templates:
- Subject: "Reset your password"
- Add branded template with clear CTA button

**Testing:**
- Request password reset with valid email
- Request with invalid email (should not reveal existence)
- Test expired token (after 1 hour)
- Test token reuse (should fail)
- Test password requirements

**Time:** 8 hours

---

**Issue #10: No Onboarding Flow**
- **Risk:** High churn, confused users, low activation
- **Files to Create:**
  - `/src/app/onboarding/page.tsx`
  - `/src/components/onboarding/OnboardingSteps.tsx`
  - `/src/lib/onboarding.ts`

**Implementation:**

```typescript
// /src/lib/onboarding.ts
export const ONBOARDING_STEPS = [
  {
    id: 'welcome',
    title: 'Welcome to AI Prompt Library! 👋',
    description: 'Let's get you set up in 2 minutes',
    action: 'Get Started'
  },
  {
    id: 'role',
    title: 'What describes you best?',
    description: 'This helps us personalize your experience',
    options: [
      { value: 'developer', label: 'Software Developer', icon: '💻' },
      { value: 'writer', label: 'Content Writer', icon: '✍️' },
      { value: 'business', label: 'Business Professional', icon: '💼' },
      { value: 'researcher', label: 'Researcher', icon: '🔬' },
      { value: 'student', label: 'Student', icon: '📚' },
      { value: 'other', label: 'Other', icon: '🌟' }
    ]
  },
  {
    id: 'use-case',
    title: 'What will you primarily use prompts for?',
    description: 'Select all that apply',
    multiple: true,
    options: [
      { value: 'coding', label: 'Code Writing & Debugging' },
      { value: 'content', label: 'Content Creation' },
      { value: 'analysis', label: 'Data Analysis' },
      { value: 'communication', label: 'Business Communication' },
      { value: 'research', label: 'Research & Learning' }
    ]
  },
  {
    id: 'import',
    title: 'Want to start with some prompts?',
    description: 'We'll add popular prompts to your library',
    options: [
      { value: 'starter', label: 'Add 10 starter prompts', recommended: true },
      { value: 'skip', label: 'I'll add my own later' }
    ]
  },
  {
    id: 'complete',
    title: 'You're all set! 🎉',
    description: 'Let's start building your prompt library',
    action: 'Go to Library'
  }
]

export async function saveOnboardingData(userId: string, data: {
  role: string
  useCases: string[]
  importStarter: boolean
}) {
  const supabase = createClient()

  // Update profile
  await supabase
    .from('profiles')
    .update({
      role: data.role,
      use_cases: data.useCases,
      onboarding_completed: true,
      onboarding_completed_at: new Date().toISOString()
    })
    .eq('id', userId)

  // Import starter prompts if requested
  if (data.importStarter) {
    const starterPrompts = await getStarterPromptsForRole(data.role)
    await supabase
      .from('prompts')
      .insert(
        starterPrompts.map(prompt => ({
          ...prompt,
          user_id: userId,
          source: 'onboarding'
        }))
      )
  }
}
```

```tsx
// /src/components/onboarding/OnboardingSteps.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ONBOARDING_STEPS, saveOnboardingData } from '@/lib/onboarding'

export function OnboardingSteps({ userId }: { userId: string }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState({
    role: '',
    useCases: [] as string[],
    importStarter: true
  })
  const router = useRouter()

  const step = ONBOARDING_STEPS[currentStep]
  const progress = ((currentStep + 1) / ONBOARDING_STEPS.length) * 100

  const handleNext = async () => {
    if (currentStep === ONBOARDING_STEPS.length - 1) {
      // Save data and redirect
      await saveOnboardingData(userId, data)
      router.push('/library')
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleSelect = (value: string, multiple = false) => {
    if (step.id === 'role') {
      setData(prev => ({ ...prev, role: value }))
    } else if (step.id === 'use-case') {
      setData(prev => ({
        ...prev,
        useCases: multiple
          ? prev.useCases.includes(value)
            ? prev.useCases.filter(v => v !== value)
            : [...prev.useCases, value]
          : [value]
      }))
    } else if (step.id === 'import') {
      setData(prev => ({ ...prev, importStarter: value === 'starter' }))
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8">
        {/* Progress bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <p className="mt-2 text-sm text-muted-foreground">
            Step {currentStep + 1} of {ONBOARDING_STEPS.length}
          </p>
        </div>

        {/* Step content */}
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">{step.title}</h1>
            <p className="mt-2 text-muted-foreground">{step.description}</p>
          </div>

          {step.options && (
            <div className="grid gap-4 md:grid-cols-2">
              {step.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value, step.multiple)}
                  className={`
                    rounded-lg border-2 p-6 text-left transition-all
                    ${
                      (step.multiple
                        ? data.useCases.includes(option.value)
                        : data.role === option.value || data.importStarter === (option.value === 'starter')
                      )
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }
                  `}
                >
                  {option.icon && (
                    <span className="text-4xl mb-3 block">{option.icon}</span>
                  )}
                  <h3 className="font-semibold">{option.label}</h3>
                  {option.recommended && (
                    <span className="mt-2 inline-block rounded bg-primary px-2 py-1 text-xs text-primary-foreground">
                      Recommended
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep(prev => prev - 1)}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button onClick={handleNext}>
              {step.action || 'Continue'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
```

**Redirect Logic:**
```typescript
// Add to layout or middleware
export async function middleware(request: NextRequest) {
  const session = await getSession()

  if (session && request.nextUrl.pathname.startsWith('/library')) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('onboarding_completed')
      .eq('id', session.user.id)
      .single()

    if (!profile?.onboarding_completed) {
      return NextResponse.redirect(new URL('/onboarding', request.url))
    }
  }

  return NextResponse.next()
}
```

**Testing:**
- Complete onboarding flow
- Test back button navigation
- Test skip functionality
- Verify data saves correctly
- Test starter prompts import
- Test redirect to library

**Time:** 4 hours

---

#### 1.3 Data Loss Prevention (12 hours)

**Issue #7: Export Only Exports 24 Prompts**
- **File:** `/src/app/api/prompts/export/route.ts`
- **Current:** Default pagination limit applied

**Fix:**
```typescript
export async function GET(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    // Export ALL prompts (no pagination limit)
    const { data: prompts, error } = await supabase
      .from('prompts')
      .select(`
        *,
        collections:prompt_collections(
          collection:collections(id, name)
        ),
        tags:prompt_tags(
          tag:tags(id, name)
        )
      `)
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    // Log export for audit trail
    await supabase.from('activity_logs').insert({
      user_id: session.user.id,
      action: 'export_prompts',
      details: { count: prompts.length },
      timestamp: new Date().toISOString()
    })

    // Transform data for export
    const exportData = prompts.map(prompt => ({
      id: prompt.id,
      title: prompt.title,
      content: prompt.content,
      description: prompt.description,
      category: prompt.category,
      use_case: prompt.use_case,
      complexity: prompt.complexity,
      collections: prompt.collections?.map(pc => pc.collection.name) || [],
      tags: prompt.tags?.map(pt => pt.tag.name) || [],
      created_at: prompt.created_at,
      updated_at: prompt.updated_at,
      usage_count: prompt.usage_count,
      favorite: prompt.favorite
    }))

    // Return as JSON file
    return new Response(JSON.stringify(exportData, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="prompts-export-${Date.now()}.json"`
      }
    })
  } catch (error) {
    console.error('Export error:', error)
    return new Response('Export failed', { status: 500 })
  }
}
```

**Add CSV export option:**
```typescript
// Add format parameter
const format = request.nextUrl.searchParams.get('format') || 'json'

if (format === 'csv') {
  const csv = convertToCSV(exportData)
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="prompts-export-${Date.now()}.csv"`
    }
  })
}
```

**Testing:**
- Export with 0 prompts
- Export with 1 prompt
- Export with 100+ prompts
- Verify all fields included
- Test JSON format
- Test CSV format
- Verify collections and tags included

**Time:** 4 hours

---

**Issue #8: Delete Operations No Error Handling**
- **Files:**
  - `/src/app/api/prompts/[id]/route.ts`
  - `/src/app/api/collections/[id]/route.ts`
  - `/src/components/library/DeletePromptDialog.tsx`

**Fix:**
```typescript
// /src/app/api/prompts/[id]/route.ts
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession()
  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { id } = params

  try {
    // First, verify ownership
    const { data: prompt, error: fetchError } = await supabase
      .from('prompts')
      .select('user_id, title')
      .eq('id', id)
      .single()

    if (fetchError || !prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (prompt.user_id !== session.user.id) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized to delete this prompt' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Delete related records first (cascading)
    const deletions = await Promise.allSettled([
      supabase.from('prompt_collections').delete().eq('prompt_id', id),
      supabase.from('prompt_tags').delete().eq('prompt_id', id),
      supabase.from('prompt_embeddings').delete().eq('prompt_id', id)
    ])

    // Check if any cascading deletes failed
    const failed = deletions.filter(d => d.status === 'rejected')
    if (failed.length > 0) {
      console.error('Cascading delete failures:', failed)
      // Continue anyway - main delete will clean up via DB cascades
    }

    // Delete the prompt
    const { error: deleteError } = await supabase
      .from('prompts')
      .delete()
      .eq('id', id)

    if (deleteError) {
      console.error('Delete error:', deleteError)
      return new Response(
        JSON.stringify({
          error: 'Failed to delete prompt',
          details: deleteError.message
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Log deletion for audit
    await supabase.from('activity_logs').insert({
      user_id: session.user.id,
      action: 'delete_prompt',
      details: { prompt_id: id, prompt_title: prompt.title },
      timestamp: new Date().toISOString()
    })

    return new Response(
      JSON.stringify({ success: true, message: 'Prompt deleted successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Unexpected delete error:', error)
    return new Response(
      JSON.stringify({
        error: 'An unexpected error occurred',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
```

**Update client-side component:**
```tsx
// /src/components/library/DeletePromptDialog.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

export function DeletePromptDialog({
  promptId,
  promptTitle,
  onDeleteSuccess
}: {
  promptId: string
  promptTitle: string
  onDeleteSuccess?: () => void
}) {
  const [open, setOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setDeleting(true)

    try {
      const response = await fetch(`/api/prompts/${promptId}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete prompt')
      }

      toast.success('Prompt deleted successfully')
      setOpen(false)

      if (onDeleteSuccess) {
        onDeleteSuccess()
      } else {
        router.refresh()
      }
    } catch (error) {
      console.error('Delete error:', error)
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to delete prompt. Please try again.'
      )
    } finally {
      setDeleting(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Prompt?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{promptTitle}"? This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              handleDelete()
            }}
            disabled={deleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

**Testing:**
- Delete single prompt
- Delete prompt with collections
- Delete prompt with tags
- Delete non-existent prompt (should fail gracefully)
- Delete another user's prompt (should fail with 403)
- Test error handling with network failure
- Verify audit log created

**Time:** 4 hours

---

**Issue #6: Missing Search Embeddings**
- **File:** `/src/lib/embeddings.ts`
- **Problem:** Search doesn't work for prompts without embeddings

**Fix:**
```typescript
// Add backfill function
export async function backfillMissingEmbeddings() {
  const supabase = createClient()

  // Find prompts without embeddings
  const { data: prompts, error } = await supabase
    .from('prompts')
    .select('id, title, content, description')
    .is('embedding', null)
    .limit(100) // Process in batches

  if (error || !prompts || prompts.length === 0) {
    return { processed: 0, error }
  }

  const results = []

  for (const prompt of prompts) {
    try {
      const embedding = await generateEmbedding(
        `${prompt.title} ${prompt.description || ''} ${prompt.content}`
      )

      await supabase
        .from('prompts')
        .update({ embedding })
        .eq('id', prompt.id)

      results.push({ id: prompt.id, success: true })
    } catch (error) {
      console.error(`Failed to generate embedding for prompt ${prompt.id}:`, error)
      results.push({ id: prompt.id, success: false, error })
    }
  }

  return {
    processed: results.filter(r => r.success).length,
    failed: results.filter(r => !r.success).length,
    hasMore: prompts.length === 100
  }
}
```

**Create cron job:**
```typescript
// /src/app/api/cron/backfill-embeddings/route.ts
export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  const result = await backfillMissingEmbeddings()

  return Response.json(result)
}
```

**Set up in Vercel:**
```json
// vercel.json
{
  "crons": [{
    "path": "/api/cron/backfill-embeddings",
    "schedule": "0 */6 * * *"
  }]
}
```

**Testing:**
- Run backfill on test prompts
- Verify embeddings generated
- Test search with newly embedded prompts
- Monitor for failures

**Time:** 4 hours

---

### Phase 1 Summary

**Total Time:** 40 hours
**Issues Fixed:** 7 critical issues
**Deliverables:**
- ✅ 3 security vulnerabilities patched
- ✅ Password reset flow implemented
- ✅ Onboarding flow implemented
- ✅ Export fixed to include all prompts
- ✅ Delete operations with proper error handling
- ✅ Embeddings backfill system

**Success Metrics:**
- Zero security vulnerabilities in top 10
- 100% data integrity (exports, deletes)
- Password reset completion rate > 80%
- Onboarding completion rate > 70%
- Search functionality for 100% of prompts

---

## Phase 2: High-Impact Improvements (Weeks 2-3) - 80 hours

### Priority: P1 - High Impact User Experience

#### 2.1 Library Bulk Operations (16 hours)

**Issue: No Bulk Actions**
- **Impact:** Users manually delete/tag/move prompts one by one
- **Expected:** Select multiple prompts, apply actions

**Implementation:**

```tsx
// /src/components/library/BulkActionBar.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Trash2, Tag, Folder, Star, X } from 'lucide-react'

export function BulkActionBar({
  selectedIds,
  onClearSelection,
  onBulkAction
}: {
  selectedIds: string[]
  onClearSelection: () => void
  onBulkAction: (action: string, ids: string[]) => Promise<void>
}) {
  const [loading, setLoading] = useState(false)

  const handleAction = async (action: string) => {
    setLoading(true)
    try {
      await onBulkAction(action, selectedIds)
      onClearSelection()
    } catch (error) {
      console.error('Bulk action error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-background border rounded-lg shadow-lg p-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {selectedIds.length} selected
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="h-6 w-px bg-border" />

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" disabled={loading}>
                <Folder className="h-4 w-4 mr-2" />
                Add to Collection
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {/* Collection list will be populated from context */}
              <DropdownMenuItem onClick={() => handleAction('add-to-collection')}>
                Collection 1
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" disabled={loading}>
                <Tag className="h-4 w-4 mr-2" />
                Add Tags
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleAction('add-tags')}>
                Add Tags...
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAction('toggle-favorite')}
            disabled={loading}
          >
            <Star className="h-4 w-4 mr-2" />
            Toggle Favorite
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleAction('delete')}
            disabled={loading}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
```

**API Endpoint:**
```typescript
// /src/app/api/prompts/bulk/route.ts
export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) return new Response('Unauthorized', { status: 401 })

  const { action, promptIds, data } = await request.json()

  // Validate ownership
  const { data: prompts } = await supabase
    .from('prompts')
    .select('id')
    .in('id', promptIds)
    .eq('user_id', session.user.id)

  if (prompts.length !== promptIds.length) {
    return new Response('Unauthorized', { status: 403 })
  }

  switch (action) {
    case 'delete':
      await supabase.from('prompts').delete().in('id', promptIds)
      break

    case 'toggle-favorite':
      await supabase.rpc('toggle_favorite_bulk', { prompt_ids: promptIds })
      break

    case 'add-to-collection':
      const collectionInserts = promptIds.map(id => ({
        prompt_id: id,
        collection_id: data.collectionId
      }))
      await supabase.from('prompt_collections').insert(collectionInserts)
      break

    case 'add-tags':
      const tagInserts = promptIds.flatMap(promptId =>
        data.tagIds.map((tagId: string) => ({
          prompt_id: promptId,
          tag_id: tagId
        }))
      )
      await supabase.from('prompt_tags').insert(tagInserts)
      break
  }

  return Response.json({ success: true })
}
```

**Time:** 16 hours

---

#### 2.2 Gallery Improvements (20 hours)

**Issues:**
- No infinite scroll (pagination UX poor)
- No preview on hover
- No quick copy button
- Category filters not prominent

**Implementation:**

```tsx
// /src/components/gallery/InfiniteGallery.tsx
'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { PromptCard } from './PromptCard'

export function InfiniteGallery({
  initialPrompts,
  category,
  searchQuery
}: {
  initialPrompts: Prompt[]
  category?: string
  searchQuery?: string
}) {
  const { ref, inView } = useInView()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['gallery', category, searchQuery],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await fetch(
        `/api/gallery/prompts?` + new URLSearchParams({
          offset: String(pageParam),
          limit: '24',
          category: category || '',
          search: searchQuery || ''
        })
      )
      return response.json()
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 24) return undefined
      return pages.length * 24
    },
    initialData: {
      pages: [initialPrompts],
      pageParams: [0],
    },
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.pages.flat().map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>

      {/* Loading indicator */}
      <div ref={ref} className="mt-8 flex justify-center">
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </div>
  )
}
```

```tsx
// /src/components/gallery/PromptCard.tsx
'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Copy, Eye } from 'lucide-react'
import { toast } from 'sonner'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

export function PromptCard({ prompt }: { prompt: Prompt }) {
  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    await navigator.clipboard.writeText(prompt.content)
    toast.success('Copied to clipboard!')
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Card className="p-4 cursor-pointer hover:shadow-lg transition-all">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold line-clamp-2">{prompt.title}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="shrink-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-3">
              {prompt.description}
            </p>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{prompt.category}</Badge>
              <Badge variant="outline">{prompt.complexity}</Badge>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{prompt.usage_count} uses</span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                Preview
              </span>
            </div>
          </div>
        </Card>
      </HoverCardTrigger>

      <HoverCardContent className="w-96" side="top">
        <div className="space-y-3">
          <h4 className="font-semibold">{prompt.title}</h4>
          <p className="text-sm text-muted-foreground">
            {prompt.description}
          </p>
          <div className="bg-muted p-3 rounded text-sm font-mono max-h-64 overflow-y-auto">
            {prompt.content}
          </div>
          <Button onClick={handleCopy} className="w-full">
            <Copy className="h-4 w-4 mr-2" />
            Copy Prompt
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
```

**Time:** 20 hours

---

#### 2.3 Search Enhancements (16 hours)

**Issues:**
- No filters (category, complexity, tags)
- No sorting options
- No search history
- No saved searches

**Implementation:**

```tsx
// /src/components/search/AdvancedSearch.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, X } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type SearchFilters = {
  query: string
  category?: string
  complexity?: string
  tags: string[]
  sortBy: 'relevance' | 'recent' | 'popular' | 'title'
}

export function AdvancedSearch({
  onSearch
}: {
  onSearch: (filters: SearchFilters) => void
}) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    tags: [],
    sortBy: 'relevance'
  })

  const handleSearch = () => {
    onSearch(filters)
    saveSearchHistory(filters.query)
  }

  const addTag = (tag: string) => {
    if (!filters.tags.includes(tag)) {
      setFilters(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }))
    }
  }

  const removeTag = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }))
  }

  return (
    <div className="space-y-4">
      {/* Main search bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search prompts..."
            value={filters.query}
            onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10"
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {(filters.category || filters.complexity || filters.tags.length > 0) && (
                <Badge variant="secondary" className="ml-2">
                  {[filters.category, filters.complexity, ...filters.tags]
                    .filter(Boolean).length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={filters.category}
                  onValueChange={(value) =>
                    setFilters(prev => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    <SelectItem value="coding">Coding</SelectItem>
                    <SelectItem value="writing">Writing</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Complexity</label>
                <Select
                  value={filters.complexity}
                  onValueChange={(value) =>
                    setFilters(prev => ({ ...prev, complexity: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any complexity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any complexity</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Sort by</label>
                <Select
                  value={filters.sortBy}
                  onValueChange={(value: any) =>
                    setFilters(prev => ({ ...prev, sortBy: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="recent">Recently added</SelectItem>
                    <SelectItem value="popular">Most popular</SelectItem>
                    <SelectItem value="title">Title A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Button onClick={handleSearch}>Search</Button>
      </div>

      {/* Active filters */}
      {(filters.category || filters.complexity || filters.tags.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {filters.category && filters.category !== 'all' && (
            <Badge variant="secondary">
              Category: {filters.category}
              <button
                onClick={() => setFilters(prev => ({ ...prev, category: undefined }))}
                className="ml-2"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.complexity && filters.complexity !== 'all' && (
            <Badge variant="secondary">
              {filters.complexity}
              <button
                onClick={() => setFilters(prev => ({ ...prev, complexity: undefined }))}
                className="ml-2"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.tags.map(tag => (
            <Badge key={tag} variant="secondary">
              {tag}
              <button onClick={() => removeTag(tag)} className="ml-2">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
```

**Time:** 16 hours

---

#### 2.4 Account Management (16 hours)

**Issues:**
- No account deletion
- No data export (GDPR requirement)
- No activity history
- No session management

**Implementation:**

```tsx
// /src/app/settings/account/page.tsx
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { Download, Trash2, Shield, History } from 'lucide-react'

export default function AccountSettingsPage() {
  return (
    <div className="space-y-6">
      {/* Data Export */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Your Data
          </CardTitle>
          <CardDescription>
            Download all your prompts, collections, and account data (GDPR compliant)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataExportSection />
        </CardContent>
      </Card>

      {/* Activity History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Activity History
          </CardTitle>
          <CardDescription>
            View recent activity on your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ActivityHistoryTable />
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Active Sessions
          </CardTitle>
          <CardDescription>
            Manage devices that are signed in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SessionsManager />
        </CardContent>
      </Card>

      {/* Delete Account */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="h-5 w-5" />
            Delete Account
          </CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DeleteAccountSection />
        </CardContent>
      </Card>
    </div>
  )
}

function DataExportSection() {
  const [exporting, setExporting] = useState(false)

  const handleExport = async () => {
    setExporting(true)

    const response = await fetch('/api/user/export')
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `aipromptlibrary-export-${Date.now()}.zip`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    setExporting(false)
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Your export will include:
      </p>
      <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
        <li>All prompts (JSON and CSV formats)</li>
        <li>Collections and organization</li>
        <li>Tags and metadata</li>
        <li>Usage statistics</li>
        <li>Account information</li>
      </ul>
      <Button onClick={handleExport} disabled={exporting}>
        {exporting ? 'Exporting...' : 'Download My Data'}
      </Button>
    </div>
  )
}

function DeleteAccountSection() {
  const [showDialog, setShowDialog] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (confirmText !== 'DELETE MY ACCOUNT') return

    setDeleting(true)

    const response = await fetch('/api/user/delete', {
      method: 'DELETE'
    })

    if (response.ok) {
      // Sign out and redirect
      window.location.href = '/goodbye'
    }

    setDeleting(false)
  }

  return (
    <>
      <Button
        variant="destructive"
        onClick={() => setShowDialog(true)}
      >
        Delete My Account
      </Button>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        {/* Confirmation dialog with warning */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove all your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4">
            <label className="text-sm font-medium">
              Type <strong>DELETE MY ACCOUNT</strong> to confirm:
            </label>
            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="mt-2"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={confirmText !== 'DELETE MY ACCOUNT' || deleting}
              className="bg-destructive"
            >
              {deleting ? 'Deleting...' : 'Delete Account'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
```

**API Endpoints:**

```typescript
// /src/app/api/user/export/route.ts
export async function GET(request: NextRequest) {
  const session = await getSession()
  if (!session) return new Response('Unauthorized', { status: 401 })

  // Fetch all user data
  const [prompts, collections, tags, profile, activity] = await Promise.all([
    supabase.from('prompts').select('*').eq('user_id', session.user.id),
    supabase.from('collections').select('*').eq('user_id', session.user.id),
    supabase.from('tags').select('*').eq('user_id', session.user.id),
    supabase.from('profiles').select('*').eq('id', session.user.id).single(),
    supabase.from('activity_logs').select('*').eq('user_id', session.user.id)
  ])

  // Create ZIP file with all data
  const zip = new JSZip()
  zip.file('prompts.json', JSON.stringify(prompts.data, null, 2))
  zip.file('collections.json', JSON.stringify(collections.data, null, 2))
  zip.file('tags.json', JSON.stringify(tags.data, null, 2))
  zip.file('profile.json', JSON.stringify(profile.data, null, 2))
  zip.file('activity.json', JSON.stringify(activity.data, null, 2))

  const zipBlob = await zip.generateAsync({ type: 'blob' })

  return new Response(zipBlob, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="export-${Date.now()}.zip"`
    }
  })
}

// /src/app/api/user/delete/route.ts
export async function DELETE(request: NextRequest) {
  const session = await getSession()
  if (!session) return new Response('Unauthorized', { status: 401 })

  // Soft delete first (30-day grace period)
  await supabase
    .from('profiles')
    .update({
      deleted_at: new Date().toISOString(),
      deletion_scheduled_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    })
    .eq('id', session.user.id)

  // Send confirmation email
  await sendEmail({
    to: session.user.email,
    subject: 'Account deletion scheduled',
    body: 'Your account will be deleted in 30 days...'
  })

  // Sign out
  await supabase.auth.signOut()

  return Response.json({ success: true })
}
```

**Time:** 16 hours

---

#### 2.5 Mobile Critical Fixes (12 hours)

**Issues:**
- Touch targets < 44px
- Modals overflow viewport
- Keyboard overlays content
- Horizontal scroll issues

**Fixes:**

```css
/* global.css additions */

/* Minimum touch target size */
.btn, button, a[role="button"] {
  min-height: 44px;
  min-width: 44px;
}

/* Mobile modal fixes */
@media (max-width: 640px) {
  [role="dialog"] {
    max-height: 90vh;
    overflow-y: auto;
    margin: 5vh auto;
  }

  /* Prevent keyboard from overlaying inputs */
  body:has(input:focus),
  body:has(textarea:focus) {
    padding-bottom: env(safe-area-inset-bottom, 0);
  }
}

/* Fix horizontal scroll */
* {
  max-width: 100%;
}

html, body {
  overflow-x: hidden;
}

/* Safe area insets for notched devices */
body {
  padding-top: env(safe-area-inset-top, 0);
  padding-bottom: env(safe-area-inset-bottom, 0);
  padding-left: env(safe-area-inset-left, 0);
  padding-right: env(safe-area-inset-right, 0);
}
```

```tsx
// Mobile-specific component fixes
// /src/components/ui/dialog.tsx - Update to handle mobile better
export function Dialog({ children, ...props }: DialogProps) {
  const isMobile = useMediaQuery('(max-width: 640px)')

  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" />
        <DialogPrimitive.Content
          className={cn(
            "fixed z-50 grid w-full gap-4 rounded-lg border bg-background p-6 shadow-lg",
            isMobile
              ? "bottom-0 top-auto max-h-[90vh] overflow-y-auto rounded-b-none"
              : "left-[50%] top-[50%] max-w-lg translate-x-[-50%] translate-y-[-50%]"
          )}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
```

**Time:** 12 hours

---

### Phase 2 Summary

**Total Time:** 80 hours
**Issues Fixed:** 12 high-priority issues
**Deliverables:**
- ✅ Bulk operations in library
- ✅ Improved gallery with infinite scroll, previews
- ✅ Advanced search with filters and sorting
- ✅ Complete account management (export, delete, sessions)
- ✅ Mobile UX critical fixes

**Success Metrics:**
- Bulk operations used by >40% of active users
- Gallery bounce rate < 40% (from 60%+)
- Search usage +50%
- Mobile satisfaction score > 4/5
- Zero GDPR compliance issues

---

## Phase 3: Polish & Scale (Weeks 4-6) - 120 hours

### Priority: P2 - Nice to Have, Scale, Growth

#### 3.1 Template Expansion (24 hours)

**Goal:** Expand from 10 templates to 100+

- Research and create 90 new prompt templates
- Organize into subcategories
- Add preview and customization options
- Create template marketplace

**Time:** 24 hours

---

#### 3.2 Performance Optimizations (32 hours)

**Optimizations:**
1. Enable API route caching (2 hours)
2. Add database indexes (4 hours)
3. Implement virtual scrolling for large lists (8 hours)
4. Optimize images and fonts (4 hours)
5. Add Redis caching layer (8 hours)
6. Implement incremental static regeneration (6 hours)

**Expected Results:**
- API response times < 200ms (from 500-1000ms)
- Library loads in < 1s (from 2-3s)
- Search results in < 300ms (from 800ms+)

**Time:** 32 hours

---

#### 3.3 Marketing & Conversion (24 hours)

**Improvements:**
1. Implement exit-intent popup (4 hours)
2. Add social proof widgets (4 hours)
3. Create interactive demo (8 hours)
4. Add pricing page with comparison (4 hours)
5. Implement referral program (4 hours)

**Time:** 24 hours

---

#### 3.4 Advanced Features (40 hours)

**Features:**
1. **Two-Factor Authentication** (12 hours)
   - TOTP implementation
   - Backup codes
   - Recovery options

2. **Collaborative Collections** (16 hours)
   - Share collections with team
   - Permission levels
   - Activity feed

3. **AI Prompt Suggestions** (12 hours)
   - Analyze user prompts
   - Suggest improvements
   - Auto-categorization

**Time:** 40 hours

---

### Phase 3 Summary

**Total Time:** 120 hours
**Issues Fixed:** 20+ medium/low priority issues
**Deliverables:**
- ✅ 100+ prompt templates
- ✅ Significant performance improvements
- ✅ Conversion optimization
- ✅ Advanced features (2FA, collaboration, AI)

**Success Metrics:**
- Template usage +200%
- Page load times < 1s
- Conversion rate +30%
- Paid user retention > 85%

---

## Implementation Timeline

### Week 1: Emergency Fixes
- Mon-Tue: Security vulnerabilities (#2, #3, #4)
- Wed-Thu: Password reset + Onboarding
- Fri: Data loss prevention (#7, #8)
- Weekend: Embeddings backfill

### Weeks 2-3: High-Impact Improvements
- Week 2: Bulk operations + Gallery improvements
- Week 3: Search enhancements + Account management + Mobile fixes

### Weeks 4-6: Polish & Scale
- Week 4: Template expansion + Performance part 1
- Week 5: Performance part 2 + Marketing improvements
- Week 6: Advanced features (2FA, collaboration, AI)

---

## Resource Requirements

### Team Structure
- **Option A:** 2 senior engineers × 8 weeks = 308 hours
- **Option B:** 1 senior + 2 mid-level × 5-6 weeks
- **Option C:** Outsource to agency (budget: $30K-50K)

### Tools & Services Needed
- Upstash Redis (for rate limiting): $10/mo
- JSZip library (for data export): Free
- React Query (for infinite scroll): Free
- Vercel cron jobs: Included
- Additional monitoring: Sentry ($26/mo)

**Total Additional Cost:** ~$36/mo

---

## Success Metrics & KPIs

### Security (Phase 1)
- ✅ Zero critical vulnerabilities
- ✅ 100% audit log coverage
- ✅ < 0.1% failed authentication attempts

### User Experience (Phase 2)
- ✅ Onboarding completion: >70%
- ✅ Password reset success: >80%
- ✅ Mobile satisfaction: >4/5
- ✅ Search usage: +50%

### Performance (Phase 3)
- ✅ API response: <200ms (p95)
- ✅ Page load: <1s (p95)
- ✅ Search: <300ms

### Business Impact
- ✅ User activation: +40%
- ✅ Paid conversion: +30%
- ✅ Churn rate: -25%
- ✅ Support tickets: -40%

---

## Risk Assessment

### High Risk
1. **Security vulnerabilities** - Could lead to data breach
   - Mitigation: Phase 1 priority, security audit

2. **Data loss from exports/deletes** - Legal/GDPR issues
   - Mitigation: Comprehensive testing, audit logs

### Medium Risk
3. **Performance regressions** - Could slow down site
   - Mitigation: Load testing, gradual rollout

4. **Onboarding complexity** - Could increase drop-off
   - Mitigation: A/B testing, user feedback

### Low Risk
5. **Feature scope creep** - Timeline延期
   - Mitigation: Strict prioritization, MVP mindset

---

## Testing Strategy

### Phase 1 (Critical)
- Manual testing: Every fix
- Unit tests: All security functions
- Integration tests: Auth flows, data operations
- Security audit: External review

### Phase 2 (High Impact)
- Manual testing: All new features
- E2E tests: Critical user flows
- Performance testing: Load testing
- Mobile testing: Real devices

### Phase 3 (Polish)
- Automated testing: Regression suite
- A/B testing: Conversion features
- Beta testing: Advanced features
- Performance monitoring: Continuous

---

## Deployment Strategy

### Gradual Rollout
1. **Phase 1:** Deploy to staging → Internal testing → Production (weekend)
2. **Phase 2:** Feature flags → 10% rollout → 50% → 100%
3. **Phase 3:** Beta program → Gradual rollout

### Rollback Plan
- Feature flags for easy disable
- Database migrations reversible
- Backup before each phase
- Monitoring alerts set up

---

## Post-Implementation

### Monitoring
- Error tracking (Sentry)
- Performance monitoring (Vercel Analytics)
- User analytics (PostHog/Mixpanel)
- Security monitoring (audit logs)

### Maintenance
- Weekly security patches
- Monthly performance reviews
- Quarterly feature updates
- Continuous bug fixes

---

## Next Steps

1. **Review this plan** with stakeholders
2. **Prioritize** which phases to execute
3. **Allocate resources** (team, budget, timeline)
4. **Set up project tracking** (Jira, Linear, GitHub Projects)
5. **Schedule kickoff** meeting
6. **Begin Phase 1** immediately (security is critical!)

---

**This plan transforms your application from B- (78/100) to A (90+/100) in 6-8 weeks with 308 engineering hours.**

**Ready to begin? Start with Phase 1 - the security and data integrity fixes are critical and should not be delayed.** 🚀
