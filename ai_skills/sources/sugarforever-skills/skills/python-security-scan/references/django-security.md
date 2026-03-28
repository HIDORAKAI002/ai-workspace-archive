# Django Security Guide

## Framework Detection

```python
# Detection patterns
import django
from django.conf import settings
from django.http import HttpResponse
INSTALLED_APPS = [...]
```

---

## Debug Mode

### Risk Level: CRITICAL

**Detection Pattern:**
```regex
DEBUG\s*=\s*True
```

**Vulnerable Code:**
```python
# settings.py
DEBUG = True  # Never in production!
```

**Impact:**
- Detailed error pages expose source code
- SQL queries shown in error pages
- Settings and environment variables exposed
- Sensitive data in tracebacks

**Remediation:**
```python
# settings.py
import os
DEBUG = os.environ.get('DJANGO_DEBUG', 'False').lower() == 'true'

# Or use django-environ
import environ
env = environ.Env(DEBUG=(bool, False))
DEBUG = env('DEBUG')
```

---

## Secret Key

### Risk Level: CRITICAL

**Detection Pattern:**
```regex
SECRET_KEY\s*=\s*['"'][^'"']+['"']
```

**Vulnerable Code:**
```python
# Hardcoded or weak secret key
SECRET_KEY = 'django-insecure-abc123'
SECRET_KEY = 'change-me-in-production'
```

**Impact:**
- Session hijacking
- CSRF bypass
- Cryptographic signing compromise
- Password reset token forgery

**Remediation:**
```python
import os
from django.core.management.utils import get_random_secret_key

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY') or get_random_secret_key()

# Or use secrets file
with open('/etc/secrets/django_key') as f:
    SECRET_KEY = f.read().strip()
```

---

## SQL Injection

### Risk Level: CRITICAL

**Detection Patterns:**
```regex
\.raw\s*\(\s*f['"']
\.raw\s*\([^)]*%
\.extra\s*\(
RawSQL\s*\(
cursor\.execute\s*\(f
```

**Vulnerable Code:**
```python
from django.db import connection

# Raw queries with string formatting
User.objects.raw(f"SELECT * FROM auth_user WHERE username = '{username}'")
User.objects.raw("SELECT * FROM auth_user WHERE id = %s" % user_id)

# Extra (deprecated but still used)
User.objects.extra(where=[f"username = '{username}'"])

# Direct cursor
cursor = connection.cursor()
cursor.execute(f"SELECT * FROM auth_user WHERE id = {user_id}")
```

**Remediation:**
```python
# Use ORM querysets
User.objects.filter(username=username)
User.objects.get(pk=user_id)

# Parameterized raw queries
User.objects.raw("SELECT * FROM auth_user WHERE username = %s", [username])

# Parameterized cursor
cursor.execute("SELECT * FROM auth_user WHERE id = %s", [user_id])
```

---

## Cross-Site Scripting (XSS)

### Risk Level: HIGH

**Detection Patterns:**
```regex
\|\s*safe\s*[%}]
mark_safe\s*\(
{% autoescape off %}
__html__
format_html\s*\([^)]*\{[^}]*\}
```

**Vulnerable Code:**
```python
from django.utils.safestring import mark_safe

# Disabling auto-escape in templates
{{ user_input|safe }}
{% autoescape off %}{{ user_input }}{% endautoescape %}

# Python side
return HttpResponse(mark_safe(f"<div>{user_input}</div>"))

# Improper format_html usage
from django.utils.html import format_html
return format_html("<div>{}</div>", mark_safe(user_input))
```

**Remediation:**
```python
# Django auto-escapes by default
{{ user_input }}  # Safe

# Use format_html correctly
from django.utils.html import format_html, escape
return format_html("<div>{}</div>", user_input)  # user_input is escaped

# If HTML is needed, sanitize first
import bleach
clean_html = bleach.clean(user_input, tags=['p', 'b', 'i', 'a'])
return mark_safe(clean_html)
```

---

## Cross-Site Request Forgery (CSRF)

### Risk Level: HIGH

**Detection Patterns:**
```regex
@csrf_exempt
csrf_exempt\s*\(
CSRF_COOKIE_SECURE\s*=\s*False
CSRF_USE_SESSIONS\s*=\s*False
```

**Vulnerable Code:**
```python
from django.views.decorators.csrf import csrf_exempt

# Disabling CSRF protection
@csrf_exempt
def my_view(request):
    pass

# Missing CSRF token in forms
<form method="post">
    <input type="submit">
</form>

# Insecure CSRF settings
CSRF_COOKIE_SECURE = False
CSRF_COOKIE_HTTPONLY = False
```

**Remediation:**
```python
# Include CSRF token in all POST forms
<form method="post">
    {% csrf_token %}
    <input type="submit">
</form>

# Secure CSRF settings
CSRF_COOKIE_SECURE = True      # HTTPS only
CSRF_COOKIE_HTTPONLY = True    # No JS access
CSRF_COOKIE_SAMESITE = 'Lax'   # Prevent cross-site requests

# For AJAX requests
const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
fetch('/api/', {
    headers: {'X-CSRFToken': csrftoken}
});
```

---

## Authentication Issues

### Risk Level: HIGH

**Detection Patterns:**
```regex
AUTH_PASSWORD_VALIDATORS\s*=\s*\[\s*\]
password.*=.*request\.(GET|POST)
\.set_password\s*\(
check_password\s*\(
```

**Vulnerable Code:**
```python
# Empty password validators
AUTH_PASSWORD_VALIDATORS = []

# Weak authentication
def login_view(request):
    username = request.POST['username']
    password = request.POST['password']
    user = User.objects.get(username=username)
    if user.password == password:  # Plain text comparison!
        login(request, user)

# No rate limiting on login
```

**Remediation:**
```python
# Strong password validators
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', 'OPTIONS': {'min_length': 12}},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Use Django's authentication
from django.contrib.auth import authenticate, login

def login_view(request):
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)

# Add rate limiting with django-ratelimit
from django_ratelimit.decorators import ratelimit

@ratelimit(key='ip', rate='5/m', method='POST')
def login_view(request):
    pass
```

---

## Session Security

### Risk Level: HIGH

**Detection Patterns:**
```regex
SESSION_COOKIE_SECURE\s*=\s*False
SESSION_COOKIE_HTTPONLY\s*=\s*False
SESSION_ENGINE.*cache
```

**Vulnerable Code:**
```python
# Insecure session settings
SESSION_COOKIE_SECURE = False
SESSION_COOKIE_HTTPONLY = False
SESSION_COOKIE_SAMESITE = None
SESSION_EXPIRE_AT_BROWSER_CLOSE = False
SESSION_COOKIE_AGE = 31536000  # 1 year

# Cookie-based sessions (data visible to user)
SESSION_ENGINE = 'django.contrib.sessions.backends.signed_cookies'
```

**Remediation:**
```python
# Secure session configuration
SESSION_COOKIE_SECURE = True        # HTTPS only
SESSION_COOKIE_HTTPONLY = True      # No JavaScript access
SESSION_COOKIE_SAMESITE = 'Lax'     # CSRF protection
SESSION_COOKIE_AGE = 3600           # 1 hour
SESSION_EXPIRE_AT_BROWSER_CLOSE = True

# Use database or cache sessions
SESSION_ENGINE = 'django.contrib.sessions.backends.db'
# Or
SESSION_ENGINE = 'django.contrib.sessions.backends.cache'
```

---

## Allowed Hosts

### Risk Level: HIGH

**Detection Patterns:**
```regex
ALLOWED_HOSTS\s*=\s*\[\s*\]
ALLOWED_HOSTS\s*=\s*\[\s*['"]\*['"]\s*\]
```

**Vulnerable Code:**
```python
# Empty allowed hosts (only works with DEBUG=True)
ALLOWED_HOSTS = []

# Wildcard (allows any host)
ALLOWED_HOSTS = ['*']
```

**Impact:**
- Host header injection
- Cache poisoning
- Password reset poisoning

**Remediation:**
```python
ALLOWED_HOSTS = [
    'example.com',
    'www.example.com',
    '.example.com',  # Subdomain wildcard
]

# From environment
import os
ALLOWED_HOSTS = os.environ.get('DJANGO_ALLOWED_HOSTS', '').split(',')
```

---

## Security Middleware

### Risk Level: MEDIUM

**Detection Patterns:**
Check for missing middleware:
```regex
SecurityMiddleware
XFrameOptionsMiddleware
```

**Vulnerable Configuration:**
```python
MIDDLEWARE = [
    # Missing security middleware
    'django.middleware.common.CommonMiddleware',
]

# Insecure settings
SECURE_SSL_REDIRECT = False
SECURE_HSTS_SECONDS = 0
X_FRAME_OPTIONS = None
```

**Remediation:**
```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # ... other middleware
]

# Security settings
SECURE_SSL_REDIRECT = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = 'DENY'
```

---

## File Upload Vulnerabilities

### Risk Level: HIGH

**Detection Patterns:**
```regex
request\.FILES
FileField\s*\(
ImageField\s*\(
\.save\s*\(
```

**Vulnerable Code:**
```python
# No file type validation
def upload_view(request):
    file = request.FILES['document']
    file.save(f'/uploads/{file.name}')

# Model without validation
class Document(models.Model):
    file = models.FileField(upload_to='documents/')
```

**Remediation:**
```python
from django.core.validators import FileExtensionValidator
from django.core.exceptions import ValidationError
import magic

def validate_file_type(file):
    valid_mime_types = ['application/pdf', 'image/jpeg', 'image/png']
    file_mime_type = magic.from_buffer(file.read(1024), mime=True)
    file.seek(0)
    if file_mime_type not in valid_mime_types:
        raise ValidationError('Invalid file type')

class Document(models.Model):
    file = models.FileField(
        upload_to='documents/',
        validators=[
            FileExtensionValidator(allowed_extensions=['pdf', 'jpg', 'png']),
            validate_file_type,
        ]
    )

# Limit file size
DATA_UPLOAD_MAX_MEMORY_SIZE = 5242880  # 5MB
FILE_UPLOAD_MAX_MEMORY_SIZE = 5242880
```

---

## Open Redirect

### Risk Level: MEDIUM

**Detection Patterns:**
```regex
redirect\s*\(\s*request\.(GET|POST)
HttpResponseRedirect\s*\([^)]*request
```

**Vulnerable Code:**
```python
from django.shortcuts import redirect

def login_redirect(request):
    next_url = request.GET.get('next')
    return redirect(next_url)  # Can redirect to malicious site
```

**Remediation:**
```python
from django.utils.http import url_has_allowed_host_and_scheme
from django.shortcuts import redirect

def login_redirect(request):
    next_url = request.GET.get('next', '/')
    if url_has_allowed_host_and_scheme(next_url, allowed_hosts={request.get_host()}):
        return redirect(next_url)
    return redirect('/')

# Or use Django's login view which handles this
from django.contrib.auth.views import LoginView
```

---

## Mass Assignment

### Risk Level: HIGH

**Detection Patterns:**
```regex
\.objects\.create\s*\(\s*\*\*request\.(POST|GET)
Model\s*\(\s*\*\*
form\.save\s*\(\s*commit\s*=\s*False\s*\)
```

**Vulnerable Code:**
```python
# Direct creation from request data
def create_user(request):
    User.objects.create(**request.POST.dict())  # Can set is_admin=True!

# Uncontrolled model instantiation
user = User(**request.POST.dict())
user.save()
```

**Remediation:**
```python
# Use Django Forms
from django import forms

class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'email']  # Explicitly list allowed fields

def create_user(request):
    form = UserForm(request.POST)
    if form.is_valid():
        form.save()

# Or whitelist fields
ALLOWED_FIELDS = {'username', 'email', 'first_name'}
data = {k: v for k, v in request.POST.items() if k in ALLOWED_FIELDS}
User.objects.create(**data)
```

---

## Sensitive Data in URLs

### Risk Level: MEDIUM

**Detection Patterns:**
```regex
path\s*\([^)]*<.*token
path\s*\([^)]*<.*password
path\s*\([^)]*<.*secret
```

**Vulnerable Code:**
```python
# Sensitive data in URL
urlpatterns = [
    path('reset/<str:token>/', reset_password),  # Token logged in access logs
    path('api/<str:api_key>/data/', get_data),   # API key exposed
]
```

**Remediation:**
```python
# Use POST for sensitive data
urlpatterns = [
    path('reset/', reset_password),  # Token in POST body
]

def reset_password(request):
    token = request.POST.get('token')

# Use headers for API keys
def get_data(request):
    api_key = request.headers.get('X-API-Key')
```

---

## Template Injection

### Risk Level: HIGH

**Detection Patterns:**
```regex
Template\s*\([^)]*request
render_to_string\s*\([^)]*request
```

**Vulnerable Code:**
```python
from django.template import Template, Context

def render_user_template(request):
    template_string = request.POST.get('template')
    template = Template(template_string)  # User controls template!
    return HttpResponse(template.render(Context({})))
```

**Remediation:**
```python
# Never allow user-controlled templates
# Use predefined templates with user data as context

from django.shortcuts import render

def render_page(request):
    user_content = request.POST.get('content')
    return render(request, 'page.html', {'content': user_content})
```

---

## Logging Sensitive Data

### Risk Level: MEDIUM

**Detection Patterns:**
```regex
logger\.(info|debug|warning|error)\s*\([^)]*password
logger\.(info|debug|warning|error)\s*\([^)]*token
logger\.(info|debug|warning|error)\s*\([^)]*secret
```

**Vulnerable Code:**
```python
import logging
logger = logging.getLogger(__name__)

def login_view(request):
    username = request.POST['username']
    password = request.POST['password']
    logger.info(f"Login attempt: {username} with password {password}")  # Exposes password!
```

**Remediation:**
```python
# Never log sensitive data
logger.info(f"Login attempt for user: {username}")

# Use Django's sensitive_post_parameters
from django.views.decorators.debug import sensitive_post_parameters

@sensitive_post_parameters('password', 'password2')
def register_view(request):
    pass
```

---

## Clickjacking Protection

### Risk Level: MEDIUM

**Detection Patterns:**
```regex
@xframe_options_exempt
X_FRAME_OPTIONS\s*=\s*None
X_FRAME_OPTIONS\s*=\s*['"]ALLOWALL['"]
```

**Vulnerable Code:**
```python
from django.views.decorators.clickjacking import xframe_options_exempt

@xframe_options_exempt
def embeddable_view(request):
    pass

# Or in settings
X_FRAME_OPTIONS = None
```

**Remediation:**
```python
# In settings
X_FRAME_OPTIONS = 'DENY'
# Or
X_FRAME_OPTIONS = 'SAMEORIGIN'

# Use CSP frame-ancestors for more control
SECURE_CONTENT_TYPE_NOSNIFF = True
CSP_FRAME_ANCESTORS = ["'self'"]
```
