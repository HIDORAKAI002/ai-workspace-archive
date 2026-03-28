# Security & Reliability

Checklist for security review, adapted for front-end web projects. Focus on client-side vulnerabilities and third-party integrations.

---

## Input/output safety

- Unsafe HTML injection (`innerHTML`, `insertAdjacentHTML`) without prior sanitization. [Blocking]
- User HTML rendered without a sanitizer (DOMPurify, etc.) with strict allowlist — prefer `textContent` or escaping. [Blocking]
- Unescaped variables in server-side templates or string interpolation (template injection). [Blocking]
- Unsafe object merging (`Object.assign`, spread) with user-controlled data (prototype pollution). [Blocking]
- User input in `href`, `src`, `action` attributes without validation (javascript: protocol, data: URIs). [Blocking]

## Third-party scripts

- Scripts from ad networks, analytics, or vendors loaded without `integrity` attribute (SRI). [Important]
- Missing `crossorigin` attribute on cross-origin scripts. [Important]
- Third-party scripts loaded synchronously (blocking render). [Important]
- Unknown or undocumented script attributes (`nowprocket`, `data-cfasync`, etc.). [Suggestion]
- Vendor scripts with obfuscated/minified code committed directly (use CDN or npm package). [Suggestion]

## Sensitive data & PII

- PII or sensitive data in `localStorage`, `sessionStorage`, or logs. [Blocking]
- Session identifiers in `localStorage` — prefer httpOnly cookies when backend controls auth. [Blocking]
- Excessive logging of user data (PII in `console.log`). [Blocking]
- Hardcoded environment-specific values (localhost URLs, staging API endpoints, sensitive test data). [Important]

## Supply chain & dependencies

- New package added without verifying it exists (npm registry, spelling, official name) and health (popularity, maintenance, vulnerabilities, bundle size). [Important]
- Dependency version format inconsistent with project convention. [Suggestion]
- Dependency added without justification (bundle size impact). [Suggestion]
- Importing from untrusted CDNs without `integrity` check. [Important]
- CI reports vulnerabilities (npm audit or equivalent failed) — flag and do not merge. [Blocking]
- Outdated dependencies with known CVEs when surfaced by CI or manual audit. [Important]

## CORS & headers

- Overly permissive CORS (`Access-Control-Allow-Origin: *` with credentials). [Important]
- Missing security headers on served pages (CSP, X-Frame-Options, X-Content-Type-Options). [Important]
- `target="_blank"` links without `rel="noopener noreferrer"`. [Important]

## Runtime risks

- Unbounded loops or recursive calls that can freeze the browser tab. [Blocking]
- Missing timeouts on `fetch` / `XMLHttpRequest` calls. [Important]
- Blocking operations on the main thread (sync XHR, heavy computation without Web Worker). [Important]
- Event listeners added without cleanup (memory leaks on SPA navigation or component destroy). [Important]
- `setInterval` without clear condition (polling that never stops). [Important]
- ReDoS: complex regex on user input. [Important]

## Async & state

- Race conditions: concurrent async operations modifying shared state. [Important]
- Check-then-act patterns without atomicity (`if (exists) then use`). [Important]
- Stale closures capturing outdated state in event handlers or timeouts. [Important]
- Missing error handling on `fetch` / async operations (no `.catch()`, no `try/catch`). [Important]

## Data integrity

- Form submissions without client-side validation. [Important]
- File uploads without client-side validation (type, size) before submission. [Important]
- API error responses displayed without filtering (stack traces, internal paths, DB details exposed). [Blocking]
- Trusting client-provided data for business logic (price, role, permissions). [Blocking]
- Missing idempotency on retry-able operations (double submit). [Important]

### Critical verification checkpoints

- Is this content escaped before insertion into the DOM?
- Can an attacker control any part of this URL/attribute value?
- What does this third-party script do? Is it documented?
- What happens if this CDN goes down?
- What happens if the network request takes 30 seconds?
- Is this listener cleaned up when the component is destroyed?
- What happens if the user clicks this button twice quickly?
- What if the response arrives after the component is unmounted?
