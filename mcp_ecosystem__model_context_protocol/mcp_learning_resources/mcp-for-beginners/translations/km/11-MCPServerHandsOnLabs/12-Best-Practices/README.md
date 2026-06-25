# ប្រតិបត្តិដ៏ល្អបំផុត និងការបង្កើតអូPTIMIZATION

## 🎯 ធ្វើយ៉ាងដូចម្តេចក្នុងមន្ទីរពិសោធន៍នេះ

មន្ទីរពិសោធន៍ capstone នេះ ប្រមូលផ្តុំប្រតិបត្តិដ៏ល្អបំផុត ថ្នាក់វិជ្ជាជីវៈអូPTIMIZATION និងមគ្គុទេសក៍ផលិតកម្មសម្រាប់ការច្នៃម៉ាស៊ីន MCP ដែលរឹងមាំ អាចពង្រីក និងមានសុវត្ថិភាពជាមួយការតភ្ជាប់មូលដ្ឋានទិន្នន័យ។ អ្នកនឹងរៀនពីបទពិសោធន៍ពិត និងមូលដ្ឋានឧស្សាហកម្មដើម្បីធ្វើឱ្យការអនុវត្តរបស់អ្នកមានស្រាប់សម្រាប់ការផលិត។

## ទិដ្ឋភាពទូទៅ

ការច្នៃម៉ាស៊ីន MCP ដ៏ជោគជ័យ មិនមែនគ្រាន់តែធ្វើឱ្យកូដដំណើរការបានទេ។ មន្ទីរពិសោធន៍នេះគ្របដណ្តប់ពីអនុស្សាវរីយ៍សំខាន់ៗដែលបំបែកការអនុវត្តប្រាប់វិជ្ជាជីវៈពីប្រព័ន្ធផលិតកម្មដែលអាចពង្រីក ប្រតិបត្តិត្រូយជាក់លាក់ និងថែរក្សាមាត្រាសុវត្ថិភាព។

អនុស្សាវរីយ៍ល្អៗទាំងនេះចេញពីការចាក់ផ្តើមក្នុងពិភពពិត ការវាយតម្លៃសហគមន៍ និងមេរៀនដែលបានស្គាល់ពីការអនុវត្តរបស់សហគ្រាស។

## គោលបំណងសិក្សា

នៅចុងបញ្ចប់នៃមន្ទីរពិសោធន៍នេះ អ្នកនឹងអាច៖

- **អនុវត្ត** បច្ចេកទេសអូPTIMIZATIONសមត្ថភាពសម្រាប់ម៉ាស៊ីន MCP និងមូលដ្ឋានទិន្នន័យ  
- **អនុវត្ត** វិធានការសុវត្ថិភាពគ្រប់គ្រាន់  
- **រចនា** លំនាំសំណង់អាចពង្រីកសម្រាប់បរិយាកាសផលិតកម្ម  
- **បង្កើត** វិធានការត្រួតពិនិត្យ ថែទាំ និងប្រតិបត្តិការណ៍  
- **បង្កើនប្រសិទ្ធភាពថ្លៃកំរិត ខណៈដែលថែរក្សាសមត្ថភាព និងការជឿទុកចិត្ត  
- **ចូលរួម** ក្នុងសហគមន៍ MCP និងប្រព័ន្ធអេកូស៊ីស្ទែម

## 🚀 អូPTIMIZATIONសមត្ថភាព

### សមត្ថភាពមូលដ្ឋានទិន្នន័យ

#### ការជួសជុលតុល្យភាពបំណក់ភ្ជាប់

```python
# កំណត់រចនាសម្ព័ន្ធហូលភ្ជាប់បានអុបទីម៉ាស់
POOL_CONFIG = {
    # កំណត់ទំហំ
    "min_size": max(2, cpu_count()),           # មានយ៉ាងតិច 2, ប្រែប្រួលគ្នាជាមួយ CPU
    "max_size": min(20, cpu_count() * 4),     # កំណត់ខ្ពស់បរិមាណសមរម្យ
    
    # កំណត់ពេលវេលា
    "max_inactive_connection_lifetime": 300,   # 5 នាទី
    "command_timeout": 30,                     # 30 វិនាទី
    "max_queries": 50000,                      # បង្វិលភ្ជាប់
    
    # ការកំណត់ PostgreSQL
    "server_settings": {
        "application_name": "mcp-server-prod",
        "jit": "off",                          # អត់ដំណើរការសម្រាប់ការស្របគ្នា
        "work_mem": "8MB",                     # អុបទីម៉ាស់សម្រាប់ការសួរទិន្នន័យ
        "shared_preload_libraries": "pg_stat_statements",
        "log_statement": "mod",                # កំណត់តែការផ្លាស់ប្តូរ
        "log_min_duration_statement": "1s",   # កំណត់សម្រាប់សំណួរជ្រុល
    }
}
```

#### លំនាំអូPTIMIZATIONសំណួរ

```python
class QueryOptimizer:
    """Database query optimization utilities."""
    
    def __init__(self):
        self.query_cache = {}
        self.slow_query_threshold = 1.0  # វិនាទី
        
    async def execute_optimized_query(
        self, 
        query: str, 
        params: tuple = None,
        cache_key: str = None,
        cache_ttl: int = 300
    ):
        """Execute query with optimization and caching."""
        
        # ពិនិត្យផ្ទុកគ្រាប់ដំបូង
        if cache_key and cache_key in self.query_cache:
            cache_entry = self.query_cache[cache_key]
            if time.time() - cache_entry['timestamp'] < cache_ttl:
                return cache_entry['result']
        
        # ប្រតិបត្ដិដោយត្រួតពិនិត្យ
        start_time = time.time()
        
        try:
            async with db_provider.get_connection() as conn:
                # ជំរុញការប្រតិបត្ដិការសំណួរ
                await conn.execute("SET enable_seqscan = off")  # ច្រើនចំណូលចិត្តតារាងដាក់សូចិន
                await conn.execute("SET work_mem = '16MB'")     # ចំនួនមេម៉ូរីបន្ថែមសម្រាប់សំណួរនេះ
                
                result = await conn.fetch(query, *params if params else ())
                
                duration = time.time() - start_time
                
                # កត់ត្រាសំណួរមិនលឿន
                if duration > self.slow_query_threshold:
                    logger.warning(f"Slow query detected: {duration:.2f}s", extra={
                        "query": query[:200],
                        "duration": duration,
                        "params_count": len(params) if params else 0
                    })
                
                # ផ្ទុកលទ្ធផលដែលជោគជ័យ
                if cache_key and len(result) < 1000:  # មិនផ្ទុកលទ្ធផលធំបំផុត
                    self.query_cache[cache_key] = {
                        'result': result,
                        'timestamp': time.time()
                    }
                
                return result
                
        except Exception as e:
            logger.error(f"Query optimization failed: {e}")
            raise

# ការផ្តល់អនុសាសន៍សូចិន
RECOMMENDED_INDEXES = [
    # តារាងដាក់សូចិនអាជីវកម្មសំខាន់
    "CREATE INDEX CONCURRENTLY idx_orders_store_date ON retail.orders (store_id, order_date DESC);",
    "CREATE INDEX CONCURRENTLY idx_order_items_product ON retail.order_items (product_id);",
    "CREATE INDEX CONCURRENTLY idx_customers_store_email ON retail.customers (store_id, email);",
    
    # តារាងដាក់សូចិនវិភាគ
    "CREATE INDEX CONCURRENTLY idx_orders_date_amount ON retail.orders (order_date, total_amount);",
    "CREATE INDEX CONCURRENTLY idx_products_category_price ON retail.products (category_id, unit_price);",
    
    # ជំរុញស្វែងរកវ៉ෙක්ទ័រ
    "CREATE INDEX CONCURRENTLY idx_embeddings_vector ON retail.product_description_embeddings USING ivfflat (description_embedding vector_cosine_ops) WITH (lists = 100);",
]
```

### សមត្ថភាពកម្មវិធី

#### ប្រតិបត្តិការសមាសភាពអាស៊ីនក្រោមលក្ខណៈល្អបំផុត

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
        
        # ដំណើរការជាក្រុមដើម្បីជៀសវាងការប៉ះពាល់ដល់ប្រព័ន្ធ
        results = []
        for i in range(0, len(items), batch_size):
            batch = items[i:i + batch_size]
            batch_results = await process_batch(batch)
            results.extend(batch_results)
            
            # ពន្យារពេលតូចៗរវាងក្រុមដើម្បីទប់ស្កាត់ការបញ្ចេញធនធាន
            if i + batch_size < len(items):
                await asyncio.sleep(0.1)
        
        return results
    
    @circuit_breaker_decorator
    async def resilient_operation(self, operation: callable, *args, **kwargs):
        """Execute operation with circuit breaker protection."""
        return await operation(*args, **kwargs)

# ការអនុវត្តម៉ាស៊ីនបិទសៀគ្វី
class CircuitBreaker:
    """Circuit breaker for external service calls."""
    
    def __init__(self, failure_threshold: int = 5, recovery_timeout: int = 60):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.failure_count = 0
        self.last_failure_time = None
        self.state = "CLOSED"  # បិទ, បើក, ពាក់កណ្តាលបើក
    
    async def call(self, func, *args, **kwargs):
        """Execute function with circuit breaker protection."""
        
        if self.state == "OPEN":
            if time.time() - self.last_failure_time > self.recovery_timeout:
                self.state = "HALF_OPEN"
            else:
                raise Exception("Circuit breaker is OPEN")
        
        try:
            result = await func(*args, **kwargs)
            
            # កម្ចាត់សាកល្បងនៅពេលជោគជ័យ
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

### យុទ្ធសាស្ត្រការទុកទុក

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
        
        # ជាន់ទី 1៖ កម្រិតចាំបាច់អង្គចងចាំ
        if key in self.memory_cache:
            return self.memory_cache[key]['value']
        
        # ជាន់ទី 2៖ កម្រិតចាំបាច់ Redis
        if self.redis_client:
            try:
                cached_data = self.redis_client.get(key)
                if cached_data:
                    value = pickle.loads(cached_data)
                    
                    # បង្កើតជ័រកម្រិតចាំអង្គចងចាំ
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
        
        # អនុវត្តការដកចេញ LRU
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

# ការបង្កើតកូនសោសម្រាប់កម្រិតចាំ
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

## 🔒 ការកែលម្អសុវត្ថិភាព

### ការផ្ទៀងផ្ទាត់ និងការអនុញ្ញាត

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
        
        # ដកចេញ និងផ្ទៀងផ្ទាត់ការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ
        auth_token = request_headers.get("authorization", "").replace("Bearer ", "")
        if not auth_token:
            raise AuthenticationError("Missing authentication token")
        
        # ផ្ទៀងផ្ទាត់ token
        user_context = await self._validate_token(auth_token)
        
        # ពិនិត្យការកំណត់អត្រា
        await self._check_rate_limit(user_context["user_id"])
        
        # ផ្ទៀងផ្ទាត់បរិបទ RLS
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
            # ទទួលយក key សាធារណៈពី Key Vault ឬ cache
            public_key = await self._get_public_key()
            
            # ដកកូដ និងផ្ទៀងផ្ទាត់ token
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
        
        # អ្នកគ្រប់គ្រងសូប៊ឺអាចចូលប្រើបរិបទណាមួយក៏បាន
        if "super_admin" in user_context["roles"]:
            return True
        
        # អ្នកគ្រប់គ្រងហាងអាចចូលប្រើតែហាងរបស់ខ្លួនតែម្ដង
        if "store_manager" in user_context["roles"]:
            allowed_stores = user_context.get("allowed_stores", [])
            return rls_user_id in allowed_stores
        
        # អ្នកគ្រប់គ្រងតំបន់អាចចូលប្រើហាងជាច្រើន
        if "regional_manager" in user_context["roles"]:
            allowed_regions = user_context.get("allowed_regions", [])
            return self._check_store_in_regions(rls_user_id, allowed_regions)
        
        return False

# ផ្ទៀងផ្ទាត់បញ្ចូល និងការសម្អាត
class InputValidator:
    """SQL injection prevention and input validation."""
    
    @staticmethod
    def validate_sql_query(query: str) -> bool:
        """Validate SQL query for safety."""
        
        # លំនាំដែលហាមឃាត់
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
        
        # អនុញ្ញាតបានតែពាក្យ SELECT ប៉ុណ្ណោះ
        if not query_upper.strip().startswith("SELECT"):
            return False
        
        return True
    
    @staticmethod
    def sanitize_table_name(table_name: str) -> str:
        """Sanitize table name input."""
        
        # អនុញ្ញាតបានតែអក្សរលេខ ខ្សែអង្កស និងចំណុច
        if not re.match(r"^[a-zA-Z0-9_.]+$", table_name):
            raise ValueError("Invalid table name format")
        
        # ផ្ទៀងផ្ទាត់ប្រឆាំងតារាងដែលបានអនុញ្ញាត
        if table_name not in VALID_TABLES:
            raise ValueError(f"Table {table_name} not allowed")
        
        return table_name
```

### ការការពារទិន្នន័យ

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
        
        # នៅក្នុងការផលិត បង្រួមពី Azure Key Vault
        key_vault_secret = os.getenv("ENCRYPTION_KEY_SECRET_NAME")
        if key_vault_secret and self.key_vault_client:
            secret = self.key_vault_client.get_secret(key_vault_secret)
            return secret.value.encode()
        
        # ជម្រើសបន្ថែមសម្រាប់ការអភិវឌ្ឍ (មិនសម្រាប់ការផលិតទេ!)
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
            100000  # ការធ្វើអាប់ដេតជាប់ៗ
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

## 📊 មគ្គុទេសក៍ការដាក់បញ្ចូលផលិតកម្ម

### រចនាសម្ព័ន្ធជាកូដ

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

### អូPTIMIZATIONកុងតឺន័រ

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

### ការកំណត់បរិយាកាស

```python
# ការគ្រប់គ្រងការកំណត់រចនាសម្ព័ន្ធផលិតកម្ម
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
        
        # កំណត់អ្នកកត់ត្រាទីបីទៅជាព្រឹតិ្តការណ៍ WARNING
        logging.getLogger('azure').setLevel(logging.WARNING)
        logging.getLogger('urllib3').setLevel(logging.WARNING)
    
    def configure_security(self):
        """Configure production security settings."""
        
        # បិទម៉ូដដាក់បញ្ចូលកំហុស
        os.environ['DEBUG'] = 'False'
        
        # កំណត់ក្បាលដែលមានសុវត្ថិភាព
        os.environ['SECURE_SSL_REDIRECT'] = 'True'
        os.environ['SECURE_HSTS_SECONDS'] = '31536000'
        os.environ['SECURE_CONTENT_TYPE_NOSNIFF'] = 'True'
        os.environ['SECURE_BROWSER_XSS_FILTER'] = 'True'
```

## 💰 អូPTIMIZATIONការចំណាយ

### ការគ្រប់គ្រងធនធាន

```python
class CostOptimizer:
    """Cost optimization strategies."""
    
    def __init__(self):
        self.metrics_collector = MetricsCollector()
        self.auto_scaler = AutoScaler()
    
    async def optimize_database_connections(self):
        """Dynamically adjust connection pool based on load."""
        
        current_load = await self.metrics_collector.get_current_load()
        
        if current_load < 0.3:  # បន្ទុកទាប
            target_pool_size = max(2, int(current_load * 10))
        elif current_load < 0.7:  # បន្ទុកមធ្យម
            target_pool_size = max(5, int(current_load * 15))
        else:  # បន្ទុកខ្ពស់
            target_pool_size = min(20, int(current_load * 25))
        
        await db_provider.adjust_pool_size(target_pool_size)
        
        logger.info(f"Adjusted pool size to {target_pool_size} for load {current_load}")
    
    async def implement_smart_caching(self):
        """Implement intelligent caching to reduce compute costs."""
        
        # ប្រតិបត្តិការម្ចាស់តម្លៃកាសែ
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

# ការកំណត់បរិមាណស្វ័យប្រវត្តិ
class AutoScaler:
    """Automatic scaling based on metrics."""
    
    async def scale_decision(self) -> str:
        """Determine scaling action based on metrics."""
        
        metrics = await self.collect_scaling_metrics()
        
        # ការកំណត់បរិមាណផ្អែកលើ CPU
        if metrics['cpu_usage'] > 80:
            return "scale_up"
        elif metrics['cpu_usage'] < 20 and metrics['instance_count'] > 1:
            return "scale_down"
        
        # ការកំណត់បរិមាណផ្អែកលើ mémoire
        if metrics['memory_usage'] > 85:
            return "scale_up"
        
        # ការកំណត់បរិមាណធ្វើតំណើរកំណត់តំរង់សំណើ
        if metrics['queue_length'] > 100:
            return "scale_up"
        elif metrics['queue_length'] < 10 and metrics['instance_count'] > 1:
            return "scale_down"
        
        return "no_action"
```

## 🔧 ថែទាំ និងប្រតិបត្តិការ

### ការត្រួតពិនិត្យសុខភាព

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
        
        # សុខភាពមូលដ្ឋានទិន្នន័យ
        db_health = await self.check_database_health()
        health_report["components"]["database"] = db_health
        
        # សុខភាពសេវាកម្មខាងក្រៅ
        ai_health = await self.check_ai_service_health()
        health_report["components"]["ai_service"] = ai_health
        
        # ធនធានប្រព័ន្ធ
        system_health = await self.check_system_resources()
        health_report["components"]["system"] = system_health
        
        # មាត្រដ្ឋានកម្មវិធី
        app_health = await self.check_application_health()
        health_report["components"]["application"] = app_health
        
        # កំណត់ស្ថានភាពសរុប
        failed_components = [
            name for name, status in health_report["components"].items()
            if status.get("status") != "healthy"
        ]
        
        if failed_components:
            health_report["overall_status"] = "unhealthy"
            health_report["failed_components"] = failed_components
            
            # ចាប់ផ្តើមការព្រមាន
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
                # ការតភ្ជាប់មូលដ្ឋាន
                await conn.fetchval("SELECT 1")
                
                # ពិនិត្យការស្វែងរកយឺត
                slow_queries = await conn.fetch("""
                    SELECT query, mean_exec_time, calls 
                    FROM pg_stat_statements 
                    WHERE mean_exec_time > 1000 
                    ORDER BY mean_exec_time DESC 
                    LIMIT 5
                """)
                
                # ពិនិត្យចំនួនការតភ្ជាប់
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

# ការបម្រុងទុក និងស្ដារដោយស្វ័យប្រវត្តិ
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
        
        # ផ្ទុកឡើងទៅ Azure Blob Storage
        await self.upload_backup_to_azure(backup_name)
        
        return backup_name
    
    async def schedule_automated_backups(self):
        """Schedule regular automated backups."""
        
        # ការបម្រុងទុកពេញបញ្ចូលរៀងរាល់ថ្ងៃម៉ោង 2 ព្រឹក UTC
        schedule.every().day.at("02:00").do(
            lambda: asyncio.create_task(self.create_backup("full"))
        )
        
        # ការបម្រុងទុកបន្ថែមរៀងរាល់ម៉ោង
        schedule.every().hour.do(
            lambda: asyncio.create_task(self.create_backup("incremental"))
        )
```

## 🌍 ការចូលរួមសហគមន៍

### ប្រតិបត្តិដ៏ល្អបំផុតក្នុងប្រភពទូលំទូលាយ

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

### ការចូលរួមសហគមន៍

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
            "follows_conventions": True,  # នឹងអនុវត្តការត្រួតពិនិត្យជាក់លាក់
            "security_reviewed": pr_data.get("security_review", False),
            "performance_tested": pr_data.get("benchmark_results", False)
        }
```

## 🎯 ចំណុចគួរចងចាំ

បន្ទាប់ពីបញ្ចប់ផ្លូវការសិក្សាដែលទូលំទូលាយនេះ អ្នកគួរតែមានជំនាញពិចារណា៖

✅ **អូPTIMIZATIONសមត្ថភាព**៖ ការបង្កើតមូលដ្ឋានទិន្នន័យ ការប្រតិបត្តិការសមាសភាពអាស៊ីន និងយុទ្ធសាស្ត្រការទុកទុក  
✅ **កែលម្អសុវត្ថិភាព**៖ ការផ្ទៀងផ្ទាត់ ការអនុញ្ញាត និងការការពារ​ទិន្នន័យ  
✅ **ការដាក់បញ្ចូលផលិតកម្ម**៖ រចនាសម្ព័ន្ធជាកូដ និងអូPTIMIZATIONកុងតឺន័រ  
✅ **ការគ្រប់គ្រងថ្លៃ**៖ អូPTIMIZATIONធនធាន និងការពង្រីកឆ្លាតវៃ  
✅ **ភាពល្អឥតខ្ចោះក្នុងប្រតិបត្តិការ**៖ ការត្រួតពិនិត្យ ថែទាំ និងស្វ័យប្រវត្តិការ  
✅ **ការចូលរួមសហគមន៍**៖ ចូលរួមបង់នៅក្នុងអេកូស៊ីស្ទែម MCP  

## 🏆 ការបញ្ចាក់ និងជំហានបន្ទាប់

### ការវាយតម្លៃជាក់ស្តែង

បញ្ចប់គម្រោងចុងក្រោយនេះដើម្បីបង្ហាញជំនាញរបស់អ្នក៖

**កសាងម៉ាស៊ីន MCP សម្រាប់ផលិតកម្ម** ដែលរួមមាន៖  
- [ ] ការវិភាគការលក់ច្រើនជាន់ជុំវិញជាមួយ RLS  
- [ ] ការស្វែងរកម៉ាស៊ីនអាស៊ីនថ្នាក់ Semantic ជាមួយ Azure OpenAI  
- [ ] ការអនុវត្តសុវត្ថិភាពទូលំទូលាយ  
- [ ] ការដាក់បញ្ចូលផលិតកម្មលើ Azure  
- [ ] ការត្រួតពិនិត្យ និងដំណើរការជូនដំណឹង  
- [ ] ឯកសារនិងការធ្វើតេស្ត

### ផ្លូវការសិក្សាដែលកាន់តែជ្រាលជ្រៅ

បន្តដំណើររបស់អ្នកជាមួយ៖

- **លំនាំសំណង់ MCP**៖ រចនាសម្ព័ន្ធម៉ាស៊ីនកម្រិតខ្ពស់  
- **ការរួមបញ្ចូលម៉ូដែលច្រើន**៖ រួមបញ្ចូលម៉ូដែល AI ផ្សេងៗ  
- **ការពង្រីកកម្រិតសហគ្រាស**៖ ការចាក់ផ្តើម MCP នៅកម្រិតធំបំផុត  
- **ការអភិវឌ្ឍឧបករណ៍ផ្ទាល់ខ្លួន**៖ ការសង់ឧបករណ៍ MCP ជាក់លាក់  
- **អេកូស៊ីស្ទែម MCP**៖ ចូលរួមបង្រៀនវាលទូលំទូលាយ

### ការទទួលស្គាល់សហគមន៍

ចែករំលែកសមិទ្ធផលរបស់អ្នក៖  
- **Github Portfolio**៖ បង្ហាញការអនុវត្តរបស់អ្នក  
- **ការចូលរួមសហគមន៍**៖ ដាក់សំណើកែលម្អ ឬ ឧទាហរណ៍  
- **ឱកាសនិយាយ**៖ កម្មវិធីផ្សព្វផ្សាយនៅទីកន្លែងជួបផ្តុំ ឬសន្និបាត  
- **ការបង្វឹក**៖ ជួយអ្នកអភិវឌ្ឍផ្សេងទៀតរៀន MCP

## 📚 ឯកសារជំនួយបន្ថែម

### ប្រធានបទកម្រិតខ្ពស់  
- [ការបង្កើតសមត្ថភាព PostgreSQL](https://www.postgresql.org/docs/current/performance-tips.html) - អូPTIMIZATIONមូលដ្ឋានទិន្នន័យ  
- [ប្រតិបត្តិដ៏ល្អបំផុតសម្រាប់ Azure Container Apps](https://docs.microsoft.com/azure/container-apps/overview) - ការដាក់បញ្ចូលផលិតកម្ម  
- [Python Async ប្រតិបត្តិល្អបំផុត](https://docs.python.org/3/library/asyncio-dev.html) - ការគ្រប់គ្រងកម្មវិធីអាស៊ីន

### ឯកសារសុវត្ថិភាព  
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - ប្រតិបត្តិវិជ្ជាសុវត្ថិភាព  
- [ការអនុវត្តសុវត្ថិភាពល្អបំផុតលើ Azure](https://docs.microsoft.com/azure/security/) - សុវត្ថិភាពពពក  
- [មគ្គុទេសក៍សុវត្ថិភាព Python](https://python.org/dev/security/) - កូដមានសុវត្ថិភាព

### សហគមន៍  
- [Discord សហគមន៍ MCP](https://discord.com/invite/ByRwuEEgH4) - ពិភាក្សាសរសេររស់  
- [ការលម្អិតលើ Github Discussions](https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail/discussions) - សំនួរ និងការចែករំលែក  
- [Stack Overflow](https://stackoverflow.com/questions/tagged/model-context-protocol) - សំនួរបច្ចេកទេស

---

**🎉 សូមអបអរសាទរ!** អ្នកបានបញ្ចប់ផ្លូវការសិក្សា MCP Database Integration ដ៏ទូលំទូលាយ។ ឥឡូវនេះ អ្នកមានចំណេះដឹង និងជំនាញក្នុងការបង្កើតម៉ាស៊ីន MCP សម្រាប់ផលិតកម្ម ដែលភ្ជាប់ជាមួយជំនួយផ្នែក AI និងប្រព័ន្ធទិន្នន័យពិតប្រាកដ។

**រួចរាល់សម្រាប់ចូលរួមហើយទេ?** ចូលរួមក្នុងសហគមន៍របស់យើង ហើយជួយអ្នកផ្សេងទៀតរៀន MCP ដោយចែករំលែកបទពិសោធន៍ បញ្ចូលកូដកែលម្អ ឬបង្កើតឯកសាររបៀបសិក្សាបន្ថែម។

**បន្ទាប់**: [Tooling](../../12-tooling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ការបដិសេធ**:
ឯកសារនេះត្រូវបានបម្លែងភាសា ដោយប្រើសេវាបម្លែងភាសា AI [Co-op Translator](https://github.com/Azure/co-op-translator)។ ទោះយើងខ្ញុំមានក្តីប្រាថ្នាឱ្យបានច្បាស់លាស់ តែសូមយល់ដឹងថាការបម្លែងដោយស្វ័យប្រវត្តិក៏អាចមានកំហុសឬភាពមិនត្រឹមត្រូវ។ ឯកសារដើមជាភាសាទីតាំងគួរត្រូវបានគេប្រើជាប្រភពច្បាស់លាស់។ សម្រាប់ព័ត៌មានសំខាន់ៗ សូមណែនាំឱ្យប្រើប្រាស់ការប្រែដោយមនុស្សជំនាញ។ យើងខ្ញុំមិនទទួលខុសត្រូវចំពោះការយល់ច្រឡំ ឬការបកស្រាយខុសបន្ទាប់ពីការប្រើប្រាស់ការបម្លែងនេះនោះទេ។
<!-- CO-OP TRANSLATOR DISCLAIMER END -->