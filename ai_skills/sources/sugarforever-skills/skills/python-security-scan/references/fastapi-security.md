# FastAPI Security Guide

## Framework Detection

```python
# Detection patterns
from fastapi import FastAPI
from fastapi import *
app = FastAPI()
```

---

## Debug Mode and Documentation

### Risk Level: MEDIUM

**Detection Patterns:**
```regex
FastAPI\s*\([^)]*docs_url
FastAPI\s*\([^)]*redoc_url
FastAPI\s*\([^)]*openapi_url
app\.debug\s*=\s*True
```

**Vulnerable Code:**
```python
# Default docs exposed in production
app = FastAPI()  # /docs, /redoc, /openapi.json exposed

# Debug mode
app = FastAPI(debug=True)
```

**Impact:**
- API documentation exposes all endpoints
- Attackers can discover all routes and parameters
- Debug mode exposes detailed error information

**Remediation:**
```python
import os

# Disable docs in production
app = FastAPI(
    docs_url="/docs" if os.environ.get("ENV") == "development" else None,
    redoc_url="/redoc" if os.environ.get("ENV") == "development" else None,
    openapi_url="/openapi.json" if os.environ.get("ENV") == "development" else None,
    debug=os.environ.get("DEBUG", "false").lower() == "true"
)

# Or completely disable in production
if os.environ.get("ENV") == "production":
    app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)
else:
    app = FastAPI()
```

---

## SQL Injection

### Risk Level: CRITICAL

**Detection Patterns:**
```regex
\.execute\s*\(f['"']
\.execute\s*\([^)]*%
text\s*\(f['"']
```

**Vulnerable Code:**
```python
from sqlalchemy import text
from fastapi import FastAPI

@app.get("/users/{user_id}")
async def get_user(user_id: str, db: Session = Depends(get_db)):
    # String formatting in query
    result = db.execute(f"SELECT * FROM users WHERE id = {user_id}")
    return result.fetchone()

@app.get("/search")
async def search(q: str, db: Session = Depends(get_db)):
    result = db.execute(text(f"SELECT * FROM users WHERE name LIKE '%{q}%'"))
    return result.fetchall()
```

**Remediation:**
```python
from sqlalchemy.orm import Session
from sqlalchemy import text

# Use ORM
@app.get("/users/{user_id}")
async def get_user(user_id: int, db: Session = Depends(get_db)):
    return db.query(User).filter(User.id == user_id).first()

# Parameterized queries
@app.get("/search")
async def search(q: str, db: Session = Depends(get_db)):
    result = db.execute(
        text("SELECT * FROM users WHERE name LIKE :query"),
        {"query": f"%{q}%"}
    )
    return result.fetchall()
```

---

## Authentication Vulnerabilities

### Risk Level: HIGH

**Detection Patterns:**
```regex
Depends\s*\(\s*\)
@app\.(get|post|put|delete|patch)\s*\([^)]*\)\s*\n\s*(async\s+)?def\s+\w+\s*\([^)]*\):(?![^:]*Depends)
OAuth2PasswordBearer
HTTPBasic
```

**Vulnerable Code:**
```python
from fastapi import FastAPI

# No authentication
@app.get("/admin/users")
async def list_users():
    return get_all_users()

# Broken JWT validation
@app.get("/protected")
async def protected(token: str):
    payload = jwt.decode(token, options={"verify_signature": False})  # No verification!
    return payload

# Hardcoded secret
SECRET_KEY = "my-secret-key"

# No token expiry check
def verify_token(token: str):
    payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    return payload  # No exp check!
```

**Remediation:**
```python
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
from datetime import datetime, timedelta
import os

SECRET_KEY = os.environ.get("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return username

@app.get("/admin/users")
async def list_users(current_user: str = Depends(get_current_user)):
    return get_all_users()
```

---

## Input Validation

### Risk Level: HIGH

**Detection Patterns:**
```regex
def\s+\w+\s*\([^)]*:\s*str[^)]*\)
def\s+\w+\s*\([^)]*:\s*Any[^)]*\)
Query\s*\([^)]*\)(?!.*regex)
```

**Vulnerable Code:**
```python
from fastapi import FastAPI, Query

# No input validation
@app.get("/users/{user_id}")
async def get_user(user_id: str):  # Should be int
    return db.query(f"SELECT * FROM users WHERE id = {user_id}")

# Accepting any input
@app.post("/data")
async def create_data(data: dict):  # No schema validation
    save_to_db(data)

# Weak validation
@app.get("/search")
async def search(q: str = Query(..., min_length=1)):  # No max, no pattern
    pass
```

**Remediation:**
```python
from fastapi import FastAPI, Query, Path, Body
from pydantic import BaseModel, Field, validator, EmailStr
from typing import Optional
import re

# Use Pydantic models for request bodies
class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50, regex="^[a-zA-Z0-9_]+$")
    email: EmailStr
    password: str = Field(..., min_length=8)

    @validator('password')
    def password_strength(cls, v):
        if not re.search(r'[A-Z]', v):
            raise ValueError('Password must contain uppercase letter')
        if not re.search(r'[0-9]', v):
            raise ValueError('Password must contain digit')
        return v

@app.post("/users")
async def create_user(user: UserCreate):
    pass

# Use type hints and constraints
@app.get("/users/{user_id}")
async def get_user(
    user_id: int = Path(..., gt=0, description="User ID must be positive")
):
    pass

@app.get("/search")
async def search(
    q: str = Query(..., min_length=1, max_length=100, regex="^[a-zA-Z0-9 ]+$")
):
    pass
```

---

## CORS Misconfiguration

### Risk Level: HIGH

**Detection Patterns:**
```regex
CORSMiddleware
allow_origins\s*=\s*\[\s*['"]\*['"]\s*\]
allow_credentials\s*=\s*True.*allow_origins\s*=\s*\[\s*['"]\*['"]\s*\]
```

**Vulnerable Code:**
```python
from fastapi.middleware.cors import CORSMiddleware

# Allow all origins with credentials
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,  # Dangerous with allow_origins=["*"]
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Impact:**
- Any website can make authenticated requests
- Session/cookie theft
- CSRF-like attacks

**Remediation:**
```python
from fastapi.middleware.cors import CORSMiddleware

# Specific origins
origins = [
    "https://example.com",
    "https://www.example.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)

# Or dynamic origin validation
from starlette.middleware.cors import CORSMiddleware as StarletteCORS

def is_allowed_origin(origin: str) -> bool:
    allowed_patterns = [
        r"https://.*\.example\.com$",
        r"https://example\.com$",
    ]
    return any(re.match(pattern, origin) for pattern in allowed_patterns)
```

---

## Path Traversal

### Risk Level: HIGH

**Detection Patterns:**
```regex
FileResponse\s*\(
StaticFiles\s*\(
Path\s*\([^)]*\)\s*[^,)]*\.\.
```

**Vulnerable Code:**
```python
from fastapi import FastAPI
from fastapi.responses import FileResponse

@app.get("/files/{filename}")
async def get_file(filename: str):
    return FileResponse(f"/uploads/{filename}")  # Path traversal!

# User-controlled static path
from fastapi.staticfiles import StaticFiles
app.mount("/static", StaticFiles(directory=user_input), name="static")
```

**Remediation:**
```python
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pathlib import Path
import os

UPLOAD_DIR = Path("/uploads").resolve()

@app.get("/files/{filename}")
async def get_file(filename: str):
    # Resolve and validate path
    file_path = (UPLOAD_DIR / filename).resolve()

    # Ensure path is within upload directory
    if not file_path.is_relative_to(UPLOAD_DIR):
        raise HTTPException(status_code=400, detail="Invalid filename")

    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")

    return FileResponse(file_path)
```

---

## Server-Side Request Forgery (SSRF)

### Risk Level: HIGH

**Detection Patterns:**
```regex
httpx\.(get|post|put|delete)\s*\([^)]*request
aiohttp\.ClientSession\s*\(\s*\)\.get\s*\([^)]*request
requests\.(get|post)\s*\([^)]*request
```

**Vulnerable Code:**
```python
import httpx
from fastapi import FastAPI

@app.get("/fetch")
async def fetch_url(url: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(url)  # SSRF!
    return response.text

@app.post("/webhook")
async def webhook(callback_url: str, data: dict):
    async with httpx.AsyncClient() as client:
        await client.post(callback_url, json=data)  # SSRF!
```

**Remediation:**
```python
import httpx
from fastapi import FastAPI, HTTPException
from urllib.parse import urlparse
import ipaddress

ALLOWED_HOSTS = ["api.example.com", "cdn.example.com"]

def is_safe_url(url: str) -> bool:
    try:
        parsed = urlparse(url)

        # Only allow HTTPS
        if parsed.scheme != "https":
            return False

        # Check against allowlist
        if parsed.hostname not in ALLOWED_HOSTS:
            return False

        # Block internal IPs
        try:
            ip = ipaddress.ip_address(parsed.hostname)
            if ip.is_private or ip.is_loopback or ip.is_reserved:
                return False
        except ValueError:
            pass  # It's a hostname, not IP

        return True
    except Exception:
        return False

@app.get("/fetch")
async def fetch_url(url: str):
    if not is_safe_url(url):
        raise HTTPException(status_code=400, detail="URL not allowed")

    async with httpx.AsyncClient() as client:
        response = await client.get(url, follow_redirects=False)
    return response.text
```

---

## Dependency Injection Security

### Risk Level: MEDIUM

**Detection Patterns:**
```regex
Depends\s*\([^)]*\)
get_db\s*\(
```

**Vulnerable Code:**
```python
from fastapi import Depends

# Database session not properly closed
def get_db():
    db = SessionLocal()
    return db  # Session never closed!

# No exception handling
async def get_current_user(token: str = Depends(oauth2_scheme)):
    user = decode_token(token)  # Might raise exception
    return user
```

**Remediation:**
```python
from fastapi import Depends, HTTPException
from contextlib import contextmanager

# Proper session management
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# With exception handling
async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user = get_user(payload.get("sub"))
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
```

---

## Response Model Security

### Risk Level: HIGH

**Detection Patterns:**
```regex
def\s+\w+\s*\([^)]*\)\s*->.*dict
return\s+\w+\.__dict__
\.dict\s*\(\s*\)
```

**Vulnerable Code:**
```python
from fastapi import FastAPI

class User:
    def __init__(self):
        self.id = 1
        self.username = "admin"
        self.password_hash = "..."  # Sensitive!
        self.api_key = "..."        # Sensitive!

@app.get("/users/{user_id}")
async def get_user(user_id: int):
    user = get_user_from_db(user_id)
    return user.__dict__  # Exposes all fields!

@app.get("/me")
async def get_me(user: User = Depends(get_current_user)):
    return user.dict()  # Includes sensitive fields
```

**Remediation:**
```python
from fastapi import FastAPI
from pydantic import BaseModel

# Define response model explicitly
class UserResponse(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        orm_mode = True

@app.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: int):
    return get_user_from_db(user_id)

# Exclude sensitive fields
class UserOut(BaseModel):
    id: int
    username: str

    class Config:
        orm_mode = True
        # Explicitly exclude fields
        fields = {'password_hash': {'exclude': True}}

@app.get("/me", response_model=UserOut)
async def get_me(user: User = Depends(get_current_user)):
    return user
```

---

## Rate Limiting

### Risk Level: MEDIUM

**Missing Rate Limiting Detection:**
Check for authentication/sensitive endpoints without rate limiting.

**Vulnerable Code:**
```python
# No rate limiting on login
@app.post("/login")
async def login(credentials: Credentials):
    # Can be brute-forced indefinitely
    pass

# No rate limiting on password reset
@app.post("/password-reset")
async def reset_password(email: str):
    pass
```

**Remediation:**
```python
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.post("/login")
@limiter.limit("5/minute")
async def login(request: Request, credentials: Credentials):
    pass

@app.post("/password-reset")
@limiter.limit("3/hour")
async def reset_password(request: Request, email: str):
    pass
```

---

## Security Headers

### Risk Level: MEDIUM

**Remediation:**
```python
from fastapi import FastAPI
from starlette.middleware.base import BaseHTTPMiddleware

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        response.headers["Content-Security-Policy"] = "default-src 'self'"
        return response

app.add_middleware(SecurityHeadersMiddleware)
```

---

## Secrets in Configuration

### Risk Level: CRITICAL

**Detection Patterns:**
```regex
SECRET_KEY\s*=\s*['"'][^'"']+['"']
API_KEY\s*=\s*['"'][^'"']+['"']
DATABASE_URL\s*=\s*['"'][^'"']+['"']
```

**Vulnerable Code:**
```python
SECRET_KEY = "my-secret-key"
DATABASE_URL = "postgresql://user:password@localhost/db"
```

**Remediation:**
```python
from pydantic import BaseSettings

class Settings(BaseSettings):
    secret_key: str
    database_url: str
    api_key: str

    class Config:
        env_file = ".env"

settings = Settings()

# Use settings throughout the app
SECRET_KEY = settings.secret_key
```
