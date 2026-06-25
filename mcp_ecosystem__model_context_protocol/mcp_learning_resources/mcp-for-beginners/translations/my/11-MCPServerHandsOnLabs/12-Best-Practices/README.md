# အကောင်းဆုံးလေ့ကျင့်မှုများနှင့် အမြှင့်တင်မှု

## 🎯 ဒီလက်စ်မှာ အပြည့်အစုံပါဝင်တဲ့အရာတွေ

ဒီ capstone လက်စ်မှာ သောကောင်းသောလေ့ကျင့်မှုများ၊ အမြှင့်တင်နည်းပညာများ၊ နည်းပညာလုပ်ငန်းသုံးလမ်းညွှန်ချက်များကို ပေါင်းစပ်ထားပြီး သံသင့်ပြီး အဆင့်မြှင့်ထားသော MCP server များကို ဒေတာဘေ့စ်ပေါင်းစပ်မှုဖြင့် တည်ဆောက်ခြင်းကို လေ့လာပါမယ်။ သင်သည် ရှေ့ပြေးလောကအတွေ့အကြုံများနှင့် စက်မှုဝန်ဆောင်မှုစံချိန်များမှ သင်ကြားပြီး ထုတ်လုပ်မှုအဆင့်အတွက် သင့်လုပ်ဆောင်ချက်ကို အကောင်းဆုံးဖြစ်အောင်တည်ဆောက်နိုင်ပါလိမ့်မယ်။

## အနှောင့်အယှက်

အောင်မြင်သော MCP server တစ်ခု တည်ဆောက်ခြင်းသည် ကုဒ်အလုပ်လုပ်ခြင်းအထက်ပိုတစ်ချက်ရပ်မိသည်။ ဒီလက်စ်သည် အချက်အလက်အခြေခံစွမ်းဆောင်မှုတည်ဆောက်မှုများကို ထုတ်လုပ်မှုအဆင့်မြှင့်စနစ်များနှင့် ကောင်းမွန်စွာ လုပ်ဆောင်နိုင်ပြီး လုံခြုံရေးစံချိန်ရထားသော စနစ်များကို ဖြစ်စေသည့် အရေးကြီးလေ့ကျင့်မှုများကို ဖော်ပြပါသည်။

အကောင်းဆုံးလေ့ကျင့်မှုများကို တကယ်အသုံးပြုထားတဲ့ deployment များ၊ အသိုင်းအဝိုင်းမှတုံ့ပြန်ချက်များနှင့် စီးပွားရေးလုပ်ငန်း အတွေ့အကြုံများမှ စုစည်းထားသည်။

## သင်ယူရမည့်ရည်မှန်းချက်များ

ဒီလက်စ်ကုန်ဆုံးသည်နှင့်အမျှ သင်သည်:

- **MCP server နှင့် ဒေတာဘေ့စ်များအတွက်** စွမ်းဆောင်ရည်မြှင့်တင်နည်းများကို **အသုံးချနိုင်**မည်
- **လုံခြုံရေးအရ အားလုံးအပါအဝင် စနစ်များ** ကို **အကောင်အထည်ဖော်နိုင်**မည်
- ထုတ်လုပ်မှုစနစ်များအတွက် **အဆင့်မြှင့်နိုင်သော သင်္ချာဆွဲပုံစံများ** ကို **ဒီဇိုင်းဆွဲနိုင်**မည်
- စနစ်ကို ကြီးကြပ်ထိန်းသိမ်းမှုများ၊ ပြုပြင်ထိန်းသိမ်းမှုများနှင့် စီမံခန့်ခွဲမှု လုပ်ထုံးလုပ်နည်းများကို **တည်ထောင်နိုင်**မည်
- စွမ်းဆောင်ရည်နှင့် ယုံကြည်စိတ်ချရမှုကို ထိန်းသိမ်း၍ အကုန်အကျခံသာမှုကို **အမြှင့်တင်နိုင်**မည်
- MCP အသိုင်းအဝိုင်းနှင့် ပတ်ဝန်းကျင်တွင် **အတူတကွ ထောက်ပံ့ဆောင်ရွက်နိုင်**မည်

## 🚀 စွမ်းဆောင်ရည်မြှင့်တင်ခြင်း

### ဒေတာဘေ့စ် စွမ်းဆောင်ရည်

#### ချိတ်ဆက်မှု အစုစု တိုးတက်မှု

```python
# တိုးတက်ပြီး ပြင်ဆင်ထားသော ချိတ်ဆက်မှုကူးစက် ထည့်သွင်းမှု
POOL_CONFIG = {
    # အရွယ်အစား ပြင်ဆင်မှု
    "min_size": max(2, cpu_count()),           # အနည်းဆုံး ၂ ခုရှိရန်၊ CPU အရေအတွက်နှင့် အတိုင်းအတာပြုရန်
    "max_size": min(20, cpu_count() * 4),     # အပြုသင့်အမြင့်ဆုံးတွင် ကန့်သတ်ရန်
    
    # အချိန်ညှိရန် ပြင်ဆင်မှု
    "max_inactive_connection_lifetime": 300,   # ၅ မိနစ်
    "command_timeout": 30,                     # ၃၀ စက္ကန့်
    "max_queries": 50000,                      # ချိတ်ဆက်မှုများကို လှည့်ပတ်ရန်
    
    # PostgreSQL ဆက်တင်များ
    "server_settings": {
        "application_name": "mcp-server-prod",
        "jit": "off",                          # တပြည့်တညောင်းဖြစ်စေရန် ပိတ်ထားရန်
        "work_mem": "8MB",                     # မေးခွန်းများအတွက် အကောင်းဆုံးပြုလုပ်ရန်
        "shared_preload_libraries": "pg_stat_statements",
        "log_statement": "mod",                # ပြင်ဆင်မှုများသာ မှတ်တမ်းတင်ရန်
        "log_min_duration_statement": "1s",   # နောက်ကျသော မေးခွန်းများကို မှတ်တမ်းတင်ရန်
    }
}
```

#### မေးခွန်းများ အမြှင့်တင်ခြင်းပုံစံများ

```python
class QueryOptimizer:
    """Database query optimization utilities."""
    
    def __init__(self):
        self.query_cache = {}
        self.slow_query_threshold = 1.0  # စက္ကန့်များ
        
    async def execute_optimized_query(
        self, 
        query: str, 
        params: tuple = None,
        cache_key: str = None,
        cache_ttl: int = 300
    ):
        """Execute query with optimization and caching."""
        
        # ဒေတာသိုလှောင်မှုကို ပထမဆုံး စစ်ဆေးပါ
        if cache_key and cache_key in self.query_cache:
            cache_entry = self.query_cache[cache_key]
            if time.time() - cache_entry['timestamp'] < cache_ttl:
                return cache_entry['result']
        
        # ကြည့်ရှုမှူးဖြင့် အကောင်အထည်ဖော်ပါ
        start_time = time.time()
        
        try:
            async with db_provider.get_connection() as conn:
                # အမိန့် Query အကောင်အထည်ဖော်မှုကို မြှင့်တင်ပါ
                await conn.execute("SET enable_seqscan = off")  # မှတ်တမ်းများကို ဦးစားပေးပါ
                await conn.execute("SET work_mem = '16MB'")     # ဤ Query အတွက် မှတ်ဉာဏ်ပိုပေးပါ
                
                result = await conn.fetch(query, *params if params else ())
                
                duration = time.time() - start_time
                
                # နှေးကွေးသည့် Query များကို မှတ်တမ်းတင်ပါ
                if duration > self.slow_query_threshold:
                    logger.warning(f"Slow query detected: {duration:.2f}s", extra={
                        "query": query[:200],
                        "duration": duration,
                        "params_count": len(params) if params else 0
                    })
                
                # အောင်မြင်သော ရလဒ်များကို ဒေတာသိုလှောင်ပါ
                if cache_key and len(result) < 1000:  # ကြီးမားသော ရလဒ်များကို ဒေတာသိုလှောင်မထားပါနှင့်
                    self.query_cache[cache_key] = {
                        'result': result,
                        'timestamp': time.time()
                    }
                
                return result
                
        except Exception as e:
            logger.error(f"Query optimization failed: {e}")
            raise

# မှတ်တမ်းအကြံပြုချက်များ
RECOMMENDED_INDEXES = [
    # အဓိကလုပ်ငန်းမှတ်တမ်းများ
    "CREATE INDEX CONCURRENTLY idx_orders_store_date ON retail.orders (store_id, order_date DESC);",
    "CREATE INDEX CONCURRENTLY idx_order_items_product ON retail.order_items (product_id);",
    "CREATE INDEX CONCURRENTLY idx_customers_store_email ON retail.customers (store_id, email);",
    
    # စာရင်းဇယားသုံးသပ်မှုမှတ်တမ်းများ
    "CREATE INDEX CONCURRENTLY idx_orders_date_amount ON retail.orders (order_date, total_amount);",
    "CREATE INDEX CONCURRENTLY idx_products_category_price ON retail.products (category_id, unit_price);",
    
    # ဗက်တာရှာဖွေမှု မြှင့်တင်မှု
    "CREATE INDEX CONCURRENTLY idx_embeddings_vector ON retail.product_description_embeddings USING ivfflat (description_embedding vector_cosine_ops) WITH (lists = 100);",
]
```

### အပလီကေးရှင်း စွမ်းဆောင်ရည်

#### အချိန်လွတ် Programming အကောင်းဆုံးလေ့ကျင့်မှုများ

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
        
        # စနစ်ကို အလွန်အကျွံ မပင်ပန်းစေမည့်အတွက် အစုလိုက် အလုပ်လုပ်ပါ
        results = []
        for i in range(0, len(items), batch_size):
            batch = items[i:i + batch_size]
            batch_results = await process_batch(batch)
            results.extend(batch_results)
            
            # အရေအတွက်ကြီးမှုမှ ကာကွယ်ရန် အစုတိုင်းကြား စဉ်ခွဲခြားထားသော အချိန်နည်းနည်း
            if i + batch_size < len(items):
                await asyncio.sleep(0.1)
        
        return results
    
    @circuit_breaker_decorator
    async def resilient_operation(self, operation: callable, *args, **kwargs):
        """Execute operation with circuit breaker protection."""
        return await operation(*args, **kwargs)

# စက်ဝိုင်းရန်ပုံတင်ဆောင်ရွက်မှု
class CircuitBreaker:
    """Circuit breaker for external service calls."""
    
    def __init__(self, failure_threshold: int = 5, recovery_timeout: int = 60):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.failure_count = 0
        self.last_failure_time = None
        self.state = "CLOSED"  # ပိတ်ထားခြင်း၊ ဖွင့်ထားခြင်း၊ အမှတ်အတိုင်
    
    async def call(self, func, *args, **kwargs):
        """Execute function with circuit breaker protection."""
        
        if self.state == "OPEN":
            if time.time() - self.last_failure_time > self.recovery_timeout:
                self.state = "HALF_OPEN"
            else:
                raise Exception("Circuit breaker is OPEN")
        
        try:
            result = await func(*args, **kwargs)
            
            # အောင်မြင်မှုအပေါ် ပြန်လည်စတင်ခြင်း
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

### Cache များ အသုံးပြုမှု မျိုးစုံ

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
        
        # အဆင့် ၁: မေမရီ ကက်ခ်
        if key in self.memory_cache:
            return self.memory_cache[key]['value']
        
        # အဆင့် ၂: Redis ကက်ချ
        if self.redis_client:
            try:
                cached_data = self.redis_client.get(key)
                if cached_data:
                    value = pickle.loads(cached_data)
                    
                    # မေမရီ ကက်ချသို့မြှင့်တင်ပါ
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
        
        # LRU ပယ်ဖျက်မှုကို အကောင်အထည်ဖော်ပါ
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

# ကက်ချ key ထုတ်လုပ်ခြင်း
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

## 🔒 လုံခြုံရေး အားခွန်ခြင်း

### အတည်ပြုရေးနှင့် ခွင့်ပြုရေး

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
        
        # အတည်ပြုချက်ကို ထုတ်ယူ၍ စစ်ဆေးပါ
        auth_token = request_headers.get("authorization", "").replace("Bearer ", "")
        if not auth_token:
            raise AuthenticationError("Missing authentication token")
        
        # တိုကင်ကို အတည်ပြုပါ
        user_context = await self._validate_token(auth_token)
        
        # အမြန်နှုန်းကန့်သတ်ခြင်းကို စစ်ဆေးပါ
        await self._check_rate_limit(user_context["user_id"])
        
        # RLS စာရင်းအဖွဲ့အစည်းအရ အတည်ပြုပါ
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
            # Key Vault သို့မဟုတ် cache မှ လူကြီးမင်းအတွက် သော့ချက်များကို ရယူပါ
            public_key = await self._get_public_key()
            
            # တိုကင်ကို ဖြေရှင်းပြီး အတည်ပြုပါ
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
        
        # အထက်တန်း အရာရှိကြီးများသည် မည်သည့် စာရင်းအဖွဲ့အစည်းမဆို ဝင်ရောက်ခွင့်ရှိသည်
        if "super_admin" in user_context["roles"]:
            return True
        
        # စတိုးဆိုင် မန်နေဂျာများသည် ကိုယ်ပိုင် စတိုးဆိုင်သာ ဝင်ရောက်နိုင်သည်
        if "store_manager" in user_context["roles"]:
            allowed_stores = user_context.get("allowed_stores", [])
            return rls_user_id in allowed_stores
        
        # ဒေသဆိုင်ရာ မန်နေဂျာများသည် စတိုးဆိုင်များစွာကို ဝင်ရောက်နိုင်သည်
        if "regional_manager" in user_context["roles"]:
            allowed_regions = user_context.get("allowed_regions", [])
            return self._check_store_in_regions(rls_user_id, allowed_regions)
        
        return False

# နောက်ခံအချက်အလက်နှင့် ဆပ်ကြောခြင်းကို စစ်ဆေးပါ
class InputValidator:
    """SQL injection prevention and input validation."""
    
    @staticmethod
    def validate_sql_query(query: str) -> bool:
        """Validate SQL query for safety."""
        
        # တားမြစ်ထားသည့် ပုံစံများ
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
        
        # SELECT စာကြောင်းများကိုသာ ခွင့်ပြုပါ
        if not query_upper.strip().startswith("SELECT"):
            return False
        
        return True
    
    @staticmethod
    def sanitize_table_name(table_name: str) -> str:
        """Sanitize table name input."""
        
        # အက္ခရာ၊ နံပါတ်၊ အောက်စီးတန်းနှင့် ဒေါ့(စတုရန်းလက္ခဏာ)ကိုသာ ခွင့်ပြုပါ
        if not re.match(r"^[a-zA-Z0-9_.]+$", table_name):
            raise ValueError("Invalid table name format")
        
        # ခွင့်ပြုထားသော စာရင်းကို ပြန်လည်စစ်ဆေးပါ
        if table_name not in VALID_TABLES:
            raise ValueError(f"Table {table_name} not allowed")
        
        return table_name
```

### ဒေတာ ကာကွယ်ခြင်း

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
        
        # ထုတ်လုပ်ရာတွင် Azure Key Vault မှယူပါ
        key_vault_secret = os.getenv("ENCRYPTION_KEY_SECRET_NAME")
        if key_vault_secret and self.key_vault_client:
            secret = self.key_vault_client.get_secret(key_vault_secret)
            return secret.value.encode()
        
        # ဖွံ့ဖြိုးရေးအတွက် အစားထိုးနည်း (ထုတ်လုပ်မှုအတွက်မဟုတ်ပါ!)
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
            100000  # အကြိမ်များ
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

## 📊 ထုတ်လုပ်မှု Deployment လမ်းညွှန်ချက်များ

### Infrastructure as Code

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

### Container အမြှင့်တင်ခြင်း

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

### ပတ်ဝန်းကျင် ကြီးကြပ်မှု

```python
# ထုတ်လုပ်မှု ဖွဲ့စည်းမှု ကိုင်တွယ်မှု
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
        
        # တတိယပါတီ မှတ်တမ်းတင်သူများကို WARNING သတ်မှတ်ပါ
        logging.getLogger('azure').setLevel(logging.WARNING)
        logging.getLogger('urllib3').setLevel(logging.WARNING)
    
    def configure_security(self):
        """Configure production security settings."""
        
        # debug မုဒ် ပိတ်ပါ
        os.environ['DEBUG'] = 'False'
        
        # လုံခြုံသော ခေါင်းစီးများ သတ်မှတ်ပါ
        os.environ['SECURE_SSL_REDIRECT'] = 'True'
        os.environ['SECURE_HSTS_SECONDS'] = '31536000'
        os.environ['SECURE_CONTENT_TYPE_NOSNIFF'] = 'True'
        os.environ['SECURE_BROWSER_XSS_FILTER'] = 'True'
```

## 💰 ကုန်ကျစရိတ် အမြှင့်တင်ခြင်း

### အရင်းအမြစ် စီမံခန့်ခွဲမှု

```python
class CostOptimizer:
    """Cost optimization strategies."""
    
    def __init__(self):
        self.metrics_collector = MetricsCollector()
        self.auto_scaler = AutoScaler()
    
    async def optimize_database_connections(self):
        """Dynamically adjust connection pool based on load."""
        
        current_load = await self.metrics_collector.get_current_load()
        
        if current_load < 0.3:  # အမိုးနည်းခြင်း
            target_pool_size = max(2, int(current_load * 10))
        elif current_load < 0.7:  # အမိုးလတ်ခြင်း
            target_pool_size = max(5, int(current_load * 15))
        else:  # အမိုးမြင့်ခြင်း
            target_pool_size = min(20, int(current_load * 25))
        
        await db_provider.adjust_pool_size(target_pool_size)
        
        logger.info(f"Adjusted pool size to {target_pool_size} for load {current_load}")
    
    async def implement_smart_caching(self):
        """Implement intelligent caching to reduce compute costs."""
        
        # စျေးကြီးသော လုပ်ဆောင်ချက်များကို သိမ်းဆည်းခြင်း
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

# အလိုအလျောက်အရွယ်တပ်ဆင်မှု ပြင်ဆင်မှု
class AutoScaler:
    """Automatic scaling based on metrics."""
    
    async def scale_decision(self) -> str:
        """Determine scaling action based on metrics."""
        
        metrics = await self.collect_scaling_metrics()
        
        # CPU အခြေခံ တိုးချဲ့ခြင်း
        if metrics['cpu_usage'] > 80:
            return "scale_up"
        elif metrics['cpu_usage'] < 20 and metrics['instance_count'] > 1:
            return "scale_down"
        
        # မွတ်စနစ် အခြေခံ တိုးချဲ့ခြင်း
        if metrics['memory_usage'] > 85:
            return "scale_up"
        
        # တောင်းဆိုမှုလိုင်း တိုးချဲ့ခြင်း
        if metrics['queue_length'] > 100:
            return "scale_up"
        elif metrics['queue_length'] < 10 and metrics['instance_count'] > 1:
            return "scale_down"
        
        return "no_action"
```

## 🔧 ပြုပြင်ထိန်းသိမ်းရေးနှင့် လုပ်ထုံးလုပ်နည်းများ

### ကျန်းမာရေး ကြီးကြပ်မှု

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
        
        # ဒေတာဘေ့စ် ကျန်းမာရေး
        db_health = await self.check_database_health()
        health_report["components"]["database"] = db_health
        
        # အပြင်ဘက်ဝန်ဆောင်မှုများ ကျန်းမာရေး
        ai_health = await self.check_ai_service_health()
        health_report["components"]["ai_service"] = ai_health
        
        # စနစ်ရင်းမြစ်များ
        system_health = await self.check_system_resources()
        health_report["components"]["system"] = system_health
        
        # လျှောက်လွှာ တိုင်းတာမှုများ
        app_health = await self.check_application_health()
        health_report["components"]["application"] = app_health
        
        # စုပေါင်း အခြေအနေ ကို သတ်မှတ်ရန်
        failed_components = [
            name for name, status in health_report["components"].items()
            if status.get("status") != "healthy"
        ]
        
        if failed_components:
            health_report["overall_status"] = "unhealthy"
            health_report["failed_components"] = failed_components
            
            # အလေးပေး သတိပေးချက်များ ထုတ်လုပ်ရန်
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
                # အခြေခံ ဆက်သွယ်မှု
                await conn.fetchval("SELECT 1")
                
                # ဓာတ်မတက် အမည်များ စစ်ဆေးရန်
                slow_queries = await conn.fetch("""
                    SELECT query, mean_exec_time, calls 
                    FROM pg_stat_statements 
                    WHERE mean_exec_time > 1000 
                    ORDER BY mean_exec_time DESC 
                    LIMIT 5
                """)
                
                # ဆက်သွယ်မှု အရေအတွက် စစ်ဆေးရန်
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

# အလိုအလျောက် မိတ္တူယူခြင်း နှင့် ပြန်လည်ရယူခြင်း
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
        
        # Azure Blob Storage သို့ ပြန်လည်တင်သည်
        await self.upload_backup_to_azure(backup_name)
        
        return backup_name
    
    async def schedule_automated_backups(self):
        """Schedule regular automated backups."""
        
        # နေ့စဉ် နံနက် ၂ နာရီ UTC အချိန်တွင် ပြည့်စုံ မိတ္တူယူခြင်း
        schedule.every().day.at("02:00").do(
            lambda: asyncio.create_task(self.create_backup("full"))
        )
        
        # နာရီ မှ တိုးတက်လာသော မိတ္တူယူခြင်းများ
        schedule.every().hour.do(
            lambda: asyncio.create_task(self.create_backup("incremental"))
        )
```

## 🌍 အသိုင်းအဝိုင်း ပံ့ပိုးမှုများ

### ဖွင့်လင်းအရင်းအမြစ် အကောင်းဆုံး လေ့ကျင့်မှုများ

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

### အသိုင်းအဝိုင်း မျှဝေမှု

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
            "follows_conventions": True,  # အမှန်တကယ် စစ်ဆေးမှုများကို ပြုလုပ်မည်
            "security_reviewed": pr_data.get("security_review", False),
            "performance_tested": pr_data.get("benchmark_results", False)
        }
```

## 🎯 ပြီးသွားသော အဓိက အချက်များ

ဒီကျယ်ပြန့်စုံလင်သော သင်ယူမှုလမ်းကြောင်းကို ပြီးဆုံးပြီးနောက် သင်သည် ကျွမ်းကျင်မှုရထားသည့် အချက်များမှာ -

✅ **စွမ်းဆောင်ရည်မြှင့်တင်ခြင်း** - ဒေတာဘေ့စ် တိုက်ဆိုင်မှု၊ အချိန်လွတ် ပုံစံများနှင့် Cache များ  
✅ **လုံခြုံရေး အားခွန်ခြင်း** - အတည်ပြုရေး၊ ခွင့်ပြုရေးနှင့် ဒေတာ ကာကွယ်ခြင်း  
✅ **ထုတ်လုပ်မှု Deployment** - Infrastructure as code နှင့် container အမြှင့်တင်ခြင်း  
✅ **ကုန်ကျစရိတ် စီမံခန့်ခွဲမှု** - အရင်းအမြစ် ကို အကောင်းဆုံးအသုံးပြုခြင်းနှင့် ဉာဏ်ရည်ဖြင့် ထိန်းချုပ်ခြင်း  
✅ **စီမံခန့်ခွဲမှု ကျွမ်းကျင်မှု** - ကြီးကြပ်မှု၊ ထိန်းသိမ်းမှုနှင့် အလိုအလျောက်လုပ်ဆောင်မှု  
✅ **အသိုင်းအဝိုင်း စကားဝိုင်း** - MCP ပတ်ဝန်းကျင်အား ထောက်ပံ့ပေးခြင်း  

## 🏆 အသိအမှတ်ပြုမှုနှင့် နောက်တစ်ဆင့်

### လက်တွေ့ သုံးသပ်မှု

သင့်ကျွမ်းကျင်မှုကို ပြသရန် နောက်ဆုံးပရောဂျက်ကို ပြီးမြောက်ပါ။

**ထုတ်လုပ်မှုအဆင့်သင့် MCP Server တည်ဆောက်ပါ** - အောက်ပါအရာများပါဝင်သည်:
- [ ] RLSဖြင့် မျိုးစုံ စတိုးဆိုင်ရောင်းအားဆန်းစစ်ခြင်း
- [ ] Azure OpenAI ဖြင့် Semantic ရှာဖွေရေး
- [ ] လုံခြုံရေးစနစ် အပြည့်အစုံ တပ်ဆင်ခြင်း
- [ ] Azure ပေါ်တွင် ထုတ်လုပ်မှု Deployment
- [ ] ကြီးကြပ်မှုနှင့် သတိပေးချက်များ စနစ်တကျ စီစဉ်ခြင်း
- [ ] စာတမ်းနှင့် စမ်းသပ်မှု

### အဆင့်မြှင့်သင်ယူမှုလမ်းကြောင်းများ

MCP ခရီးကို ဆက်လက်ရန်

- **MCP ဆင်ခြင်မှု ပုံစံများ**: အဆင့်မြင့် server ဆင်ခြင်မှုများ  
- **မျိုးစုံ Model ပေါင်းစည်းမှု**: မတူကွဲပြားသော AI Model များ ပေါင်းစည်းခြင်း  
- **စီးပွားရေးအရွယ်အစား**: ကြီးမားသော MCP Deployment များ  
- **စိတ်ကြိုက် ကိရိယာ ဖန်တီးမှု**: အထူး MCP ကိရိယာများ ဆောက်လုပ်ခြင်း  
- **MCP ပတ်ဝန်းကျင်**: ပိုမိုကျယ်ပြန့်သော အသိုင်းအဝိုင်းအား ပံ့ပိုးပေးခြင်း  

### အသိုင်းအဝိုင်း ရရှိမှု

သင့်အောင်မြင်မှုကို မျှဝေပါ
- **GitHub အမှတ်တံဆိပ်ပြကြည့်ခြင်း**: သင်၏ အကောင်အထည်ဖော်မှုကို ပြသခြင်း  
- **အသိုင်းအဝိုင်း ပံ့ပိုးမှု**: တိုးတက်မှုများ သို့မဟုတ် ကိုယ်ပိုင် ဥပမာများ တင်ပြခြင်း  
- **စကားပြော အခွင့်အလမ်းများ**: တွေ့ဆုံ၊ ဆွေးနွေးပွဲများတွင် တက်ရောက်ခြင်း  
- **မန်တာလမ်းညွှန်ခြင်း**: အခြား developers များကို MCP သင်ကြားပေးခြင်း  

## 📚 ထပ်ဆောင်း အရင်းအမြစ်များ

### အဆင့်မြင့် ခေါင်းစဉ်များ
- [PostgreSQL Performance Tuning](https://www.postgresql.org/docs/current/performance-tips.html) - ဒေတာဘေ့စ် အကောင်းဆုံးလုပ်ထုံးလုပ်နည်း  
- [Azure Container Apps Best Practices](https://docs.microsoft.com/azure/container-apps/overview) - ထုတ်လုပ်မှု Deployment  
- [Python Async Best Practices](https://docs.python.org/3/library/asyncio-dev.html) - အချိန်လွတ် programming

### လုံခြုံရေး အရင်းအမြစ်များ
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - လုံခြုံရေး အားနည်းချက်များ  
- [Azure Security Best Practices](https://docs.microsoft.com/azure/security/) - တိုက်ဆိုင်မှု လုပ်ငန်းသုံး လုံခြုံရေး  
- [Python Security Guidelines](https://python.org/dev/security/) - လုံခြုံသော ကုဒ်ရေးဆွဲခြင်း  

### အသိုင်းအဝိုင်း
- [MCP Community Discord](https://discord.com/invite/ByRwuEEgH4) - တိုက်ရိုက် ဆွေးနွေးမှုများ  
- [GitHub Discussions](https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail/discussions) - မေးမြန်းမှုနှင့် မျှဝေမှု  
- [Stack Overflow](https://stackoverflow.com/questions/tagged/model-context-protocol) - နည်းပညာမေးခွန်းများ  

---

**🎉 ဂုဏ်ယူစရာပါ!** သင်သည် MCP Database Integration ကျယ်ပြန့်စွာ လေ့လာမှု လမ်းကြောင်းကို ပြီးမြောက်သွားပါပြီ။ သင်တွင် ထုတ်လုပ်မှုအဆင့်သင့် MCP server များကို AI အကူအညီများနှင့် အပြင်လောက သတင်းအချက်အလက်စနစ်များတစ်ဆက်တည်း ချိတ်ဆက်နိုင်ရာ ကျွမ်းကျင်မှုရှိပါပြီ။

**အကူအညီပေးလိုပါသလား?** ကျွန်ုပ်တို့ အသိုင်းအဝိုင်း တွင် အတူပါဝင်ပြီး သင်၏ အတွေ့အကြုံများကို မျှဝေခြင်း၊ ကုဒ်တိုးတက်မှု ပံ့ပိုးခြင်း သို့မဟုတ် ထပ်မံ သင်ကြားမှု အရင်းအမြစ်များ ဖန်တီးခြင်းမှတစ်ဆင့် MCP သင်ကြားမှု၌ ကူညီပါ။

**နောက်တစ်ဆင့်**: [Tooling](../../12-tooling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ပြောကြားချက်**
ဤစာတမ်းကို AI ဘာသာပြန်ဝန်ဆောင်မှု [Co-op Translator](https://github.com/Azure/co-op-translator) အသုံးပြု၍ ဘာသာပြန်ထားပါသည်။ ကျွန်ုပ်တို့သည် တိကျမှန်ကန်မှုအတွက် ကြိုးပမ်းနေသော်လည်း၊ စက်ကိရိယာဘာသာပြန်ခြင်းများတွင် အမှားများ သို့မဟုတ် မှားယွင်းချက်များ ပါဝင်နိုင်ကြောင်း သတိပြုပါရန် လိုအပ်ပါသည်။ မူလစာတမ်းကို မူရင်းဘာသာဖြင့်သာ ယုံကြည်စိတ်ချရသော အချက်အလက်အဖြစ် သတ်မှတ်သင့်သည်။ အရေးကြီးသည့် သတင်းအချက်အလက်များအတွက် ပရော်ဖက်ရှင်နယ် လူသားဘာသာပြန်သူဝန်ဆောင်မှုကို အကြံပြုပါသည်။ ဤဘာသာပြန်ချက်ကို အသုံးပြုခြင်းမှ ဖြစ်ပေါ်လာသော နားလည်မှုကွာခြားမှုများ သို့မဟုတ် မမှန်ကန်သော အသုံးပြုမှုများအတွက် ကျွန်ုပ်တို့ တာဝန်မခံပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->