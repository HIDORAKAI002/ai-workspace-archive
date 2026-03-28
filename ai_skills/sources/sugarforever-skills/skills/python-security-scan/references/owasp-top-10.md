# OWASP Top 10:2025 - Python Quick Reference

## A01:2021 - Broken Access Control

### Python Patterns to Check
```python
# Missing authorization checks
@app.route('/admin')
def admin_panel():
    return render_template('admin.html')  # No auth check!

# Insecure direct object reference (IDOR)
@app.route('/user/<user_id>')
def get_user(user_id):
    return User.query.get(user_id)  # No ownership verification

# Path traversal
filename = request.args.get('file')
return send_file(f'/uploads/{filename}')  # Can access ../../../etc/passwd
```

### Remediation
- Implement proper authorization decorators
- Verify resource ownership before access
- Use allowlists for file access
- Implement role-based access control (RBAC)

---

## A02:2021 - Cryptographic Failures

### Python Patterns to Check
```python
# Weak hashing
import hashlib
hashlib.md5(password.encode())  # MD5 is broken
hashlib.sha1(password.encode())  # SHA1 is weak for passwords

# Hardcoded secrets
SECRET_KEY = "super_secret_key_123"
API_KEY = "sk-1234567890abcdef"

# Weak random for security
import random
token = random.randint(0, 999999)  # Predictable!

# No salt in password hashing
hash = hashlib.sha256(password.encode()).hexdigest()
```

### Remediation
```python
# Use bcrypt or argon2 for passwords
from bcrypt import hashpw, gensalt
hashed = hashpw(password.encode(), gensalt())

# Use secrets module for tokens
import secrets
token = secrets.token_urlsafe(32)

# Load secrets from environment
import os
SECRET_KEY = os.environ.get('SECRET_KEY')
```

---

## A03:2021 - Injection

### Python Patterns to Check
```python
# SQL Injection
cursor.execute(f"SELECT * FROM users WHERE id = {user_id}")
cursor.execute("SELECT * FROM users WHERE name = '%s'" % name)

# Command Injection
os.system(f"ping {user_input}")
subprocess.call(f"ls {directory}", shell=True)

# LDAP Injection
ldap.search(f"(uid={username})")

# Template Injection (SSTI)
return render_template_string(user_input)
```

### Remediation
```python
# Parameterized queries
cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))

# Avoid shell=True, use lists
subprocess.run(['ping', '-c', '1', validated_host], shell=False)

# Escape LDAP special characters
from ldap3.utils.conv import escape_filter_chars
ldap.search(f"(uid={escape_filter_chars(username)})")
```

---

## A04:2021 - Insecure Design

### Python Patterns to Check
```python
# No rate limiting
@app.route('/login', methods=['POST'])
def login():
    # Can be brute-forced indefinitely
    pass

# No account lockout
if check_password(password, stored_hash):
    return success
# Failed attempts not tracked

# Sensitive data in URLs
@app.route('/reset-password/<token>')  # Token logged in access logs
```

### Remediation
- Implement rate limiting (Flask-Limiter, django-ratelimit)
- Add account lockout after failed attempts
- Use POST for sensitive data
- Implement CAPTCHA for auth endpoints

---

## A05:2021 - Security Misconfiguration

### Python Patterns to Check
```python
# Debug mode in production
app.run(debug=True)  # Flask
DEBUG = True  # Django

# Default credentials
app.secret_key = 'development'

# Verbose error messages
@app.errorhandler(Exception)
def handle_error(e):
    return str(e), 500  # Leaks stack traces

# Missing security headers
# No CSP, X-Frame-Options, etc.
```

### Remediation
```python
# Flask
app.config['DEBUG'] = False
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')

# Django
DEBUG = False
ALLOWED_HOSTS = ['example.com']

# Add security headers (Flask-Talisman, django-csp)
```

---

## A06:2021 - Vulnerable and Outdated Components

### Tools
```bash
# pip-audit
pip-audit

# Safety
safety check -r requirements.txt

# Snyk
snyk test
```

### Common Vulnerable Packages
- `pyyaml < 5.4` - Arbitrary code execution
- `pillow < 8.3.2` - Multiple CVEs
- `urllib3 < 1.26.5` - CRLF injection
- `requests < 2.20.0` - CVE-2018-18074
- `django < 3.2.4` - Multiple vulnerabilities
- `flask < 2.0` - Security improvements

---

## A07:2021 - Identification and Authentication Failures

### Python Patterns to Check
```python
# Weak password requirements
if len(password) >= 4:  # Too short!
    create_user(password)

# Session fixation
session['user_id'] = user.id
# Session ID not regenerated after login

# Credentials in code
def connect_db():
    return psycopg2.connect(
        host="db.example.com",
        user="admin",
        password="admin123"  # Hardcoded!
    )

# No MFA support
# Insecure "remember me" implementation
```

### Remediation
- Enforce strong password policies
- Regenerate session ID after authentication
- Use environment variables for credentials
- Implement MFA
- Secure session configuration

---

## A08:2021 - Software and Data Integrity Failures

### Python Patterns to Check
```python
# Insecure deserialization
import pickle
data = pickle.loads(user_input)  # RCE!

import yaml
yaml.load(user_input)  # Use safe_load!

# Unverified downloads
response = requests.get(url)
exec(response.text)  # Never do this!

# No integrity checks on dependencies
# pip install without --require-hashes
```

### Remediation
```python
# Use safe loaders
import yaml
data = yaml.safe_load(user_input)

# Verify signatures/checksums
import hashlib
if hashlib.sha256(content).hexdigest() != expected_hash:
    raise ValueError("Integrity check failed")

# Pin dependencies with hashes
# pip install --require-hashes -r requirements.txt
```

---

## A09:2021 - Security Logging and Monitoring Failures

### Python Patterns to Check
```python
# No logging of security events
def login(username, password):
    if authenticate(username, password):
        return success
    return failure  # Failed login not logged!

# Logging sensitive data
logger.info(f"User {username} logged in with password {password}")

# No audit trail
def delete_user(user_id):
    User.query.filter_by(id=user_id).delete()
    # No record of who deleted what
```

### Remediation
```python
import logging

# Log security events
logger.warning(f"Failed login attempt for user {username} from {ip}")
logger.info(f"User {user_id} deleted by admin {admin_id}")

# Never log sensitive data
logger.info(f"User {username} logged in")  # No password!
```

---

## A10:2021 - Server-Side Request Forgery (SSRF)

### Python Patterns to Check
```python
# SSRF via user-controlled URL
url = request.args.get('url')
response = requests.get(url)  # Can access internal services!

# Webhook callbacks
callback_url = data.get('callback')
requests.post(callback_url, json=result)

# Image processing
image_url = request.form['image_url']
img = Image.open(requests.get(image_url, stream=True).raw)
```

### Remediation
```python
from urllib.parse import urlparse
import ipaddress

def is_safe_url(url):
    parsed = urlparse(url)

    # Only allow HTTPS
    if parsed.scheme != 'https':
        return False

    # Block internal IPs
    try:
        ip = ipaddress.ip_address(parsed.hostname)
        if ip.is_private or ip.is_loopback:
            return False
    except ValueError:
        pass  # It's a hostname

    # Allowlist domains
    allowed_domains = ['api.example.com', 'cdn.example.com']
    if parsed.hostname not in allowed_domains:
        return False

    return True
```
