# श्रेष्ठ अभ्यास और अनुकूलन

## 🎯 इस लैब में क्या शामिल है

यह कैपस्टोन लैब मजबूत, स्केलेबल, और सुरक्षित MCP सर्वर बनाने के लिए श्रेष्ठ अभ्यास, अनुकूलन तकनीकें, और प्रोडक्शन दिशानिर्देशों को समेकित करता है, जिसमें डेटाबेस एकीकरण शामिल है। आप वास्तविक दुनिया के अनुभव और उद्योग मानकों से सीखेंगे ताकि आपकी कार्यान्वयन प्रोडक्शन-रेडी हो।

## अवलोकन

सफल MCP सर्वर बनाना केवल कोड को काम करने जैसा नहीं है। यह लैब उन आवश्यक अभ्यस्तताओं को कवर करता है जो प्रूफ-ऑफ-कॉन्सेप्ट कार्यान्वयन को प्रोडक्शन-रेडी सिस्टम से अलग करती हैं जो स्केल कर सकते हैं, विश्वसनीय प्रदर्शन कर सकते हैं, और सुरक्षा मानकों को बनाए रख सकते हैं।

ये श्रेष्ठ अभ्यास वास्तविक डिप्लॉयमेंट, समुदाय की प्रतिक्रिया, और एंटरप्राइज कार्यान्वयों से प्राप्त सबकों से लिए गए हैं।

## सीखने के उद्देश्य

इस लैब के अंत तक, आप सक्षम होंगे:

- **लागू करें** MCP सर्वर्स और डेटाबेस के लिए प्रदर्शन अनुकूलन तकनीकें
- **कार्यान्वित करें** व्यापक सुरक्षा सख्ती के उपाय
- **डिज़ाइन करें** प्रोडक्शन वातावरण के लिए स्केलेबल आर्किटेक्चर पैटर्न
- **स्थापित करें** निगरानी, रखरखाव, और संचालन प्रक्रियाएं
- **अनुकूलित करें** लागतों को प्रदर्शन और विश्वसनीयता बनाए रखते हुए
- **योगदान दें** MCP समुदाय और पारिस्थितिकी तंत्र में

## 🚀 प्रदर्शन अनुकूलन

### डेटाबेस प्रदर्शन

#### कनेक्शन पूल अनुकूलन

```python
# अनुकूलित कनेक्शन पूल कॉन्फ़िगरेशन
POOL_CONFIG = {
    # आकार कॉन्फ़िगरेशन
    "min_size": max(2, cpu_count()),           # कम से कम 2, CPU के साथ आकार बढ़ाएं
    "max_size": min(20, cpu_count() * 4),     # उचित अधिकतम सीमा पर रोक
    
    # समय निर्धारण कॉन्फ़िगरेशन
    "max_inactive_connection_lifetime": 300,   # 5 मिनट
    "command_timeout": 30,                     # 30 सेकंड
    "max_queries": 50000,                      # कनेक्शनों को घुमाएं
    
    # PostgreSQL सेटिंग्स
    "server_settings": {
        "application_name": "mcp-server-prod",
        "jit": "off",                          # सुसंगतता के लिए अक्षम करें
        "work_mem": "8MB",                     # प्रश्नों के लिए अनुकूलित करें
        "shared_preload_libraries": "pg_stat_statements",
        "log_statement": "mod",                # केवल संशोधनों को लॉग करें
        "log_min_duration_statement": "1s",   # धीमे प्रश्नों को लॉग करें
    }
}
```

#### क्वेरी अनुकूलन पैटर्न

```python
class QueryOptimizer:
    """Database query optimization utilities."""
    
    def __init__(self):
        self.query_cache = {}
        self.slow_query_threshold = 1.0  # सेकंड
        
    async def execute_optimized_query(
        self, 
        query: str, 
        params: tuple = None,
        cache_key: str = None,
        cache_ttl: int = 300
    ):
        """Execute query with optimization and caching."""
        
        # पहले कैश जांचें
        if cache_key and cache_key in self.query_cache:
            cache_entry = self.query_cache[cache_key]
            if time.time() - cache_entry['timestamp'] < cache_ttl:
                return cache_entry['result']
        
        # निगरानी के साथ निष्पादित करें
        start_time = time.time()
        
        try:
            async with db_provider.get_connection() as conn:
                # क्वेरी निष्पादन को अनुकूलित करें
                await conn.execute("SET enable_seqscan = off")  # सूचकांकों को प्राथमिकता दें
                await conn.execute("SET work_mem = '16MB'")     # इस क्वेरी के लिए अधिक मेमोरी
                
                result = await conn.fetch(query, *params if params else ())
                
                duration = time.time() - start_time
                
                # धीमी क्वेरी लॉग करें
                if duration > self.slow_query_threshold:
                    logger.warning(f"Slow query detected: {duration:.2f}s", extra={
                        "query": query[:200],
                        "duration": duration,
                        "params_count": len(params) if params else 0
                    })
                
                # सफल परिणाम कैश करें
                if cache_key and len(result) < 1000:  # बड़े परिणामों को कैश न करें
                    self.query_cache[cache_key] = {
                        'result': result,
                        'timestamp': time.time()
                    }
                
                return result
                
        except Exception as e:
            logger.error(f"Query optimization failed: {e}")
            raise

# सूचकांक सिफारिशें
RECOMMENDED_INDEXES = [
    # मुख्य व्यावसायिक सूचकांक
    "CREATE INDEX CONCURRENTLY idx_orders_store_date ON retail.orders (store_id, order_date DESC);",
    "CREATE INDEX CONCURRENTLY idx_order_items_product ON retail.order_items (product_id);",
    "CREATE INDEX CONCURRENTLY idx_customers_store_email ON retail.customers (store_id, email);",
    
    # विश्लेषणात्मक सूचकांक
    "CREATE INDEX CONCURRENTLY idx_orders_date_amount ON retail.orders (order_date, total_amount);",
    "CREATE INDEX CONCURRENTLY idx_products_category_price ON retail.products (category_id, unit_price);",
    
    # वेक्टर खोज अनुकूलन
    "CREATE INDEX CONCURRENTLY idx_embeddings_vector ON retail.product_description_embeddings USING ivfflat (description_embedding vector_cosine_ops) WITH (lists = 100);",
]
```

### एप्लीकेशन प्रदर्शन

#### Async प्रोग्रामिंग श्रेष्ठ अभ्यास

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
        
        # प्रणाली को भारी न करने के लिए बैच में प्रक्रिया करें
        results = []
        for i in range(0, len(items), batch_size):
            batch = items[i:i + batch_size]
            batch_results = await process_batch(batch)
            results.extend(batch_results)
            
            # संसाधन समाप्ति को रोकने के लिए बैचों के बीच छोटा विलंब
            if i + batch_size < len(items):
                await asyncio.sleep(0.1)
        
        return results
    
    @circuit_breaker_decorator
    async def resilient_operation(self, operation: callable, *args, **kwargs):
        """Execute operation with circuit breaker protection."""
        return await operation(*args, **kwargs)

# सर्किट ब्रेकर कार्यान्वयन
class CircuitBreaker:
    """Circuit breaker for external service calls."""
    
    def __init__(self, failure_threshold: int = 5, recovery_timeout: int = 60):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.failure_count = 0
        self.last_failure_time = None
        self.state = "CLOSED"  # बंद, खुला, आधा_खुला
    
    async def call(self, func, *args, **kwargs):
        """Execute function with circuit breaker protection."""
        
        if self.state == "OPEN":
            if time.time() - self.last_failure_time > self.recovery_timeout:
                self.state = "HALF_OPEN"
            else:
                raise Exception("Circuit breaker is OPEN")
        
        try:
            result = await func(*args, **kwargs)
            
            # सफलता पर रीसेट करें
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

### कैशिंग रणनीतियाँ

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
        
        # स्तर 1: मेमोरी कैश
        if key in self.memory_cache:
            return self.memory_cache[key]['value']
        
        # स्तर 2: रिडिस कैश
        if self.redis_client:
            try:
                cached_data = self.redis_client.get(key)
                if cached_data:
                    value = pickle.loads(cached_data)
                    
                    # मेमोरी कैश में प्रोमोट करें
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
        
        # LRU निकासी को लागू करें
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

# कैश कुंजी जनरेशन
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

## 🔒 सुरक्षा सख्ती

### प्रमाणीकरण और अधिकार

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
        
        # प्रमाणीकरण निकालें और सत्यापित करें
        auth_token = request_headers.get("authorization", "").replace("Bearer ", "")
        if not auth_token:
            raise AuthenticationError("Missing authentication token")
        
        # टोकन सत्यापित करें
        user_context = await self._validate_token(auth_token)
        
        # दर सीमा जांचें
        await self._check_rate_limit(user_context["user_id"])
        
        # RLS संदर्भ सत्यापित करें
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
            # की वॉल्ट या कैश से सार्वजनिक कुंजी प्राप्त करें
            public_key = await self._get_public_key()
            
            # टोकन को डिकोड और सत्यापित करें
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
        
        # सुपर एडमिन किसी भी संदर्भ तक पहुंच सकते हैं
        if "super_admin" in user_context["roles"]:
            return True
        
        # स्टोर प्रबंधक केवल अपने स्वयं के स्टोर तक पहुंच सकते हैं
        if "store_manager" in user_context["roles"]:
            allowed_stores = user_context.get("allowed_stores", [])
            return rls_user_id in allowed_stores
        
        # क्षेत्रीय प्रबंधक कई स्टोर तक पहुंच सकते हैं
        if "regional_manager" in user_context["roles"]:
            allowed_regions = user_context.get("allowed_regions", [])
            return self._check_store_in_regions(rls_user_id, allowed_regions)
        
        return False

# इनपुट सत्यापन और स्वच्छता
class InputValidator:
    """SQL injection prevention and input validation."""
    
    @staticmethod
    def validate_sql_query(query: str) -> bool:
        """Validate SQL query for safety."""
        
        # प्रतिबंधित पैटर्न
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
        
        # केवल SELECT स्टेटमेंट की अनुमति दें
        if not query_upper.strip().startswith("SELECT"):
            return False
        
        return True
    
    @staticmethod
    def sanitize_table_name(table_name: str) -> str:
        """Sanitize table name input."""
        
        # केवल अल्फान्यूमेरिक, अंडरस्कोर, और डॉट की अनुमति दें
        if not re.match(r"^[a-zA-Z0-9_.]+$", table_name):
            raise ValueError("Invalid table name format")
        
        # अनुमत तालिकाओं के खिलाफ सत्यापित करें
        if table_name not in VALID_TABLES:
            raise ValueError(f"Table {table_name} not allowed")
        
        return table_name
```

### डेटा सुरक्षा

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
        
        # प्रोडक्शन में, Azure Key Vault से प्राप्त करें
        key_vault_secret = os.getenv("ENCRYPTION_KEY_SECRET_NAME")
        if key_vault_secret and self.key_vault_client:
            secret = self.key_vault_client.get_secret(key_vault_secret)
            return secret.value.encode()
        
        # विकास के लिए फॉलबैक (प्रोडक्शन के लिए नहीं!)
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
            100000  # पुनरावृत्तियाँ
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

## 📊 प्रोडक्शन डिप्लॉयमेंट दिशानिर्देश

### इन्फ्रास्ट्रक्चर एज़ कोड

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

### कंटेनर अनुकूलन

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

### पर्यावरण विन्यास

```python
# उत्पादन कॉन्फ़िगरेशन प्रबंधन
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
        
        # थर्ड-पार्टी लॉगर को WARNING पर सेट करें
        logging.getLogger('azure').setLevel(logging.WARNING)
        logging.getLogger('urllib3').setLevel(logging.WARNING)
    
    def configure_security(self):
        """Configure production security settings."""
        
        # डिबग मोड अक्षम करें
        os.environ['DEBUG'] = 'False'
        
        # सुरक्षित हेडर सेट करें
        os.environ['SECURE_SSL_REDIRECT'] = 'True'
        os.environ['SECURE_HSTS_SECONDS'] = '31536000'
        os.environ['SECURE_CONTENT_TYPE_NOSNIFF'] = 'True'
        os.environ['SECURE_BROWSER_XSS_FILTER'] = 'True'
```

## 💰 लागत अनुकूलन

### संसाधन प्रबंधन

```python
class CostOptimizer:
    """Cost optimization strategies."""
    
    def __init__(self):
        self.metrics_collector = MetricsCollector()
        self.auto_scaler = AutoScaler()
    
    async def optimize_database_connections(self):
        """Dynamically adjust connection pool based on load."""
        
        current_load = await self.metrics_collector.get_current_load()
        
        if current_load < 0.3:  # कम लोड
            target_pool_size = max(2, int(current_load * 10))
        elif current_load < 0.7:  # मध्यम लोड
            target_pool_size = max(5, int(current_load * 15))
        else:  # उच्च लोड
            target_pool_size = min(20, int(current_load * 25))
        
        await db_provider.adjust_pool_size(target_pool_size)
        
        logger.info(f"Adjusted pool size to {target_pool_size} for load {current_load}")
    
    async def implement_smart_caching(self):
        """Implement intelligent caching to reduce compute costs."""
        
        # महंगे संचालन को कैश करें
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

# ऑटो-स्केलिंग कॉन्फ़िगरेशन
class AutoScaler:
    """Automatic scaling based on metrics."""
    
    async def scale_decision(self) -> str:
        """Determine scaling action based on metrics."""
        
        metrics = await self.collect_scaling_metrics()
        
        # सीपीयू-आधारित स्केलिंग
        if metrics['cpu_usage'] > 80:
            return "scale_up"
        elif metrics['cpu_usage'] < 20 and metrics['instance_count'] > 1:
            return "scale_down"
        
        # मेमोरी-आधारित स्केलिंग
        if metrics['memory_usage'] > 85:
            return "scale_up"
        
        # अनुरोध कतार स्केलिंग
        if metrics['queue_length'] > 100:
            return "scale_up"
        elif metrics['queue_length'] < 10 and metrics['instance_count'] > 1:
            return "scale_down"
        
        return "no_action"
```

## 🔧 रखरखाव और संचालन

### स्वास्थ्य निगरानी

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
        
        # डेटाबेस स्वास्थ्य
        db_health = await self.check_database_health()
        health_report["components"]["database"] = db_health
        
        # बाहरी सेवाओं का स्वास्थ्य
        ai_health = await self.check_ai_service_health()
        health_report["components"]["ai_service"] = ai_health
        
        # सिस्टम संसाधन
        system_health = await self.check_system_resources()
        health_report["components"]["system"] = system_health
        
        # एप्लिकेशन मेट्रिक्स
        app_health = await self.check_application_health()
        health_report["components"]["application"] = app_health
        
        # कुल स्थिति निर्धारित करें
        failed_components = [
            name for name, status in health_report["components"].items()
            if status.get("status") != "healthy"
        ]
        
        if failed_components:
            health_report["overall_status"] = "unhealthy"
            health_report["failed_components"] = failed_components
            
            # अलर्ट ट्रिगर करें
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
                # बुनियादी कनेक्टिविटी
                await conn.fetchval("SELECT 1")
                
                # धीमी क्वेरी जांचें
                slow_queries = await conn.fetch("""
                    SELECT query, mean_exec_time, calls 
                    FROM pg_stat_statements 
                    WHERE mean_exec_time > 1000 
                    ORDER BY mean_exec_time DESC 
                    LIMIT 5
                """)
                
                # कनेक्शन संख्या जांचें
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

# स्वचालित बैकअप और रिकवरी
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
        
        # Azure ब्लॉब स्टोरेज में अपलोड करें
        await self.upload_backup_to_azure(backup_name)
        
        return backup_name
    
    async def schedule_automated_backups(self):
        """Schedule regular automated backups."""
        
        # 2 AM UTC पर दैनिक पूर्ण बैकअप
        schedule.every().day.at("02:00").do(
            lambda: asyncio.create_task(self.create_backup("full"))
        )
        
        # प्रति घंटे वृद्धिशील बैकअप
        schedule.every().hour.do(
            lambda: asyncio.create_task(self.create_backup("incremental"))
        )
```

## 🌍 समुदाय योगदान

### ओपन सोर्स श्रेष्ठ अभ्यास

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

### समुदाय जुड़ाव

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
            "follows_conventions": True,  # वास्तविक परीक्षण लागू करेगा
            "security_reviewed": pr_data.get("security_review", False),
            "performance_tested": pr_data.get("benchmark_results", False)
        }
```

## 🎯 मुख्य निष्कर्ष

इस व्यापक शिक्षण मार्ग को पूरा करने के बाद, आप में महारत होनी चाहिए:

✅ **प्रदर्शन अनुकूलन**: डेटाबेस ट्यूनिंग, असिंक्रनस पैटर्न, और कैशिंग रणनीतियाँ  
✅ **सुरक्षा सख्ती**: प्रमाणीकरण, प्राधिकरण, और डेटा सुरक्षा  
✅ **प्रोडक्शन डिप्लॉयमेंट**: इन्फ्रास्ट्रक्चर एज़ कोड और कंटेनर अनुकूलन  
✅ **लागत प्रबंधन**: संसाधन अनुकूलन और बुद्धिमान स्केलिंग  
✅ **संचालन उत्कृष्टता**: निगरानी, रखरखाव, और स्वचालन  
✅ **समुदाय जुड़ाव**: MCP पारिस्थितिकी तंत्र में योगदान  

## 🏆 प्रमाणपत्र और अगले कदम

### व्यावहारिक मूल्यांकन

अपने प्रभुत्व का प्रदर्शन करने के लिए यह अंतिम प्रोजेक्ट पूरा करें:

**एक प्रोडक्शन-रेडी MCP सर्वर बनाएं** जिसमें शामिल हैं:
- [ ] RLS के साथ मल्टी-टेनेंट रिटेल एनालिटिक्स
- [ ] Azure OpenAI के साथ सैमान्टिक सर्च
- [ ] व्यापक सुरक्षा कार्यान्वयन
- [ ] Azure पर प्रोडक्शन डिप्लॉयमेंट
- [ ] निगरानी और अलर्टिंग सेटअप
- [ ] दस्तावेज़ीकरण और परीक्षण

### उन्नत शिक्षण मार्ग

अपनी MCP यात्रा जारी रखें:

- **MCP आर्किटेक्चर पैटर्न**: उन्नत सर्वर आर्किटेक्चर
- **मल्टी-मॉडल एकीकरण**: विभिन्न AI मॉडल संयोजन
- **एंटरप्राइज स्केल**: बड़े पैमाने पर MCP डिप्लॉयमेंट
- **कस्टम टूल विकास**: विशेष MCP टूल बनाना
- **MCP पारिस्थितिकी तंत्र**: व्यापक समुदाय में योगदान

### सामुदायिक मान्यता

अपनी उपलब्धि साझा करें:
- **GitHub पोर्टफोलियो**: अपनी कार्यान्वयन प्रदर्शित करें
- **समुदाय योगदान**: सुधार या उदाहरण सबमिट करें
- **भाषण अवसर**: मीटअप या सम्मेलन में प्रस्तुत करें
- **मार्गदर्शन**: अन्य डेवलपर्स को MCP सीखने में मदद करें

## 📚 अतिरिक्त संसाधन

### उन्नत विषय
- [PostgreSQL Performance Tuning](https://www.postgresql.org/docs/current/performance-tips.html) - डेटाबेस अनुकूलन
- [Azure Container Apps Best Practices](https://docs.microsoft.com/azure/container-apps/overview) - प्रोडक्शन डिप्लॉयमेंट
- [Python Async Best Practices](https://docs.python.org/3/library/asyncio-dev.html) - असिंक्रनस प्रोग्रामिंग

### सुरक्षा संसाधन
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - सुरक्षा कमजोरियां
- [Azure Security Best Practices](https://docs.microsoft.com/azure/security/) - क्लाउड सुरक्षा
- [Python Security Guidelines](https://python.org/dev/security/) - सुरक्षित कोडिंग

### समुदाय
- [MCP Community Discord](https://discord.com/invite/ByRwuEEgH4) - लाइव चर्चाएँ
- [GitHub Discussions](https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail/discussions) - प्रश्नोत्तर और साझा करना
- [Stack Overflow](https://stackoverflow.com/questions/tagged/model-context-protocol) - तकनीकी प्रश्न

---

**🎉 बधाई हो!** आपने व्यापक MCP डेटाबेस इंटीग्रेशन शिक्षण मार्ग पूरा कर लिया है। अब आपके पास AI असिस्टेंट्स को वास्तविक दुनिया के डेटा सिस्टम से जोड़ने वाले प्रोडक्शन-रेडी MCP सर्वर्स बनाने का ज्ञान और कौशल है।

**योगदान करने के लिए तैयार हैं?** हमारे समुदाय में शामिल हों और दूसरों को MCP सीखने में मदद करें अपने अनुभव साझा करके, कोड सुधारों में योगदान करके, या अतिरिक्त शिक्षण संसाधन बनाकर।

**अगला**: [Tooling](../../12-tooling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
इस दस्तावेज़ का अनुवाद AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) का उपयोग करके किया गया है। जबकि हम सटीकता के लिए प्रयास करते हैं, कृपया ध्यान दें कि स्वचालित अनुवादों में त्रुटियाँ या अशुद्धियाँ हो सकती हैं। मूल दस्तावेज़ अपनी मूल भाषा में ही प्रामाणिक स्रोत माना जाना चाहिए। महत्वपूर्ण जानकारी के लिए, पेशेवर मानव अनुवाद की सिफारिश की जाती है। इस अनुवाद के उपयोग से उत्पन्न किसी भी गलतफहमी या गलत व्याख्या के लिए हम उत्तरदायी नहीं हैं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->