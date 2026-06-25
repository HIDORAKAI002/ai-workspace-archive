# Thực hành tốt nhất và Tối ưu hóa

## 🎯 Những gì bài tập này bao phủ

Bài tập kết thúc này tập hợp các thực hành tốt nhất, kỹ thuật tối ưu hóa và hướng dẫn sản xuất để xây dựng các máy chủ MCP mạnh mẽ, có khả năng mở rộng và bảo mật cao với tích hợp cơ sở dữ liệu. Bạn sẽ học hỏi từ kinh nghiệm thực tế và tiêu chuẩn ngành để đảm bảo triển khai của bạn sẵn sàng cho môi trường sản xuất.

## Tổng quan

Xây dựng một máy chủ MCP thành công không chỉ là làm cho mã chạy được. Bài tập này bao gồm các thực hành thiết yếu phân biệt các triển khai minh chứng ý tưởng với các hệ thống sẵn sàng sản xuất có thể mở rộng, hoạt động ổn định, và duy trì các tiêu chuẩn bảo mật.

Các thực hành tốt nhất này được rút ra từ các triển khai thực tế, phản hồi cộng đồng, và bài học từ các dự án doanh nghiệp.

## Mục tiêu học tập

Sau khi hoàn thành bài tập này, bạn sẽ có thể:

- **Áp dụng** kỹ thuật tối ưu hóa hiệu năng cho máy chủ MCP và cơ sở dữ liệu  
- **Triển khai** các biện pháp làm cứng bảo mật toàn diện  
- **Thiết kế** các mẫu kiến trúc có thể mở rộng cho môi trường sản xuất  
- **Thiết lập** quy trình giám sát, bảo trì và vận hành  
- **Tối ưu hóa** chi phí trong khi duy trì hiệu suất và độ tin cậy  
- **Đóng góp** cho cộng đồng và hệ sinh thái MCP  

## 🚀 Tối ưu hóa hiệu năng

### Hiệu năng cơ sở dữ liệu

#### Tối ưu hóa nhóm kết nối

```python
# Cấu hình tối ưu hóa nhóm kết nối
POOL_CONFIG = {
    # Cấu hình kích thước
    "min_size": max(2, cpu_count()),           # Tối thiểu 2, điều chỉnh theo CPU
    "max_size": min(20, cpu_count() * 4),     # Giới hạn ở mức tối đa hợp lý
    
    # Cấu hình thời gian
    "max_inactive_connection_lifetime": 300,   # 5 phút
    "command_timeout": 30,                     # 30 giây
    "max_queries": 50000,                      # Xoay vòng kết nối
    
    # Cài đặt PostgreSQL
    "server_settings": {
        "application_name": "mcp-server-prod",
        "jit": "off",                          # Tắt để đảm bảo nhất quán
        "work_mem": "8MB",                     # Tối ưu cho truy vấn
        "shared_preload_libraries": "pg_stat_statements",
        "log_statement": "mod",                # Chỉ ghi nhật ký các sửa đổi
        "log_min_duration_statement": "1s",   # Ghi nhật ký các truy vấn chậm
    }
}
```

#### Mẫu tối ưu hóa truy vấn

```python
class QueryOptimizer:
    """Database query optimization utilities."""
    
    def __init__(self):
        self.query_cache = {}
        self.slow_query_threshold = 1.0  # giây
        
    async def execute_optimized_query(
        self, 
        query: str, 
        params: tuple = None,
        cache_key: str = None,
        cache_ttl: int = 300
    ):
        """Execute query with optimization and caching."""
        
        # Kiểm tra bộ nhớ đệm trước
        if cache_key and cache_key in self.query_cache:
            cache_entry = self.query_cache[cache_key]
            if time.time() - cache_entry['timestamp'] < cache_ttl:
                return cache_entry['result']
        
        # Thực thi với giám sát
        start_time = time.time()
        
        try:
            async with db_provider.get_connection() as conn:
                # Tối ưu hóa thực thi truy vấn
                await conn.execute("SET enable_seqscan = off")  # Ưu tiên các chỉ mục
                await conn.execute("SET work_mem = '16MB'")     # Thêm bộ nhớ cho truy vấn này
                
                result = await conn.fetch(query, *params if params else ())
                
                duration = time.time() - start_time
                
                # Ghi lại các truy vấn chậm
                if duration > self.slow_query_threshold:
                    logger.warning(f"Slow query detected: {duration:.2f}s", extra={
                        "query": query[:200],
                        "duration": duration,
                        "params_count": len(params) if params else 0
                    })
                
                # Bộ nhớ đệm kết quả thành công
                if cache_key and len(result) < 1000:  # Không lưu bộ nhớ đệm kết quả lớn
                    self.query_cache[cache_key] = {
                        'result': result,
                        'timestamp': time.time()
                    }
                
                return result
                
        except Exception as e:
            logger.error(f"Query optimization failed: {e}")
            raise

# Khuyến nghị chỉ mục
RECOMMENDED_INDEXES = [
    # Chỉ mục kinh doanh cốt lõi
    "CREATE INDEX CONCURRENTLY idx_orders_store_date ON retail.orders (store_id, order_date DESC);",
    "CREATE INDEX CONCURRENTLY idx_order_items_product ON retail.order_items (product_id);",
    "CREATE INDEX CONCURRENTLY idx_customers_store_email ON retail.customers (store_id, email);",
    
    # Chỉ mục phân tích
    "CREATE INDEX CONCURRENTLY idx_orders_date_amount ON retail.orders (order_date, total_amount);",
    "CREATE INDEX CONCURRENTLY idx_products_category_price ON retail.products (category_id, unit_price);",
    
    # Tối ưu hóa tìm kiếm vector
    "CREATE INDEX CONCURRENTLY idx_embeddings_vector ON retail.product_description_embeddings USING ivfflat (description_embedding vector_cosine_ops) WITH (lists = 100);",
]
```

### Hiệu năng ứng dụng

#### Thực hành tốt nhất về lập trình bất đồng bộ

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
        
        # Xử lý theo lô để tránh làm hệ thống quá tải
        results = []
        for i in range(0, len(items), batch_size):
            batch = items[i:i + batch_size]
            batch_results = await process_batch(batch)
            results.extend(batch_results)
            
            # Trì hoãn nhỏ giữa các lô để ngăn ngừa cạn kiệt tài nguyên
            if i + batch_size < len(items):
                await asyncio.sleep(0.1)
        
        return results
    
    @circuit_breaker_decorator
    async def resilient_operation(self, operation: callable, *args, **kwargs):
        """Execute operation with circuit breaker protection."""
        return await operation(*args, **kwargs)

# Triển khai bộ ngắt mạch
class CircuitBreaker:
    """Circuit breaker for external service calls."""
    
    def __init__(self, failure_threshold: int = 5, recovery_timeout: int = 60):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.failure_count = 0
        self.last_failure_time = None
        self.state = "CLOSED"  # ĐÓNG, MỞ, NỬA MỞ
    
    async def call(self, func, *args, **kwargs):
        """Execute function with circuit breaker protection."""
        
        if self.state == "OPEN":
            if time.time() - self.last_failure_time > self.recovery_timeout:
                self.state = "HALF_OPEN"
            else:
                raise Exception("Circuit breaker is OPEN")
        
        try:
            result = await func(*args, **kwargs)
            
            # Đặt lại khi thành công
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

### Chiến lược bộ nhớ đệm

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
        
        # Cấp 1: Bộ nhớ đệm
        if key in self.memory_cache:
            return self.memory_cache[key]['value']
        
        # Cấp 2: Bộ nhớ đệm Redis
        if self.redis_client:
            try:
                cached_data = self.redis_client.get(key)
                if cached_data:
                    value = pickle.loads(cached_data)
                    
                    # Thăng cấp lên bộ nhớ đệm
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
        
        # Thực hiện loại bỏ LRU
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

# Tạo khóa bộ nhớ đệm
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

## 🔒 Làm cứng bảo mật

### Xác thực và Ủy quyền

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
        
        # Trích xuất và xác thực xác thực
        auth_token = request_headers.get("authorization", "").replace("Bearer ", "")
        if not auth_token:
            raise AuthenticationError("Missing authentication token")
        
        # Xác thực token
        user_context = await self._validate_token(auth_token)
        
        # Kiểm tra giới hạn tốc độ
        await self._check_rate_limit(user_context["user_id"])
        
        # Xác thực ngữ cảnh RLS
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
            # Lấy khóa công khai từ Key Vault hoặc bộ nhớ đệm
            public_key = await self._get_public_key()
            
            # Giải mã và xác thực token
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
        
        # Quản trị viên siêu cấp có thể truy cập bất kỳ ngữ cảnh nào
        if "super_admin" in user_context["roles"]:
            return True
        
        # Quản lý cửa hàng chỉ có thể truy cập cửa hàng của họ
        if "store_manager" in user_context["roles"]:
            allowed_stores = user_context.get("allowed_stores", [])
            return rls_user_id in allowed_stores
        
        # Quản lý khu vực có thể truy cập nhiều cửa hàng
        if "regional_manager" in user_context["roles"]:
            allowed_regions = user_context.get("allowed_regions", [])
            return self._check_store_in_regions(rls_user_id, allowed_regions)
        
        return False

# Xác thực và làm sạch dữ liệu nhập
class InputValidator:
    """SQL injection prevention and input validation."""
    
    @staticmethod
    def validate_sql_query(query: str) -> bool:
        """Validate SQL query for safety."""
        
        # Các mẫu bị cấm
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
        
        # Chỉ cho phép câu lệnh SELECT
        if not query_upper.strip().startswith("SELECT"):
            return False
        
        return True
    
    @staticmethod
    def sanitize_table_name(table_name: str) -> str:
        """Sanitize table name input."""
        
        # Chỉ cho phép chữ số, chữ cái, gạch dưới và dấu chấm
        if not re.match(r"^[a-zA-Z0-9_.]+$", table_name):
            raise ValueError("Invalid table name format")
        
        # Xác thực đối với các bảng được phép
        if table_name not in VALID_TABLES:
            raise ValueError(f"Table {table_name} not allowed")
        
        return table_name
```

### Bảo vệ dữ liệu

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
        
        # Trong môi trường sản xuất, lấy từ Azure Key Vault
        key_vault_secret = os.getenv("ENCRYPTION_KEY_SECRET_NAME")
        if key_vault_secret and self.key_vault_client:
            secret = self.key_vault_client.get_secret(key_vault_secret)
            return secret.value.encode()
        
        # Phương án dự phòng cho phát triển (không dùng trong sản xuất!)
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
            100000  # số lần lặp lại
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

## 📊 Hướng dẫn triển khai sản xuất

### Cơ sở hạ tầng dưới dạng mã

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

### Tối ưu hóa container

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

### Cấu hình môi trường

```python
# Quản lý cấu hình sản xuất
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
        
        # Đặt bộ ghi log của bên thứ ba thành CẢNH BÁO
        logging.getLogger('azure').setLevel(logging.WARNING)
        logging.getLogger('urllib3').setLevel(logging.WARNING)
    
    def configure_security(self):
        """Configure production security settings."""
        
        # Vô hiệu hóa chế độ gỡ lỗi
        os.environ['DEBUG'] = 'False'
        
        # Đặt tiêu đề bảo mật
        os.environ['SECURE_SSL_REDIRECT'] = 'True'
        os.environ['SECURE_HSTS_SECONDS'] = '31536000'
        os.environ['SECURE_CONTENT_TYPE_NOSNIFF'] = 'True'
        os.environ['SECURE_BROWSER_XSS_FILTER'] = 'True'
```

## 💰 Tối ưu hóa chi phí

### Quản lý tài nguyên

```python
class CostOptimizer:
    """Cost optimization strategies."""
    
    def __init__(self):
        self.metrics_collector = MetricsCollector()
        self.auto_scaler = AutoScaler()
    
    async def optimize_database_connections(self):
        """Dynamically adjust connection pool based on load."""
        
        current_load = await self.metrics_collector.get_current_load()
        
        if current_load < 0.3:  # Tải thấp
            target_pool_size = max(2, int(current_load * 10))
        elif current_load < 0.7:  # Tải trung bình
            target_pool_size = max(5, int(current_load * 15))
        else:  # Tải cao
            target_pool_size = min(20, int(current_load * 25))
        
        await db_provider.adjust_pool_size(target_pool_size)
        
        logger.info(f"Adjusted pool size to {target_pool_size} for load {current_load}")
    
    async def implement_smart_caching(self):
        """Implement intelligent caching to reduce compute costs."""
        
        # Bộ nhớ đệm các thao tác tốn kém
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

# Cấu hình tự động mở rộng
class AutoScaler:
    """Automatic scaling based on metrics."""
    
    async def scale_decision(self) -> str:
        """Determine scaling action based on metrics."""
        
        metrics = await self.collect_scaling_metrics()
        
        # Mở rộng dựa trên CPU
        if metrics['cpu_usage'] > 80:
            return "scale_up"
        elif metrics['cpu_usage'] < 20 and metrics['instance_count'] > 1:
            return "scale_down"
        
        # Mở rộng dựa trên bộ nhớ
        if metrics['memory_usage'] > 85:
            return "scale_up"
        
        # Mở rộng hàng đợi yêu cầu
        if metrics['queue_length'] > 100:
            return "scale_up"
        elif metrics['queue_length'] < 10 and metrics['instance_count'] > 1:
            return "scale_down"
        
        return "no_action"
```

## 🔧 Bảo trì và vận hành

### Giám sát sức khỏe hệ thống

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
        
        # Tình trạng cơ sở dữ liệu
        db_health = await self.check_database_health()
        health_report["components"]["database"] = db_health
        
        # Tình trạng dịch vụ bên ngoài
        ai_health = await self.check_ai_service_health()
        health_report["components"]["ai_service"] = ai_health
        
        # Tài nguyên hệ thống
        system_health = await self.check_system_resources()
        health_report["components"]["system"] = system_health
        
        # Chỉ số ứng dụng
        app_health = await self.check_application_health()
        health_report["components"]["application"] = app_health
        
        # Xác định trạng thái tổng thể
        failed_components = [
            name for name, status in health_report["components"].items()
            if status.get("status") != "healthy"
        ]
        
        if failed_components:
            health_report["overall_status"] = "unhealthy"
            health_report["failed_components"] = failed_components
            
            # Kích hoạt cảnh báo
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
                # Kết nối cơ bản
                await conn.fetchval("SELECT 1")
                
                # Kiểm tra các truy vấn chậm
                slow_queries = await conn.fetch("""
                    SELECT query, mean_exec_time, calls 
                    FROM pg_stat_statements 
                    WHERE mean_exec_time > 1000 
                    ORDER BY mean_exec_time DESC 
                    LIMIT 5
                """)
                
                # Kiểm tra số lượng kết nối
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

# Sao lưu và khôi phục tự động
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
        
        # Tải lên Azure Blob Storage
        await self.upload_backup_to_azure(backup_name)
        
        return backup_name
    
    async def schedule_automated_backups(self):
        """Schedule regular automated backups."""
        
        # Sao lưu toàn bộ hàng ngày lúc 2 giờ sáng UTC
        schedule.every().day.at("02:00").do(
            lambda: asyncio.create_task(self.create_backup("full"))
        )
        
        # Sao lưu tăng dần hàng giờ
        schedule.every().hour.do(
            lambda: asyncio.create_task(self.create_backup("incremental"))
        )
```

## 🌍 Đóng góp cộng đồng

### Thực hành tốt nhất về mã nguồn mở

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

### Tham gia cộng đồng

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
            "follows_conventions": True,  # Sẽ thực hiện các kiểm tra thực tế
            "security_reviewed": pr_data.get("security_review", False),
            "performance_tested": pr_data.get("benchmark_results", False)
        }
```

## 🎯 Những điểm cần nhớ chính

Sau khi hoàn thành lộ trình học tập toàn diện này, bạn sẽ thành thạo:

✅ **Tối ưu hóa hiệu năng**: Tuning cơ sở dữ liệu, mẫu async, và chiến lược bộ nhớ đệm  
✅ **Làm cứng bảo mật**: Xác thực, ủy quyền và bảo vệ dữ liệu  
✅ **Triển khai sản xuất**: Cơ sở hạ tầng dưới dạng mã và tối ưu container  
✅ **Quản lý chi phí**: Tối ưu tài nguyên và mở rộng thông minh  
✅ **Vận hành xuất sắc**: Giám sát, bảo trì và tự động hóa  
✅ **Tham gia cộng đồng**: Đóng góp cho hệ sinh thái MCP  

## 🏆 Chứng chỉ và Các bước tiếp theo

### Đánh giá thực hành

Hoàn thành dự án cuối cùng này để chứng minh khả năng của bạn:

**Xây dựng một máy chủ MCP sẵn sàng sản xuất** bao gồm:  
- [ ] Phân tích bán lẻ đa khách hàng với RLS  
- [ ] Tìm kiếm ngữ nghĩa với Azure OpenAI  
- [ ] Triển khai bảo mật toàn diện  
- [ ] Triển khai sản xuất trên Azure  
- [ ] Thiết lập giám sát và cảnh báo  
- [ ] Tài liệu và kiểm thử  

### Lộ trình học nâng cao

Tiếp tục hành trình MCP của bạn với:

- **Mẫu kiến trúc MCP**: Kiến trúc máy chủ nâng cao  
- **Tích hợp đa mô hình**: Kết hợp các mô hình AI khác nhau  
- **Quy mô doanh nghiệp**: Triển khai MCP quy mô lớn  
- **Phát triển công cụ tùy chỉnh**: Xây dựng công cụ MCP chuyên biệt  
- **Hệ sinh thái MCP**: Đóng góp cho cộng đồng rộng lớn hơn  

### Công nhận cộng đồng

Chia sẻ thành tựu của bạn:  
- **Hồ sơ GitHub**: Trưng bày triển khai của bạn  
- **Đóng góp cộng đồng**: Gửi cải tiến hoặc ví dụ  
- **Cơ hội nói chuyện**: Thuyết trình tại các buổi gặp mặt hoặc hội nghị  
- **Hướng dẫn**: Giúp đỡ các nhà phát triển khác học MCP  

## 📚 Tài nguyên bổ sung

### Chủ đề nâng cao
- [Điều chỉnh hiệu năng PostgreSQL](https://www.postgresql.org/docs/current/performance-tips.html) - Tối ưu cơ sở dữ liệu  
- [Thực hành tốt nhất Azure Container Apps](https://docs.microsoft.com/azure/container-apps/overview) - Triển khai sản xuất  
- [Thực hành tốt nhất Python Async](https://docs.python.org/3/library/asyncio-dev.html) - Lập trình bất đồng bộ  

### Tài nguyên về bảo mật
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Lỗ hổng bảo mật phổ biến  
- [Thực hành bảo mật Azure](https://docs.microsoft.com/azure/security/) - Bảo mật đám mây  
- [Hướng dẫn bảo mật Python](https://python.org/dev/security/) - Lập trình an toàn  

### Cộng đồng
- [Cộng đồng MCP Discord](https://discord.com/invite/ByRwuEEgH4) - Thảo luận trực tiếp  
- [Thảo luận GitHub](https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail/discussions) - Hỏi đáp và chia sẻ  
- [Stack Overflow](https://stackoverflow.com/questions/tagged/model-context-protocol) - Câu hỏi kỹ thuật  

---

**🎉 Chúc mừng!** Bạn đã hoàn thành lộ trình học tích hợp cơ sở dữ liệu MCP toàn diện. Bạn giờ đây có kiến thức và kỹ năng để xây dựng các máy chủ MCP sẵn sàng sản xuất kết nối trợ lý AI với các hệ thống dữ liệu thực tế.

**Sẵn sàng đóng góp?** Tham gia cộng đồng của chúng tôi và giúp người khác học MCP bằng cách chia sẻ kinh nghiệm, đóng góp cải tiến mã, hoặc tạo tài nguyên học tập bổ sung.

**Tiếp theo**: [Tooling](../../12-tooling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->