# சிறந்த நடைமுறை மற்றும் பரிமாற்றம்

## 🎯 இந்த பயிற்சி முகாம் என்ன கவர்கிறது

இந்த முடிவு பயிற்சி முகாம் மிகச் சிறந்த நடைமுறை, செயல்திறன் மேம்பாட்டு தொழில்நுட்பங்கள் மற்றும் தரவுத்தள ஒருங்கிணைப்புடன் உறுதியான, அளவிடக்கூடிய மற்றும் பாதுகாப்பான MCP சர்வர்களை கட்டுவதற்கான உற்பத்தியியல் வழிகாட்டுதல்கள் ஆகியவற்றை ஒருங்கிணைக்கிறது. உங்கள் நடைமுறையைக் உற்பத்திக்கு தயாராக வைத்திருக்க, நீங்கள் உண்மையான அனுபவத்திலும் தொழில்துறை நிலைகளிலும் கற்றுக்கொள்வீர்கள்.

## கண்ணோட்டம்

வெற்றிகரமான MCP சர்வரை கட்டுவது என்பது கோடுகளை இயங்கச் செய்வதைவிட மேலும் அதிகமானது. இந்த பயிற்சி முகாம், உண்மையிலும் அளவிடக்கூடிய முறையில் செயல்படக்கூடிய, நம்பகத்தன்மையுடனும் பாதுகாப்பு தரநிலைகளை பராமரிக்கும் உற்பத்தி-தயார் அமைப்புகளுக்கு முந்திய டிக்கட்டுகளை பொருத்தும் அவசியமான நடைமுறைகளைக் கொண்டுள்ளது.

இந்த சிறந்த நடைமுறைகள் என்பது உண்மையான உலகு பயன்பாடுகள், சமூக கருத்து மற்றும் நிறுவன நடைமுறைகளிலிருந்து கற்றுக்கொள்ளப்பட்ட பாடங்களில் இருந்து பெறப்பட்டவை.

## கற்றல் இலக்குகள்

இந்த பயிற்சி முகாம் முடியும் போது, நீங்கள்:

- **பயன்படுத்த** MCP சர்வர்கள் மற்றும் தரவுத்தளங்களுக்கான செயல்திறன் மேம்பாட்டு தொழில்நுட்பங்கள்  
- **உழைத்திருத்த** விரிவான பாதுகாப்பு கடுமைப்படுத்தல் முன்னெடுப்புகள்  
- **வடிவு** உற்பத்தி சூழல்களுக்கான அளவிடக்கூடிய கட்டமைப்பு மாதிரிகள்  
- **நிறைவேற்ற** கண்காணிப்பு, பராமரிப்பு மற்றும் செயல்பாட்டு நடைமுறைகள்  
- **பரிசுத்தம்** செலவுகளை செயல்திறன் மற்றும் நம்பகத்தன்மையை பராமரித்து மேம்படுத்த  
- **யோடுகொடு** MCP சமூகத்திற்கும் சூழல்கூட்டிக்குமான பங்களிப்பு  
  
## 🚀 செயல்திறன் மேம்படுத்தல்

### தரவுத்தள செயல்திறன்

#### இணைப்பு குளிர்ச்சி மேம்பாடு

```python
# மேம்படுத்திய இணைப்பு குளம் அமைப்பு
POOL_CONFIG = {
    # அளவு அமைப்பு
    "min_size": max(2, cpu_count()),           # குறைந்தது 2, CPU மீது அளவுகோல்
    "max_size": min(20, cpu_count() * 4),     # அவசியமான அதிகபட்சத்தில் சிறப்பு
    
    # நேர அமைப்பு
    "max_inactive_connection_lifetime": 300,   # 5 நிமிடங்கள்
    "command_timeout": 30,                     # 30 வினாடிகள்
    "max_queries": 50000,                      # இணைப்புகளை சுழற்றவும்
    
    # PostgreSQL அமைப்புகள்
    "server_settings": {
        "application_name": "mcp-server-prod",
        "jit": "off",                          # ஒத்திசைவுக்கு நிறுத்தவும்
        "work_mem": "8MB",                     # கேள்விகளுக்கு மேம்படுத்தவும்
        "shared_preload_libraries": "pg_stat_statements",
        "log_statement": "mod",                # மாற்றங்களை மட்டும் பதிவு செய்யவும்
        "log_min_duration_statement": "1s",   # மெதுவான கேள்விகளை பதிவு செய்யவும்
    }
}
```

#### வினவல் மேம்பாட்டு மாதிரிகள்

```python
class QueryOptimizer:
    """Database query optimization utilities."""
    
    def __init__(self):
        self.query_cache = {}
        self.slow_query_threshold = 1.0  # வினாடிகள்
        
    async def execute_optimized_query(
        self, 
        query: str, 
        params: tuple = None,
        cache_key: str = None,
        cache_ttl: int = 300
    ):
        """Execute query with optimization and caching."""
        
        # முதலில் கேஷை சரிபார்க்கவும்
        if cache_key and cache_key in self.query_cache:
            cache_entry = self.query_cache[cache_key]
            if time.time() - cache_entry['timestamp'] < cache_ttl:
                return cache_entry['result']
        
        # கண்காணிப்புடன் செயல்படுத்தவும்
        start_time = time.time()
        
        try:
            async with db_provider.get_connection() as conn:
                # விசாரணை செயல்பாட்டை மேம்படுத்தவும்
                await conn.execute("SET enable_seqscan = off")  # குறியீடுகளை முன்னுரிமை கொடுங்கள்
                await conn.execute("SET work_mem = '16MB'")     # இந்தக் கேள்விக்காக அதிக நினைவகம்
                
                result = await conn.fetch(query, *params if params else ())
                
                duration = time.time() - start_time
                
                # மெதுவான கேள்விகளை பதிவு செய்யவும்
                if duration > self.slow_query_threshold:
                    logger.warning(f"Slow query detected: {duration:.2f}s", extra={
                        "query": query[:200],
                        "duration": duration,
                        "params_count": len(params) if params else 0
                    })
                
                # வெற்றிகரமான முடிவுகளை கேஷ் செய்யவும்
                if cache_key and len(result) < 1000:  # பெரிய முடிவுகளை கேஷ் செய்யாதீர்கள்
                    self.query_cache[cache_key] = {
                        'result': result,
                        'timestamp': time.time()
                    }
                
                return result
                
        except Exception as e:
            logger.error(f"Query optimization failed: {e}")
            raise

# குறியீட்டு பரிந்துரைகள்
RECOMMENDED_INDEXES = [
    # முக்கிய வியாபார குறியீடுகள்
    "CREATE INDEX CONCURRENTLY idx_orders_store_date ON retail.orders (store_id, order_date DESC);",
    "CREATE INDEX CONCURRENTLY idx_order_items_product ON retail.order_items (product_id);",
    "CREATE INDEX CONCURRENTLY idx_customers_store_email ON retail.customers (store_id, email);",
    
    # பகுப்பாய்வு குறியீடுகள்
    "CREATE INDEX CONCURRENTLY idx_orders_date_amount ON retail.orders (order_date, total_amount);",
    "CREATE INDEX CONCURRENTLY idx_products_category_price ON retail.products (category_id, unit_price);",
    
    # வெக்டர் தேடல் மேம்பாடு
    "CREATE INDEX CONCURRENTLY idx_embeddings_vector ON retail.product_description_embeddings USING ivfflat (description_embedding vector_cosine_ops) WITH (lists = 100);",
]
```

### செயலி செயல்திறன்

#### அசிங்கிரோனஸ் நிரலாக்க சிறந்த நடைமுறைகள்

```python
import asyncio
from asyncio import Semaphore
from typing import List, Any

class AsyncOptimizer:
    """Async operation optimization patterns."""
    
    def __init__(self, max_concurrent: int = 10):
        self.semaphore = Semaphore(max_concurrent)
        self.circuit_breaker = CircuitBreaker()
    
    async def batch_process(
        self, 
        items: List[Any], 
        process_func: callable,
        batch_size: int = 100
    ):
        """Process items in optimized batches."""
        
        async def process_batch(batch):
            async with self.semaphore:
                return await asyncio.gather(
                    *[process_func(item) for item in batch],
                    return_exceptions=True
                )
        
        # அமைப்பை மிகுதியாகச் செய்யாத வகையில் தொகுதிகளில் செயலாக்கவும்
        results = []
        for i in range(0, len(items), batch_size):
            batch = items[i:i + batch_size]
            batch_results = await process_batch(batch)
            results.extend(batch_results)
            
            # வள நாசத்தைத் தடுக்கும் வகையில் தொகுதிகளுக்கு இடையில் சிறிய இடைவெளை
            if i + batch_size < len(items):
                await asyncio.sleep(0.1)
        
        return results
    
    @circuit_breaker_decorator
    async def resilient_operation(self, operation: callable, *args, **kwargs):
        """Execute operation with circuit breaker protection."""
        return await operation(*args, **kwargs)

# மின்கரட்டு தடுப்பான் செயல்படுத்தல்
class CircuitBreaker:
    """Circuit breaker for external service calls."""
    
    def __init__(self, failure_threshold: int = 5, recovery_timeout: int = 60):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.failure_count = 0
        self.last_failure_time = None
        self.state = "CLOSED"  # மூடப்பட்டது, திறந்தது, பாதி_திறந்தது
    
    async def call(self, func, *args, **kwargs):
        """Execute function with circuit breaker protection."""
        
        if self.state == "OPEN":
            if time.time() - self.last_failure_time > self.recovery_timeout:
                self.state = "HALF_OPEN"
            else:
                raise Exception("Circuit breaker is OPEN")
        
        try:
            result = await func(*args, **kwargs)
            
            # வெற்றியடைந்ததும் மீட்டமைக்கவும்
            if self.state == "HALF_OPEN":
                self.state = "CLOSED"
                self.failure_count = 0
            
            return result
            
        except Exception as e:
            self.failure_count += 1
            self.last_failure_time = time.time()
            
            if self.failure_count >= self.failure_threshold:
                self.state = "OPEN"
            
            raise
```

### கேச்சிங் திட்டங்கள்

```python
import redis
import pickle
from typing import Union, Optional

class SmartCache:
    """Multi-level caching system."""
    
    def __init__(self, redis_url: Optional[str] = None):
        self.memory_cache = {}
        self.redis_client = redis.Redis.from_url(redis_url) if redis_url else None
        self.max_memory_items = 1000
    
    async def get(self, key: str) -> Optional[Any]:
        """Get from cache with fallback levels."""
        
        # நிலை 1: நினைவக தளிர்ச்சி
        if key in self.memory_cache:
            return self.memory_cache[key]['value']
        
        # நிலை 2: ரெடிஸ் தளிர்ச்சி
        if self.redis_client:
            try:
                cached_data = self.redis_client.get(key)
                if cached_data:
                    value = pickle.loads(cached_data)
                    
                    # நினைவக தளிர்ச்சிக்கு முன்னேற்றவும்
                    self._set_memory_cache(key, value)
                    return value
            except Exception as e:
                logger.warning(f"Redis cache error: {e}")
        
        return None
    
    async def set(
        self, 
        key: str, 
        value: Any, 
        ttl: int = 300,
        cache_level: str = "both"
    ):
        """Set cache value at specified levels."""
        
        if cache_level in ["memory", "both"]:
            self._set_memory_cache(key, value, ttl)
        
        if cache_level in ["redis", "both"] and self.redis_client:
            try:
                self.redis_client.setex(
                    key, 
                    ttl, 
                    pickle.dumps(value)
                )
            except Exception as e:
                logger.warning(f"Redis set error: {e}")
    
    def _set_memory_cache(self, key: str, value: Any, ttl: int = 300):
        """Set value in memory cache with LRU eviction."""
        
        # LRU அகற்றலை அமல்படுத்து
        if len(self.memory_cache) >= self.max_memory_items:
            oldest_key = min(
                self.memory_cache.keys(),
                key=lambda k: self.memory_cache[k]['timestamp']
            )
            del self.memory_cache[oldest_key]
        
        self.memory_cache[key] = {
            'value': value,
            'timestamp': time.time(),
            'ttl': ttl
        }

# தளிர்ச்சி விசை உருவாக்கல்
def generate_cache_key(query: str, user_context: str, params: dict = None) -> str:
    """Generate consistent cache keys."""
    key_components = [
        query.strip().lower(),
        user_context,
        json.dumps(params, sort_keys=True) if params else ""
    ]
    
    key_string = "|".join(key_components)
    return hashlib.sha256(key_string.encode()).hexdigest()
```

## 🔒 பாதுகாப்பு கடுமைப்படுத்தல்

### அங்கீகாரம் மற்றும் அங்கீகாரம் வழங்கல்

```python
from azure.identity import DefaultAzureCredential, ClientSecretCredential
from azure.keyvault.secrets import SecretClient
import jwt
from typing import Dict, List

class SecurityManager:
    """Comprehensive security management."""
    
    def __init__(self):
        self.key_vault_client = self._setup_key_vault()
        self.token_blacklist = set()
        
    def _setup_key_vault(self) -> SecretClient:
        """Initialize Azure Key Vault client."""
        credential = DefaultAzureCredential()
        vault_url = os.getenv("AZURE_KEY_VAULT_URL")
        
        if vault_url:
            return SecretClient(vault_url=vault_url, credential=credential)
        return None
    
    async def validate_request(self, request_headers: Dict[str, str]) -> Dict[str, Any]:
        """Comprehensive request validation."""
        
        # சான்றிதழை எடுக்கவும் மற்றும் சரிபார்க்கவும்
        auth_token = request_headers.get("authorization", "").replace("Bearer ", "")
        if not auth_token:
            raise AuthenticationError("Missing authentication token")
        
        # டோக்கனை சரிபார்க்கவும்
        user_context = await self._validate_token(auth_token)
        
        # வீத வரம்பை சரிபார்க்கவும்
        await self._check_rate_limit(user_context["user_id"])
        
        # RLS பொருளாதாரத்தை சரிபார்க்கவும்
        rls_user_id = request_headers.get("x-rls-user-id")
        if not self._validate_rls_access(user_context, rls_user_id):
            raise AuthorizationError("Invalid RLS context for user")
        
        return {
            "user_id": user_context["user_id"],
            "roles": user_context["roles"],
            "rls_user_id": rls_user_id,
            "permissions": user_context["permissions"]
        }
    
    async def _validate_token(self, token: str) -> Dict[str, Any]:
        """Validate JWT token."""
        
        if token in self.token_blacklist:
            raise AuthenticationError("Token has been revoked")
        
        try:
            # ஐதங்கள் குவையிலிருந்து அல்லது மெமரியில் இருந்து பொதுக்கீதையைப் பெறுக
            public_key = await self._get_public_key()
            
            # டோக்கனை பாகுபடுத்தி சரிபார்க்கவும்
            payload = jwt.decode(
                token, 
                public_key, 
                algorithms=["RS256"],
                audience="mcp-server",
                issuer="zava-auth"
            )
            
            return {
                "user_id": payload["sub"],
                "roles": payload.get("roles", []),
                "permissions": payload.get("permissions", []),
                "expires_at": payload["exp"]
            }
            
        except jwt.InvalidTokenError as e:
            raise AuthenticationError(f"Invalid token: {e}")
    
    def _validate_rls_access(self, user_context: Dict, rls_user_id: str) -> bool:
        """Validate RLS context access."""
        
        # சூப்பர் நிர்வாகிகள் எந்தவொரு பொருளாதாரத்திற்கும் அணுகலாம்
        if "super_admin" in user_context["roles"]:
            return True
        
        # கடை மேலாளர்கள் தங்களுடைய கடைக்கே மட்டும் அணுகலாம்
        if "store_manager" in user_context["roles"]:
            allowed_stores = user_context.get("allowed_stores", [])
            return rls_user_id in allowed_stores
        
        # பிராந்திய மேலாளர்கள் பல கடைகளுக்கு அணுகலாம்
        if "regional_manager" in user_context["roles"]:
            allowed_regions = user_context.get("allowed_regions", [])
            return self._check_store_in_regions(rls_user_id, allowed_regions)
        
        return False

# உள்ளீட்டு சரிபார்ப்பு மற்றும் அலுவலகம் செய்யுதல்
class InputValidator:
    """SQL injection prevention and input validation."""
    
    @staticmethod
    def validate_sql_query(query: str) -> bool:
        """Validate SQL query for safety."""
        
        # தடை செய்யப்பட்ட வடிவங்கள்
        forbidden_patterns = [
            r";\s*(DROP|DELETE|UPDATE|INSERT|ALTER|CREATE)\s+",
            r"--.*",
            r"/\*.*\*/",
            r"xp_cmdshell",
            r"sp_executesql",
            r"EXEC\s*\(",
        ]
        
        query_upper = query.upper()
        
        for pattern in forbidden_patterns:
            if re.search(pattern, query_upper, re.IGNORECASE):
                logger.warning(f"Blocked potentially dangerous query: {pattern}")
                return False
        
        # SELECT அறிக்கைகளையே அனுமதி கொள்ளவும்
        if not query_upper.strip().startswith("SELECT"):
            return False
        
        return True
    
    @staticmethod
    def sanitize_table_name(table_name: str) -> str:
        """Sanitize table name input."""
        
        # எழுத்து எண்கள், கீழ்க்கோடு மற்றும் புள்ளியை மட்டும் அனுமதி செய்யவும்
        if not re.match(r"^[a-zA-Z0-9_.]+$", table_name):
            raise ValueError("Invalid table name format")
        
        # அனுமதிக்கப்பட்ட அட்டவணைகளுக்கு எதிராக சரிபார்க்கவும்
        if table_name not in VALID_TABLES:
            raise ValueError(f"Table {table_name} not allowed")
        
        return table_name
```

### தரவு பாதுகாப்பு

```python
from cryptography.fernet import Fernet
import hashlib

class DataProtection:
    """Data encryption and protection utilities."""
    
    def __init__(self):
        self.encryption_key = self._get_encryption_key()
        self.cipher_suite = Fernet(self.encryption_key)
    
    def _get_encryption_key(self) -> bytes:
        """Get encryption key from secure storage."""
        
        # தயாரிப்பில், Azure முக்கியக் கேள்வகத்தில் இருந்து பெறுக
        key_vault_secret = os.getenv("ENCRYPTION_KEY_SECRET_NAME")
        if key_vault_secret and self.key_vault_client:
            secret = self.key_vault_client.get_secret(key_vault_secret)
            return secret.value.encode()
        
        # வளர்ச்சிக்கான மாற்று வழி (தயாரிப்பிற்கல்ல!)
        dev_key = os.getenv("DEV_ENCRYPTION_KEY")
        if dev_key:
            return dev_key.encode()
        
        raise ValueError("No encryption key available")
    
    def encrypt_sensitive_data(self, data: str) -> str:
        """Encrypt sensitive data."""
        return self.cipher_suite.encrypt(data.encode()).decode()
    
    def decrypt_sensitive_data(self, encrypted_data: str) -> str:
        """Decrypt sensitive data."""
        return self.cipher_suite.decrypt(encrypted_data.encode()).decode()
    
    @staticmethod
    def hash_password(password: str, salt: str = None) -> tuple:
        """Hash password with salt."""
        if not salt:
            salt = os.urandom(32).hex()
        
        password_hash = hashlib.pbkdf2_hmac(
            'sha256',
            password.encode(),
            salt.encode(),
            100000  # முறைமைகள்
        ).hex()
        
        return password_hash, salt
    
    @staticmethod
    def mask_sensitive_logs(log_data: dict) -> dict:
        """Mask sensitive information in logs."""
        
        sensitive_fields = [
            'password', 'token', 'secret', 'key', 'authorization',
            'x-api-key', 'client_secret', 'connection_string'
        ]
        
        masked_data = log_data.copy()
        
        for field in sensitive_fields:
            if field in masked_data:
                value = str(masked_data[field])
                if len(value) > 4:
                    masked_data[field] = value[:2] + "*" * (len(value) - 4) + value[-2:]
                else:
                    masked_data[field] = "***"
        
        return masked_data
```

## 📊 உற்பத்தி பரப்பல் வழிகாட்டுதல்கள்

### இணைப்புடன் கட்டமைப்பு (Infrastructure as Code)

```yaml
# azure-pipelines.yml
trigger:
  branches:
    include:
      - main
      - release/*

variables:
  - group: mcp-server-secrets
  - name: imageRepository
    value: 'zava-mcp-server'
  - name: containerRegistry
    value: 'zavamcpregistry.azurecr.io'

stages:
- stage: Build
  displayName: Build and Test
  jobs:
  - job: Build
    displayName: Build
    pool:
      vmImage: ubuntu-latest
    
    steps:
    - task: UsePythonVersion@0
      inputs:
        versionSpec: '3.11'
        displayName: 'Use Python 3.11'
    
    - script: |
        python -m pip install --upgrade pip
        pip install -r requirements.lock.txt
        pip install pytest pytest-cov
      displayName: 'Install dependencies'
    
    - script: |
        pytest tests/ --cov=mcp_server --cov-report=xml
      displayName: 'Run tests with coverage'
    
    - task: PublishCodeCoverageResults@1
      inputs:
        codeCoverageTool: Cobertura
        summaryFileLocation: 'coverage.xml'
    
    - task: Docker@2
      displayName: Build Docker image
      inputs:
        command: build
        repository: $(imageRepository)
        dockerfile: Dockerfile
        tags: |
          $(Build.BuildId)
          latest

- stage: Deploy
  displayName: Deploy to Production
  dependsOn: Build
  condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
  
  jobs:
  - deployment: DeployProduction
    displayName: Deploy to Production
    environment: 'production'
    pool:
      vmImage: ubuntu-latest
    
    strategy:
      runOnce:
        deploy:
          steps:
          - task: AzureContainerApps@1
            inputs:
              azureSubscription: $(azureServiceConnection)
              containerAppName: 'zava-mcp-server'
              resourceGroup: '$(resourceGroupName)'
              imageToDeploy: '$(containerRegistry)/$(imageRepository):$(Build.BuildId)'
```

### கட்ட容器 செயல்திறன் மேம்பாடு

```dockerfile
# Multi-stage Dockerfile for production
FROM python:3.11-slim as builder

# Install build dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Create virtual environment
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Copy requirements and install Python dependencies
COPY requirements.lock.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.lock.txt

# Production stage
FROM python:3.11-slim as production

# Create non-root user
RUN groupadd -r mcpserver && useradd -r -g mcpserver mcpserver

# Copy virtual environment from builder
COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Set working directory
WORKDIR /app

# Copy application code
COPY mcp_server/ ./mcp_server/
COPY --chown=mcpserver:mcpserver . .

# Set security configurations
RUN chmod -R 755 /app && \
    chown -R mcpserver:mcpserver /app

# Switch to non-root user
USER mcpserver

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Expose port
EXPOSE 8000

# Start application
CMD ["python", "-m", "mcp_server.sales_analysis"]
```

### சூழல் கட்டமைப்பு

```python
# தயாரிப்பு அமைப்பு மேலாண்மை
class ProductionConfig:
    """Production-specific configuration."""
    
    def __init__(self):
        self.validate_production_requirements()
        self.setup_logging()
        self.configure_security()
    
    def validate_production_requirements(self):
        """Validate all required production settings."""
        
        required_settings = [
            "AZURE_CLIENT_ID",
            "AZURE_CLIENT_SECRET", 
            "AZURE_TENANT_ID",
            "PROJECT_ENDPOINT",
            "AZURE_OPENAI_ENDPOINT",
            "POSTGRES_HOST",
            "POSTGRES_PASSWORD",
            "APPLICATIONINSIGHTS_CONNECTION_STRING"
        ]
        
        missing_settings = [
            setting for setting in required_settings 
            if not os.getenv(setting)
        ]
        
        if missing_settings:
            raise EnvironmentError(
                f"Missing required production settings: {missing_settings}"
            )
    
    def setup_logging(self):
        """Configure production logging."""
        
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            handlers=[
                logging.StreamHandler(sys.stdout),
                logging.handlers.RotatingFileHandler(
                    '/var/log/mcp-server.log',
                    maxBytes=50*1024*1024,  # 50MB
                    backupCount=5
                )
            ]
        )
        
        # மூன்றாம் தரப்பு பதிவாளர்களை எச்சரிக்கை நிலைக்கு அமைக்கவும்
        logging.getLogger('azure').setLevel(logging.WARNING)
        logging.getLogger('urllib3').setLevel(logging.WARNING)
    
    def configure_security(self):
        """Configure production security settings."""
        
        # டீபக் மோட்டை முடக்கு
        os.environ['DEBUG'] = 'False'
        
        # பாதுகாப்பான தலைப்புகளை அமைக்கவும்
        os.environ['SECURE_SSL_REDIRECT'] = 'True'
        os.environ['SECURE_HSTS_SECONDS'] = '31536000'
        os.environ['SECURE_CONTENT_TYPE_NOSNIFF'] = 'True'
        os.environ['SECURE_BROWSER_XSS_FILTER'] = 'True'
```

## 💰 செலவு மேம்பாடு

### வளங்கள் மேலாண்மை

```python
class CostOptimizer:
    """Cost optimization strategies."""
    
    def __init__(self):
        self.metrics_collector = MetricsCollector()
        self.auto_scaler = AutoScaler()
    
    async def optimize_database_connections(self):
        """Dynamically adjust connection pool based on load."""
        
        current_load = await self.metrics_collector.get_current_load()
        
        if current_load < 0.3:  # குறைந்த பாரம்
            target_pool_size = max(2, int(current_load * 10))
        elif current_load < 0.7:  # நடுத்தர பாரம்
            target_pool_size = max(5, int(current_load * 15))
        else:  # அதிக பாரம்
            target_pool_size = min(20, int(current_load * 25))
        
        await db_provider.adjust_pool_size(target_pool_size)
        
        logger.info(f"Adjusted pool size to {target_pool_size} for load {current_load}")
    
    async def implement_smart_caching(self):
        """Implement intelligent caching to reduce compute costs."""
        
        # கேப் விலை உயர் செயலாக்கங்கள்
        expensive_queries = await self.identify_expensive_queries()
        
        for query in expensive_queries:
            cache_key = self.generate_cache_key(query)
            ttl = self.calculate_optimal_ttl(query)
            
            await smart_cache.set(cache_key, None, ttl=ttl)
    
    def calculate_azure_costs(self) -> Dict[str, float]:
        """Calculate estimated Azure resource costs."""
        
        return {
            "container_apps": self.estimate_container_costs(),
            "postgresql": self.estimate_database_costs(),
            "openai": self.estimate_ai_costs(),
            "application_insights": self.estimate_monitoring_costs(),
            "storage": self.estimate_storage_costs()
        }

# தானியங்கி விருத்தி அமைப்பு
class AutoScaler:
    """Automatic scaling based on metrics."""
    
    async def scale_decision(self) -> str:
        """Determine scaling action based on metrics."""
        
        metrics = await self.collect_scaling_metrics()
        
        # CPU அடிப்படையிலான விருத்தி
        if metrics['cpu_usage'] > 80:
            return "scale_up"
        elif metrics['cpu_usage'] < 20 and metrics['instance_count'] > 1:
            return "scale_down"
        
        # நினைவக அடிப்படையிலான விருத்தி
        if metrics['memory_usage'] > 85:
            return "scale_up"
        
        # கோரிக்கை வரிசை விருத்தி
        if metrics['queue_length'] > 100:
            return "scale_up"
        elif metrics['queue_length'] < 10 and metrics['instance_count'] > 1:
            return "scale_down"
        
        return "no_action"
```

## 🔧 பராமரிப்பு மற்றும் இயக்கம்

### ஆரோக்கியம் கண்காணிப்பு

```python
class OperationalHealth:
    """Comprehensive operational health monitoring."""
    
    def __init__(self):
        self.alert_manager = AlertManager()
        self.health_checks = {}
        
    async def comprehensive_health_check(self) -> Dict[str, Any]:
        """Perform comprehensive system health check."""
        
        health_report = {
            "timestamp": datetime.utcnow().isoformat(),
            "overall_status": "healthy",
            "components": {}
        }
        
        # தரவுத்தள சுகாதாரம்
        db_health = await self.check_database_health()
        health_report["components"]["database"] = db_health
        
        # வெளியூரி சேவைகள் சுகாதாரம்
        ai_health = await self.check_ai_service_health()
        health_report["components"]["ai_service"] = ai_health
        
        # அமைப்பு வளங்கள்
        system_health = await self.check_system_resources()
        health_report["components"]["system"] = system_health
        
        # செயலியை அளவுகோல்கள்
        app_health = await self.check_application_health()
        health_report["components"]["application"] = app_health
        
        # ஒட்டுமொத்த நிலையை தீர்மானிக்கவும்
        failed_components = [
            name for name, status in health_report["components"].items()
            if status.get("status") != "healthy"
        ]
        
        if failed_components:
            health_report["overall_status"] = "unhealthy"
            health_report["failed_components"] = failed_components
            
            # எர்ட்கள் சுட்டிக்காட்டவும்
            await self.alert_manager.send_alert(
                severity="high",
                message=f"Health check failed for: {failed_components}",
                details=health_report
            )
        
        return health_report
    
    async def check_database_health(self) -> Dict[str, Any]:
        """Check database connectivity and performance."""
        
        try:
            start_time = time.time()
            
            async with db_provider.get_connection() as conn:
                # அடிப்படை இணைப்பு
                await conn.fetchval("SELECT 1")
                
                # மெதுவாக இயங்கும் கேள்விகளை சரிபார்க்கவும்
                slow_queries = await conn.fetch("""
                    SELECT query, mean_exec_time, calls 
                    FROM pg_stat_statements 
                    WHERE mean_exec_time > 1000 
                    ORDER BY mean_exec_time DESC 
                    LIMIT 5
                """)
                
                # இணைப்பு எண்ணிக்கையை சரிபார்க்கவும்
                connection_count = await conn.fetchval("""
                    SELECT count(*) FROM pg_stat_activity 
                    WHERE state = 'active'
                """)
                
                response_time = time.time() - start_time
                
                return {
                    "status": "healthy",
                    "response_time_ms": response_time * 1000,
                    "active_connections": connection_count,
                    "slow_queries_count": len(slow_queries),
                    "pool_size": db_provider.connection_pool.get_size()
                }
                
        except Exception as e:
            return {
                "status": "unhealthy",
                "error": str(e),
                "last_check": datetime.utcnow().isoformat()
            }

# தான்மையான காப்புப்பிரதி மற்றும் மீட்பு
class BackupManager:
    """Database backup and recovery management."""
    
    async def create_backup(self, backup_type: str = "full") -> str:
        """Create database backup."""
        
        timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
        backup_name = f"zava_backup_{backup_type}_{timestamp}"
        
        if backup_type == "full":
            await self.create_full_backup(backup_name)
        elif backup_type == "incremental":
            await self.create_incremental_backup(backup_name)
        
        # அசுரு பிளாப் சேமிப்பிடம் பதிவேற்றவும்
        await self.upload_backup_to_azure(backup_name)
        
        return backup_name
    
    async def schedule_automated_backups(self):
        """Schedule regular automated backups."""
        
        # தினசரி முழு காப்புப்பிரதி 2 மணி காலை யூடிசி
        schedule.every().day.at("02:00").do(
            lambda: asyncio.create_task(self.create_backup("full"))
        )
        
        # மணிக்கு முறையாக கூட்டு காப்புப்பிரதிகள்
        schedule.every().hour.do(
            lambda: asyncio.create_task(self.create_backup("incremental"))
        )
```

## 🌍 சமூக பங்களிப்புகள்

### திறந்த மூல சிறந்த நடைமுறைகள்

```markdown
# Contributing to MCP Database Integration

## Development Guidelines

### Code Quality Standards
- Follow PEP 8 for Python code style
- Maintain test coverage above 90%
- Use type hints throughout the codebase
- Write comprehensive docstrings

### Testing Requirements
- Unit tests for all new functionality
- Integration tests for database operations
- Performance benchmarks for critical paths
- Security tests for authentication/authorization

### Documentation Standards
- Update README.md for any new features
- Add inline code documentation
- Create examples for new tools or patterns
- Maintain API documentation

## Security Considerations

### Reporting Security Issues
- Report security vulnerabilities privately
- Use encrypted communication channels
- Provide detailed reproduction steps
- Include potential impact assessment

### Security Review Process
- All PRs undergo security review
- Static analysis tools required to pass
- Dependency vulnerability scanning
- Manual security testing for critical changes
```

### சமூக ஈடுபாடு

```python
class CommunityContributor:
    """Tools for community engagement and contribution."""
    
    @staticmethod
    def generate_contribution_guide():
        """Generate personalized contribution guide."""
        
        return {
            "getting_started": {
                "setup": "Follow setup guide in Lab 03",
                "first_contribution": "Start with documentation improvements",
                "testing": "Run full test suite before submitting PR"
            },
            
            "contribution_areas": {
                "documentation": "Improve learning labs and examples",
                "testing": "Add test cases and improve coverage",
                "features": "Implement new MCP tools and capabilities",
                "performance": "Optimize queries and caching",
                "security": "Enhance security measures and validation"
            },
            
            "community_resources": {
                "discord": "https://discord.com/invite/ByRwuEEgH4",
                "discussions": "GitHub Discussions for Q&A",
                "issues": "GitHub Issues for bug reports",
                "examples": "Share your implementation examples"
            }
        }
    
    @staticmethod
    def validate_contribution(pr_data: Dict) -> Dict[str, bool]:
        """Validate contribution meets standards."""
        
        return {
            "has_tests": "test" in pr_data.get("files_changed", []),
            "has_documentation": "README" in str(pr_data.get("files_changed", [])),
            "follows_conventions": True,  # உண்மையான பரிசோதனைகளை அமல்படுத்துவார்
            "security_reviewed": pr_data.get("security_review", False),
            "performance_tested": pr_data.get("benchmark_results", False)
        }
```

## 🎯 முக்கிய சிறப்பம்சங்கள்

இந்த விரிவான கற்றல் பாதையை முடித்த பிறகு, நீங்கள் கற்றுகொண்டிருப்பீர்கள்:

✅ **செயல்திறன் மேம்பாடு**: தரவுத்தள முனையமைப்பு, அசிங்க்ரோன் மாதிரிகள் மற்றும் கேச்சிங் திட்டங்கள்  
✅ **பாதுகாப்பு கடுமைப்படுத்தல்**: அங்கீகாரம், அங்கீகாரம் வழங்கல் மற்றும் தரவு பாதுகாப்பு  
✅ **உற்பத்தி பரப்பல்**: இணைப்புடன் கட்டமைப்பு மற்றும் கட்ட容器 செயல்திறன் மேம்பாடு  
✅ **செலவு மேலாண்மை**: வள மேம்பாடு மற்றும் புத்திசாலி அளவிடல்  
✅ **செயல்பாட்டு சிறப்பமைவு**: கண்காணிப்பு, பராமரிப்பு மற்றும் தானாக செயலாக்கம்  
✅ **சமூக ஈடுபாடு**: MCP சூழலுக்கு பங்களிப்பு  

## 🏆 சான்றிதழ் மற்றும் அடுத்த படிகள்

### நடைமுறை மதிப்பீடு

உங்கள் திறமையை காட்ட இந்த இறுதி திட்டத்தை முடிக்கவும்:

**உற்பத்தி-தயார் MCP சர்வர் கட்டவும்** இது கீழ்க்காணும் அம்சங்களை கொண்டுள்ளது:  
- [ ] RLS உடன் பல-வாடிக்கையாளர் சில்லறை பகுப்பு  
- [ ] Azure OpenAI உடன் கருத்துப்படுத்தல் தேடல்  
- [ ] விரிவான பாதுகாப்பு நடைமுறைகள்  
- [ ] Azure உற்பத்தி பரப்பல்  
- [ ] கண்காணிப்பு மற்றும் உத்தரவாத அமைப்பு  
- [ ] ஆவணப்படுத்தல் மற்றும் சோதனை

### மேம்பட்ட கற்றல் பாதைகள்

உங்கள் MCP பயணத்தை தொடருங்கள்:

- **MCP கட்டமைப்பு மாதிரிகள்**: மேம்பட்ட சர்வர் கட்டமைப்புகள்  
- **பல மாதிரி ஒருங்கிணைப்பு**: பல்வேறு AI மாதிரிகளை ஒருங்கிணைத்தல்  
- **நிறுவன அளவு**: பெரிய அளவிலான MCP பயன்பாடுகள்  
- **தனிப்பயன் கருவி மேம்பாடு**: சிறப்பு MCP கருவிகள் கட்டமைத்தல்  
- **MCP சூழல்**: பரந்த சமூகத்திற்கான பங்களிப்பு

### சமூக அங்கீகாரம்

உங்கள் சாதனையை பகிரவும்:  
- **GitHub போர்ட்ஃபோலியோ**: உங்கள் நடைமுறையை வெளிப்படுத்தவும்  
- **சமூக பங்களிப்புகள்**: மேம்பாடுகள் அல்லது எடுத்துக்காட்டுகளை சமர்ப்பிக்கவும்  
- **மொழியமைப்பு வாய்ப்புகள்**: சந்திப்புகள் அல்லது மாநாடுகளில் வழங்கவும்  
- **அறிவுரை வழங்குதல்**: பிற டெவலப்பர்களுக்கு MCP கற்றுக்கொடுக்கும் உதவி  

## 📚 கூடுதல் ஆதாரங்கள்

### மேம்பட்ட தலைப்புகள்
- [PostgreSQL Performance Tuning](https://www.postgresql.org/docs/current/performance-tips.html) - தரவுத்தள மேம்பாடு  
- [Azure Container Apps Best Practices](https://docs.microsoft.com/azure/container-apps/overview) - உற்பத்தி பரப்புதல்  
- [Python Async Best Practices](https://docs.python.org/3/library/asyncio-dev.html) - அசிங்கிரோனஸ் நிரலாக்கம்  

### பாதுகாப்பு ஆதாரங்கள்
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - பாதுகாப்பு பலவீனங்கள்  
- [Azure Security Best Practices](https://docs.microsoft.com/azure/security/) - மேघக் பாதுகாப்பு  
- [Python Security Guidelines](https://python.org/dev/security/) - பாதுகாப்பான நிரலாக்கம்  

### சமூக
- [MCP Community Discord](https://discord.com/invite/ByRwuEEgH4) - நேரடி கலந்துரையாடல்கள்  
- [GitHub Discussions](https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail/discussions) - கேள்வி & பதில் மற்றும் பகிர்வு  
- [Stack Overflow](https://stackoverflow.com/questions/tagged/model-context-protocol) - தொழில்நுட்ப கேள்விகள்  

---

**🎉 வாழ்த்துக்கள்!** நீங்கள் விரிவான MCP தரவுத்தள ஒருங்கிணைப்பு கற்றல் பாதையை முடித்துவிட்டீர்கள். இப்போது நீங்கள் உண்மையான உலக தரவுத் திட்டங்களுடன் AI உதவியாளர்களை இணைக்கும் உற்பத்தி-தயார் MCP சர்வர்களை கட்டுவதற்கான அறிவு மற்றும் திறமைகள் பெற்றுள்ளீர்கள்.

**பங்களிக்க தயாரா?** எமது சமூகத்துடன் சேர்ந்து மற்றவர்களுக்கும் MCP கற்றுக்கொள்ள உதவுங்கள், உங்கள் அனுபவங்களை பகிர்ந்து, குறியீடு மேம்பாடுகள் செய்யவும் அல்லது கூடுதல் கற்றல் ஆதாரங்கள் உருவாக்கவும்.

**அடுத்து**: [Tooling](../../12-tooling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**மறுப்பு**:
இந்த ஆவணம் AI மொழிபெயர்ப்பு சேவை [Co-op Translator](https://github.com/Azure/co-op-translator) பயன்படுத்தி மொழிபெயர்க்கப்பட்டுள்ளது. நாங்கள் துல்லியத்திற்காக முயற்சி செய்துள்ளோம், ஆனால் தானாக செய்யப்படும் மொழிபெயர்ப்புகளில் பிழைகள் அல்லது தவறுகள் இருக்கலாம் என்பதை கவனத்தில் கொள்ளவும். அசல் ஆவணம் அதன் தாய்மொழியில் அதிகாரப்பூர்வ ஆதாரமாக கருதப்பட வேண்டும். முக்கியமான தகவல்களுக்கு, தொழில்நுட்பமான மனித மொழிபெயர்ப்பு பரிந்துரைக்கப்படுகிறது. இந்த மொழிபெயர்ப்பைப் பயன்படுத்துவதால் ஏற்படும் எந்த தவறான புரிதல்கள் அல்லது தவறான விளக்கத்திற்கும் நாங்கள் பொறுப்பில்வில்லை.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->