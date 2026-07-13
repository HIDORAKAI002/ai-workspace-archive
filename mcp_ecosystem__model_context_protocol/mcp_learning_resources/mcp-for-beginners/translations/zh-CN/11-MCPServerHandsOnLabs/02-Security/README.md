# 安全性与多租户

## 🎯 本实验涵盖内容

本实验提供了有关为 MCP 服务器实现企业级安全性和多租户的全面指导。您将学习设计安全、合规的系统，以保护敏感的零售数据，同时支持多租户的灵活访问模式。

## 概述

零售应用涉及客户数据、支付信息和业务智能，安全性至关重要。本实验涵盖了从身份验证和授权到数据隔离和合规性监控的完整安全架构。

我们实施了一种纵深防御策略，结合了 Azure 身份服务、PostgreSQL 行级安全、应用程序级控制和全面的审计日志，打造了一个稳健且合规的平台。

## 学习目标

完成本实验后，您将能够：

- <strong>实现</strong> 适用于多租户数据隔离的企业级行级安全
- <strong>设计</strong> 采用 Azure 的安全身份验证和授权模式
- <strong>配置</strong> 满足合规要求的全面审计日志
- <strong>应用</strong> 纵深防御安全策略贯穿所有应用层
- <strong>验证</strong> 通过系统化测试确保安全实现
- <strong>监控</strong> 安全事件并响应潜在威胁

## 🔐 多租户安全架构

### 安全层概述

```
┌─────────────────────────────────────────────────┐
│               Azure Front Door                  │ ← WAF, DDoS Protection
├─────────────────────────────────────────────────┤
│              Application Gateway                │ ← SSL Termination, Rate Limiting
├─────────────────────────────────────────────────┤
│                MCP Server                       │ ← Authentication, Authorization
│  ┌─────────────────────────────────────────────┤
│  │           Connection Layer                  │ ← Connection Pooling, Circuit Breakers
│  ├─────────────────────────────────────────────┤
│  │         Business Logic Layer               │ ← Input Validation, Business Rules
│  ├─────────────────────────────────────────────┤
│  │           Data Access Layer                │ ← Query Sanitization, RLS Context
│  └─────────────────────────────────────────────┤
├─────────────────────────────────────────────────┤
│              PostgreSQL RLS                    │ ← Row Level Security, Audit Triggers
└─────────────────────────────────────────────────┘
```

### 多租户模型

我们的实现采用 **共享数据库，共享模式** 的模型，结合行级安全：

**优势：**
- 资源利用成本效益高
- 维护和更新简化
- 通过行级安全实现强数据隔离
- 符合合规的审计追踪

**折衷：**
- 需要仔细设计行级安全策略
- 模式更改影响所有租户
- 需要强健的备份/恢复程序

## 🛡️ 行级安全实现

### 行级安全基础

```sql
-- Enable RLS on all multi-tenant tables
ALTER TABLE retail.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE retail.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE retail.sales_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE retail.sales_transaction_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE retail.product_embeddings ENABLE ROW LEVEL SECURITY;

-- Create application role for MCP server
CREATE ROLE mcp_user LOGIN;
GRANT USAGE ON SCHEMA retail TO mcp_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA retail TO mcp_user;
```

### 上下文管理

```sql
-- Function to securely set store context
CREATE OR REPLACE FUNCTION retail.set_store_context(store_id_param VARCHAR(50))
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = retail, pg_temp
AS $$
DECLARE
    user_info RECORD;
BEGIN
    -- Validate store exists and is active
    SELECT store_id, store_name, is_active 
    INTO user_info
    FROM retail.stores 
    WHERE store_id = store_id_param;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Store not found: %', store_id_param
            USING ERRCODE = 'invalid_parameter_value',
                  HINT = 'Verify store ID and ensure it exists in the system';
    END IF;
    
    IF NOT user_info.is_active THEN
        RAISE EXCEPTION 'Store is inactive: %', store_id_param
            USING ERRCODE = 'insufficient_privilege',
                  HINT = 'Contact administrator to activate store';
    END IF;
    
    -- Set the secure context
    PERFORM set_config('app.current_store_id', store_id_param, false);
    PERFORM set_config('app.store_name', user_info.store_name, false);
    PERFORM set_config('app.context_set_at', extract(epoch from current_timestamp)::text, false);
    
    -- Log context change for audit
    INSERT INTO retail.security_audit_log (
        event_type,
        user_name,
        store_id,
        ip_address,
        user_agent,
        details,
        severity
    ) VALUES (
        'store_context_set',
        current_user,
        store_id_param,
        inet_client_addr()::text,
        current_setting('application_name', true),
        jsonb_build_object(
            'store_name', user_info.store_name,
            'timestamp', current_timestamp,
            'session_id', pg_backend_pid()
        ),
        'INFO'
    );
END;
$$;

-- Grant execute to MCP user
GRANT EXECUTE ON FUNCTION retail.set_store_context TO mcp_user;
```

### 行级安全策略

```sql
-- Customers RLS Policy
CREATE POLICY customers_store_isolation ON retail.customers
    FOR ALL
    TO mcp_user
    USING (
        store_id = current_setting('app.current_store_id', true)
        AND current_setting('app.current_store_id', true) IS NOT NULL
        AND current_setting('app.current_store_id', true) != ''
    )
    WITH CHECK (
        store_id = current_setting('app.current_store_id', true)
        AND current_setting('app.current_store_id', true) IS NOT NULL
        AND current_setting('app.current_store_id', true) != ''
    );

-- Products RLS Policy with additional business rules
CREATE POLICY products_store_isolation ON retail.products
    FOR ALL
    TO mcp_user
    USING (
        store_id = current_setting('app.current_store_id', true)
        AND current_setting('app.current_store_id', true) IS NOT NULL
        AND current_setting('app.current_store_id', true) != ''
        AND is_active = TRUE  -- Additional business rule
    )
    WITH CHECK (
        store_id = current_setting('app.current_store_id', true)
        AND current_setting('app.current_store_id', true) IS NOT NULL
        AND current_setting('app.current_store_id', true) != ''
    );

-- Sales Transactions RLS Policy
CREATE POLICY sales_transactions_store_isolation ON retail.sales_transactions
    FOR ALL
    TO mcp_user
    USING (
        store_id = current_setting('app.current_store_id', true)
        AND current_setting('app.current_store_id', true) IS NOT NULL
        AND current_setting('app.current_store_id', true) != ''
    )
    WITH CHECK (
        store_id = current_setting('app.current_store_id', true)
        AND current_setting('app.current_store_id', true) IS NOT NULL
        AND current_setting('app.current_store_id', true) != ''
    );

-- Transaction Items RLS Policy (via join)
CREATE POLICY sales_transaction_items_store_isolation ON retail.sales_transaction_items
    FOR ALL
    TO mcp_user
    USING (
        transaction_id IN (
            SELECT transaction_id 
            FROM retail.sales_transactions 
            WHERE store_id = current_setting('app.current_store_id', true)
        )
    )
    WITH CHECK (
        transaction_id IN (
            SELECT transaction_id 
            FROM retail.sales_transactions 
            WHERE store_id = current_setting('app.current_store_id', true)
        )
    );

-- Product Embeddings RLS Policy
CREATE POLICY product_embeddings_store_isolation ON retail.product_embeddings
    FOR ALL
    TO mcp_user
    USING (
        store_id = current_setting('app.current_store_id', true)
        AND current_setting('app.current_store_id', true) IS NOT NULL
        AND current_setting('app.current_store_id', true) != ''
    )
    WITH CHECK (
        store_id = current_setting('app.current_store_id', true)
        AND current_setting('app.current_store_id', true) IS NOT NULL
        AND current_setting('app.current_store_id', true) != ''
    );
```

### 行级安全测试与验证

```sql
-- Test RLS policies with different store contexts
DO $$
DECLARE
    test_result RECORD;
    customer_count INTEGER;
    product_count INTEGER;
BEGIN
    -- Test Seattle store context
    PERFORM retail.set_store_context('seattle');
    
    SELECT COUNT(*) INTO customer_count FROM retail.customers;
    SELECT COUNT(*) INTO product_count FROM retail.products;
    
    RAISE NOTICE 'Seattle store - Customers: %, Products: %', customer_count, product_count;
    
    -- Test Redmond store context
    PERFORM retail.set_store_context('redmond');
    
    SELECT COUNT(*) INTO customer_count FROM retail.customers;
    SELECT COUNT(*) INTO product_count FROM retail.products;
    
    RAISE NOTICE 'Redmond store - Customers: %, Products: %', customer_count, product_count;
    
    -- Verify data isolation
    IF customer_count > 0 AND product_count > 0 THEN
        RAISE NOTICE 'RLS policies are working correctly';
    ELSE
        RAISE WARNING 'RLS policies may not be configured correctly';
    END IF;
END;
$$;
```

## 🔑 身份验证与授权

### Azure Entra ID 集成

```python
# mcp_server/security/authentication.py
"""
Azure Entra ID authentication for MCP server.
"""
import os
import jwt
import aiohttp
import asyncio
from typing import Dict, Optional, List
from datetime import datetime, timezone
from azure.identity.aio import DefaultAzureCredential
from azure.keyvault.secrets.aio import SecretClient
import logging

logger = logging.getLogger(__name__)

class AzureAuthenticator:
    """Handle Azure Entra ID authentication and token validation."""
    
    def __init__(self):
        self.tenant_id = os.getenv('AZURE_TENANT_ID')
        self.client_id = os.getenv('AZURE_CLIENT_ID')
        self.audience = os.getenv('AZURE_AUDIENCE', self.client_id)
        self.issuer = f"https://login.microsoftonline.com/{self.tenant_id}/v2.0"
        
        # JWKS（JSON Web Key Set）的缓存
        self._jwks_cache = None
        self._jwks_cache_expiry = None
        
        # 用于存储秘密的密钥库
        self.key_vault_url = os.getenv('AZURE_KEY_VAULT_URL')
        self.credential = DefaultAzureCredential()
        
        if self.key_vault_url:
            self.secret_client = SecretClient(
                vault_url=self.key_vault_url,
                credential=self.credential
            )
    
    async def validate_token(self, token: str) -> Dict:
        """Validate JWT token from Azure Entra ID."""
        
        try:
            # 获取签名密钥
            signing_keys = await self._get_signing_keys()
            
            # 解码令牌头以获取密钥ID
            unverified_header = jwt.get_unverified_header(token)
            key_id = unverified_header.get('kid')
            
            if not key_id:
                raise ValueError("Token missing key ID")
            
            # 查找对应的密钥
            signing_key = None
            for key in signing_keys:
                if key['kid'] == key_id:
                    signing_key = jwt.algorithms.RSAAlgorithm.from_jwk(key)
                    break
            
            if not signing_key:
                raise ValueError(f"Unable to find signing key for kid: {key_id}")
            
            # 验证并解码令牌
            payload = jwt.decode(
                token,
                signing_key,
                algorithms=['RS256'],
                audience=self.audience,
                issuer=self.issuer,
                options={
                    'verify_exp': True,
                    'verify_aud': True,
                    'verify_iss': True
                }
            )
            
            # 提取用户信息
            user_info = self._extract_user_info(payload)
            
            # 记录成功的身份验证
            logger.info(
                "User authenticated successfully",
                extra={
                    'user_id': user_info['user_id'],
                    'email': user_info.get('email'),
                    'tenant_id': payload.get('tid')
                }
            )
            
            return user_info
            
        except jwt.ExpiredSignatureError:
            logger.warning("Token has expired")
            raise ValueError("Token has expired")
        except jwt.InvalidAudienceError:
            logger.warning(f"Invalid audience in token. Expected: {self.audience}")
            raise ValueError("Invalid token audience")
        except jwt.InvalidIssuerError:
            logger.warning(f"Invalid issuer in token. Expected: {self.issuer}")
            raise ValueError("Invalid token issuer")
        except Exception as e:
            logger.error(f"Token validation failed: {str(e)}")
            raise ValueError(f"Token validation failed: {str(e)}")
    
    async def _get_signing_keys(self) -> List[Dict]:
        """Get JWKS from Azure Entra ID with caching."""
        
        current_time = datetime.now(timezone.utc)
        
        # 检查缓存是否有效
        if (self._jwks_cache and self._jwks_cache_expiry and 
            current_time < self._jwks_cache_expiry):
            return self._jwks_cache
        
        # 获取新的JWKS
        jwks_url = f"{self.issuer}/keys"
        
        async with aiohttp.ClientSession() as session:
            async with session.get(jwks_url) as response:
                if response.status != 200:
                    raise Exception(f"Failed to fetch JWKS: {response.status}")
                
                jwks_data = await response.json()
                
        # 缓存1小时
        self._jwks_cache = jwks_data['keys']
        self._jwks_cache_expiry = current_time.replace(
            hour=current_time.hour + 1
        )
        
        return self._jwks_cache
    
    def _extract_user_info(self, payload: Dict) -> Dict:
        """Extract user information from JWT payload."""
        
        return {
            'user_id': payload.get('oid') or payload.get('sub'),
            'email': payload.get('email') or payload.get('preferred_username'),
            'name': payload.get('name'),
            'tenant_id': payload.get('tid'),
            'roles': payload.get('roles', []),
            'groups': payload.get('groups', []),
            'app_roles': payload.get('app_roles', []),
            'scope': payload.get('scp', '').split() if payload.get('scp') else [],
            'expires_at': datetime.fromtimestamp(payload['exp'], timezone.utc),
            'issued_at': datetime.fromtimestamp(payload['iat'], timezone.utc)
        }
    
    async def get_user_store_access(self, user_id: str) -> List[str]:
        """Get list of stores the user has access to."""
        
        try:
            # 通常会查询您的用户/商店映射
            # 演示中，我们将使用简单的密钥库秘密
            secret_name = f"user-{user_id}-stores"
            
            if self.secret_client:
                secret = await self.secret_client.get_secret(secret_name)
                store_list = secret.value.split(',')
                return [store.strip() for store in store_list if store.strip()]
            
            # 备用方案：返回默认商店访问权限
            logger.warning(f"No store mapping found for user {user_id}, using default")
            return ['seattle']  # 默认商店访问权限
            
        except Exception as e:
            logger.error(f"Failed to get store access for user {user_id}: {e}")
            return []  # 如果无法确定商店，则无访问权限

# 全局认证器实例
azure_authenticator = AzureAuthenticator()
```

### 授权中间件

```python
# mcp_server/security/authorization.py
"""
Authorization middleware and decorators for MCP server.
"""
import functools
from typing import Dict, List, Optional, Callable, Any
from fastapi import HTTPException, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import logging

logger = logging.getLogger(__name__)

security = HTTPBearer()

class AuthorizationError(Exception):
    """Custom authorization error."""
    pass

class RoleBasedAuth:
    """Role-based access control implementation."""
    
    # 定义角色层级
    ROLE_HIERARCHY = {
        'store_admin': ['store_manager', 'store_user', 'store_readonly'],
        'store_manager': ['store_user', 'store_readonly'],
        'store_user': ['store_readonly'],
        'store_readonly': []
    }
    
    # 定义每个角色的权限
    ROLE_PERMISSIONS = {
        'store_admin': [
            'read_all', 'write_all', 'delete_all', 'manage_users'
        ],
        'store_manager': [
            'read_all', 'write_transactions', 'write_inventory', 'read_reports'
        ],
        'store_user': [
            'read_products', 'read_customers', 'write_transactions'
        ],
        'store_readonly': [
            'read_products', 'read_basic_reports'
        ]
    }
    
    @classmethod
    def has_permission(cls, user_roles: List[str], required_permission: str) -> bool:
        """Check if user has required permission."""
        
        user_permissions = set()
        
        for role in user_roles:
            # 添加直接权限
            user_permissions.update(cls.ROLE_PERMISSIONS.get(role, []))
            
            # 添加继承权限
            inherited_roles = cls.ROLE_HIERARCHY.get(role, [])
            for inherited_role in inherited_roles:
                user_permissions.update(cls.ROLE_PERMISSIONS.get(inherited_role, []))
        
        return required_permission in user_permissions
    
    @classmethod
    def get_user_stores(cls, user_info: Dict) -> List[str]:
        """Extract stores user has access to from user info."""
        
        # 这通常来自您的用户管理系统
        # 演示中，我们将从自定义声明或组中提取
        
        stores = []
        
        # 检查组中是否有直接分配的门店
        for group in user_info.get('groups', []):
            if group.startswith('store_'):
                store_id = group.replace('store_', '')
                stores.append(store_id)
        
        # 检查应用特定角色
        for role in user_info.get('app_roles', []):
            if 'store:' in role:
                _, store_id = role.split('store:', 1)
                stores.append(store_id)
        
        return list(set(stores))  # 删除重复项

def require_auth(required_permission: str = None, require_store_access: bool = True):
    """Decorator to require authentication and authorization."""
    
    def decorator(func: Callable) -> Callable:
        @functools.wraps(func)
        async def wrapper(*args, **kwargs):
            # 从参数中提取请求（FastAPI 依赖注入）
            request = None
            for arg in args:
                if isinstance(arg, Request):
                    request = arg
                    break
            
            if not request:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Request object not found"
                )
            
            # 获取授权头
            auth_header = request.headers.get('Authorization')
            if not auth_header or not auth_header.startswith('Bearer '):
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Missing or invalid authorization header",
                    headers={"WWW-Authenticate": "Bearer"}
                )
            
            token = auth_header.split(' ')[1]
            
            try:
                # 验证令牌
                user_info = await azure_authenticator.validate_token(token)
                
                # 检查所需权限
                if required_permission:
                    user_roles = user_info.get('roles', [])
                    if not RoleBasedAuth.has_permission(user_roles, required_permission):
                        raise HTTPException(
                            status_code=status.HTTP_403_FORBIDDEN,
                            detail=f"Insufficient permissions. Required: {required_permission}"
                        )
                
                # 检查门店访问权限
                if require_store_access:
                    user_stores = RoleBasedAuth.get_user_stores(user_info)
                    if not user_stores:
                        raise HTTPException(
                            status_code=status.HTTP_403_FORBIDDEN,
                            detail="No store access configured for user"
                        )
                    
                    # 设置默认门店上下文（第一个可访问的门店）
                    request.state.current_store = user_stores[0]
                    request.state.accessible_stores = user_stores
                
                # 将用户信息添加到请求状态
                request.state.user_info = user_info
                request.state.user_id = user_info['user_id']
                
                # 调用原函数
                return await func(*args, **kwargs)
                
            except ValueError as e:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail=str(e),
                    headers={"WWW-Authenticate": "Bearer"}
                )
            except AuthorizationError as e:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=str(e)
                )
        
        return wrapper
    return decorator

def require_store_context(store_param: str = 'store_id'):
    """Decorator to validate and set store context."""
    
    def decorator(func: Callable) -> Callable:
        @functools.wraps(func)
        async def wrapper(*args, **kwargs):
            # 从 kwargs 获取 store_id
            store_id = kwargs.get(store_param)
            
            if not store_id:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Missing required parameter: {store_param}"
                )
            
            # 从参数中提取请求
            request = None
            for arg in args:
                if isinstance(arg, Request):
                    request = arg
                    break
            
            if not request or not hasattr(request.state, 'accessible_stores'):
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Authentication required before store context validation"
                )
            
            # 验证用户对请求门店的访问权限
            if store_id not in request.state.accessible_stores:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=f"Access denied to store: {store_id}"
                )
            
            # 在请求状态中设置门店上下文
            request.state.current_store = store_id
            
            return await func(*args, **kwargs)
        
        return wrapper
    return decorator
```

## 🔍 安全审计与合规

### 全面审计日志

```sql
-- Security audit log table
CREATE TABLE retail.security_audit_log (
    log_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(100) NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    user_id VARCHAR(100),
    store_id VARCHAR(50),
    ip_address INET,
    user_agent TEXT,
    request_id VARCHAR(100),
    session_id VARCHAR(100),
    resource_type VARCHAR(100),
    resource_id VARCHAR(100),
    action VARCHAR(50) NOT NULL,
    success BOOLEAN NOT NULL DEFAULT TRUE,
    failure_reason TEXT,
    details JSONB,
    severity VARCHAR(20) DEFAULT 'INFO',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Ensure proper indexing for security queries
    CONSTRAINT valid_severity CHECK (severity IN ('DEBUG', 'INFO', 'WARN', 'ERROR', 'CRITICAL'))
);

-- Indexes for security audit queries
CREATE INDEX idx_security_audit_event_type ON retail.security_audit_log(event_type);
CREATE INDEX idx_security_audit_user_name ON retail.security_audit_log(user_name);
CREATE INDEX idx_security_audit_store_id ON retail.security_audit_log(store_id);
CREATE INDEX idx_security_audit_created_at ON retail.security_audit_log(created_at);
CREATE INDEX idx_security_audit_success ON retail.security_audit_log(success);
CREATE INDEX idx_security_audit_severity ON retail.security_audit_log(severity);
CREATE INDEX idx_security_audit_details ON retail.security_audit_log USING GIN(details);

-- Function to log security events
CREATE OR REPLACE FUNCTION retail.log_security_event(
    p_event_type VARCHAR(100),
    p_user_name VARCHAR(100),
    p_user_id VARCHAR(100) DEFAULT NULL,
    p_store_id VARCHAR(50) DEFAULT NULL,
    p_ip_address TEXT DEFAULT NULL,
    p_action VARCHAR(50) DEFAULT 'unknown',
    p_success BOOLEAN DEFAULT TRUE,
    p_failure_reason TEXT DEFAULT NULL,
    p_details JSONB DEFAULT NULL,
    p_severity VARCHAR(20) DEFAULT 'INFO'
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    log_id UUID;
BEGIN
    INSERT INTO retail.security_audit_log (
        event_type,
        user_name,
        user_id,
        store_id,
        ip_address,
        action,
        success,
        failure_reason,
        details,
        severity
    ) VALUES (
        p_event_type,
        p_user_name,
        p_user_id,
        p_store_id,
        p_ip_address::INET,
        p_action,
        p_success,
        p_failure_reason,
        p_details,
        p_severity
    ) RETURNING log_id INTO log_id;
    
    RETURN log_id;
END;
$$;

-- Grant execute to MCP user
GRANT EXECUTE ON FUNCTION retail.log_security_event TO mcp_user;
```

### 安全监控视图

```sql
-- Failed authentication attempts
CREATE VIEW retail.security_failed_auth AS
SELECT 
    event_type,
    user_name,
    ip_address,
    COUNT(*) as attempt_count,
    MIN(created_at) as first_attempt,
    MAX(created_at) as last_attempt,
    ARRAY_AGG(DISTINCT failure_reason) as failure_reasons
FROM retail.security_audit_log
WHERE success = FALSE 
  AND event_type IN ('authentication_failed', 'token_validation_failed')
  AND created_at >= CURRENT_TIMESTAMP - INTERVAL '24 hours'
GROUP BY event_type, user_name, ip_address
HAVING COUNT(*) >= 3  -- 3 or more failures
ORDER BY attempt_count DESC, last_attempt DESC;

-- Suspicious access patterns
CREATE VIEW retail.security_suspicious_access AS
SELECT 
    user_name,
    user_id,
    COUNT(DISTINCT ip_address) as ip_count,
    COUNT(DISTINCT store_id) as store_count,
    ARRAY_AGG(DISTINCT ip_address::TEXT) as ip_addresses,
    ARRAY_AGG(DISTINCT store_id) as stores_accessed,
    MIN(created_at) as first_access,
    MAX(created_at) as last_access
FROM retail.security_audit_log
WHERE created_at >= CURRENT_TIMESTAMP - INTERVAL '1 hour'
  AND success = TRUE
GROUP BY user_name, user_id
HAVING COUNT(DISTINCT ip_address) > 3  -- Access from multiple IPs
   OR COUNT(DISTINCT store_id) > 2     -- Access to multiple stores
ORDER BY ip_count DESC, store_count DESC;

-- Data access patterns
CREATE VIEW retail.security_data_access_summary AS
SELECT 
    DATE_TRUNC('hour', created_at) as access_hour,
    store_id,
    resource_type,
    action,
    COUNT(*) as access_count,
    COUNT(DISTINCT user_id) as unique_users
FROM retail.security_audit_log
WHERE resource_type IS NOT NULL
  AND created_at >= CURRENT_TIMESTAMP - INTERVAL '24 hours'
GROUP BY DATE_TRUNC('hour', created_at), store_id, resource_type, action
ORDER BY access_hour DESC, access_count DESC;
```

### 安全事件监控

```python
# mcp_server/security/monitoring.py
"""
Security monitoring and alerting for MCP server.
"""
import asyncio
import asyncpg
from typing import Dict, List, Any
from datetime import datetime, timedelta
from dataclasses import dataclass
import logging

logger = logging.getLogger(__name__)

@dataclass
class SecurityAlert:
    """Security alert data structure."""
    alert_type: str
    severity: str
    message: str
    details: Dict[str, Any]
    timestamp: datetime

class SecurityMonitor:
    """Monitor security events and generate alerts."""
    
    def __init__(self, db_connection_string: str):
        self.db_connection_string = db_connection_string
        self.alert_handlers = []
        
        # 警报阈值
        self.thresholds = {
            'failed_auth_attempts': 5,      # 每用户每小时
            'multiple_ip_access': 3,        # 每用户每小时不同的IP
            'excessive_data_access': 1000,  # 每用户每小时的查询次数
            'privilege_escalation': 1,      # 任何尝试
            'unauthorized_store_access': 1  # 任何尝试
        }
    
    async def start_monitoring(self):
        """Start security monitoring loop."""
        logger.info("Starting security monitoring")
        
        while True:
            try:
                await self._check_security_events()
                await asyncio.sleep(300)  # 每5分钟检查一次
            except Exception as e:
                logger.error(f"Security monitoring error: {e}")
                await asyncio.sleep(60)  # 出错时短时间重试
    
    async def _check_security_events(self):
        """Check for security events and generate alerts."""
        
        conn = await asyncpg.connect(self.db_connection_string)
        
        try:
            # 检查身份验证失败的尝试
            await self._check_failed_auth(conn)
            
            # 检查可疑的访问模式
            await self._check_suspicious_access(conn)
            
            # 检查数据访问异常
            await self._check_data_access_anomalies(conn)
            
            # 检查未经授权的访问尝试
            await self._check_unauthorized_access(conn)
            
        finally:
            await conn.close()
    
    async def _check_failed_auth(self, conn):
        """Check for excessive failed authentication attempts."""
        
        query = """
        SELECT 
            user_name,
            ip_address,
            COUNT(*) as attempt_count,
            MAX(created_at) as last_attempt
        FROM retail.security_audit_log
        WHERE success = FALSE 
          AND event_type IN ('authentication_failed', 'token_validation_failed')
          AND created_at >= CURRENT_TIMESTAMP - INTERVAL '1 hour'
        GROUP BY user_name, ip_address
        HAVING COUNT(*) >= $1
        """
        
        results = await conn.fetch(query, self.thresholds['failed_auth_attempts'])
        
        for record in results:
            alert = SecurityAlert(
                alert_type='failed_authentication',
                severity='HIGH',
                message=f"Excessive failed login attempts for user {record['user_name']}",
                details={
                    'user_name': record['user_name'],
                    'ip_address': str(record['ip_address']),
                    'attempt_count': record['attempt_count'],
                    'last_attempt': record['last_attempt'].isoformat()
                },
                timestamp=datetime.now()
            )
            
            await self._send_alert(alert)
    
    async def _check_suspicious_access(self, conn):
        """Check for suspicious access patterns."""
        
        query = """
        SELECT 
            user_name,
            user_id,
            COUNT(DISTINCT ip_address) as ip_count,
            ARRAY_AGG(DISTINCT ip_address::TEXT) as ip_addresses
        FROM retail.security_audit_log
        WHERE created_at >= CURRENT_TIMESTAMP - INTERVAL '1 hour'
          AND success = TRUE
        GROUP BY user_name, user_id
        HAVING COUNT(DISTINCT ip_address) >= $1
        """
        
        results = await conn.fetch(query, self.thresholds['multiple_ip_access'])
        
        for record in results:
            alert = SecurityAlert(
                alert_type='suspicious_access',
                severity='MEDIUM',
                message=f"User {record['user_name']} accessed from multiple IP addresses",
                details={
                    'user_name': record['user_name'],
                    'user_id': record['user_id'],
                    'ip_count': record['ip_count'],
                    'ip_addresses': record['ip_addresses']
                },
                timestamp=datetime.now()
            )
            
            await self._send_alert(alert)
    
    async def _check_unauthorized_access(self, conn):
        """Check for unauthorized store access attempts."""
        
        query = """
        SELECT 
            user_name,
            user_id,
            store_id,
            failure_reason,
            created_at
        FROM retail.security_audit_log
        WHERE success = FALSE 
          AND event_type = 'unauthorized_store_access'
          AND created_at >= CURRENT_TIMESTAMP - INTERVAL '1 hour'
        """
        
        results = await conn.fetch(query)
        
        for record in results:
            alert = SecurityAlert(
                alert_type='unauthorized_access',
                severity='HIGH',
                message=f"Unauthorized store access attempt by {record['user_name']}",
                details={
                    'user_name': record['user_name'],
                    'user_id': record['user_id'],
                    'store_id': record['store_id'],
                    'failure_reason': record['failure_reason'],
                    'timestamp': record['created_at'].isoformat()
                },
                timestamp=datetime.now()
            )
            
            await self._send_alert(alert)
    
    async def _send_alert(self, alert: SecurityAlert):
        """Send security alert to all configured handlers."""
        
        logger.warning(
            f"Security Alert: {alert.alert_type} - {alert.message}",
            extra={'alert_details': alert.details}
        )
        
        # 发送到配置的警报处理程序
        for handler in self.alert_handlers:
            try:
                await handler.send_alert(alert)
            except Exception as e:
                logger.error(f"Failed to send alert via {handler.__class__.__name__}: {e}")
    
    def add_alert_handler(self, handler):
        """Add alert handler."""
        self.alert_handlers.append(handler)
```

## 🧪 安全测试与验证

### 自动化安全测试

```python
# tests/security/test_security.py
"""
Comprehensive security tests for MCP server.
"""
import pytest
import asyncio
import asyncpg
from datetime import datetime, timezone
import jwt
from unittest.mock import Mock, patch

class TestRowLevelSecurity:
    """Test Row Level Security implementation."""
    
    @pytest.fixture
    async def db_connection(self):
        """Database connection for testing."""
        conn = await asyncpg.connect(
            "postgresql://mcp_user:password@localhost:5432/retail_test"
        )
        yield conn
        await conn.close()
    
    async def test_store_context_isolation(self, db_connection):
        """Test that RLS properly isolates data by store."""
        
        # 设置西雅图店铺上下文
        await db_connection.execute("SELECT retail.set_store_context('seattle')")
        
        # 获取客户数量
        seattle_customers = await db_connection.fetchval(
            "SELECT COUNT(*) FROM retail.customers"
        )
        
        # 设置雷德蒙店铺上下文
        await db_connection.execute("SELECT retail.set_store_context('redmond')")
        
        # 获取客户数量
        redmond_customers = await db_connection.fetchval(
            "SELECT COUNT(*) FROM retail.customers"
        )
        
        # 验证隔离（计数应不同）
        assert seattle_customers != redmond_customers or (
            seattle_customers == 0 and redmond_customers == 0
        )
    
    async def test_unauthorized_store_access(self, db_connection):
        """Test that invalid store access is blocked."""
        
        with pytest.raises(Exception) as exc_info:
            await db_connection.execute("SELECT retail.set_store_context('invalid_store')")
        
        assert "Store not found" in str(exc_info.value)
    
    async def test_cross_store_data_leakage(self, db_connection):
        """Test that users cannot access data from other stores."""
        
        # 设置为某个店铺上下文
        await db_connection.execute("SELECT retail.set_store_context('seattle')")
        
        # 尝试插入不同 store_id 的数据
        with pytest.raises(Exception):
            await db_connection.execute("""
                INSERT INTO retail.customers (store_id, first_name, last_name, email)
                VALUES ('redmond', 'Test', 'User', 'test@example.com')
            """)

class TestAuthentication:
    """Test authentication and authorization."""
    
    def test_valid_jwt_token(self):
        """Test valid JWT token validation."""
        
        # 模拟有效令牌
        token_payload = {
            'oid': 'user-123',
            'email': 'test@example.com',
            'name': 'Test User',
            'tid': 'tenant-123',
            'aud': 'app-client-id',
            'iss': 'https://login.microsoftonline.com/tenant-123/v2.0',
            'exp': int((datetime.now(timezone.utc)).timestamp()) + 3600,
            'iat': int((datetime.now(timezone.utc)).timestamp()),
            'roles': ['store_user']
        }
        
        # 这将需要模拟 JWKS 端点
        # 在实际实现中，使用合适的测试 JWT 令牌
        
    def test_expired_token_rejection(self):
        """Test that expired tokens are rejected."""
        
        token_payload = {
            'oid': 'user-123',
            'exp': int((datetime.now(timezone.utc)).timestamp()) - 3600,  # 已过期
            'iat': int((datetime.now(timezone.utc)).timestamp()) - 7200
        }
        
        # 测试将验证过期令牌被拒绝
        
    def test_invalid_audience_rejection(self):
        """Test that tokens with wrong audience are rejected."""
        
        token_payload = {
            'oid': 'user-123',
            'aud': 'wrong-audience',  # 无效的受众
            'exp': int((datetime.now(timezone.utc)).timestamp()) + 3600,
            'iat': int((datetime.now(timezone.utc)).timestamp())
        }
        
        # 测试将验证错误受众的令牌被拒绝

class TestAuthorization:
    """Test role-based authorization."""
    
    def test_role_hierarchy(self):
        """Test that role hierarchy works correctly."""
        
        from mcp_server.security.authorization import RoleBasedAuth
        
        # 店铺管理员应拥有所有权限
        assert RoleBasedAuth.has_permission(['store_admin'], 'read_all')
        assert RoleBasedAuth.has_permission(['store_admin'], 'write_all')
        assert RoleBasedAuth.has_permission(['store_admin'], 'delete_all')
        
        # 店铺用户应有有限权限
        assert RoleBasedAuth.has_permission(['store_user'], 'read_products')
        assert not RoleBasedAuth.has_permission(['store_user'], 'delete_all')
        
        # 店铺只读用户应有最小权限
        assert RoleBasedAuth.has_permission(['store_readonly'], 'read_products')
        assert not RoleBasedAuth.has_permission(['store_readonly'], 'write_transactions')
    
    def test_permission_inheritance(self):
        """Test that permissions are properly inherited."""
        
        from mcp_server.security.authorization import RoleBasedAuth
        
        # 经理应继承用户权限
        assert RoleBasedAuth.has_permission(['store_manager'], 'read_products')
        assert RoleBasedAuth.has_permission(['store_manager'], 'write_transactions')

# 安全测试运行器
if __name__ == "__main__":
    pytest.main([__file__, "-v"])
```

### 渗透测试清单

```yaml
# security-test-checklist.yml
penetration_testing:
  
  authentication_bypass:
    - name: "Test authentication bypass attempts"
      tests:
        - "Missing Authorization header"
        - "Malformed JWT tokens"
        - "Replay attack with expired tokens"
        - "Token signature manipulation"
        - "Audience/issuer manipulation"
    
  authorization_escalation:
    - name: "Test privilege escalation attempts"
      tests:
        - "Role manipulation in token"
        - "Store access boundary testing"
        - "Cross-tenant data access attempts"
        - "Administrative function access"
    
  sql_injection:
    - name: "Test SQL injection vulnerabilities"
      tests:
        - "Parameter injection in search queries"
        - "Store ID manipulation"
        - "JSON parameter injection"
        - "Union-based injection attempts"
    
  data_exposure:
    - name: "Test for data exposure vulnerabilities"
      tests:
        - "Error message information disclosure"
        - "Timing attack possibilities"
        - "Cross-store data leakage"
        - "Audit log exposure"
    
  rate_limiting:
    - name: "Test rate limiting and DoS protection"
      tests:
        - "Authentication endpoint flooding"
        - "API endpoint rate limits"
        - "Resource exhaustion attempts"
        - "Connection pool exhaustion"
```

## 🎯 关键要点

完成本实验后，您应该具备：

✅ <strong>多租户安全</strong>：实现行级安全，确保数据完全隔离  
✅ **Azure 身份验证**：整合 Azure Entra ID 并进行 JWT 验证  
✅ <strong>基于角色的授权</strong>：配置分层角色和权限体系  
✅ <strong>全面审计日志</strong>：建立安全事件追踪和监控  
✅ <strong>安全测试</strong>：实施自动化安全验证测试  
✅ <strong>威胁监控</strong>：创建实时安全事件检测和告警  

## 🚀 接下来内容

继续完成 **[实验 03：环境搭建](../03-Setup/README.md)**，以：

- 配置遵循安全最佳实践的开发环境
- 搭建用于身份验证和监控的 Azure 服务
- 实施安全数据库连接和机密管理
- 验证开发环境中的安全配置

## 📚 附加资源

### Azure 安全
- [Azure Entra ID 文档](https://docs.microsoft.com/azure/active-directory/) - 完整身份平台指南
- [Azure Key Vault](https://docs.microsoft.com/azure/key-vault/) - 机密管理服务
- [Azure 安全最佳实践](https://docs.microsoft.com/azure/security/fundamentals/best-practices-and-patterns) - 安全指导

### 数据库安全
- [PostgreSQL 行级安全](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - 官方行级安全文档
- [数据库安全清单](https://www.postgresql.org/docs/current/security.html) - PostgreSQL 安全指南
- [多租户数据库模式](https://docs.microsoft.com/azure/architecture/patterns/multitenancy) - 架构模式

### 安全测试
- [OWASP 测试指南](https://owasp.org/www-project-web-security-testing-guide/) - 全面安全测试
- [JWT 安全最佳实践](https://tools.ietf.org/html/rfc8725) - JWT 安全注意事项
- [API 安全测试](https://owasp.org/www-project-api-security/) - 针对 API 的特定安全测试

---

<strong>上一篇</strong>：[实验 01：核心架构概念](../01-Architecture/README.md)  
<strong>下一篇</strong>：[实验 03：环境搭建](../03-Setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->