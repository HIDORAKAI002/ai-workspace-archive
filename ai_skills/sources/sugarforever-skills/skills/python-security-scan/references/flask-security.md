# Flask Security Guide

## Framework Detection

```python
# Detection patterns
from flask import Flask
from flask import *
app = Flask(__name__)
```

---

## Debug Mode

### Risk Level: CRITICAL

**Detection Pattern:**
```regex
app\.run\s*\([^)]*debug\s*=\s*True
DEBUG\s*=\s*True
app\.debug\s*=\s*True
FLASK_DEBUG\s*=\s*1
```

**Vulnerable Code:**
```python
# Exposes Werkzeug debugger with code execution
app.run(debug=True)
app.config['DEBUG'] = True

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')  # Exposed to network!
```

**Impact:**
- Interactive debugger allows arbitrary code execution
- Stack traces expose source code and variables
- PIN can be brute-forced or predicted

**Remediation:**
```python
# Use environment variable
import os
app.run(debug=os.environ.get('FLASK_DEBUG', 'False').lower() == 'true')

# Production configuration
class ProductionConfig:
    DEBUG = False
    TESTING = False

app.config.from_object(ProductionConfig)
```

---

## Secret Key

### Risk Level: CRITICAL

**Detection Pattern:**
```regex
SECRET_KEY\s*=\s*['"'][^'"']+['"']
app\.secret_key\s*=\s*['"']
app\.config\s*\[\s*['"']SECRET_KEY['"']\s*\]\s*=\s*['"']
```

**Vulnerable Code:**
```python
app.secret_key = 'development'
app.config['SECRET_KEY'] = 'super-secret-key'
SECRET_KEY = 'change-me'
```

**Impact:**
- Session cookie forgery
- CSRF token bypass
- Signed cookie manipulation

**Remediation:**
```python
import os
import secrets

# Generate secure key
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY') or secrets.token_hex(32)

# Or from file
with open('/etc/secrets/flask_key', 'rb') as f:
    app.config['SECRET_KEY'] = f.read()
```

---

## Session Security

### Risk Level: HIGH

**Detection Patterns:**
```regex
session\s*\[
SESSION_COOKIE_SECURE\s*=\s*False
SESSION_COOKIE_HTTPONLY\s*=\s*False
PERMANENT_SESSION_LIFETIME\s*=\s*timedelta\s*\([^)]*days\s*=\s*[3-9]\d+
```

**Vulnerable Code:**
```python
# Client-side session without encryption
session['user_id'] = user.id
session['is_admin'] = True  # User can modify!

# Insecure session configuration
app.config['SESSION_COOKIE_SECURE'] = False
app.config['SESSION_COOKIE_HTTPONLY'] = False
app.config['SESSION_COOKIE_SAMESITE'] = None
```

**Impact:**
- Session data visible to users (base64 encoded, not encrypted)
- Session hijacking via XSS
- Session fixation

**Remediation:**
```python
# Secure session configuration
app.config.update(
    SESSION_COOKIE_SECURE=True,       # HTTPS only
    SESSION_COOKIE_HTTPONLY=True,     # No JavaScript access
    SESSION_COOKIE_SAMESITE='Lax',    # CSRF protection
    PERMANENT_SESSION_LIFETIME=timedelta(hours=1)
)

# Use server-side sessions
from flask_session import Session
app.config['SESSION_TYPE'] = 'redis'
Session(app)
```

---

## Server-Side Template Injection (SSTI)

### Risk Level: CRITICAL

**Detection Patterns:**
```regex
render_template_string\s*\(
Template\s*\([^)]*\)\.render
jinja2\.Environment\s*\(\s*\)\.from_string
```

**Vulnerable Code:**
```python
from flask import render_template_string

# Direct user input in template
@app.route('/hello')
def hello():
    name = request.args.get('name')
    return render_template_string(f'Hello {name}!')

# Template from user input
@app.route('/template')
def custom_template():
    template = request.form.get('template')
    return render_template_string(template)
```

**Exploit:**
```
# Access config
{{ config }}
{{ config.SECRET_KEY }}

# RCE
{{ ''.__class__.__mro__[2].__subclasses__()[40]('/etc/passwd').read() }}
{{ request.application.__globals__.__builtins__.__import__('os').popen('id').read() }}
```

**Remediation:**
```python
from flask import render_template
from markupsafe import escape

# Use file-based templates
@app.route('/hello')
def hello():
    name = request.args.get('name')
    return render_template('hello.html', name=name)

# If dynamic template needed, escape input
@app.route('/greeting')
def greeting():
    name = escape(request.args.get('name', ''))
    return render_template_string('Hello {{ name }}!', name=name)
```

---

## Cross-Site Scripting (XSS)

### Risk Level: HIGH

**Detection Patterns:**
```regex
\|\s*safe\s*[%}]
Markup\s*\(
__html__
```

**Vulnerable Code:**
```python
# Disabling auto-escaping
{{ user_input | safe }}
{% autoescape false %}{{ user_input }}{% endautoescape %}

# Python-side Markup
from markupsafe import Markup
return Markup(f"<div>{user_input}</div>")

# Response without proper content-type
@app.route('/api')
def api():
    return f"<html>{user_input}</html>"
```

**Remediation:**
```python
# Jinja2 auto-escapes by default - don't disable it
{{ user_input }}  # Automatically escaped

# If you must use safe, sanitize first
import bleach
clean_html = bleach.clean(user_input, tags=['p', 'b', 'i'])
return render_template('page.html', content=Markup(clean_html))

# Set proper content-type
from flask import jsonify
return jsonify({"message": user_input})
```

---

## Cross-Site Request Forgery (CSRF)

### Risk Level: HIGH

**Detection Patterns:**
```regex
@app\.route\s*\([^)]*methods\s*=\s*\[[^\]]*['"]POST['"]
WTF_CSRF_ENABLED\s*=\s*False
csrf\.exempt
@csrf\.exempt
```

**Vulnerable Code:**
```python
# No CSRF protection
@app.route('/transfer', methods=['POST'])
def transfer():
    amount = request.form['amount']
    to_account = request.form['to']
    # Process transfer without CSRF validation

# Disabled CSRF
app.config['WTF_CSRF_ENABLED'] = False

# Exempted route
@csrf.exempt
@app.route('/api/data', methods=['POST'])
def api_data():
    pass
```

**Remediation:**
```python
from flask_wtf.csrf import CSRFProtect

csrf = CSRFProtect(app)

# In templates
<form method="post">
    {{ csrf_token() }}
    <!-- or -->
    <input type="hidden" name="csrf_token" value="{{ csrf_token() }}"/>
</form>

# For AJAX
<meta name="csrf-token" content="{{ csrf_token() }}">

# JavaScript
fetch('/api', {
    headers: {
        'X-CSRFToken': document.querySelector('meta[name=csrf-token]').content
    }
});
```

---

## SQL Injection

### Risk Level: CRITICAL

**Detection Patterns:**
```regex
db\.engine\.execute\s*\(f
db\.session\.execute\s*\(f
text\s*\(f
\.filter\s*\(.*==.*request\.
```

**Vulnerable Code:**
```python
from flask_sqlalchemy import SQLAlchemy

# Raw query with string formatting
@app.route('/user/<username>')
def get_user(username):
    result = db.engine.execute(f"SELECT * FROM users WHERE username = '{username}'")
    return jsonify(result.fetchall())

# SQLAlchemy text with formatting
from sqlalchemy import text
db.session.execute(text(f"SELECT * FROM users WHERE id = {user_id}"))
```

**Remediation:**
```python
# Use SQLAlchemy ORM
User.query.filter_by(username=username).first()

# Parameterized queries
from sqlalchemy import text
db.session.execute(text("SELECT * FROM users WHERE id = :id"), {"id": user_id})

# SQLAlchemy expressions
from sqlalchemy import select
stmt = select(User).where(User.username == username)
result = db.session.execute(stmt)
```

---

## Open Redirect

### Risk Level: MEDIUM

**Detection Patterns:**
```regex
redirect\s*\(\s*request\.(args|form)
return\s+redirect\s*\([^)]*\+
url_for\s*\([^)]*_external\s*=\s*True
```

**Vulnerable Code:**
```python
from flask import redirect, request

@app.route('/login')
def login():
    next_url = request.args.get('next')
    # After login...
    return redirect(next_url)  # Can redirect to malicious site
```

**Remediation:**
```python
from urllib.parse import urlparse, urljoin
from flask import request, url_for

def is_safe_url(target):
    ref_url = urlparse(request.host_url)
    test_url = urlparse(urljoin(request.host_url, target))
    return test_url.scheme in ('http', 'https') and ref_url.netloc == test_url.netloc

@app.route('/login')
def login():
    next_url = request.args.get('next')
    if not is_safe_url(next_url):
        return abort(400)
    return redirect(next_url)

# Or use url_for with endpoint names
return redirect(url_for('dashboard'))
```

---

## File Upload Vulnerabilities

### Risk Level: HIGH

**Detection Patterns:**
```regex
request\.files
\.save\s*\(
filename\s*=\s*.*request
send_from_directory
```

**Vulnerable Code:**
```python
@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    # Direct save with user-provided filename
    file.save(f'/uploads/{file.filename}')

# Path traversal
filename = request.form['filename']
return send_from_directory('/uploads', filename)
```

**Remediation:**
```python
from werkzeug.utils import secure_filename
import os
import uuid

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    if file and allowed_file(file.filename):
        # Use secure_filename
        filename = secure_filename(file.filename)
        # Or generate random filename
        ext = filename.rsplit('.', 1)[1].lower()
        filename = f"{uuid.uuid4()}.{ext}"
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    return 'Uploaded'

# Safe file serving
@app.route('/download/<filename>')
def download(filename):
    filename = secure_filename(filename)
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
```

---

## Security Headers

### Risk Level: MEDIUM

**Missing Headers Detection:**
Check for absence of security headers in responses.

**Remediation with Flask-Talisman:**
```python
from flask_talisman import Talisman

Talisman(app,
    force_https=True,
    strict_transport_security=True,
    session_cookie_secure=True,
    content_security_policy={
        'default-src': "'self'",
        'script-src': "'self'",
        'style-src': "'self' 'unsafe-inline'",
    }
)
```

**Manual headers:**
```python
@app.after_request
def add_security_headers(response):
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers['Content-Security-Policy'] = "default-src 'self'"
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    return response
```

---

## Blueprint Security

### Risk Level: MEDIUM

**Detection Patterns:**
```regex
Blueprint\s*\(
\.register_blueprint\s*\(
```

**Vulnerable Code:**
```python
# No authentication on blueprint
admin_bp = Blueprint('admin', __name__, url_prefix='/admin')

@admin_bp.route('/users')
def list_users():
    return jsonify(User.query.all())
```

**Remediation:**
```python
from functools import wraps
from flask import session, abort

def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not session.get('is_admin'):
            abort(403)
        return f(*args, **kwargs)
    return decorated

@admin_bp.before_request
@admin_required
def before_request():
    pass  # All routes in blueprint require admin

# Or per-route
@admin_bp.route('/users')
@admin_required
def list_users():
    return jsonify(User.query.all())
```

---

## Sensitive Data Exposure

### Risk Level: HIGH

**Detection Patterns:**
```regex
\.to_dict\s*\(
jsonify\s*\(.*query
return\s+str\s*\(.*model
```

**Vulnerable Code:**
```python
@app.route('/user/<int:id>')
def get_user(id):
    user = User.query.get(id)
    return jsonify(user.__dict__)  # Exposes password hash, internal fields
```

**Remediation:**
```python
from marshmallow import Schema, fields

class UserSchema(Schema):
    id = fields.Int()
    username = fields.Str()
    email = fields.Str()
    # Exclude sensitive fields

user_schema = UserSchema()

@app.route('/user/<int:id>')
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify(user_schema.dump(user))
```

---

## Rate Limiting

### Risk Level: MEDIUM

**Missing Rate Limiting Detection:**
Check for authentication endpoints without rate limiting.

**Remediation:**
```python
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

@app.route('/login', methods=['POST'])
@limiter.limit("5 per minute")
def login():
    # Login logic
    pass

@app.route('/api/data')
@limiter.limit("100 per minute")
def api_data():
    pass
```
