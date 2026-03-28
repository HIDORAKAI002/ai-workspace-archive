# Python-Specific Security Vulnerabilities

## Code Execution Vulnerabilities

### eval() and exec()

**Risk:** CRITICAL - Arbitrary code execution

```python
# VULNERABLE
user_expr = request.args.get('expr')
result = eval(user_expr)  # RCE!

code = request.form.get('code')
exec(code)  # RCE!

# Also dangerous
eval(compile(user_input, '<string>', 'eval'))
```

**Detection Pattern:**
```regex
eval\s*\(
exec\s*\(
compile\s*\(.*['"](eval|exec|single)['"]
```

**Remediation:**
```python
# Use ast.literal_eval for safe evaluation of literals
import ast
result = ast.literal_eval(user_input)  # Only parses Python literals

# Use a safe expression parser for math
import simpleeval
result = simpleeval.simple_eval(user_expr)

# Never execute user-provided code
```

---

### Input Functions

**Risk:** HIGH - Code injection in Python 2

```python
# VULNERABLE (Python 2 only)
name = input("Enter name: ")  # Actually calls eval()!

# Safe in Python 3, but input() was raw_input() in Python 2
```

**Remediation:**
- Ensure Python 3 is used
- In Python 2, always use `raw_input()`

---

## Deserialization Vulnerabilities

### pickle

**Risk:** CRITICAL - Arbitrary code execution

```python
# VULNERABLE
import pickle

data = pickle.loads(user_data)  # RCE!
data = pickle.load(user_file)  # RCE!

# Also affects cPickle
import cPickle
data = cPickle.loads(user_data)  # RCE!
```

**Detection Pattern:**
```regex
pickle\.loads?\s*\(
cPickle\.loads?\s*\(
```

**Exploitation Example:**
```python
import pickle
import os

class Exploit:
    def __reduce__(self):
        return (os.system, ('rm -rf /',))

# This payload executes os.system('rm -rf /') when unpickled
payload = pickle.dumps(Exploit())
```

**Remediation:**
```python
# Never unpickle untrusted data
# Use JSON for data serialization
import json
data = json.loads(user_data)

# If pickle is necessary, use hmac for integrity
import hmac
import hashlib

def secure_pickle_dumps(obj, key):
    data = pickle.dumps(obj)
    sig = hmac.new(key, data, hashlib.sha256).hexdigest()
    return sig + ':' + data.hex()

def secure_pickle_loads(signed_data, key):
    sig, data_hex = signed_data.split(':')
    data = bytes.fromhex(data_hex)
    expected_sig = hmac.new(key, data, hashlib.sha256).hexdigest()
    if not hmac.compare_digest(sig, expected_sig):
        raise ValueError("Invalid signature")
    return pickle.loads(data)
```

---

### YAML

**Risk:** CRITICAL - Arbitrary code execution with yaml.load()

```python
# VULNERABLE
import yaml
data = yaml.load(user_input)  # RCE with !!python/object

# Malicious YAML payload:
# !!python/object/apply:os.system ['rm -rf /']
```

**Detection Pattern:**
```regex
yaml\.load\s*\([^)]*\)(?!\s*,\s*Loader\s*=\s*yaml\.SafeLoader)
yaml\.load\s*\([^,)]+\)$
```

**Remediation:**
```python
import yaml

# Always use safe_load
data = yaml.safe_load(user_input)

# Or explicitly specify SafeLoader
data = yaml.load(user_input, Loader=yaml.SafeLoader)
```

---

### marshal

**Risk:** HIGH - Code execution possibility

```python
# VULNERABLE
import marshal
code = marshal.loads(user_data)
exec(code)
```

**Remediation:**
- Never unmarshal untrusted data
- marshal is for internal Python use only

---

## Command Injection

### os.system() and os.popen()

**Risk:** CRITICAL - Command injection

```python
# VULNERABLE
import os

os.system(f"ping {user_host}")
os.system("ls " + user_dir)
os.popen(f"cat {filename}")

# Shell metacharacters allow injection:
# user_host = "google.com; rm -rf /"
```

**Detection Pattern:**
```regex
os\.system\s*\(
os\.popen\s*\(
```

**Remediation:**
```python
import subprocess
import shlex

# Use subprocess with shell=False (default)
subprocess.run(['ping', '-c', '1', validated_host])

# If shell is needed, use shlex.quote
subprocess.run(f"ping -c 1 {shlex.quote(user_host)}", shell=True)

# Better: validate input against allowlist
import re
if not re.match(r'^[a-zA-Z0-9.-]+$', user_host):
    raise ValueError("Invalid hostname")
```

---

### subprocess with shell=True

**Risk:** CRITICAL - Command injection

```python
# VULNERABLE
import subprocess

subprocess.call(f"ls {user_dir}", shell=True)
subprocess.run(f"grep {pattern} {file}", shell=True)
subprocess.Popen(user_command, shell=True)
```

**Detection Pattern:**
```regex
subprocess\.(call|run|Popen|check_output|check_call)\s*\([^)]*shell\s*=\s*True
```

**Remediation:**
```python
# Avoid shell=True
subprocess.run(['ls', validated_dir])

# Pass arguments as list
subprocess.run(['grep', pattern, filename])
```

---

## Path Traversal

### File Operations

**Risk:** HIGH - Arbitrary file read/write

```python
# VULNERABLE
filename = request.args.get('file')
with open(f'/uploads/{filename}', 'r') as f:  # ../../../etc/passwd
    return f.read()

# Also vulnerable
os.path.join('/uploads', filename)  # Doesn't prevent absolute paths!
```

**Detection Pattern:**
```regex
open\s*\([^)]*\+[^)]*\)
open\s*\(f['"]['"]
send_file\s*\(
```

**Remediation:**
```python
import os

def safe_path(base_dir, filename):
    # Resolve to absolute path
    filepath = os.path.abspath(os.path.join(base_dir, filename))

    # Ensure it's still within base_dir
    if not filepath.startswith(os.path.abspath(base_dir)):
        raise ValueError("Path traversal detected")

    return filepath

# Or use pathlib
from pathlib import Path

def safe_path(base_dir, filename):
    base = Path(base_dir).resolve()
    filepath = (base / filename).resolve()

    if not filepath.is_relative_to(base):
        raise ValueError("Path traversal detected")

    return filepath
```

---

## SQL Injection

### String Formatting in Queries

**Risk:** CRITICAL - SQL injection

```python
# VULNERABLE - String formatting
cursor.execute(f"SELECT * FROM users WHERE id = {user_id}")
cursor.execute("SELECT * FROM users WHERE name = '%s'" % name)
cursor.execute("SELECT * FROM users WHERE name = '" + name + "'")

# VULNERABLE - Even with ORMs if using raw queries
User.objects.raw(f"SELECT * FROM users WHERE name = '{name}'")
db.session.execute(f"SELECT * FROM users WHERE id = {id}")
```

**Detection Pattern:**
```regex
\.execute\s*\(\s*f['"']
\.execute\s*\([^)]*%
\.execute\s*\([^)]*\+
\.raw\s*\(\s*f['"']
```

**Remediation:**
```python
# Use parameterized queries
cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))

# SQLAlchemy
from sqlalchemy import text
db.session.execute(text("SELECT * FROM users WHERE id = :id"), {"id": user_id})

# Django ORM - use querysets
User.objects.filter(id=user_id)
```

---

## XML Vulnerabilities

### XXE (XML External Entity)

**Risk:** HIGH - File disclosure, SSRF

```python
# VULNERABLE
from xml.etree.ElementTree import parse
tree = parse(user_file)  # XXE possible

from lxml import etree
doc = etree.parse(user_file)  # XXE possible
```

**Malicious XML:**
```xml
<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<data>&xxe;</data>
```

**Remediation:**
```python
# defusedxml - safe by default
import defusedxml.ElementTree as ET
tree = ET.parse(user_file)

# Or disable external entities in lxml
from lxml import etree
parser = etree.XMLParser(resolve_entities=False, no_network=True)
doc = etree.parse(user_file, parser)
```

---

## Cryptographic Issues

### Weak Random

**Risk:** HIGH - Predictable tokens

```python
# VULNERABLE
import random
token = random.randint(0, 999999)
session_id = ''.join(random.choice('abc123') for _ in range(16))
```

**Detection Pattern:**
```regex
random\.(randint|choice|random|sample)\s*\(
```

**Remediation:**
```python
import secrets

# Generate secure random token
token = secrets.token_urlsafe(32)
session_id = secrets.token_hex(16)

# Secure random integer
secure_number = secrets.randbelow(1000000)
```

---

### Weak Hashing

**Risk:** HIGH - Password cracking

```python
# VULNERABLE
import hashlib
password_hash = hashlib.md5(password.encode()).hexdigest()
password_hash = hashlib.sha1(password.encode()).hexdigest()
password_hash = hashlib.sha256(password.encode()).hexdigest()  # No salt!
```

**Detection Pattern:**
```regex
hashlib\.(md5|sha1|sha256)\s*\([^)]*password
```

**Remediation:**
```python
# Use bcrypt
import bcrypt
hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
if bcrypt.checkpw(password.encode(), hashed):
    # Valid password

# Or argon2
from argon2 import PasswordHasher
ph = PasswordHasher()
hashed = ph.hash(password)
ph.verify(hashed, password)

# Or passlib
from passlib.hash import argon2
hashed = argon2.hash(password)
argon2.verify(password, hashed)
```

---

## Hardcoded Secrets

### Common Patterns

**Risk:** CRITICAL - Credential exposure

```python
# VULNERABLE
SECRET_KEY = "my-super-secret-key"
API_KEY = "sk_live_1234567890abcdef"
DATABASE_URL = "postgresql://user:password@localhost/db"
AWS_SECRET_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"

password = "admin123"
token = "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

**Detection Pattern:**
```regex
(SECRET|KEY|TOKEN|PASSWORD|CREDENTIAL|API_KEY|AUTH)\s*=\s*['"'][^'"']+['"']
(sk_live_|sk_test_|pk_live_|pk_test_)[a-zA-Z0-9]+
(ghp_|gho_|ghu_|ghs_|ghr_)[a-zA-Z0-9]+
AKIA[0-9A-Z]{16}
```

**Remediation:**
```python
import os

# Load from environment
SECRET_KEY = os.environ.get('SECRET_KEY')
API_KEY = os.environ.get('API_KEY')

# Or use python-dotenv
from dotenv import load_dotenv
load_dotenv()

# Or use a secrets manager
import boto3
client = boto3.client('secretsmanager')
secret = client.get_secret_value(SecretId='my-secret')
```

---

## Assert Statements

### Using assert for Security

**Risk:** MEDIUM - Bypassed with -O flag

```python
# VULNERABLE
assert user.is_admin, "Admin required"  # Skipped with python -O!
assert len(password) >= 8, "Password too short"
```

**Detection Pattern:**
```regex
assert\s+.*\.(is_admin|is_authenticated|has_permission)
assert\s+.*password
assert\s+.*auth
```

**Remediation:**
```python
# Use explicit checks
if not user.is_admin:
    raise PermissionError("Admin required")

if len(password) < 8:
    raise ValueError("Password too short")
```

---

## Temporary Files

### Insecure Temporary Files

**Risk:** MEDIUM - Race conditions, symlink attacks

```python
# VULNERABLE
filename = '/tmp/myapp_' + str(random.randint(0, 9999))
with open(filename, 'w') as f:
    f.write(data)
```

**Remediation:**
```python
import tempfile

# Secure temporary file
with tempfile.NamedTemporaryFile(delete=False) as f:
    f.write(data)
    temp_path = f.name

# Secure temporary directory
with tempfile.TemporaryDirectory() as tmpdir:
    filepath = os.path.join(tmpdir, 'file.txt')
```
