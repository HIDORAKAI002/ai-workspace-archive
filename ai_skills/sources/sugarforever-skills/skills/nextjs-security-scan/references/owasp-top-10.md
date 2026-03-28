# OWASP Top 10:2025 Quick Reference

## Overview

The OWASP Top 10 is a standard awareness document representing the most critical security risks to web applications. This is the 2025 version with updated categories based on current threat landscape.

---

## A01:2025 - Broken Access Control

**Risk**: Users acting outside their intended permissions.

**Common Vulnerabilities**:
- Missing authentication on endpoints
- Missing authorization checks (IDOR)
- Privilege escalation
- CORS misconfiguration
- Forced browsing to authenticated pages

**Detection Patterns**:
```typescript
// Missing auth check
export async function DELETE(request) { ... }

// Missing ownership verification
const doc = await db.doc.findUnique({ where: { id } });  // No user filter
```

**Prevention**:
- Deny by default
- Implement access control mechanisms once, reuse throughout
- Log access control failures

---

## A02:2025 - Cryptographic Failures

**Risk**: Exposure of sensitive data due to weak cryptography.

**Common Vulnerabilities**:
- Transmitting data in clear text (HTTP)
- Using weak/deprecated algorithms (MD5, SHA1, DES)
- Hardcoded encryption keys
- Missing encryption for sensitive data

**Detection Patterns**:
```typescript
// Weak hashing
const hash = crypto.createHash('md5').update(password).digest('hex');

// Hardcoded keys
const SECRET_KEY = 'my-secret-key-123';
```

**Prevention**:
- Use TLS for all data transmission
- Use strong algorithms (AES-256, SHA-256+, bcrypt)
- Store secrets in environment variables

---

## A03:2025 - Software Supply Chain Failures (NEW)

**Risk**: Vulnerabilities introduced through dependencies.

**Common Vulnerabilities**:
- Using packages with known CVEs
- No dependency verification
- Typosquatting attacks
- Compromised build pipelines

**Detection**:
```bash
npm audit
yarn audit
npx snyk test
```

**Prevention**:
- Regular dependency audits
- Lock file verification
- Use Dependabot or similar
- Verify package integrity

---

## A04:2025 - Security Misconfiguration

**Risk**: Insecure default configurations or incomplete setup.

**Common Vulnerabilities**:
- Unnecessary features enabled
- Default accounts/passwords
- Verbose error messages
- Missing security headers
- Outdated software

**Detection Patterns**:
```typescript
// Verbose errors in production
if (error) {
  res.status(500).json({ error: error.stack });  // Exposes internals
}

// Missing security headers
// No Content-Security-Policy, X-Frame-Options, etc.
```

**Prevention**:
- Minimal platform, remove unused features
- Review and update configurations regularly
- Implement security headers

---

## A05:2025 - Injection

**Risk**: Untrusted data sent to an interpreter.

**Types**:
- SQL Injection
- NoSQL Injection
- Command Injection
- LDAP Injection
- XSS (Cross-Site Scripting)

**Detection Patterns**:
```typescript
// SQL Injection
query(`SELECT * FROM users WHERE id = ${userId}`);

// Command Injection
exec(`ls ${userInput}`);

// XSS
element.innerHTML = userInput;
```

**Prevention**:
- Use parameterized queries
- Validate and sanitize input
- Use ORM/ODM properly
- Escape output

---

## A06:2025 - Insecure Design

**Risk**: Security flaws in the application architecture.

**Common Issues**:
- No threat modeling
- Missing security requirements
- Lack of secure design patterns
- No rate limiting

**Examples**:
- Password reset via security questions only
- No brute force protection
- Trust boundaries not defined

**Prevention**:
- Threat modeling during design
- Secure design patterns
- Reference architectures
- Unit and integration testing for security

---

## A07:2025 - Authentication Failures

**Risk**: Identity, authentication, or session management flaws.

**Common Vulnerabilities**:
- Weak passwords allowed
- Credential stuffing susceptibility
- Missing MFA
- Session fixation
- Improper session invalidation

**Detection Patterns**:
```typescript
// Weak password validation
if (password.length >= 4) { ... }

// Session not invalidated on logout
function logout() {
  redirect('/login');  // Session still valid!
}
```

**Prevention**:
- Implement MFA
- Strong password requirements
- Secure session management
- Account lockout policies

---

## A08:2025 - Software and Data Integrity Failures

**Risk**: Code/data modifications without verification.

**Common Vulnerabilities**:
- Insecure deserialization
- CI/CD pipeline vulnerabilities
- Auto-update without verification
- Unsigned code/packages

**Detection Patterns**:
```typescript
// Unsafe deserialization
const data = JSON.parse(userInput);  // Then using as trusted
const obj = eval('(' + userInput + ')');
```

**Prevention**:
- Digital signatures for code/updates
- Integrity verification for CI/CD
- Review code changes
- Serialization validation

---

## A09:2025 - Security Logging and Alerting Failures

**Risk**: Inability to detect, escalate, or respond to attacks.

**Common Issues**:
- No logging of authentication events
- No alerting on suspicious activity
- Logs stored only locally
- Sensitive data in logs

**Detection**:
```typescript
// No logging
export async function login(credentials) {
  // No audit trail of login attempts
}

// Sensitive data in logs
console.log(`User ${email} logged in with password ${password}`);
```

**Prevention**:
- Log authentication events
- Log access control failures
- Centralized log management
- Alerting thresholds

---

## A10:2025 - Mishandling of Exceptional Conditions (NEW)

**Risk**: Improper error handling leading to security issues.

**Common Vulnerabilities**:
- Failing open instead of closed
- Information disclosure in errors
- Uncaught exceptions
- Race conditions

**Detection Patterns**:
```typescript
// Failing open
try {
  verifyToken(token);
} catch {
  // Silently continues - user is now "authenticated"!
}

// Information disclosure
catch (error) {
  return res.json({ error: error.message, stack: error.stack });
}
```

**Prevention**:
- Fail securely (deny by default)
- Generic error messages to users
- Detailed logging internally
- Handle all exceptions

---

## Quick Reference Table

| Code | Category | Key Prevention |
|------|----------|----------------|
| A01 | Broken Access Control | Auth + authz on every request |
| A02 | Cryptographic Failures | TLS + strong algorithms |
| A03 | Supply Chain Failures | Audit dependencies |
| A04 | Security Misconfiguration | Security headers + minimal setup |
| A05 | Injection | Parameterized queries + validation |
| A06 | Insecure Design | Threat modeling |
| A07 | Authentication Failures | MFA + strong sessions |
| A08 | Integrity Failures | Signatures + verification |
| A09 | Logging Failures | Comprehensive audit logging |
| A10 | Exception Handling | Fail secure + generic errors |

---

## Resources

- [OWASP Top 10:2025](https://owasp.org/Top10/2025/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/)
