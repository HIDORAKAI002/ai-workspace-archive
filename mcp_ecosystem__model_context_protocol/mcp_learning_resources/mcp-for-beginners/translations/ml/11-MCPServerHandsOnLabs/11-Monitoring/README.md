# നിരീക്ഷണവും ദൃശ്യമായും

## 🎯 ഈ പ്രയോഗശാല ഉൾക്കൊള്ളുന്നത്

നിർമ്മാണ പരിസരങ്ങളിലെ നിങ്ങളുടെ MCP സർവറിനായുള്ള നിരീക്ഷണം, ദൃശ്യത, അലേർട്ടിംഗ് എന്നിവ നടപ്പിലാക്കുന്നതിനുള്ള സമഗ്രമായ മാർഗനിർദ്ദേശം ഈ ലാബ് നൽകുന്നു. നിങ്ങൾക്ക് ആപ്ലിക്കേഷൻ ഇൻസൈറ്റ്സ് സജ്ജമാക്കാനും പ്രസക്തമായ ഡാഷ്‌ബോർഡുകൾ സൃഷ്‌ടിക്കാനും ഫലപ്രദമായ അലേർട്ടിംഗ് നടപ്പിലാക്കാനും പ്രവർത്തനപരമായ തകർച്ച പരിഹാര പ്രവൃത്തിസഞ്ചികകൾ സ്ഥാപിക്കാനും പഠിക്കാം.

## സംക്ഷിപ്താവലോകനം

നിർമ്മാണത്തിൽ MCP സർവറുകൾ വിശ്വസനീയമായി നിലനിർത്താൻ ഫലപ്രദമായ നിരീക്ഷണവും ദൃശ്യതയും വളരെ പ്രധാനമാണ്. ഈ ലാബ് ദൃശ്യതയുടെ മുക്കാലി അടിവസ്തങ്ങൾ — മീറ്റ്രിക്‌സ്, ലോഗുകൾ, ട്രേസുകൾ — ഉൾക്കൊള്ളുകയും പ്രൊആക്ടീവ് പ്രശ്ന തിരിച്ചറിയലിനും ദ്രുതസംസ്ക്കരണത്തിനും സഹായിക്കുന്ന സമഗ്രമായ നിരീക്ഷണം എങ്ങനെ നടപ്പിലാക്കാമെന്ന് കാണിക്കുകയും ചെയ്യും.

നിങ്ങൾ റാ ടെലിമെട്രി ഡാറ്റയെ പ്രവർത്തനക്ഷമമായ洞ാകങ്ങളായി മാറിച്ച് സിസ്റ്റത്തിന്റെ പെരുമാറ്റം മനസിലാക്കാനും പ്രകടനം മെച്ചപ്പെടുത്താനും ഉയർന്ന ലഭ്യത ഉറപ്പാക്കാനും പഠിക്കും.

## പഠന ലക്ഷ്യങ്ങൾ

ഈ ലാബ് കഴിഞ്ഞതിനുശേഷം നിങ്ങൾ കഴിയും:

- **നടപ്പിലാക്കുക** MCP സെർവർക്ക് സമഗ്രമായ ആപ്ലിക്കേഷൻ ഇൻസൈറ്റ്സ് ഇന്റഗ്രേഷൻ  
- **പരിഭാഷി രൂപകൽപ്പന ചെയ്യുക** ഫലപ്രദമായ തകർച്ച പരിഹാരത്തിനായുള്ള ഘടിത ലോഗിംഗ് മാതൃകകൾ  
- **സൃഷ്‌ടിക്കുക** പ്രകടന മീറ്റ്രിക്‌സ് ശേഖരണവും വിശകലന സംവിധാനങ്ങളും  
- **കോണ്ഫിഗർ ചെയ്യുക** പ്രവർത്തനക്ഷമമായ അലേർട്ടിംഗ് സിസ്റ്റം  
- **നിർമ്മിക്കുക** യഥാർത്ഥ-സമയ നിരീക്ഷണത്തിന് ഓപ്പറേഷൻ ഡാഷ്‌ബോർഡുകൾ  
- **സ്ഥാപിക്കുക** ഫലപ്രദമായ തകരാറുകൾ പരിഹരിക്കൽ പ്രവൃത്തിസഞ്ചികകളും റൺബുക്കുകളും  

## 📊 ആപ്ലിക്കേഷൻ ഇൻസൈറ്റ്സ് ഇന്റഗ്രേഷൻ

### ആപ്ലിക്കേഷൻ ഇൻസൈറ്റ്സ് സജ്ജമാക്കൽ

```python
# mcp_server/monitoring.py
"""
Comprehensive monitoring and telemetry for MCP server.
"""
import logging
import time
import psutil
from typing import Dict, Any, Optional
from contextlib import contextmanager
from azure.monitor.opentelemetry import configure_azure_monitor
from opentelemetry import trace, metrics
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from opentelemetry.instrumentation.asyncpg import AsyncPGInstrumentor
from opentelemetry.instrumentation.requests import RequestsInstrumentor

class MCPTelemetryManager:
    """Comprehensive telemetry management for MCP server."""
    
    def __init__(self, connection_string: str):
        self.connection_string = connection_string
        self.tracer = None
        self.meter = None
        self.custom_metrics = {}
        
    def initialize_telemetry(self, app):
        """Initialize Application Insights and OpenTelemetry."""
        
        # അസ്യൂർ മോണിറ്റർ configuración കോമ്പ്യൂട്ട് ചെയ്യുക
        configure_azure_monitor(
            connection_string=self.connection_string,
            logger_name="mcp_server",
            disable_offline_storage=False
        )
        
        # ട്രേസറും മീറ്ററും നേടുക
        self.tracer = trace.get_tracer(__name__)
        self.meter = metrics.get_meter(__name__)
        
        # കസ്റ്റം മെട്രിക്‌സുകൾ തുടങ്ങുക
        self._setup_custom_metrics()
        
        # ഫാസ്റ്റ്API ഉപകരണം കണ്ടെത്തുക
        FastAPIInstrumentor.instrument_app(app)
        
        # ഡാറ്റാബേസ് ഉപകരണം കണ്ടെത്തുക
        AsyncPGInstrumentor().instrument()
        
        # HTTP അപേക്ഷകൾ ഉപകരണം കണ്ടെത്തുക
        RequestsInstrumentor().instrument()
        
        logging.info("Telemetry initialization complete")
    
    def _setup_custom_metrics(self):
        """Set up custom metrics for MCP server operations."""
        
        self.custom_metrics = {
            # അപേക്ഷ മെട്രിക്‌സുകൾ
            "mcp_requests_total": self.meter.create_counter(
                name="mcp_requests_total",
                description="Total number of MCP requests",
                unit="1"
            ),
            
            "mcp_request_duration": self.meter.create_histogram(
                name="mcp_request_duration_seconds",
                description="MCP request duration in seconds",
                unit="s"
            ),
            
            # ഡാറ്റാബേസ് മെട്രിക്‌സുകൾ
            "database_queries_total": self.meter.create_counter(
                name="database_queries_total",
                description="Total database queries executed",
                unit="1"
            ),
            
            "database_query_duration": self.meter.create_histogram(
                name="database_query_duration_seconds",
                description="Database query duration in seconds",
                unit="s"
            ),
            
            "database_connections_active": self.meter.create_up_down_counter(
                name="database_connections_active",
                description="Number of active database connections",
                unit="1"
            ),
            
            # ടൂൾ മെട്രിക്‌സുകൾ
            "tool_executions_total": self.meter.create_counter(
                name="tool_executions_total",
                description="Total tool executions",
                unit="1"
            ),
            
            "tool_execution_duration": self.meter.create_histogram(
                name="tool_execution_duration_seconds",
                description="Tool execution duration in seconds",
                unit="s"
            ),
            
            # സിസ്റ്റം മെട്രിക്‌സുകൾ
            "system_cpu_usage": self.meter.create_gauge(
                name="system_cpu_usage_percent",
                description="System CPU usage percentage",
                unit="%"
            ),
            
            "system_memory_usage": self.meter.create_gauge(
                name="system_memory_usage_bytes",
                description="System memory usage in bytes",
                unit="byte"
            ),
            
            # പിശക് മെട്രിക്‌സുകൾ
            "errors_total": self.meter.create_counter(
                name="errors_total",
                description="Total number of errors",
                unit="1"
            )
        }
    
    @contextmanager
    def trace_operation(self, operation_name: str, attributes: Dict[str, Any] = None):
        """Create a traced operation with automatic metrics collection."""
        
        with self.tracer.start_as_current_span(operation_name) as span:
            start_time = time.time()
            
            # സ്പാനിൽ ആട്രിബ്യൂട്ടുകൾ ചേർക്കുക
            if attributes:
                for key, value in attributes.items():
                    span.set_attribute(key, value)
            
            try:
                yield span
                
                # വിജയ മെട്രിക്‌സ് രേഖപ്പെടുത്തുക
                duration = time.time() - start_time
                
                if "request" in operation_name.lower():
                    self.custom_metrics["mcp_requests_total"].add(1, {"status": "success"})
                    self.custom_metrics["mcp_request_duration"].record(duration)
                
                elif "query" in operation_name.lower():
                    self.custom_metrics["database_queries_total"].add(1, {"status": "success"})
                    self.custom_metrics["database_query_duration"].record(duration)
                
                elif "tool" in operation_name.lower():
                    self.custom_metrics["tool_executions_total"].add(1, {"status": "success"})
                    self.custom_metrics["tool_execution_duration"].record(duration)
                
            except Exception as e:
                # പിശക് രേഖപ്പെടുത്തുക
                span.record_exception(e)
                span.set_status(trace.Status(trace.StatusCode.ERROR, str(e)))
                
                # പിശക് മെട്രിക്‌സ് രേഖപ്പെടുത്തുക
                self.custom_metrics["errors_total"].add(1, {
                    "operation": operation_name,
                    "error_type": type(e).__name__
                })
                
                raise
    
    def record_system_metrics(self):
        """Record system-level metrics."""
        
        # CPU ഉപയോഗം
        cpu_percent = psutil.cpu_percent(interval=1)
        self.custom_metrics["system_cpu_usage"].set(cpu_percent)
        
        # മെമ്മറി ഉപയോഗം
        memory = psutil.virtual_memory()
        self.custom_metrics["system_memory_usage"].set(memory.used)
        
        # ഡാറ്റാബേസ് കണക്ഷനുകൾ (ലഭ്യമായാൽ)
        if hasattr(db_provider, 'connection_pool') and db_provider.connection_pool:
            active_connections = db_provider.connection_pool.get_size()
            self.custom_metrics["database_connections_active"].add(active_connections)

# ആഗോള ടെലിമെട്രി മാനേജർ
telemetry_manager = MCPTelemetryManager(
    connection_string=config.server.applicationinsights_connection_string
)
```

### ഘടിത ഡാറ്റയോടെയുള്ള നന്നാക്കപ്പെട്ട ലോഗിംഗ്

```python
# mcp_server/logging_config.py
"""
Structured logging configuration for MCP server.
"""
import logging
import json
import sys
from datetime import datetime
from typing import Dict, Any
import traceback

class StructuredFormatter(logging.Formatter):
    """Custom formatter for structured JSON logging."""
    
    def format(self, record: logging.LogRecord) -> str:
        """Format log record as structured JSON."""
        
        # അടിസ്ഥാന ലോഗ് ഘടന
        log_entry = {
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
            "module": record.module,
            "function": record.funcName,
            "line": record.lineno
        }
        
        # എക്സ്പ്ഷൻ വിവരം ഉണ്ടായാൽ ചേർക്കുക
        if record.exc_info:
            log_entry["exception"] = {
                "type": record.exc_info[0].__name__,
                "message": str(record.exc_info[1]),
                "traceback": traceback.format_exception(*record.exc_info)
            }
        
        # എക്സ്ട്രയിൽ നിന്നുള്ള കസ്റ്റം ഗുണനിലവാരങ്ങൾ ചേർക്കുക
        if hasattr(record, 'extra_data'):
            log_entry.update(record.extra_data)
        
        # ലഭ്യമായെങ്കിൽ കോറിലേഷൻ ഐഡി ചേർക്കുക
        if hasattr(record, 'correlation_id'):
            log_entry["correlation_id"] = record.correlation_id
        
        # ലഭ്യമായെങ്കിൽ ഉപയോക്തൃ പ്രസംഗം ചേർക്കുക
        if hasattr(record, 'user_id'):
            log_entry["user_id"] = record.user_id
        
        if hasattr(record, 'rls_user_id'):
            log_entry["rls_user_id"] = record.rls_user_id
        
        return json.dumps(log_entry, ensure_ascii=False)

class MCPLogger:
    """Enhanced logging utilities for MCP server."""
    
    def __init__(self, name: str):
        self.logger = logging.getLogger(name)
        self._setup_structured_logging()
    
    def _setup_structured_logging(self):
        """Configure structured logging."""
        
        # നിലവിലെ ഹാൻഡ്ലറുകൾ നീക്കം ചെയ്യുക
        for handler in self.logger.handlers[:]:
            self.logger.removeHandler(handler)
        
        # ഘടിത ഹാൻഡ്ലർ സൃഷ്ടിക്കുക
        handler = logging.StreamHandler(sys.stdout)
        handler.setFormatter(StructuredFormatter())
        
        self.logger.addHandler(handler)
        self.logger.setLevel(logging.INFO)
    
    def log_mcp_request(
        self, 
        method: str, 
        user_id: str, 
        rls_user_id: str,
        duration: float = None,
        status: str = "success",
        **kwargs
    ):
        """Log MCP request with structured data."""
        
        extra_data = {
            "event_type": "mcp_request",
            "method": method,
            "user_id": user_id,
            "rls_user_id": rls_user_id,
            "status": status
        }
        
        if duration is not None:
            extra_data["duration_ms"] = duration * 1000
        
        extra_data.update(kwargs)
        
        self.logger.info(
            f"MCP request: {method} - {status}",
            extra={"extra_data": extra_data}
        )
    
    def log_database_query(
        self,
        query: str,
        duration: float,
        row_count: int = None,
        user_id: str = None,
        **kwargs
    ):
        """Log database query with performance data."""
        
        extra_data = {
            "event_type": "database_query",
            "query_hash": hash(query.strip()),
            "duration_ms": duration * 1000,
            "query_preview": query[:100] + "..." if len(query) > 100 else query
        }
        
        if row_count is not None:
            extra_data["row_count"] = row_count
        
        if user_id:
            extra_data["user_id"] = user_id
        
        extra_data.update(kwargs)
        
        level = logging.WARNING if duration > 1.0 else logging.INFO
        
        self.logger.log(
            level,
            f"Database query executed ({duration*1000:.2f}ms)",
            extra={"extra_data": extra_data}
        )
    
    def log_security_event(
        self,
        event_type: str,
        user_id: str = None,
        ip_address: str = None,
        success: bool = True,
        details: Dict[str, Any] = None
    ):
        """Log security-related events."""
        
        extra_data = {
            "event_type": "security_event",
            "security_event_type": event_type,
            "success": success
        }
        
        if user_id:
            extra_data["user_id"] = user_id
        
        if ip_address:
            extra_data["ip_address"] = ip_address
        
        if details:
            extra_data["details"] = details
        
        level = logging.INFO if success else logging.WARNING
        
        self.logger.log(
            level,
            f"Security event: {event_type} - {'success' if success else 'failure'}",
            extra={"extra_data": extra_data}
        )
    
    def log_performance_metric(
        self,
        metric_name: str,
        value: float,
        unit: str = "count",
        dimensions: Dict[str, str] = None
    ):
        """Log custom performance metrics."""
        
        extra_data = {
            "event_type": "performance_metric",
            "metric_name": metric_name,
            "value": value,
            "unit": unit
        }
        
        if dimensions:
            extra_data["dimensions"] = dimensions
        
        self.logger.info(
            f"Performance metric: {metric_name} = {value} {unit}",
            extra={"extra_data": extra_data}
        )

# ആഗോള ലോഗർ ഉദാഹരണം
mcp_logger = MCPLogger("mcp_server")
```

### കസ്റ്റം മീറ്റ്രിക്‌സ് ശേഖരണം

```python
# mcp_server/metrics_collector.py
"""
Custom metrics collection for business and operational insights.
"""
import asyncio
import time
from typing import Dict, Any, List
from dataclasses import dataclass
from collections import defaultdict, deque
import statistics

@dataclass
class MetricPoint:
    """Individual metric data point."""
    timestamp: float
    value: float
    dimensions: Dict[str, str]

class MetricsCollector:
    """Advanced metrics collection and analysis."""
    
    def __init__(self, retention_minutes: int = 60):
        self.retention_seconds = retention_minutes * 60
        self.metrics_buffer = defaultdict(lambda: deque(maxlen=1000))
        self.aggregated_metrics = {}
        
    def record_metric(
        self,
        name: str,
        value: float,
        dimensions: Dict[str, str] = None
    ):
        """Record a metric point."""
        
        metric_point = MetricPoint(
            timestamp=time.time(),
            value=value,
            dimensions=dimensions or {}
        )
        
        self.metrics_buffer[name].append(metric_point)
        self._cleanup_old_metrics(name)
    
    def _cleanup_old_metrics(self, metric_name: str):
        """Remove metrics older than retention period."""
        
        cutoff_time = time.time() - self.retention_seconds
        buffer = self.metrics_buffer[metric_name]
        
        while buffer and buffer[0].timestamp < cutoff_time:
            buffer.popleft()
    
    def get_metric_summary(
        self,
        name: str,
        time_window_minutes: int = 5
    ) -> Dict[str, Any]:
        """Get statistical summary of a metric."""
        
        time_window_seconds = time_window_minutes * 60
        cutoff_time = time.time() - time_window_seconds
        
        relevant_points = [
            point for point in self.metrics_buffer[name]
            if point.timestamp >= cutoff_time
        ]
        
        if not relevant_points:
            return {"error": "No data available"}
        
        values = [point.value for point in relevant_points]
        
        return {
            "count": len(values),
            "min": min(values),
            "max": max(values),
            "mean": statistics.mean(values),
            "median": statistics.median(values),
            "p95": self._percentile(values, 95),
            "p99": self._percentile(values, 99),
            "time_window_minutes": time_window_minutes
        }
    
    def _percentile(self, values: List[float], percentile: float) -> float:
        """Calculate percentile value."""
        if not values:
            return 0
        
        sorted_values = sorted(values)
        index = int((percentile / 100) * len(sorted_values))
        index = min(index, len(sorted_values) - 1)
        
        return sorted_values[index]
    
    async def collect_business_metrics(self):
        """Collect business-specific metrics."""
        
        try:
            # ക്വറി നിർവഹണ മാതൃകകൾ
            query_types = await self._analyze_query_patterns()
            for query_type, count in query_types.items():
                self.record_metric(
                    "business_queries_by_type",
                    count,
                    {"query_type": query_type}
                )
            
            # ഉപയോക്തൃ പ്രവർത്തന മാതൃകകൾ
            user_activity = await self._analyze_user_activity()
            for store_id, activity_count in user_activity.items():
                self.record_metric(
                    "user_activity_by_store",
                    activity_count,
                    {"store_id": store_id}
                )
            
            # ഉപകരണ ഉപയോഗ മാതൃകകൾ
            tool_usage = await self._analyze_tool_usage()
            for tool_name, usage_count in tool_usage.items():
                self.record_metric(
                    "tool_usage",
                    usage_count,
                    {"tool_name": tool_name}
                )
                
        except Exception as e:
            mcp_logger.logger.error(f"Business metrics collection failed: {e}")
    
    async def _analyze_query_patterns(self) -> Dict[str, int]:
        """Analyze database query patterns."""
        
        # ഇത് യഥാർത്ഥ ക്വറി ലോഗുകൾ വിശകലനം ചെയ്യും
        # ഡെമോ ഉദ്ദേശ്യങ്ങൾക്കായി, സാമ്പിൾ ഡാറ്റ 반환ിക്കുന്നു
        return {
            "sales_analysis": 45,
            "inventory_check": 23,
            "customer_lookup": 18,
            "product_search": 31
        }
    
    async def _analyze_user_activity(self) -> Dict[str, int]:
        """Analyze user activity by store."""
        
        # ഇത് യഥാർത്ഥ ഉപയോക്തൃ പ്രവർത്തന ലോഗുകൾ വിശകലനം ചെയ്യും
        return {
            "seattle": 67,
            "redmond": 34,
            "bellevue": 23,
            "online": 89
        }
    
    async def _analyze_tool_usage(self) -> Dict[str, int]:
        """Analyze MCP tool usage patterns."""
        
        return {
            "execute_sales_query": 156,
            "get_multiple_table_schemas": 45,
            "semantic_search_products": 78,
            "get_current_utc_date": 23
        }

# ഗ്ലോബൽ മെട്രിക്‌സ് കലക്ടർ
metrics_collector = MetricsCollector()
```

## 🔔 അലേർട്ട് ഘടന

### ബുദ്ധിമുട്ടുള്ള അലേർട്ടിംഗ് സിസ്റ്റം

```python
# mcp_server/alerting.py
"""
Intelligent alerting system for MCP server operations.
"""
import asyncio
import json
from typing import Dict, List, Any, Callable
from enum import Enum
from dataclasses import dataclass
from azure.communication.email import EmailClient
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

class AlertSeverity(Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

@dataclass
class AlertRule:
    """Alert rule configuration."""
    name: str
    condition: Callable[[Dict[str, Any]], bool]
    severity: AlertSeverity
    cooldown_minutes: int
    message_template: str
    enabled: bool = True

@dataclass
class Alert:
    """Alert instance."""
    rule_name: str
    severity: AlertSeverity
    message: str
    timestamp: float
    details: Dict[str, Any]
    acknowledged: bool = False

class AlertManager:
    """Comprehensive alerting management."""
    
    def __init__(self):
        self.alert_rules = {}
        self.active_alerts = {}
        self.alert_history = deque(maxlen=1000)
        self.notification_channels = {}
        self._setup_default_rules()
        self._setup_notification_channels()
    
    def _setup_default_rules(self):
        """Set up default alert rules."""
        
        # ഡാറ്റാബേസ് കണക്ഷൻ പ്രശ്‌നങ്ങൾ
        self.add_alert_rule(AlertRule(
            name="database_connection_failure",
            condition=lambda metrics: metrics.get("database_status") != "healthy",
            severity=AlertSeverity.CRITICAL,
            cooldown_minutes=5,
            message_template="Database connection failure detected. Service may be unavailable."
        ))
        
        # ഉയർന്ന പിശക് നിരക്ക്
        self.add_alert_rule(AlertRule(
            name="high_error_rate",
            condition=lambda metrics: metrics.get("error_rate", 0) > 0.05,  # 5% പിശക് നിരക്ക്
            severity=AlertSeverity.HIGH,
            cooldown_minutes=10,
            message_template="High error rate detected: {error_rate:.2%}. Investigate immediately."
        ))
        
        # മന്ദഗതിയിലുള്ള ക്വറി പ്രകടനം
        self.add_alert_rule(AlertRule(
            name="slow_query_performance",
            condition=lambda metrics: metrics.get("avg_query_duration", 0) > 2.0,  # 2 സെക്കൻഡ്
            severity=AlertSeverity.MEDIUM,
            cooldown_minutes=15,
            message_template="Slow query performance detected. Average duration: {avg_query_duration:.2f}s"
        ))
        
        # ഉയർന്ന CPU ഉപയോഗം
        self.add_alert_rule(AlertRule(
            name="high_cpu_usage",
            condition=lambda metrics: metrics.get("cpu_usage", 0) > 85,  # 85% CPU
            severity=AlertSeverity.MEDIUM,
            cooldown_minutes=10,
            message_template="High CPU usage detected: {cpu_usage:.1f}%"
        ))
        
        # മെമ്മറി ഉപയോഗം
        self.add_alert_rule(AlertRule(
            name="high_memory_usage",
            condition=lambda metrics: metrics.get("memory_usage_percent", 0) > 90,  # 90% മെമ്മറി
            severity=AlertSeverity.HIGH,
            cooldown_minutes=5,
            message_template="High memory usage detected: {memory_usage_percent:.1f}%"
        ))
        
        # ഓതന്റിക്കേഷൻ പരാജയങ്ങൾ
        self.add_alert_rule(AlertRule(
            name="authentication_failures",
            condition=lambda metrics: metrics.get("auth_failure_rate", 0) > 0.1,  # 10% പരാജയ നിരക്ക്
            severity=AlertSeverity.HIGH,
            cooldown_minutes=5,
            message_template="High authentication failure rate: {auth_failure_rate:.2%}. Possible security incident."
        ))
    
    def _setup_notification_channels(self):
        """Set up notification channels."""
        
        # ഇമെയിൽ അറിയിപ്പുകൾ
        email_config = {
            "smtp_server": os.getenv("SMTP_SERVER", "smtp.office365.com"),
            "smtp_port": int(os.getenv("SMTP_PORT", "587")),
            "username": os.getenv("SMTP_USERNAME"),
            "password": os.getenv("SMTP_PASSWORD"),
            "from_address": os.getenv("ALERT_FROM_EMAIL"),
            "to_addresses": os.getenv("ALERT_TO_EMAILS", "").split(",")
        }
        
        if email_config["username"] and email_config["password"]:
            self.notification_channels["email"] = EmailNotifier(email_config)
        
        # മൈക്രോസോഫ്റ്റ് ടീംസ് വെബ്‌ഹുക്ക്
        teams_webhook = os.getenv("TEAMS_WEBHOOK_URL")
        if teams_webhook:
            self.notification_channels["teams"] = TeamsNotifier(teams_webhook)
        
        # സ്ലാക് വെബ്‌ഹുക്ക്
        slack_webhook = os.getenv("SLACK_WEBHOOK_URL")
        if slack_webhook:
            self.notification_channels["slack"] = SlackNotifier(slack_webhook)
    
    def add_alert_rule(self, rule: AlertRule):
        """Add or update an alert rule."""
        self.alert_rules[rule.name] = rule
    
    async def evaluate_metrics(self, metrics: Dict[str, Any]):
        """Evaluate metrics against alert rules."""
        
        for rule_name, rule in self.alert_rules.items():
            if not rule.enabled:
                continue
            
            try:
                # നിബന്ധന നിർവ്വഹണ തികയ്‌ക്കുന്നത് പരിശോധിക്കുക
                if rule.condition(metrics):
                    await self._trigger_alert(rule, metrics)
                else:
                    # നിബന്ധന ഇനി ബാധകമല്ലെങ്കിൽ അലർട്ട് ക്ലിയർ ചെയ്യുക
                    await self._clear_alert(rule_name)
                    
            except Exception as e:
                mcp_logger.logger.error(f"Error evaluating alert rule {rule_name}: {e}")
    
    async def _trigger_alert(self, rule: AlertRule, metrics: Dict[str, Any]):
        """Trigger an alert."""
        
        current_time = time.time()
        
        # കൂൾഡൗൺ കാലയളവ് പരിശോധിക്കുക
        if rule.name in self.active_alerts:
            last_alert_time = self.active_alerts[rule.name].timestamp
            if current_time - last_alert_time < rule.cooldown_minutes * 60:
                return  # ഇപ്പോഴും കൂൾഡൗണിൽ
        
        # അലർട്ട് സന്ദേശം ഫോർമാറ്റ് ചെയ്യുക
        message = rule.message_template.format(**metrics)
        
        # അലർട്ട് സൃഷ്‌ടിക്കുക
        alert = Alert(
            rule_name=rule.name,
            severity=rule.severity,
            message=message,
            timestamp=current_time,
            details=metrics.copy()
        )
        
        # അലർട്ട് സംഭരിച്ചു വെയ്ക്കുക
        self.active_alerts[rule.name] = alert
        self.alert_history.append(alert)
        
        # അറിയിപ്പുകൾ അയയ്‌ക്കുക
        await self._send_notifications(alert)
        
        mcp_logger.log_security_event(
            "alert_triggered",
            details={
                "rule_name": rule.name,
                "severity": rule.severity.value,
                "message": message
            }
        )
    
    async def _clear_alert(self, rule_name: str):
        """Clear an active alert."""
        
        if rule_name in self.active_alerts:
            alert = self.active_alerts[rule_name]
            del self.active_alerts[rule_name]
            
            # ഉയർന്ന/ഗുരുതര അലർട്ടുകൾക്ക് പരിഹാര പഠിപ്പ് അയയ്‌ക്കുക
            if alert.severity in [AlertSeverity.HIGH, AlertSeverity.CRITICAL]:
                resolution_alert = Alert(
                    rule_name=rule_name,
                    severity=AlertSeverity.LOW,
                    message=f"RESOLVED: {alert.message}",
                    timestamp=time.time(),
                    details={"resolution": True}
                )
                
                await self._send_notifications(resolution_alert)
    
    async def _send_notifications(self, alert: Alert):
        """Send alert notifications through all configured channels."""
        
        tasks = []
        
        for channel_name, notifier in self.notification_channels.items():
            task = asyncio.create_task(
                notifier.send_notification(alert),
                name=f"notify_{channel_name}"
            )
            tasks.append(task)
        
        if tasks:
            # ടൈംഔട്ട് സഹിതം എല്ലാ അറിയിപ്പുകൾക്കായി കാത്തിരിക്കുക
            try:
                await asyncio.wait_for(
                    asyncio.gather(*tasks, return_exceptions=True),
                    timeout=30.0
                )
            except asyncio.TimeoutError:
                mcp_logger.logger.warning("Some alert notifications timed out")

# അറിയിപ്പുകളുടെ നടപ്പാക്കലുകൾ
class EmailNotifier:
    """Email notification handler."""
    
    def __init__(self, config: Dict[str, Any]):
        self.config = config
    
    async def send_notification(self, alert: Alert):
        """Send email notification."""
        
        try:
            msg = MIMEMultipart()
            msg['From'] = self.config['from_address']
            msg['To'] = ', '.join(self.config['to_addresses'])
            msg['Subject'] = f"[{alert.severity.value.upper()}] MCP Server Alert: {alert.rule_name}"
            
            body = f"""
Alert Details:
- Rule: {alert.rule_name}
- Severity: {alert.severity.value.upper()}
- Time: {datetime.fromtimestamp(alert.timestamp).isoformat()}
- Message: {alert.message}

Additional Details:
{json.dumps(alert.details, indent=2)}

This is an automated alert from the MCP Server monitoring system.
            """
            
            msg.attach(MIMEText(body, 'plain'))
            
            # ഇമെയിൽ അയയ്‌ക്കുക
            with smtplib.SMTP(self.config['smtp_server'], self.config['smtp_port']) as server:
                server.starttls()
                server.login(self.config['username'], self.config['password'])
                server.send_message(msg)
                
        except Exception as e:
            mcp_logger.logger.error(f"Failed to send email notification: {e}")

class TeamsNotifier:
    """Microsoft Teams notification handler."""
    
    def __init__(self, webhook_url: str):
        self.webhook_url = webhook_url
    
    async def send_notification(self, alert: Alert):
        """Send Teams notification."""
        
        color_map = {
            AlertSeverity.LOW: "28a745",     # അടങ്ങിയിരിക്കുന്നു
            AlertSeverity.MEDIUM: "ffc107",   # മഞ്ഞ
            AlertSeverity.HIGH: "fd7e14",     # ഓറഞ്ച്
            AlertSeverity.CRITICAL: "dc3545"  # ചുവപ്പ്
        }
        
        payload = {
            "@type": "MessageCard",
            "@context": "http://schema.org/extensions",
            "themeColor": color_map.get(alert.severity, "0076D7"),
            "summary": f"MCP Server Alert: {alert.rule_name}",
            "sections": [{
                "activityTitle": f"🚨 {alert.severity.value.upper()} Alert",
                "activitySubtitle": alert.rule_name,
                "text": alert.message,
                "facts": [
                    {"name": "Timestamp", "value": datetime.fromtimestamp(alert.timestamp).isoformat()},
                    {"name": "Severity", "value": alert.severity.value.upper()}
                ]
            }]
        }
        
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(self.webhook_url, json=payload) as response:
                    if response.status != 200:
                        raise Exception(f"Teams webhook returned {response.status}")
                        
        except Exception as e:
            mcp_logger.logger.error(f"Failed to send Teams notification: {e}")

# ഗ്ലോബൽ അലർട്ട് മാനേജർ
alert_manager = AlertManager()
```

## 📈 ഡാഷ്‌ബോർഡ് സൃഷ്‌ടിക്കൽ

### ആസ്യൂർ മോനിറ്റർ വർക്ക്‌ബുക്കുകൾ

```json
{
  "version": "Notebook/1.0",
  "items": [
    {
      "type": 1,
      "content": {
        "json": "# MCP Server Operations Dashboard\n\nComprehensive monitoring dashboard for Zava Retail MCP Server operations, performance, and health metrics."
      },
      "name": "title"
    },
    {
      "type": 10,
      "content": {
        "chartId": "workbook-interactive-chart",
        "version": "KqlItem/1.0",
        "query": "requests\n| where timestamp >= ago(1h)\n| where name contains \"mcp\"\n| summarize RequestCount = count(), AvgDuration = avg(duration) by bin(timestamp, 5m)\n| order by timestamp asc",
        "size": 0,
        "title": "MCP Request Volume and Performance",
        "timeContext": {
          "durationMs": 3600000
        },
        "queryType": 0,
        "resourceType": "microsoft.insights/components",
        "visualization": "timechart"
      },
      "name": "request-metrics"
    },
    {
      "type": 10,
      "content": {
        "chartId": "workbook-interactive-chart-2",
        "version": "KqlItem/1.0",
        "query": "customMetrics\n| where name == \"database_query_duration_seconds\"\n| where timestamp >= ago(1h)\n| summarize \n    AvgDuration = avg(value),\n    P95Duration = percentile(value, 95),\n    P99Duration = percentile(value, 99)\n    by bin(timestamp, 5m)\n| order by timestamp asc",
        "size": 0,
        "title": "Database Query Performance",
        "timeContext": {
          "durationMs": 3600000
        },
        "queryType": 0,
        "resourceType": "microsoft.insights/components",
        "visualization": "timechart"
      },
      "name": "database-performance"
    },
    {
      "type": 10,
      "content": {
        "chartId": "workbook-interactive-chart-3",
        "version": "KqlItem/1.0",
        "query": "exceptions\n| where timestamp >= ago(24h)\n| where method contains \"mcp\"\n| summarize ErrorCount = count() by bin(timestamp, 1h), type\n| order by timestamp asc",
        "size": 0,
        "title": "Error Rate Analysis",
        "timeContext": {
          "durationMs": 86400000
        },
        "queryType": 0,
        "resourceType": "microsoft.insights/components",
        "visualization": "barchart"
      },
      "name": "error-analysis"
    },
    {
      "type": 10,
      "content": {
        "chartId": "workbook-interactive-chart-4",
        "version": "KqlItem/1.0",
        "query": "customMetrics\n| where name in (\"system_cpu_usage_percent\", \"system_memory_usage_bytes\")\n| where timestamp >= ago(2h)\n| extend MetricType = case(\n    name == \"system_cpu_usage_percent\", \"CPU %\",\n    name == \"system_memory_usage_bytes\", \"Memory GB\",\n    \"Unknown\"\n)\n| extend NormalizedValue = case(\n    name == \"system_memory_usage_bytes\", value / (1024*1024*1024),\n    value\n)\n| summarize AvgValue = avg(NormalizedValue) by bin(timestamp, 5m), MetricType\n| order by timestamp asc",
        "size": 0,
        "title": "System Resource Usage",
        "timeContext": {
          "durationMs": 7200000
        },
        "queryType": 0,
        "resourceType": "microsoft.insights/components",
        "visualization": "linechart"
      },
      "name": "system-resources"
    }
  ],
  "isLocked": false,
  "fallbackResourceIds": [
    "/subscriptions/{subscription-id}/resourceGroups/{resource-group}/providers/microsoft.insights/components/{app-insights-name}"
  ]
}
```

### കസ്റ്റം ഡാഷ്‌ബോർഡ് നടപ്പിലാക്കൽ

```python
# mcp_server/dashboard.py
"""
Custom dashboard data provider for MCP server metrics.
"""
from typing import Dict, List, Any
from fastapi import APIRouter, Depends
from datetime import datetime, timedelta

dashboard_router = APIRouter(prefix="/dashboard", tags=["dashboard"])

class DashboardDataProvider:
    """Provide dashboard data from various sources."""
    
    def __init__(self):
        self.metrics_collector = metrics_collector
        self.alert_manager = alert_manager
    
    async def get_overview_metrics(self) -> Dict[str, Any]:
        """Get high-level overview metrics."""
        
        current_time = time.time()
        one_hour_ago = current_time - 3600
        
        return {
            "timestamp": current_time,
            "active_alerts": len(self.alert_manager.active_alerts),
            "critical_alerts": len([
                alert for alert in self.alert_manager.active_alerts.values()
                if alert.severity == AlertSeverity.CRITICAL
            ]),
            "requests_last_hour": await self._get_request_count(one_hour_ago),
            "avg_response_time": await self._get_avg_response_time(one_hour_ago),
            "error_rate": await self._get_error_rate(one_hour_ago),
            "database_status": await self._get_database_status(),
            "system_health": await self._get_system_health()
        }
    
    async def get_performance_trends(self, hours: int = 24) -> Dict[str, List[Dict]]:
        """Get performance trends over time."""
        
        end_time = time.time()
        start_time = end_time - (hours * 3600)
        
        # മണിക്കൂറു ভিত্তിയിലുള്ള ഡാറ്റ പോയിന്റുകൾ സൃഷ്ടിക്കുക
        data_points = []
        current = start_time
        
        while current < end_time:
            hour_start = current
            hour_end = current + 3600
            
            data_points.append({
                "timestamp": current,
                "requests": await self._get_request_count_range(hour_start, hour_end),
                "avg_duration": await self._get_avg_duration_range(hour_start, hour_end),
                "error_count": await self._get_error_count_range(hour_start, hour_end),
                "cpu_usage": await self._get_cpu_usage_range(hour_start, hour_end),
                "memory_usage": await self._get_memory_usage_range(hour_start, hour_end)
            })
            
            current = hour_end
        
        return {
            "time_series": data_points,
            "period_hours": hours,
            "data_points": len(data_points)
        }
    
    async def get_business_insights(self) -> Dict[str, Any]:
        """Get business-specific insights."""
        
        return {
            "top_queries": await self._get_top_queries(),
            "store_activity": await self._get_store_activity(),
            "tool_usage": await self._get_tool_usage_stats(),
            "user_patterns": await self._get_user_patterns(),
            "peak_hours": await self._get_peak_hours()
        }
    
    async def _get_request_count(self, since_time: float) -> int:
        """Get request count since specified time."""
        summary = self.metrics_collector.get_metric_summary(
            "mcp_requests_total",
            time_window_minutes=int((time.time() - since_time) / 60)
        )
        return summary.get("count", 0)
    
    async def _get_avg_response_time(self, since_time: float) -> float:
        """Get average response time since specified time."""
        summary = self.metrics_collector.get_metric_summary(
            "mcp_request_duration_seconds",
            time_window_minutes=int((time.time() - since_time) / 60)
        )
        return summary.get("mean", 0.0) * 1000  # മില്ലിസെക്കൻഡുകളിലേക്ക് മാറ്റുക
    
    async def _get_error_rate(self, since_time: float) -> float:
        """Calculate error rate since specified time."""
        
        total_requests = await self._get_request_count(since_time)
        error_summary = self.metrics_collector.get_metric_summary(
            "errors_total",
            time_window_minutes=int((time.time() - since_time) / 60)
        )
        error_count = error_summary.get("count", 0)
        
        if total_requests == 0:
            return 0.0
        
        return error_count / total_requests
    
    async def _get_database_status(self) -> str:
        """Get current database status."""
        try:
            health = await db_provider.health_check()
            return health.get("status", "unknown")
        except Exception:
            return "unhealthy"
    
    async def _get_system_health(self) -> Dict[str, Any]:
        """Get current system health metrics."""
        
        cpu_summary = self.metrics_collector.get_metric_summary("system_cpu_usage_percent", 5)
        memory_summary = self.metrics_collector.get_metric_summary("system_memory_usage_bytes", 5)
        
        return {
            "cpu_usage": cpu_summary.get("mean", 0),
            "memory_usage_gb": memory_summary.get("mean", 0) / (1024**3),
            "status": "healthy"  # യഥാർത്ഥ ഹെൽത്ത് ലജിക് നടപ്പിലാക്കും
        }

# ഡാഷ്ബോർഡ് API എന്റ്പോയിന്റുകൾ
dashboard_provider = DashboardDataProvider()

@dashboard_router.get("/overview")
async def get_dashboard_overview():
    """Get dashboard overview data."""
    return await dashboard_provider.get_overview_metrics()

@dashboard_router.get("/performance")
async def get_performance_data(hours: int = 24):
    """Get performance trend data."""
    return await dashboard_provider.get_performance_trends(hours)

@dashboard_router.get("/business")
async def get_business_insights():
    """Get business insights data."""
    return await dashboard_provider.get_business_insights()

@dashboard_router.get("/alerts")
async def get_active_alerts():
    """Get active alerts."""
    return {
        "active_alerts": [
            {
                "rule_name": alert.rule_name,
                "severity": alert.severity.value,
                "message": alert.message,
                "timestamp": alert.timestamp,
                "acknowledged": alert.acknowledged
            }
            for alert in alert_manager.active_alerts.values()
        ],
        "alert_count": len(alert_manager.active_alerts)
    }
```

## 🔍 തകർച്ച പരിഹാര പ്രവൃത്തിസഞ്ചികകൾ

### ഓട്ടോമേറ്റഡ് ഡയഗ്നോസ്റ്റിക്സ്

```python
# mcp_server/diagnostics.py
"""
Automated diagnostics and troubleshooting for MCP server.
"""
import asyncio
import subprocess
from typing import Dict, List, Any, Optional
from dataclasses import dataclass

@dataclass
class DiagnosticResult:
    """Result of a diagnostic check."""
    check_name: str
    status: str  # "അതിർക്കുക", "നിഷേധിക്കുക", "എച്ച്എസ്എൽ"
    message: str
    details: Dict[str, Any]
    remediation: Optional[str] = None

class DiagnosticsEngine:
    """Comprehensive diagnostics engine."""
    
    def __init__(self):
        self.diagnostic_checks = []
        self._register_default_checks()
    
    def _register_default_checks(self):
        """Register default diagnostic checks."""
        
        self.diagnostic_checks = [
            self._check_database_connectivity,
            self._check_azure_services,
            self._check_system_resources,
            self._check_configuration,
            self._check_network_connectivity,
            self._check_disk_space,
            self._check_log_files,
            self._check_security_status
        ]
    
    async def run_full_diagnostics(self) -> List[DiagnosticResult]:
        """Run all diagnostic checks."""
        
        results = []
        
        for check_func in self.diagnostic_checks:
            try:
                result = await check_func()
                results.append(result)
            except Exception as e:
                results.append(DiagnosticResult(
                    check_name=check_func.__name__,
                    status="fail",
                    message=f"Diagnostic check failed: {str(e)}",
                    details={"exception": str(e)}
                ))
        
        return results
    
    async def _check_database_connectivity(self) -> DiagnosticResult:
        """Check database connectivity and performance."""
        
        try:
            start_time = time.time()
            health = await db_provider.health_check()
            duration = time.time() - start_time
            
            if health["status"] == "healthy":
                if duration > 1.0:
                    return DiagnosticResult(
                        check_name="database_connectivity",
                        status="warning",
                        message=f"Database responsive but slow ({duration:.2f}s)",
                        details=health,
                        remediation="Check database server load and network latency"
                    )
                else:
                    return DiagnosticResult(
                        check_name="database_connectivity",
                        status="pass",
                        message=f"Database healthy ({duration:.2f}s response time)",
                        details=health
                    )
            else:
                return DiagnosticResult(
                    check_name="database_connectivity",
                    status="fail",
                    message="Database not healthy",
                    details=health,
                    remediation="Check database server status and connection parameters"
                )
                
        except Exception as e:
            return DiagnosticResult(
                check_name="database_connectivity",
                status="fail",
                message=f"Database connectivity failed: {str(e)}",
                details={"error": str(e)},
                remediation="Verify database server is running and connection parameters are correct"
            )
    
    async def _check_azure_services(self) -> DiagnosticResult:
        """Check Azure AI services connectivity."""
        
        try:
            # അസ്യൂർ ഓപ്പൺഎഐ ബന്ധം പരിശോദിക്കുക
            from azure.identity import DefaultAzureCredential
            from azure.ai.projects import AIProjectClient
            
            credential = DefaultAzureCredential()
            project_client = AIProjectClient(
                endpoint=config.azure.project_endpoint,
                credential=credential
            )
            
            # ഇത് യാഥാർത്ഥ്യ ബന്ധം പരീക്ഷണം നടത്തും
            # ഇപ്പോൾ, വെറും കോൺഫിഗറേഷൻ പരിശോധിക്കുക
            
            if config.azure.is_configured():
                return DiagnosticResult(
                    check_name="azure_services",
                    status="pass",
                    message="Azure services configuration valid",
                    details={
                        "project_endpoint": config.azure.project_endpoint,
                        "openai_endpoint": config.azure.openai_endpoint
                    }
                )
            else:
                return DiagnosticResult(
                    check_name="azure_services",
                    status="fail",
                    message="Azure services not properly configured",
                    details={"missing_config": "Check environment variables"},
                    remediation="Ensure all Azure configuration environment variables are set"
                )
                
        except Exception as e:
            return DiagnosticResult(
                check_name="azure_services",
                status="fail",
                message=f"Azure services check failed: {str(e)}",
                details={"error": str(e)},
                remediation="Check Azure credentials and network connectivity"
            )
    
    async def _check_system_resources(self) -> DiagnosticResult:
        """Check system resource usage."""
        
        try:
            import psutil
            
            cpu_percent = psutil.cpu_percent(interval=1)
            memory = psutil.virtual_memory()
            disk = psutil.disk_usage('/')
            
            warnings = []
            
            if cpu_percent > 85:
                warnings.append(f"High CPU usage: {cpu_percent:.1f}%")
            
            if memory.percent > 85:
                warnings.append(f"High memory usage: {memory.percent:.1f}%")
            
            if disk.percent > 85:
                warnings.append(f"High disk usage: {disk.percent:.1f}%")
            
            details = {
                "cpu_percent": cpu_percent,
                "memory_percent": memory.percent,
                "memory_available_gb": memory.available / (1024**3),
                "disk_percent": disk.percent,
                "disk_free_gb": disk.free / (1024**3)
            }
            
            if warnings:
                return DiagnosticResult(
                    check_name="system_resources",
                    status="warning",
                    message=f"Resource warnings: {'; '.join(warnings)}",
                    details=details,
                    remediation="Monitor resource usage and consider scaling"
                )
            else:
                return DiagnosticResult(
                    check_name="system_resources",
                    status="pass",
                    message="System resources normal",
                    details=details
                )
                
        except Exception as e:
            return DiagnosticResult(
                check_name="system_resources",
                status="fail",
                message=f"Resource check failed: {str(e)}",
                details={"error": str(e)}
            )
    
    async def _check_configuration(self) -> DiagnosticResult:
        """Check configuration validity."""
        
        try:
            issues = []
            
            # ആവശ്യമുള്ള എൻവയോൺമെന്റ് വേരിയബിളുകൾ പരിശോധിക്കുക
            required_vars = [
                "POSTGRES_HOST", "POSTGRES_PASSWORD",
                "PROJECT_ENDPOINT", "AZURE_CLIENT_ID"
            ]
            
            for var in required_vars:
                if not os.getenv(var):
                    issues.append(f"Missing environment variable: {var}")
            
            # കോൺഫിഗറേഷൻ സുസ്ഥിരത പരിശോധിക്കുക
            if config.server.enable_health_check and not config.server.applicationinsights_connection_string:
                issues.append("Health check enabled but Application Insights not configured")
            
            if issues:
                return DiagnosticResult(
                    check_name="configuration",
                    status="fail",
                    message=f"Configuration issues: {'; '.join(issues)}",
                    details={"issues": issues},
                    remediation="Fix configuration issues and restart service"
                )
            else:
                return DiagnosticResult(
                    check_name="configuration",
                    status="pass",
                    message="Configuration valid",
                    details={"status": "all_checks_passed"}
                )
                
        except Exception as e:
            return DiagnosticResult(
                check_name="configuration",
                status="fail",
                message=f"Configuration check failed: {str(e)}",
                details={"error": str(e)}
            )

# ഡയഗ്നോസ്റ്റിക് API അവസാനപൊയ്ക്ക്
@dashboard_router.get("/diagnostics")
async def run_diagnostics():
    """Run comprehensive diagnostics."""
    
    diagnostics_engine = DiagnosticsEngine()
    results = await diagnostics_engine.run_full_diagnostics()
    
    # ഫലങ്ങൾ സംക്ഷേപിക്കുക
    summary = {
        "total_checks": len(results),
        "passed": len([r for r in results if r.status == "pass"]),
        "warnings": len([r for r in results if r.status == "warning"]),
        "failed": len([r for r in results if r.status == "fail"]),
        "overall_status": "healthy" if all(r.status in ["pass", "warning"] for r in results) else "unhealthy"
    }
    
    return {
        "summary": summary,
        "results": [
            {
                "check_name": r.check_name,
                "status": r.status,
                "message": r.message,
                "details": r.details,
                "remediation": r.remediation
            }
            for r in results
        ],
        "timestamp": time.time()
    }
```

### ഓപ്പറേഷൻ റൺബുക്കുകൾ

```yaml
# operational-runbooks.yml
runbooks:
  
  database_connection_failure:
    title: "Database Connection Failure"
    description: "Steps to resolve database connectivity issues"
    severity: "critical"
    steps:
      - name: "Check database server status"
        action: "Verify PostgreSQL service is running"
        commands:
          - "docker-compose ps postgres"
          - "docker-compose logs postgres"
      
      - name: "Test network connectivity"
        action: "Verify network connection to database"
        commands:
          - "telnet postgres-host 5432"
          - "nslookup postgres-host"
      
      - name: "Check connection pool"
        action: "Verify connection pool status"
        commands:
          - "curl http://localhost:8000/health/detailed"
      
      - name: "Restart services"
        action: "Restart MCP server and database if needed"
        commands:
          - "docker-compose restart"
    
    escalation:
      - "If issue persists, contact database administrator"
      - "Check for infrastructure issues in Azure portal"

  high_error_rate:
    title: "High Error Rate Detected"
    description: "Steps to investigate and resolve high error rates"
    severity: "high"
    steps:
      - name: "Check recent logs"
        action: "Review error logs for patterns"
        commands:
          - "docker-compose logs mcp_server | grep ERROR | tail -50"
      
      - name: "Analyze error types"
        action: "Categorize errors by type and frequency"
        api_endpoint: "/dashboard/diagnostics"
      
      - name: "Check system resources"
        action: "Verify system is not under resource pressure"
        commands:
          - "curl http://localhost:8000/health/detailed"
      
      - name: "Review recent deployments"
        action: "Check if errors started after recent deployment"
        
      - name: "Enable debug logging"
        action: "Temporarily increase log level for detailed diagnostics"
        environment_variable: "LOG_LEVEL=DEBUG"

  slow_performance:
    title: "Slow Query Performance"
    description: "Steps to diagnose and improve query performance"
    severity: "medium"
    steps:
      - name: "Identify slow queries"
        action: "Find queries taking longer than normal"
        sql_query: "SELECT query, mean_exec_time FROM pg_stat_statements ORDER BY mean_exec_time DESC LIMIT 10"
      
      - name: "Check database indexes"
        action: "Verify proper indexes exist"
        sql_query: "SELECT schemaname, tablename, indexname FROM pg_indexes WHERE schemaname = 'retail'"
      
      - name: "Analyze query plans"
        action: "Review execution plans for slow queries"
        sql_command: "EXPLAIN ANALYZE"
      
      - name: "Check connection pool"
        action: "Verify connection pool is not exhausted"
        api_endpoint: "/health/detailed"
      
      - name: "Monitor resource usage"
        action: "Check CPU and memory during queries"
        commands:
          - "top -p $(pgrep postgres)"
```

## 🎯 പ്രധാന ഊട്ടിക്കൽങ്ങൾ

ഈ ലാബ് പൂർത്തിയാക്കിയതിനുശേഷം, നിങ്ങൾക്കുണ്ടാകണം:

✅ **ആപ്ലിക്കേഷൻ ഇൻസൈറ്റ്സ് ഇന്റഗ്രേഷൻ**: സമഗ്രമായ ടെലിമെട്രി এবং നിരീക്ഷണം സജ്ജമാക്കൽ  
✅ **ഘടിത ലോഗിംഗ്**: കോറെലെഷനും പശ്ചാത്തലവുമുള്ള നിർമ്മാണതയ്യാറായ ലോഗിംഗ്  
✅ **കസ്റ്റം മീറ്റ്രിക്‌സ്**: ബിസിനസ്സും സാങ്കേതികവുമായ മീറ്റ്രിക്‌സ് ശേഖരണവും വിശകലനവും  
✅ **ബുദ്ധിമുട്ടുള്ള അലേർട്ടിംഗ്**: ബഹുമുഖ അറിയിപ്പ് ചാനലുകൾ ഉൾപ്പടെ പ്രൊആക്ടീവ് അലേർട്ടിംഗ്  
✅ **ഓപ്പറേഷൻ ഡാഷ്‌ബോർഡുകൾ**: യഥാർത്ഥ-സമയ നിരീക്ഷണവും ബിസിനസ്സ്洞ാ洞ങ്ങൾ  
✅ **തകർച്ച പരിഹാര പ്രവൃത്തിസഞ്ചികകൾ**: ഓട്ടോമേറ്റഡ് ഡയഗ്നോസ്റ്റിക്സും ഓപ്പറേഷൻ റൺബുക്കുകളും  

## 🚀 അടുത്തത് എന്ത്

**[ലാബ് 12: മികച്ച പ്രയോഗങ്ങളും മെച്ചപ്പെടുത്തലുകളും](../12-Best-Practices/README.md)** തുടർച്ചയായി ചെയ്യുക:

- പ്രകടനം മെച്ചപ്പെടുത്താനുള്ള സാങ്കേതിക വിദ്യകൾ പ്രയോഗിക്കുക  
- സമഗ്രമായ സാങ്കേതിക സുരക്ഷ ഉറപ്പാക്കുക  
- നിർമ്മാണ ഡിപ്ലോയ്മെന്റ് മികച്ച പ്രായോഗിക തന്ത്രങ്ങൾ പഠിക്കുക  
- ചെലവ് മെച്ചപ്പെടുത്താനുള്ള തന്ത്രങ്ങൾ സ്ഥാപിക്കുക  

## 📚 കൂട്ടാന്വേഷണ സ്രോതസ്സ്

### ആസ്യൂർ മോനിറ്റർ
- [Application Insights ഡോക്യുമെന്റേഷൻ](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - സമഗ്രമായ നിരീക്ഷണ മാർഗനിർദ്ദേശം  
- [KQL ക്വറി റഫറൻസ്](https://docs.microsoft.com/azure/data-explorer/kql-quick-reference) - ആപ്ലിക്കേഷൻ ഇൻസൈറ്റ്സിനു വേണ്ടി ക്വറി ഭാഷ  
- [ആസ്യൂർ മോനിറ്റർ വർക്ക്‌ബുക്കുകൾ](https://docs.microsoft.com/azure/azure-monitor/visualize/workbooks-overview) - കസ്റ്റം ഡാഷ്‌ബോർഡ് സൃഷ്ടിക്കൽ  

### ഓപ്പൺടെലിമെട്രി
- [OpenTelemetry Python](https://opentelemetry.io/docs/instrumentation/python/) - ഇൻസ്ട്രുമെന്റേഷൻ ഗൈഡ്  
- [ഡിസ്‌ട്രിബ്യൂട്ടഡ് ട്രേസിംഗ്](https://opentelemetry.io/docs/concepts/observability-primer/#distributed-traces) - ട്രേസിംഗ് ആശയങ്ങൾ  
- [മീറ്റ്രിക്‌സ് ശേഖരണം](https://opentelemetry.io/docs/concepts/observability-primer/#reliability--metrics) - മീറ്റ്രിക്‌സിന്റെ മികച്ച പ്രയോഗങ്ങൾ  

### ഓപ്പറേഷണൽ എക്‌സെല്ലൻസ്
- [SRE ഹാൻഡ്‌ബുക്ക്](https://sre.google/sre-book/table-of-contents/) - സൈറ്റ് റിലയബിലിറ്റി എഞ്ചിനീയറിങ് സിദ്ധാന്തങ്ങൾ  
- [നിരീക്ഷണ മികച്ച പ്രയോഗങ്ങൾ](https://cloud.google.com/architecture/framework/reliability/monitoring-alerting-logging) - വ്യവസായത്തിലെ മികച്ച പ്രയോഗങ്ങൾ  
- [ഇൻസിഡന്റ് റെസ്പോൺസ്](https://response.pagerduty.com/) - ഇൻസിഡന്റ് മാനേജ്മെന്റ് ഗൈഡ്  

---

**മുമ്പത്തെ**: [ലാബ് 10: ഡിപ്ലോയ്മെന്റ് തന്ത്രങ്ങൾ](../10-Deployment/README.md)  
**അടുത്ത**: [ലാബ് 12: മികച്ച പ്രയോഗങ്ങളും മെച്ചപ്പെടുത്തലുകളും](../12-Best-Practices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**അറിയിപ്പ്**:
ഈ രേഖ AI പരിഭാഷാ സേവനം [Co-op Translator](https://github.com/Azure/co-op-translator) ഉപയോഗിച്ച് പരിഭാഷപ്പെടുത്തിയതാണ്. ഞങ്ങൾ കൃത്യതയ്ക്കായി ശ്രമിക്കുന്നുവെങ്കിലും, ഓട്ടോമേറ്റഡ് പരിഭാഷകളിൽ പിഴവുകൾ അല്ലെങ്കിൽ തെറ്റായ വിവരങ്ങൾ ഉണ്ടാകാൻ സാധ്യതയുണ്ട്. അതിന്റെ സ്വാഭാവിക ഭാഷയിലുള്ള അസൽ രേഖയാണ് പ്രാമാണികമായ ഉറവിടമായി പരിഗണിക്കേണ്ടത്. നിർണായകമായ വിവരങ്ങൾക്ക്, പ്രൊഫഷണൽ മനുഷ്യ പരിഭാഷ ശുപാർശ ചെയ്യുന്നു. ഈ പരിഭാഷ ഉപയോഗിച്ച് ഉണ്ടാകുന്ന തെറ്റിദ്ധാരണകൾ അല്ലെങ്കിൽ തെറ്റായ വ്യാഖ്യാനങ്ങൾക്കായി ഞങ്ങൾ ഉത്തരവാദികളല്ല.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->