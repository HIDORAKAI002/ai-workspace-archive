# XSS (Cross-Site Scripting) Vulnerability Patterns

## Overview

XSS vulnerabilities allow attackers to inject malicious scripts into web pages viewed by other users. In React/Next.js applications, XSS typically occurs when user input is rendered without proper sanitization.

## OWASP Classification
- **Category**: A03:2021 - Injection (includes XSS)
- **CWE**: CWE-79 (Improper Neutralization of Input During Web Page Generation)

---

## Critical Patterns to Detect

### 1. dangerouslySetInnerHTML (React/Next.js)

**Severity**: CRITICAL

```typescript
// ❌ VULNERABLE - Direct user input
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ❌ VULNERABLE - Data from API without sanitization
<div dangerouslySetInnerHTML={{ __html: data.content }} />

// ❌ VULNERABLE - Template literal with user input
<div dangerouslySetInnerHTML={{ __html: `<p>${userMessage}</p>` }} />
```

**Regex Pattern**:
```regex
dangerouslySetInnerHTML\s*=\s*\{\s*\{\s*__html\s*:
```

**Safe Alternative**:
```typescript
import DOMPurify from 'dompurify';

// ✅ SAFE - Sanitized input
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />
```

---

### 2. innerHTML Assignment

**Severity**: CRITICAL

```typescript
// ❌ VULNERABLE
element.innerHTML = userInput;
document.getElementById('output').innerHTML = data;

// ❌ VULNERABLE - Template literal
element.innerHTML = `<span>${userContent}</span>`;
```

**Regex Pattern**:
```regex
\.innerHTML\s*=
```

**Safe Alternative**:
```typescript
// ✅ SAFE - Use textContent for plain text
element.textContent = userInput;

// ✅ SAFE - Use DOMPurify for HTML
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(userInput);
```

---

### 3. outerHTML Assignment

**Severity**: CRITICAL

```typescript
// ❌ VULNERABLE
element.outerHTML = userInput;
```

**Regex Pattern**:
```regex
\.outerHTML\s*=
```

---

### 4. document.write / document.writeln

**Severity**: CRITICAL

```typescript
// ❌ VULNERABLE
document.write(userInput);
document.writeln('<script>' + userCode + '</script>');
```

**Regex Pattern**:
```regex
document\.write(ln)?\s*\(
```

---

### 5. eval() and Similar Functions

**Severity**: CRITICAL

```typescript
// ❌ VULNERABLE - Direct eval
eval(userInput);

// ❌ VULNERABLE - Function constructor
new Function(userInput)();

// ❌ VULNERABLE - setTimeout/setInterval with string
setTimeout(userInput, 1000);
setInterval('alert(' + userInput + ')', 1000);
```

**Regex Patterns**:
```regex
eval\s*\(
new\s+Function\s*\(
setTimeout\s*\(\s*['"`]
setInterval\s*\(\s*['"`]
```

---

### 6. URL-based XSS

**Severity**: HIGH

```typescript
// ❌ VULNERABLE - javascript: protocol
<a href={userInput}>Click</a>  // userInput could be "javascript:alert(1)"

// ❌ VULNERABLE - Unvalidated redirect
window.location.href = userInput;
window.location = params.redirect;

// ❌ VULNERABLE - iframe src
<iframe src={userInput} />
```

**Regex Patterns**:
```regex
href\s*=\s*\{[^}]*\}
window\.location(\.href)?\s*=
<iframe[^>]*src\s*=\s*\{
```

**Safe Alternative**:
```typescript
// ✅ SAFE - Validate URL protocol
const isValidUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
};

{isValidUrl(userInput) && <a href={userInput}>Click</a>}
```

---

### 7. Event Handler Injection

**Severity**: HIGH

```typescript
// ❌ VULNERABLE - Dynamic event handlers
<button onClick={userInput}>Click</button>

// ❌ VULNERABLE - setAttribute for events
element.setAttribute('onclick', userInput);
element.setAttribute('onerror', userInput);
```

**Regex Pattern**:
```regex
setAttribute\s*\(\s*['"`]on\w+['"`]
```

---

### 8. Script Injection via src

**Severity**: CRITICAL

```typescript
// ❌ VULNERABLE
<script src={userInput}></script>

// ❌ VULNERABLE - Dynamic script loading
const script = document.createElement('script');
script.src = userInput;
document.body.appendChild(script);
```

**Regex Pattern**:
```regex
<script[^>]*src\s*=\s*\{
createElement\s*\(\s*['"`]script['"`]\s*\)
```

---

## React-Specific Considerations

### Safe by Default
React escapes values in JSX by default:
```typescript
// ✅ SAFE - React escapes this automatically
<div>{userInput}</div>
<span>{data.content}</span>
```

### Exception: dangerouslySetInnerHTML
The only way to inject raw HTML in React is through `dangerouslySetInnerHTML`, which should always be flagged for review.

---

## Scan Checklist

- [ ] Search for `dangerouslySetInnerHTML` usage
- [ ] Search for `.innerHTML` assignments
- [ ] Search for `.outerHTML` assignments
- [ ] Search for `document.write` calls
- [ ] Search for `eval()` usage
- [ ] Search for `new Function()` usage
- [ ] Search for dynamic `href` with user input
- [ ] Search for `window.location` assignments
- [ ] Search for dynamic script/iframe sources
- [ ] Verify DOMPurify or similar sanitization is used where needed

---

## Remediation Libraries

| Library | Purpose | Install |
|---------|---------|---------|
| DOMPurify | HTML sanitization | `npm install dompurify` |
| xss | XSS filter | `npm install xss` |
| sanitize-html | HTML sanitizer | `npm install sanitize-html` |
| isomorphic-dompurify | SSR-compatible DOMPurify | `npm install isomorphic-dompurify` |
