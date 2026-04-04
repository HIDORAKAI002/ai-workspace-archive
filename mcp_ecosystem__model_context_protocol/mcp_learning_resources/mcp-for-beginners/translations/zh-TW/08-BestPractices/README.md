# MCP 開發最佳實踐

[![MCP Development Best Practices](../../../translated_images/zh-TW/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(點擊上方圖片觀看本課程影片)_

## 概述

本課程聚焦於在生產環境中開發、測試與部署 MCP 伺服器及功能的進階最佳實踐。隨著 MCP 生態系統日益複雜與重要，遵循既定模式確保可靠性、可維護性與互操作性。本課程彙整來自實際 MCP 實作的實務智慧，指導您打造健壯高效的伺服器，並配合有效的資源、提示與工具。

## 學習目標

完成本課程後，您將能夠：

- 應用產業最佳實踐於 MCP 伺服器與功能設計
- 建立完整的 MCP 伺服器測試策略
- 設計高效且可重用的 MCP 複雜應用工作流程模式
- 實作適當的錯誤處理、記錄與可觀察性於 MCP 伺服器
- 優化 MCP 實作以提升效能、安全性與可維護性

## MCP 核心原則

在深入特定實作慣例前，理解指引有效 MCP 開發的核心原則十分重要：

1. **標準化溝通**：MCP 以 JSON-RPC 2.0 為基礎，為請求、回應及錯誤處理提供一致格式。

2. **以使用者為中心的設計**：始終優先考量使用者同意、控制權及透明度。

3. **安全優先**：實施包括認證、授權、驗證及速率限制的強健安全措施。

4. **模組化架構**：以模組化思維設計 MCP 伺服器，每個工具與資源皆有明確且專注的作用。

5. **有狀態連線**：利用 MCP 能跨多次請求維持狀態，促成更具連貫性與上下文感知的互動。

## 官方 MCP 最佳實踐

以下最佳實踐源自官方 Model Context Protocol 文件：

### 安全最佳實踐

1. **使用者同意與控制**：存取資料或執行操作前，始終要求明確使用者同意，並提供清楚控制對象資料及授權行為。

2. **資料隱私**：僅在明確同意下揭露使用者資料，並使用適當存取控管防止未授權資料傳輸。

3. **工具安全**：調用任一工具前必須取得使用者明確同意，確保使用者理解各工具功能並強制實施嚴謹安全邊界。

4. **工具權限控管**：配置模型於會話中可使用之工具，確保僅能存取明確授權工具。

5. **認證**：取得 API 金鑰、OAuth 權杖或其他安全認證方法，於授予工具、資源或敏感操作存取權限前進行正式認證。

6. **參數驗證**：強制所有工具的呼叫參數驗證，防止錯誤或惡意輸入。

7. **速率限制**：實施速率限制以防止濫用並確保系統資源公平使用。

### 實作最佳實踐

1. **能力協商**：連線建立時，交換支援特性、協定版本、可用工具與資源等資訊。

2. **工具設計**：打造專注且擅長特定任務的工具，避免一體式巨量複合工具。

3. **錯誤處理**：實作標準化錯誤訊息與代碼，協助診斷問題、優雅處理失敗，並提供可執行回饋。

4. **記錄**：配置結構化日誌以供稽核、除錯及監控協定互動。

5. **進度追蹤**：針對長時執行操作報告進度更新，以提升使用者介面回應性。

6. **請求取消**：允許客戶端取消已送出的請求，尤其是不再需要或耗時過久之請求。

## 額外參考資料

欲取得 MCP 最新最佳實踐資訊，請參考：

- [MCP 文件](https://modelcontextprotocol.io/)
- [MCP 規範 (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub 倉庫](https://github.com/modelcontextprotocol)
- [安全最佳實踐](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - 安全風險與緩解措施
- [MCP 安全高峰會工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/) - 實務安全訓練

## 實務實作範例

### 工具設計最佳實踐

#### 1. 單一職責原則

每個 MCP 工具應具備明確且專注的用途。避免創建試圖兼顧多重責任的一體式工具，應發展專用工具以擅長特定任務。

```csharp
// A focused tool that does one thing well
public class WeatherForecastTool : ITool
{
    private readonly IWeatherService _weatherService;
    
    public WeatherForecastTool(IWeatherService weatherService)
    {
        _weatherService = weatherService;
    }
    
    public string Name => "weatherForecast";
    public string Description => "Gets weather forecast for a specific location";
    
    public ToolDefinition GetDefinition()
    {
        return new ToolDefinition
        {
            Name = Name,
            Description = Description,
            Parameters = new Dictionary<string, ParameterDefinition>
            {
                ["location"] = new ParameterDefinition
                {
                    Type = ParameterType.String,
                    Description = "City or location name"
                },
                ["days"] = new ParameterDefinition
                {
                    Type = ParameterType.Integer,
                    Description = "Number of forecast days",
                    Default = 3
                }
            },
            Required = new[] { "location" }
        };
    }
    
    public async Task<ToolResponse> ExecuteAsync(IDictionary<string, object> parameters)
    {
        var location = parameters["location"].ToString();
        var days = parameters.ContainsKey("days") 
            ? Convert.ToInt32(parameters["days"]) 
            : 3;
            
        var forecast = await _weatherService.GetForecastAsync(location, days);
        
        return new ToolResponse
        {
            Content = new List<ContentItem>
            {
                new TextContent(JsonSerializer.Serialize(forecast))
            }
        };
    }
}
```

#### 2. 一致錯誤處理

實作完整且具資訊豐富的錯誤處理機制，並提供適切的復原方式。

```python
# Python 範例帶有完善的錯誤處理
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # 參數驗證
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # 安全性驗證
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # 帶有逾時的資料庫操作
                async with timeout(10):  # 10 秒逾時
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # 連線錯誤可能是暫時性的
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # 查詢錯誤很可能是用戶端錯誤
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # 允許工具特定錯誤通過
            raise
        except Exception as e:
            # 捕捉所有意外錯誤
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # SQL 注入偵測的實作
        pass
        
    def _log_error(self, message, error):
        # 錯誤記錄的實作
        pass
```

#### 3. 參數驗證

始終完整驗證參數，防止格式錯誤或惡意輸入。

```javascript
// JavaScript/TypeScript 範例，包含詳細的參數驗證
class FileOperationTool {
  getName() {
    return "fileOperation";
  }
  
  getDescription() {
    return "Performs file operations like read, write, and delete";
  }
  
  getDefinition() {
    return {
      name: this.getName(),
      description: this.getDescription(),
      parameters: {
        operation: {
          type: "string",
          description: "Operation to perform",
          enum: ["read", "write", "delete"]
        },
        path: {
          type: "string",
          description: "File path (must be within allowed directories)"
        },
        content: {
          type: "string",
          description: "Content to write (only for write operation)",
          optional: true
        }
      },
      required: ["operation", "path"]
    };
  }
  
  async execute(parameters) {
    // 1. 驗證參數是否存在
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. 驗證參數類型
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. 驗證參數值
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. 驗證寫入操作時內容是否存在
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. 路徑安全性驗證
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // 基於已驗證參數的實現
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // 路徑安全性檢查的實現
    // ...
  }
}
```

### 安全實作範例

#### 1. 認證與授權

```java
// Java 範例，包含身份驗證和授權
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // 依賴注入
    public SecureDataAccessTool(
            AuthenticationService authService,
            AuthorizationService authzService,
            DataService dataService) {
        this.authService = authService;
        this.authzService = authzService;
        this.dataService = dataService;
    }
    
    @Override
    public String getName() {
        return "secureDataAccess";
    }
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        // 1. 擷取身份驗證上下文
        String authToken = request.getContext().getAuthToken();
        
        // 2. 驗證使用者身份
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. 檢查特定操作的授權
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. 執行已授權的操作
        try {
            switch (operation) {
                case "read":
                    Object data = dataService.getData(dataId, user.getId());
                    return ToolResponse.success(data);
                case "update":
                    JsonNode newData = request.getParameters().get("newData");
                    dataService.updateData(dataId, newData, user.getId());
                    return ToolResponse.success("Data updated successfully");
                default:
                    return ToolResponse.error("Unsupported operation: " + operation);
            }
        } catch (Exception e) {
            return ToolResponse.error("Operation failed: " + e.getMessage());
        }
    }
}
```

#### 2. 速率限制

```csharp
// C# rate limiting implementation
public class RateLimitingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IMemoryCache _cache;
    private readonly ILogger<RateLimitingMiddleware> _logger;
    
    // Configuration options
    private readonly int _maxRequestsPerMinute;
    
    public RateLimitingMiddleware(
        RequestDelegate next,
        IMemoryCache cache,
        ILogger<RateLimitingMiddleware> logger,
        IConfiguration config)
    {
        _next = next;
        _cache = cache;
        _logger = logger;
        _maxRequestsPerMinute = config.GetValue<int>("RateLimit:MaxRequestsPerMinute", 60);
    }
    
    public async Task InvokeAsync(HttpContext context)
    {
        // 1. Get client identifier (API key or user ID)
        string clientId = GetClientIdentifier(context);
        
        // 2. Get rate limiting key for this minute
        string cacheKey = $"rate_limit:{clientId}:{DateTime.UtcNow:yyyyMMddHHmm}";
        
        // 3. Check current request count
        if (!_cache.TryGetValue(cacheKey, out int requestCount))
        {
            requestCount = 0;
        }
        
        // 4. Enforce rate limit
        if (requestCount >= _maxRequestsPerMinute)
        {
            _logger.LogWarning("Rate limit exceeded for client {ClientId}", clientId);
            
            context.Response.StatusCode = StatusCodes.Status429TooManyRequests;
            context.Response.Headers.Add("Retry-After", "60");
            
            await context.Response.WriteAsJsonAsync(new
            {
                error = "Rate limit exceeded",
                message = "Too many requests. Please try again later.",
                retryAfterSeconds = 60
            });
            
            return;
        }
        
        // 5. Increment request count
        _cache.Set(cacheKey, requestCount + 1, TimeSpan.FromMinutes(2));
        
        // 6. Add rate limit headers
        context.Response.Headers.Add("X-RateLimit-Limit", _maxRequestsPerMinute.ToString());
        context.Response.Headers.Add("X-RateLimit-Remaining", (_maxRequestsPerMinute - requestCount - 1).ToString());
        
        // 7. Continue with the request
        await _next(context);
    }
    
    private string GetClientIdentifier(HttpContext context)
    {
        // Implementation to extract API key or user ID
        // ...
    }
}
```

## 測試最佳實踐

### 1. MCP 工具單元測試

總是隔離測試工具，模擬外部依賴：

```typescript
// TypeScript 工具單元測試範例
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // 建立一個模擬氣象服務
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // 使用模擬依賴建立工具
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // Arrange（準備）
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // Act（執行）
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // Assert（斷言）
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // Arrange（準備）
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // Act & Assert（執行並斷言）
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. 整合測試

測試從客戶端請求至伺服器回應的完整流程：

```python
# Python 整合測試範例
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # 啟動測試伺服器
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # 建立用戶端
        client = McpClient("http://localhost:5000")
        
        # 測試工具發現
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # 測試工具執行
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # 驗證回應
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # 清理工作
        await server.stop()
```

## 性能優化

### 1. 快取策略

實施適當快取以降低延遲與資源用量：

```csharp
// C# example with caching
public class CachedWeatherTool : ITool
{
    private readonly IWeatherService _weatherService;
    private readonly IDistributedCache _cache;
    private readonly ILogger<CachedWeatherTool> _logger;
    
    public CachedWeatherTool(
        IWeatherService weatherService,
        IDistributedCache cache,
        ILogger<CachedWeatherTool> logger)
    {
        _weatherService = weatherService;
        _cache = cache;
        _logger = logger;
    }
    
    public string Name => "weatherForecast";
    
    public async Task<ToolResponse> ExecuteAsync(IDictionary<string, object> parameters)
    {
        var location = parameters["location"].ToString();
        var days = Convert.ToInt32(parameters.GetValueOrDefault("days", 3));
        
        // Create cache key
        string cacheKey = $"weather:{location}:{days}";
        
        // Try to get from cache
        string cachedForecast = await _cache.GetStringAsync(cacheKey);
        if (!string.IsNullOrEmpty(cachedForecast))
        {
            _logger.LogInformation("Cache hit for weather forecast: {Location}", location);
            return new ToolResponse
            {
                Content = new List<ContentItem>
                {
                    new TextContent(cachedForecast)
                }
            };
        }
        
        // Cache miss - get from service
        _logger.LogInformation("Cache miss for weather forecast: {Location}", location);
        var forecast = await _weatherService.GetForecastAsync(location, days);
        string forecastJson = JsonSerializer.Serialize(forecast);
        
        // Store in cache (weather forecasts valid for 1 hour)
        await _cache.SetStringAsync(
            cacheKey,
            forecastJson,
            new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(1)
            });
        
        return new ToolResponse
        {
            Content = new List<ContentItem>
            {
                new TextContent(forecastJson)
            }
        };
    }
}
```

#### 2. 依賴注入與可測試性

設計工具以建構子注入依賴，使其具可測試性與可配置性：

```java
// Java 範例使用依賴注入
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // 透過建構子注入依賴
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // 工具實作
    // ...
}
```

#### 3. 可組合工具

設計可互相組合以構建更複雜工作流程的工具：

```python
# Python 範例顯示可組合的工具
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # 實作...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # 此工具可以使用來自 dataFetch 工具的結果
    async def execute_async(self, request):
        # 實作...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # 此工具可以使用來自 dataAnalysis 工具的結果
    async def execute_async(self, request):
        # 實作...
        pass

# 這些工具可以獨立使用，也可以作為工作流程的一部分
```

### 架構設計最佳實踐

架構是模型與工具間的契約。良好設計的架構提升工具可用性。

#### 1. 清楚參數說明

為每個參數提供描述性資訊：

```csharp
public object GetSchema()
{
    return new {
        type = "object",
        properties = new {
            query = new { 
                type = "string", 
                description = "Search query text. Use precise keywords for better results." 
            },
            filters = new {
                type = "object",
                description = "Optional filters to narrow down search results",
                properties = new {
                    dateRange = new { 
                        type = "string", 
                        description = "Date range in format YYYY-MM-DD:YYYY-MM-DD" 
                    },
                    category = new { 
                        type = "string", 
                        description = "Category name to filter by" 
                    }
                }
            },
            limit = new { 
                type = "integer", 
                description = "Maximum number of results to return (1-50)",
                default = 10
            }
        },
        required = new[] { "query" }
    };
}
```

#### 2. 驗證約束條件

包含驗證約束，防止輸入無效：

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // 電子郵件屬性，包含格式驗證
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // 年齡屬性，包含數字限制
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // 列舉型屬性
    Map<String, Object> subscription = new HashMap<>();
    subscription.put("type", "string");
    subscription.put("enum", Arrays.asList("free", "basic", "premium"));
    subscription.put("default", "free");
    subscription.put("description", "Subscription tier");
    
    properties.put("email", email);
    properties.put("age", age);
    properties.put("subscription", subscription);
    
    schema.put("properties", properties);
    schema.put("required", Arrays.asList("email"));
    
    return schema;
}
```

#### 3. 一致回傳結構

維持回應結構一致，使模型易於解釋結果：

```python
async def execute_async(self, request):
    try:
        # 處理請求
        results = await self._search_database(request.parameters["query"])
        
        # 始終返回一致的結構
        return ToolResponse(
            result={
                "matches": [self._format_item(item) for item in results],
                "totalCount": len(results),
                "queryTime": calculation_time_ms,
                "status": "success"
            }
        )
    except Exception as e:
        return ToolResponse(
            result={
                "matches": [],
                "totalCount": 0,
                "queryTime": 0,
                "status": "error",
                "error": str(e)
            }
        )
    
def _format_item(self, item):
    """Ensures each item has a consistent structure"""
    return {
        "id": item.id,
        "title": item.title,
        "summary": item.summary[:100] + "..." if len(item.summary) > 100 else item.summary,
        "url": item.url,
        "relevance": item.score
    }
```

### 錯誤處理

完善錯誤處理對 MCP 工具穩定性至關重要。

#### 1. 優雅錯誤處理

於適當層級處理錯誤並提供資訊豐富的訊息：

```csharp
public async Task<ToolResponse> ExecuteAsync(ToolRequest request)
{
    try
    {
        string fileId = request.Parameters.GetProperty("fileId").GetString();
        
        try
        {
            var fileData = await _fileService.GetFileAsync(fileId);
            return new ToolResponse { 
                Result = JsonSerializer.SerializeToElement(fileData) 
            };
        }
        catch (FileNotFoundException)
        {
            throw new ToolExecutionException($"File not found: {fileId}");
        }
        catch (UnauthorizedAccessException)
        {
            throw new ToolExecutionException("You don't have permission to access this file");
        }
        catch (Exception ex) when (ex is IOException || ex is TimeoutException)
        {
            _logger.LogError(ex, "Error accessing file {FileId}", fileId);
            throw new ToolExecutionException("Error accessing file: The service is temporarily unavailable");
        }
    }
    catch (JsonException)
    {
        throw new ToolExecutionException("Invalid file ID format");
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Unexpected error in FileAccessTool");
        throw new ToolExecutionException("An unexpected error occurred");
    }
}
```

#### 2. 結構化錯誤回應

盡可能回傳結構化錯誤資訊：

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // 實作
    } catch (Exception ex) {
        Map<String, Object> errorResult = new HashMap<>();
        
        errorResult.put("success", false);
        
        if (ex instanceof ValidationException) {
            ValidationException validationEx = (ValidationException) ex;
            
            errorResult.put("errorType", "validation");
            errorResult.put("errorMessage", validationEx.getMessage());
            errorResult.put("validationErrors", validationEx.getErrors());
            
            return new ToolResponse.Builder()
                .setResult(errorResult)
                .build();
        }
        
        // 將其他例外重新拋出為 ToolExecutionException
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. 重試機制

為暫時性失敗實作合適的重試邏輯：

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # 秒
    
    while retry_count < max_retries:
        try:
            # 呼叫外部 API
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # 指數回退
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # 非暫時性錯誤，不要重試
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### 性能優化

#### 1. 快取

為高成本操作實施快取：

```csharp
public class CachedDataTool : IMcpTool
{
    private readonly IDatabase _database;
    private readonly IMemoryCache _cache;
    
    public CachedDataTool(IDatabase database, IMemoryCache cache)
    {
        _database = database;
        _cache = cache;
    }
    
    public async Task<ToolResponse> ExecuteAsync(ToolRequest request)
    {
        var query = request.Parameters.GetProperty("query").GetString();
        
        // Create cache key based on parameters
        var cacheKey = $"data_query_{ComputeHash(query)}";
        
        // Try to get from cache first
        if (_cache.TryGetValue(cacheKey, out var cachedResult))
        {
            return new ToolResponse { Result = cachedResult };
        }
        
        // Cache miss - perform actual query
        var result = await _database.QueryAsync(query);
        
        // Store in cache with expiration
        var cacheOptions = new MemoryCacheEntryOptions()
            .SetAbsoluteExpiration(TimeSpan.FromMinutes(15));
            
        _cache.Set(cacheKey, JsonSerializer.SerializeToElement(result), cacheOptions);
        
        return new ToolResponse { Result = JsonSerializer.SerializeToElement(result) };
    }
    
    private string ComputeHash(string input)
    {
        // Implementation to generate stable hash for cache key
    }
}
```

#### 2. 非同步處理

針對 I/O 受限操作使用非同步程式設計模式：

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // 對於長時間運行的操作，立即返回處理 ID
        String processId = UUID.randomUUID().toString();
        
        // 開始非同步處理
        CompletableFuture.runAsync(() -> {
            try {
                // 執行長時間運行的操作
                documentService.processDocument(documentId);
                
                // 更新狀態（通常會儲存在資料庫中）
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // 返回包含處理 ID 的立即回應
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // 附屬狀態檢查工具
    public class ProcessStatusTool implements Tool {
        @Override
        public ToolResponse execute(ToolRequest request) {
            String processId = request.getParameters().get("processId").asText();
            ProcessStatus status = processStatusRepository.getStatus(processId);
            
            return new ToolResponse.Builder().setResult(status).build();
        }
    }
}
```

#### 3. 資源節流

實施資源節流避免系統過載：

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # 允許每秒 5 次請求
            bucket_size=10        # 允許突發請求最高達 10 次
        )
    
    async def execute_async(self, request):
        # 檢查是否可以繼續或需要等待
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # 如果等待時間太長
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # 等待適當的延遲時間
                await asyncio.sleep(delay)
        
        # 消耗一個令牌並繼續請求
        self.rate_limiter.consume()
        
        # 呼叫 API
        result = await self._call_api(request.parameters)
        return ToolResponse(result=result)

class TokenBucketRateLimiter:
    def __init__(self, tokens_per_second, bucket_size):
        self.tokens_per_second = tokens_per_second
        self.bucket_size = bucket_size
        self.tokens = bucket_size
        self.last_refill = time.time()
        self.lock = asyncio.Lock()
    
    async def get_delay_time(self):
        async with self.lock:
            self._refill()
            if self.tokens >= 1:
                return 0
            
            # 計算下一個令牌可用的時間
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # 根據經過的時間新增令牌
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### 安全最佳實踐

#### 1. 輸入驗證

徹底驗證輸入參數：

```csharp
public async Task<ToolResponse> ExecuteAsync(ToolRequest request)
{
    // Validate parameters exist
    if (!request.Parameters.TryGetProperty("query", out var queryProp))
    {
        throw new ToolExecutionException("Missing required parameter: query");
    }
    
    // Validate correct type
    if (queryProp.ValueKind != JsonValueKind.String)
    {
        throw new ToolExecutionException("Query parameter must be a string");
    }
    
    var query = queryProp.GetString();
    
    // Validate string content
    if (string.IsNullOrWhiteSpace(query))
    {
        throw new ToolExecutionException("Query parameter cannot be empty");
    }
    
    if (query.Length > 500)
    {
        throw new ToolExecutionException("Query parameter exceeds maximum length of 500 characters");
    }
    
    // Check for SQL injection attacks if applicable
    if (ContainsSqlInjection(query))
    {
        throw new ToolExecutionException("Invalid query: contains potentially unsafe SQL");
    }
    
    // Proceed with execution
    // ...
}
```

#### 2. 授權檢查

實作妥當的授權檢查：

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // 從請求中取得使用者上下文
    UserContext user = request.getContext().getUserContext();
    
    // 檢查使用者是否具有必要的權限
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // 對於特定資源，檢查對該資源的存取權限
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // 繼續執行工具
    // ...
}
```

#### 3. 敏感資料處理

妥善處理敏感資料：

```python
class SecureDataTool(Tool):
    def get_schema(self):
        return {
            "type": "object",
            "properties": {
                "userId": {"type": "string"},
                "includeSensitiveData": {"type": "boolean", "default": False}
            },
            "required": ["userId"]
        }
    
    async def execute_async(self, request):
        user_id = request.parameters["userId"]
        include_sensitive = request.parameters.get("includeSensitiveData", False)
        
        # 獲取用戶資料
        user_data = await self.user_service.get_user_data(user_id)
        
        # 過濾敏感欄位，除非有明確請求且獲得授權
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # 檢查請求上下文中的授權等級
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # 建立副本以避免修改原始資料
        redacted = user_data.copy()
        
        # 塗黑特定的敏感欄位
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # 塗黑巢狀的敏感資料
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## MCP 工具測試最佳實踐

完整測試確保 MCP 工具正確運作、邊界狀況能被妥善處理，並能順利整合至系統。

### 單元測試

#### 1. 隔離測試各個工具

為每個工具功能撰寫專注測試：

```csharp
[Fact]
public async Task WeatherTool_ValidLocation_ReturnsCorrectForecast()
{
    // Arrange
    var mockWeatherService = new Mock<IWeatherService>();
    mockWeatherService
        .Setup(s => s.GetForecastAsync("Seattle", 3))
        .ReturnsAsync(new WeatherForecast(/* test data */));
    
    var tool = new WeatherForecastTool(mockWeatherService.Object);
    
    var request = new ToolRequest(
        toolName: "weatherForecast",
        parameters: JsonSerializer.SerializeToElement(new { 
            location = "Seattle", 
            days = 3 
        })
    );
    
    // Act
    var response = await tool.ExecuteAsync(request);
    
    // Assert
    Assert.NotNull(response);
    var result = JsonSerializer.Deserialize<WeatherForecast>(response.Result);
    Assert.Equal("Seattle", result.Location);
    Assert.Equal(3, result.DailyForecasts.Count);
}

[Fact]
public async Task WeatherTool_InvalidLocation_ThrowsToolExecutionException()
{
    // Arrange
    var mockWeatherService = new Mock<IWeatherService>();
    mockWeatherService
        .Setup(s => s.GetForecastAsync("InvalidLocation", It.IsAny<int>()))
        .ThrowsAsync(new LocationNotFoundException("Location not found"));
    
    var tool = new WeatherForecastTool(mockWeatherService.Object);
    
    var request = new ToolRequest(
        toolName: "weatherForecast",
        parameters: JsonSerializer.SerializeToElement(new { 
            location = "InvalidLocation", 
            days = 3 
        })
    );
    
    // Act & Assert
    var exception = await Assert.ThrowsAsync<ToolExecutionException>(
        () => tool.ExecuteAsync(request)
    );
    
    Assert.Contains("Location not found", exception.Message);
}
```

#### 2. 架構驗證測試

測試架構正確，並正確強制約束條件：

```java
@Test
public void testSchemaValidation() {
    // 建立工具實例
    SearchTool searchTool = new SearchTool();
    
    // 取得結構
    Object schema = searchTool.getSchema();
    
    // 將結構轉換為 JSON 以便驗證
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // 驗證結構是否為有效的 JSONSchema
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // 測試有效參數
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // 測試缺少必需參數
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // 測試無效的參數類型
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. 錯誤處理測試

為錯誤情境建立專門測試：

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # 安排
    tool = ApiTool(timeout=0.1)  # 非常短的超時時間
    
    # 模擬一個將會逾時的請求
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # 比超時時間更長
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # 執行與斷言
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # 驗證例外訊息
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # 安排
    tool = ApiTool()
    
    # 模擬一個受限頻率的回應
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            status=429,
            headers={"Retry-After": "2"},
            body=json.dumps({"error": "Rate limit exceeded"})
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # 執行與斷言
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # 驗證例外包含頻率限制資訊
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### 整合測試

#### 1. 工具鏈測試

測試工具預期組合下的協同運作：

```csharp
[Fact]
public async Task DataProcessingWorkflow_CompletesSuccessfully()
{
    // Arrange
    var dataFetchTool = new DataFetchTool(mockDataService.Object);
    var analysisTools = new DataAnalysisTool(mockAnalysisService.Object);
    var visualizationTool = new DataVisualizationTool(mockVisualizationService.Object);
    
    var toolRegistry = new ToolRegistry();
    toolRegistry.RegisterTool(dataFetchTool);
    toolRegistry.RegisterTool(analysisTools);
    toolRegistry.RegisterTool(visualizationTool);
    
    var workflowExecutor = new WorkflowExecutor(toolRegistry);
    
    // Act
    var result = await workflowExecutor.ExecuteWorkflowAsync(new[] {
        new ToolCall("dataFetch", new { source = "sales2023" }),
        new ToolCall("dataAnalysis", ctx => new { 
            data = ctx.GetResult("dataFetch"),
            analysis = "trend" 
        }),
        new ToolCall("dataVisualize", ctx => new {
            analysisResult = ctx.GetResult("dataAnalysis"),
            type = "line-chart"
        })
    });
    
    // Assert
    Assert.NotNull(result);
    Assert.True(result.Success);
    Assert.NotNull(result.GetResult("dataVisualize"));
    Assert.Contains("chartUrl", result.GetResult("dataVisualize").ToString());
}
```

#### 2. MCP 伺服器測試

測試含完整工具註冊及執行的 MCP 伺服器：

```java
@SpringBootTest
@AutoConfigureMockMvc
public class McpServerIntegrationTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Test
    public void testToolDiscovery() throws Exception {
        // 測試探索端點
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // 建立工具請求
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // 發送請求並驗證回應
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // 建立無效的工具請求
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // 缺少參數「b」
        request.put("parameters", parameters);
        
        // 發送請求並驗證錯誤回應
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. 端對端測試

測試從模型提示到工具執行的完整工作流程：

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # 安排 - 設定 MCP 用戶端與模擬模型
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # 模擬模型回應
    mock_model = MockLanguageModel([
        MockResponse(
            "What's the weather in Seattle?",
            tool_calls=[{
                "tool_name": "weatherForecast",
                "parameters": {"location": "Seattle", "days": 3}
            }]
        ),
        MockResponse(
            "Here's the weather forecast for Seattle:\n- Today: 65°F, Partly Cloudy\n- Tomorrow: 68°F, Sunny\n- Day after: 62°F, Rain",
            tool_calls=[]
        )
    ])
    
    # 模擬天氣工具回應
    with aioresponses() as mocked:
        mocked.post(
            "http://localhost:5000/mcp/execute",
            payload={
                "result": {
                    "location": "Seattle",
                    "forecast": [
                        {"date": "2023-06-01", "temperature": 65, "conditions": "Partly Cloudy"},
                        {"date": "2023-06-02", "temperature": 68, "conditions": "Sunny"},
                        {"date": "2023-06-03", "temperature": 62, "conditions": "Rain"}
                    ]
                }
            }
        )
        
        # 行動
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # 斷言
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### 性能測試

#### 1. 負載測試

測試 MCP 伺服器可處理的並發請求數：

```csharp
[Fact]
public async Task McpServer_HandlesHighConcurrency()
{
    // Arrange
    var server = new McpServer(
        name: "TestServer",
        version: "1.0",
        maxConcurrentRequests: 100
    );
    
    server.RegisterTool(new FastExecutingTool());
    await server.StartAsync();
    
    var client = new McpClient("http://localhost:5000");
    
    // Act
    var tasks = new List<Task<McpResponse>>();
    for (int i = 0; i < 1000; i++)
    {
        tasks.Add(client.ExecuteToolAsync("fastTool", new { iteration = i }));
    }
    
    var results = await Task.WhenAll(tasks);
    
    // Assert
    Assert.Equal(1000, results.Length);
    Assert.All(results, r => Assert.NotNull(r));
}
```

#### 2. 壓力測試

在極端負載下對系統進行測試：

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // 設定 JMeter 進行壓力測試
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // 配置 JMeter 測試計劃
    HashTree testPlanTree = new HashTree();
    
    // 建立測試計劃、執行緒組、取樣器等
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // 新增執行工具的 HTTP 取樣器
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // 新增監聽器
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // 執行測試
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // 驗證結果
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // 平均回應時間 < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 第90百分位數 < 500ms
}
```

#### 3. 監控與分析

建立監控以進行長期效能分析：

```python
# 配置 MCP 伺服器的監控
def configure_monitoring(server):
    # 設置 Prometheus 指標
    prometheus_metrics = {
        "request_count": Counter("mcp_requests_total", "Total MCP requests"),
        "request_latency": Histogram(
            "mcp_request_duration_seconds", 
            "Request duration in seconds",
            buckets=[0.01, 0.05, 0.1, 0.5, 1.0, 2.5, 5.0, 10.0]
        ),
        "tool_execution_count": Counter(
            "mcp_tool_executions_total", 
            "Tool execution count",
            labelnames=["tool_name"]
        ),
        "tool_execution_latency": Histogram(
            "mcp_tool_duration_seconds", 
            "Tool execution duration in seconds",
            labelnames=["tool_name"],
            buckets=[0.01, 0.05, 0.1, 0.5, 1.0, 2.5, 5.0, 10.0]
        ),
        "tool_errors": Counter(
            "mcp_tool_errors_total",
            "Tool execution errors",
            labelnames=["tool_name", "error_type"]
        )
    }
    
    # 新增用於計時和記錄指標的中介軟體
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # 開放指標端點
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP 工作流程設計模式

良好設計的 MCP 工作流程提升效率、穩定性與可維護性。以下為關鍵模式：

### 1. 工具鏈模式

將多個工具串聯，前一工具的輸出成為下一工具的輸入：

```python
# Python 工具鏈實作
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # 要依序執行的工具名稱列表
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # 執行鏈中的每個工具，傳入前一結果
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # 儲存結果並用作下一工具的輸入
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# 範例用法
data_processing_chain = ChainWorkflow([
    "dataFetch",
    "dataCleaner",
    "dataAnalyzer",
    "dataVisualizer"
])

result = await data_processing_chain.execute(
    mcp_client,
    {"source": "sales_database", "table": "transactions"}
)
```

### 2. 分派器模式

使用中央工具根據輸入分派至專門工具：

```csharp
public class ContentDispatcherTool : IMcpTool
{
    private readonly IMcpClient _mcpClient;
    
    public ContentDispatcherTool(IMcpClient mcpClient)
    {
        _mcpClient = mcpClient;
    }
    
    public string Name => "contentProcessor";
    public string Description => "Processes content of various types";
    
    public object GetSchema()
    {
        return new {
            type = "object",
            properties = new {
                content = new { type = "string" },
                contentType = new { 
                    type = "string",
                    enum = new[] { "text", "html", "markdown", "csv", "code" }
                },
                operation = new { 
                    type = "string",
                    enum = new[] { "summarize", "analyze", "extract", "convert" }
                }
            },
            required = new[] { "content", "contentType", "operation" }
        };
    }
    
    public async Task<ToolResponse> ExecuteAsync(ToolRequest request)
    {
        var content = request.Parameters.GetProperty("content").GetString();
        var contentType = request.Parameters.GetProperty("contentType").GetString();
        var operation = request.Parameters.GetProperty("operation").GetString();
        
        // Determine which specialized tool to use
        string targetTool = DetermineTargetTool(contentType, operation);
        
        // Forward to the specialized tool
        var specializedResponse = await _mcpClient.ExecuteToolAsync(
            targetTool,
            new { content, options = GetOptionsForTool(targetTool, operation) }
        );
        
        return new ToolResponse { Result = specializedResponse.Result };
    }
    
    private string DetermineTargetTool(string contentType, string operation)
    {
        return (contentType, operation) switch
        {
            ("text", "summarize") => "textSummarizer",
            ("text", "analyze") => "textAnalyzer",
            ("html", _) => "htmlProcessor",
            ("markdown", _) => "markdownProcessor",
            ("csv", _) => "csvProcessor",
            ("code", _) => "codeAnalyzer",
            _ => throw new ToolExecutionException($"No tool available for {contentType}/{operation}")
        };
    }
    
    private object GetOptionsForTool(string toolName, string operation)
    {
        // Return appropriate options for each specialized tool
        return toolName switch
        {
            "textSummarizer" => new { length = "medium" },
            "htmlProcessor" => new { cleanUp = true, operation },
            // Options for other tools...
            _ => new { }
        };
    }
}
```

### 3. 平行處理模式

同時執行多個工具以提高效率：

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // 第一步：取得資料集描述資料（同步）
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // 第二步：同時啟動多個分析
        CompletableFuture<ToolResponse> statisticalAnalysis = CompletableFuture.supplyAsync(() ->
            mcpClient.executeTool("statisticalAnalysis", Map.of(
                "datasetId", datasetId,
                "type", "comprehensive"
            ))
        );
        
        CompletableFuture<ToolResponse> correlationAnalysis = CompletableFuture.supplyAsync(() ->
            mcpClient.executeTool("correlationAnalysis", Map.of(
                "datasetId", datasetId,
                "method", "pearson"
            ))
        );
        
        CompletableFuture<ToolResponse> outlierDetection = CompletableFuture.supplyAsync(() ->
            mcpClient.executeTool("outlierDetection", Map.of(
                "datasetId", datasetId,
                "sensitivity", "medium"
            ))
        );
        
        // 等待所有平行任務完成
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // 等待完成
        
        // 第三步：合併結果
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // 第四步：產生摘要報告
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // 回傳完整工作流程結果
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. 錯誤復原模式

為工具失敗實作優雅回退機制：

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # 先嘗試主要工具
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # 記錄失敗情況
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # 回退到次要工具
            try:
                # 可能需要為回退工具轉換參數
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # 兩個工具皆失敗
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # 此實作將取決於具體的工具
        # 在此範例中，我們只會返回原始參數
        return params

# 範例用法
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # 主要（付費）天氣 API
        "basicWeatherService",    # 回退（免費）天氣 API
        {"location": location}
    )
```

### 5. 工作流程組合模式

透過組合較簡單的工作流程構建複雜流程：

```csharp
public class CompositeWorkflow : IWorkflow
{
    private readonly List<IWorkflow> _workflows;
    
    public CompositeWorkflow(IEnumerable<IWorkflow> workflows)
    {
        _workflows = new List<IWorkflow>(workflows);
    }
    
    public async Task<WorkflowResult> ExecuteAsync(WorkflowContext context)
    {
        var results = new Dictionary<string, object>();
        
        foreach (var workflow in _workflows)
        {
            var workflowResult = await workflow.ExecuteAsync(context);
            
            // Store each workflow's result
            results[workflow.Name] = workflowResult;
            
            // Update context with the result for the next workflow
            context = context.WithResult(workflow.Name, workflowResult);
        }
        
        return new WorkflowResult(results);
    }
    
    public string Name => "CompositeWorkflow";
    public string Description => "Executes multiple workflows in sequence";
}

// Example usage
var documentWorkflow = new CompositeWorkflow(new IWorkflow[] {
    new DocumentFetchWorkflow(),
    new DocumentProcessingWorkflow(),
    new InsightGenerationWorkflow(),
    new ReportGenerationWorkflow()
});

var result = await documentWorkflow.ExecuteAsync(new WorkflowContext {
    Parameters = new { documentId = "12345" }
});
```

# 測試 MCP 伺服器：最佳實踐與頂級建議

## 概述

測試是開發可靠、高品質 MCP 伺服器的關鍵。本指南提供全面的最佳實踐與要點，涵蓋從單元測試、整合測試至端對端驗證的整個開發週期。

## 為何測試對 MCP 伺服器重要

MCP 伺服器作為 AI 模型與客戶端應用間重要中介。徹底測試確保：

- 生產環境的可靠性
- 請求與回應的正確處理
- MCP 規範的正確實作
- 抗失敗性與邊界條件的耐受性
- 不同負載下的穩定效能

## MCP 伺服器單元測試

### 單元測試（基礎）

單元測試用以獨立驗證 MCP 伺服器的單一元件。

#### 測試內容

1. **資源處理器**：獨立測試每個資源處理器的邏輯
2. **工具實作**：以各種輸入驗證工具行為
3. **提示模板**：確保提示模板正確渲染
4. **架構驗證**：測試參數驗證邏輯
5. **錯誤處理**：驗證無效輸入的錯誤回應

#### 單元測試最佳實踐

```csharp
// Example unit test for a calculator tool in C#
[Fact]
public async Task CalculatorTool_Add_ReturnsCorrectSum()
{
    // Arrange
    var calculator = new CalculatorTool();
    var parameters = new Dictionary<string, object>
    {
        ["operation"] = "add",
        ["a"] = 5,
        ["b"] = 7
    };
    
    // Act
    var response = await calculator.ExecuteAsync(parameters);
    var result = JsonSerializer.Deserialize<CalculationResult>(response.Content[0].ToString());
    
    // Assert
    Assert.Equal(12, result.Value);
}
```

```python
# Python 計算器工具的範例單元測試
def test_calculator_tool_add():
    # 安排
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # 執行
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # 斷言
    assert result["value"] == 12
```

### 整合測試（中層）

整合測試驗證 MCP 伺服器元件間交互整合。

#### 測試內容

1. **伺服器啟動**：測試不同設定下的伺服器啟動
2. **路由註冊**：驗證所有端點是否正確註冊
3. **請求處理**：測試完整請求-回應週期
4. **錯誤傳播**：確保錯誤在元件間正確處理
5. **認證與授權**：測試安全機制運作

#### 整合測試最佳實踐

```csharp
// Example integration test for MCP server in C#
[Fact]
public async Task Server_ProcessToolRequest_ReturnsValidResponse()
{
    // Arrange
    var server = new McpServer();
    server.RegisterTool(new CalculatorTool());
    await server.StartAsync();
    
    var request = new McpRequest
    {
        Tool = "calculator",
        Parameters = new Dictionary<string, object>
        {
            ["operation"] = "multiply",
            ["a"] = 6,
            ["b"] = 7
        }
    };
    
    // Act
    var response = await server.ProcessRequestAsync(request);
    
    // Assert
    Assert.NotNull(response);
    Assert.Equal(McpStatusCodes.Success, response.StatusCode);
    // Additional assertions for response content
    
    // Cleanup
    await server.StopAsync();
}
```

### 端對端測試（頂層）

端對端測試驗證從客戶端至伺服器的完整系統行為。

#### 測試內容

1. **客戶端-伺服器通訊**：測試完整請求與回應循環
2. **實際客戶端 SDK**：使用真實客戶端實作測試
3. **負載下效能**：驗證多併發請求行為
4. **錯誤復原**：測試系統從失敗復原能力
5. **長執行操作**：驗證串流與長時間操作的處理

#### 端對端測試最佳實踐

```typescript
// 使用 TypeScript 的客戶端範例端對端測試
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // 在測試環境啟動伺服器
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // 執行動作
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // 斷言
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## MCP 測試的模擬策略

模擬有助於測試時隔離元件。

### 需模擬的元件

1. **外部 AI 模型**：模擬模型回應以確保測試可預測
2. **外部服務**：模擬 API 依賴（資料庫、第三方服務）
3. **認證服務**：模擬身份驗證提供者
4. **資源提供者**：模擬高成本資源處理器

### 範例：模擬 AI 模型回應

```csharp
// C# example with Moq
var mockModel = new Mock<ILanguageModel>();
mockModel
    .Setup(m => m.GenerateResponseAsync(
        It.IsAny<string>(),
        It.IsAny<McpRequestContext>()))
    .ReturnsAsync(new ModelResponse { 
        Text = "Mocked model response",
        FinishReason = FinishReason.Completed
    });

var server = new McpServer(modelClient: mockModel.Object);
```

```python
# 使用 unittest.mock 的 Python 範例
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # 設定模擬物件
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # 在測試中使用模擬物件
    server = McpServer(model_client=mock_model)
    # 繼續進行測試
```

## 性能測試

性能測試對生產 MCP 伺服器至關重要。

### 測量項目

1. **延遲**：請求回應時間
2. **吞吐量**：每秒處理請求數
3. **資源利用率**：CPU、記憶體、網路使用率
4. **併發處理**：多請求同時處理表現
5. **擴展特性**：隨負載增加的效能狀況

### 性能測試工具

- **k6**：開源負載測試工具
- **JMeter**：全面性能測試工具
- **Locust**：基於 Python 的負載測試工具
- **Azure Load Testing**：雲端性能測試服務

### 範例：使用 k6 進行基本負載測試

```javascript
// 用於負載測試MCP伺服器的k6腳本
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10個虛擬使用者
  duration: '30s',
};

export default function () {
  const payload = JSON.stringify({
    tool: 'calculator',
    parameters: {
      operation: 'add',
      a: Math.floor(Math.random() * 100),
      b: Math.floor(Math.random() * 100)
    }
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer test-token'
    },
  };

  const res = http.post('http://localhost:5000/api/tools/invoke', payload, params);
  
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  
  sleep(1);
}
```

## MCP 伺服器測試自動化

自動化測試可確保持續品質與更快的回饋迴圈。

### CI/CD 整合
1. **在拉取請求上執行單元測試**：確保程式碼變更不會破壞現有功能  
2. **在預備環境執行整合測試**：在預生產環境中執行整合測試  
3. **性能基準**：維護性能基準以捕捉迴歸問題  
4. **安全掃描**：將安全測試自動化作為流程的一部分  

### 範例 CI 流程 (GitHub Actions)

```yaml
name: MCP Server Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up Runtime
      uses: actions/setup-dotnet@v1
      with:
        dotnet-version: '8.0.x'
    
    - name: Restore dependencies
      run: dotnet restore
    
    - name: Build
      run: dotnet build --no-restore
    
    - name: Unit Tests
      run: dotnet test --no-build --filter Category=Unit
    
    - name: Integration Tests
      run: dotnet test --no-build --filter Category=Integration
      
    - name: Performance Tests
      run: dotnet run --project tests/PerformanceTests/PerformanceTests.csproj
```
  
## MCP 規格相容性測試  

驗證您的伺服器是否正確實作 MCP 規格。  

### 主要相容性範疇  

1. **API 端點**：測試必要端點（/resources、/tools 等）  
2. **請求/回應格式**：驗證規範相容性  
3. **錯誤代碼**：驗證各種情境的正確狀態碼  
4. **內容類型**：測試不同內容類型的處理  
5. **認證流程**：驗證規格相符的驗證機制  

### 相容性測試套件  

```csharp
[Fact]
public async Task Server_ResourceEndpoint_ReturnsCorrectSchema()
{
    // Arrange
    var client = new HttpClient();
    client.DefaultRequestHeaders.Add("Authorization", "Bearer test-token");
    
    // Act
    var response = await client.GetAsync("http://localhost:5000/api/resources");
    var content = await response.Content.ReadAsStringAsync();
    var resources = JsonSerializer.Deserialize<ResourceList>(content);
    
    // Assert
    Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    Assert.NotNull(resources);
    Assert.All(resources.Resources, resource => 
    {
        Assert.NotNull(resource.Id);
        Assert.NotNull(resource.Type);
        // Additional schema validation
    });
}
```
  
## 有效 MCP 伺服器測試的十大技巧  

1. **獨立測試工具定義**：獨立驗證結構定義，與工具邏輯分開  
2. **使用參數化測試**：用各種輸入（含邊界條件）測試工具  
3. **檢查錯誤響應**：驗證所有可能錯誤情況的正確錯誤處理  
4. **測試授權邏輯**：確保不同使用者角色有適當的存取控制  
5. **監控測試覆蓋率**：目標為關鍵路徑程式碼的高覆蓋率  
6. **測試串流回應**：驗證串流內容的正確處理  
7. **模擬網路問題**：測試在網路不佳狀況下的行為  
8. **測試資源限制**：驗證達到配額或速率限制時的行為  
9. **自動化迴歸測試**：建立每次程式碼變更都會執行的測試集  
10. **文件化測試案例**：保持清晰的測試場景文件  

## 常見測試陷阱  

- **過度依賴順利路徑測試**：務必徹底測試錯誤情況  
- **忽略效能測試**：提前找出瓶頸，避免影響生產環境  
- **僅在隔離環境測試**：結合單元、整合與端對端測試  
- **不完整的 API 覆蓋**：確保所有端點及功能皆有測試  
- **測試環境不一致**：使用容器確保測試環境一致性  

## 結論  

全面的測試策略是開發可靠且高品質 MCP 伺服器的關鍵。透過本指南中提出的最佳實踐與技巧，您可以確保 MCP 實作達到最高的品質、可靠度與效能標準。  

## 重要重點  

1. **工具設計**：遵循單一職責原則，使用依賴注入，設計具組合性  
2. **結構設計**：建立清楚且具備適當驗證約束的結構定義  
3. **錯誤處理**：實作優雅的錯誤處理、結構化錯誤回應與重試邏輯  
4. **效能**：使用快取、非同步處理與資源節流  
5. **安全**：執行完善的輸入驗證、授權檢查與敏感資料處理  
6. **測試**：建立全面的單元、整合與端對端測試  
7. **工作流程模式**：運用已建立的模式，如串鏈、分派器和平行處理  

## 練習  

設計一款 MCP 工具和工作流程，用於文件處理系統，該系統需要：  

1. 接受多種格式文件（PDF、DOCX、TXT）  
2. 從文件中抽取文字和關鍵資訊  
3. 依類型與內容對文件分類  
4. 產生每份文件的摘要  

實作工具結構、錯誤處理，並設計最適合該場景的工作流程模式。考慮如何測試此實作。  

## 資源  

1. 加入 [Azure AI Foundry Discord 社群](https://aka.ms/foundrydevs)，掌握最新發展  
2. 為開源 [MCP 專案](https://github.com/modelcontextprotocol) 貢獻力量  
3. 在您組織的 AI 計劃中應用 MCP 原則  
4. 探索專門針對您產業的 MCP 實作  
5. 考慮參加進階課程，如多模態整合或企業應用整合  
6. 利用 [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md) 所學原則，嘗試自行構建 MCP 工具與工作流程  

## 下一步  

下一篇：[案例研究](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件係使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 所翻譯。雖然我們致力於確保準確性，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤譯負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->