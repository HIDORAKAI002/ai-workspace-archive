# MCP開発のベストプラクティス

[![MCP Development Best Practices](../../../translated_images/ja/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(上の画像をクリックすると、このレッスンのビデオが表示されます)_

## 概要

このレッスンでは、MCPサーバーと機能を本番環境で開発、テスト、デプロイするための高度なベストプラクティスに焦点を当てます。MCPエコシステムが複雑性と重要性を増すにつれて、確立されたパターンに従うことは信頼性、保守性、相互運用性を確保します。このレッスンは、実際のMCP実装から得られた実践的な知見を集約し、効果的なリソース、プロンプト、ツールを備えた堅牢で効率的なサーバーを作成するためのガイドを提供します。

## 学習目標

このレッスンの終了時には、以下が可能になります：

- MCPサーバーおよび機能設計に業界のベストプラクティスを適用する
- MCPサーバーの包括的なテスト戦略を作成する
- 複雑なMCPアプリケーションのための効率的で再利用可能なワークフローパターンを設計する
- MCPサーバーで適切なエラーハンドリング、ログ記録、可観測性を実装する
- パフォーマンス、セキュリティ、保守性のためにMCP実装を最適化する

## MCPの基本原則

具体的な実装のプラクティスに入る前に、効果的なMCP開発を導く基本原則を理解することが重要です：

1. **標準化された通信**：MCPはJSON-RPC 2.0を基盤として使用し、すべての実装にわたってリクエスト、レスポンス、エラーハンドリングの一貫した形式を提供します。

2. **ユーザー中心設計**：MCPの実装においては、常にユーザーの同意、制御、透明性を優先します。

3. **セキュリティ最優先**：認証、認可、検証、レート制限などの強力なセキュリティ対策を実装します。

4. **モジュラーアーキテクチャ**：MCPサーバーはモジュラー方式で設計し、それぞれのツールとリソースが明確で集中した目的を持つようにします。

5. **状態保持型接続**：複数のリクエスト間で状態を維持するMCPの能力を活用し、一貫性がありコンテキストを意識した相互作用を実現します。

## 公式のMCPベストプラクティス

以下のベストプラクティスは、公式のModel Context Protocolドキュメントから導出されています：

### セキュリティのベストプラクティス

1. **ユーザーの同意と制御**：データアクセスや操作を行う前に必ず明示的なユーザー同意を求めます。共有されるデータや許可されるアクションについて明確な制御を提供します。

2. **データプライバシー**：明示的な同意がある場合のみユーザーデータを公開し、適切なアクセス制御で保護します。不正なデータ送信を防ぎます。

3. **ツールの安全性**：ツール呼び出しの前に必ずユーザーの明示的な同意を求めます。各ツールの機能をユーザーに理解させ、堅牢なセキュリティ境界を施行します。

4. **ツールの許可制御**：セッション中にモデルが使用可能なツールを設定し、明示的に許可されたツールのみアクセスできるようにします。

5. **認証**：APIキー、OAuthトークン、その他の安全な認証方法を用いてツール、リソース、機密操作へのアクセス前に適切な認証を要求します。

6. **パラメータ検証**：すべてのツール呼び出しに対して検証を実施し、不正なまたは悪意のある入力がツール実装に届かないようにします。

7. **レート制限**：乱用を防止し、サーバーリソースの適切な利用を確保するためにレート制限を実装します。

### 実装のベストプラクティス

1. **機能交渉**：接続設定時にサポートされる機能、プロトコルバージョン、利用可能なツールやリソースについて情報を交換します。

2. **ツール設計**：複数の懸念を扱うモノリシックなツールではなく、一つの目的に集中したツールを作成します。

3. **エラーハンドリング**：問題の診断、障害の優雅な処理、実用的なフィードバック提供のために標準化されたエラーコードとメッセージを実装します。

4. **ログ記録**：監査、デバッグ、プロトコル相互作用の監視のために構造化ログを設定します。

5. **進捗追跡**：長時間かかる操作に対しては進捗のアップデートを報告し、応答性の高いユーザーインターフェースを可能にします。

6. **リクエストキャンセル**：不要になったり時間がかかりすぎる進行中のリクエストをクライアントがキャンセルできるようにします。

## 追加リファレンス

最新のMCPベストプラクティスについては、以下を参照してください：

- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [Security Best Practices](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - セキュリティリスクと対策
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - 実践的なセキュリティトレーニング

## 実践的な実装例

### ツール設計のベストプラクティス

#### 1. 単一責任の原則

各MCPツールは明確で集中した目的を持つべきです。複数の懸念を扱うモノリシックなツールを作るのではなく、特定のタスクに卓越した専門的なツールを開発しましょう。

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

#### 2. 一貫したエラーハンドリング

情報豊富なエラーメッセージと適切なリカバリメカニズムを備えた堅牢なエラーハンドリングを実装します。

```python
# 包括的なエラーハンドリングを備えたPythonの例
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # パラメータ検証
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # セキュリティ検証
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # タイムアウト付きのデータベース操作
                async with timeout(10):  # 10秒のタイムアウト
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # 接続エラーは一時的な場合があります
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # クエリエラーはおそらくクライアントのエラーです
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # ツール固有のエラーはそのまま通過させる
            raise
        except Exception as e:
            # 予期しないエラーのためのキャッチオール
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # SQLインジェクション検出の実装
        pass
        
    def _log_error(self, message, error):
        # エラーロギングの実装
        pass
```

#### 3. パラメータ検証

不正なまたは悪意のある入力を防ぐため、常にパラメータの徹底的な検証を行います。

```javascript
// JavaScript/TypeScriptの詳細なパラメータ検証の例
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
    // 1. パラメータの存在を検証する
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. パラメータの型を検証する
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. パラメータの値を検証する
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. 書き込み操作のための内容の存在を検証する
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. パスの安全性を検証する
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // 検証済みパラメータに基づく実装
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // パス安全性チェックの実装
    // ...
  }
}
```

### セキュリティ実装例

#### 1. 認証と認可

```java
// 認証と認可を含むJavaの例
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // 依存性の注入
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
        // 1. 認証コンテキストを抽出
        String authToken = request.getContext().getAuthToken();
        
        // 2. ユーザーを認証
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. 特定の操作に対する認可を確認
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. 認可された操作を続行
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

#### 2. レート制限

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

## テストのベストプラクティス

### 1. MCPツールの単体テスト

常にツールを単独でテストし、外部依存をモックします：

```typescript
// ツールのユニットテストのTypeScript例
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // モックの天気サービスを作成する
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // モック依存関係でツールを作成する
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // 準備
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // 実行
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // 検証
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // 準備
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // 実行と検証
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. 結合テスト

クライアントのリクエストからサーバーのレスポンスまでのフルフローをテストします：

```python
# Python 統合テストの例
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # テストサーバーを起動
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # クライアントを作成
        client = McpClient("http://localhost:5000")
        
        # ツールの検出をテスト
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # ツールの実行をテスト
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # レスポンスを検証
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # クリーンアップ
        await server.stop()
```

## パフォーマンス最適化

### 1. キャッシュ戦略

レイテンシとリソース使用を削減する適切なキャッシュを実装します：

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

#### 2. 依存性注入とテスト容易性

依存性をコンストラクタ注入により受け取るようツールを設計し、テスト可能かつ設定可能にします：

```java
// 依存性注入を使用したJavaの例
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // 依存性はコンストラクタを通じて注入される
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // ツールの実装
    // ...
}
```

#### 3. 合成可能なツール

複雑なワークフローを作るためにツールを組み合わせ可能に設計します：

```python
# 合成可能なツールを示すPythonの例
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # 実装...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # このツールはdataFetchツールの結果を使用できます
    async def execute_async(self, request):
        # 実装...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # このツールはdataAnalysisツールの結果を使用できます
    async def execute_async(self, request):
        # 実装...
        pass

# これらのツールは独立して、またはワークフローの一部として使用できます
```

### スキーマ設計のベストプラクティス

スキーマはモデルとツール間の契約です。よく設計されたスキーマはツールの使いやすさを向上させます。

#### 1. 明確なパラメータ説明

各パラメータに説明情報を必ず含めます：

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

#### 2. 検証制約

無効な入力を防ぐ検証制約を含めます：

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // フォーマット検証付きのメールプロパティ
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // 数値制約付きの年齢プロパティ
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // 列挙型プロパティ
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

#### 3. 一貫した戻り値構造

モデルが結果を解釈しやすくするために、レスポンス構造の一貫性を保ちます：

```python
async def execute_async(self, request):
    try:
        # リクエストを処理する
        results = await self._search_database(request.parameters["query"])
        
        # 常に一貫した構造を返す
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

### エラーハンドリング

MCPツールの信頼性維持には堅牢なエラーハンドリングが不可欠です。

#### 1. 優雅なエラーハンドリング

適切なレベルでエラーを処理し、情報豊かなメッセージを提供します：

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

#### 2. 構造化されたエラー応答

可能な場合、構造化されたエラー情報を返します：

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // 実装
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
        
        // その他の例外を ToolExecutionException として再スローする
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. リトライロジック

一時的な障害に対応する適切なリトライロジックを実装します：

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # 秒
    
    while retry_count < max_retries:
        try:
            # 外部APIを呼び出す
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # 指数的バックオフ
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # 非一時的なエラー、再試行しない
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### パフォーマンス最適化

#### 1. キャッシュ

高コストな操作に対してキャッシュを実装します：

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

#### 2. 非同期処理

I/Oバウンドの操作には非同期プログラミングパターンを利用します：

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // 長時間実行される操作の場合は、すぐに処理IDを返します
        String processId = UUID.randomUUID().toString();
        
        // 非同期処理を開始します
        CompletableFuture.runAsync(() -> {
            try {
                // 長時間実行される操作を実行します
                documentService.processDocument(documentId);
                
                // ステータスを更新します（通常はデータベースに保存されます）
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // 処理IDとともに即時応答を返します
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // 付随するステータス確認ツール
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

#### 3. リソーススロットリング

過負荷を防ぐためにリソース制限を実装します：

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # 1秒あたり5つのリクエストを許可する
            bucket_size=10        # バーストは最大10リクエストまで許可する
        )
    
    async def execute_async(self, request):
        # 続行できるか待つ必要があるかを確認する
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # 待ち時間が長すぎる場合
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # 適切な遅延時間だけ待機する
                await asyncio.sleep(delay)
        
        # トークンを消費してリクエストを続行する
        self.rate_limiter.consume()
        
        # APIを呼び出す
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
            
            # 次のトークンが利用可能になるまでの時間を計算する
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # 経過時間に基づいて新しいトークンを追加する
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### セキュリティのベストプラクティス

#### 1. 入力検証

入力パラメータは常に徹底的に検証します：

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

#### 2. 認可チェック

適切な認可チェックを実施します：

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // リクエストからユーザーコンテキストを取得する
    UserContext user = request.getContext().getUserContext();
    
    // ユーザーが必要な権限を持っているか確認する
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // 特定のリソースについて、そのリソースへのアクセスを確認する
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // ツールの実行を続行する
    // ...
}
```

#### 3. 機密データの取り扱い

機密データを慎重に扱います：

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
        
        # ユーザーデータを取得する
        user_data = await self.user_service.get_user_data(user_id)
        
        # 明示的に要求され許可されていない限り、機密フィールドをフィルターする
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # リクエストコンテキストで認可レベルを確認する
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # 元のデータを変更しないようコピーを作成する
        redacted = user_data.copy()
        
        # 特定の機密フィールドを編集する
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # ネストされた機密データを編集する
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## MCPツールのテストベストプラクティス

包括的なテストはMCPツールが正しく動作し、エッジケースを処理し、システムと正しく統合されることを確保します。

### 単体テスト

#### 1. 各ツールを単独でテスト

各ツールの機能に集中したテストを作成します：

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

#### 2. スキーマ検証テスト

スキーマが有効で制約を適切に強制しているかテストします：

```java
@Test
public void testSchemaValidation() {
    // ツールインスタンスを作成する
    SearchTool searchTool = new SearchTool();
    
    // スキーマを取得する
    Object schema = searchTool.getSchema();
    
    // 検証のためにスキーマをJSONに変換する
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // スキーマが有効なJSONSchemaであることを検証する
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // 有効なパラメータをテストする
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // 必須パラメータが欠落している場合をテストする
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // 無効なパラメータタイプをテストする
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. エラーハンドリングテスト

エラー条件の特定テストを作成します：

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # 整える
    tool = ApiTool(timeout=0.1)  # 非常に短いタイムアウト
    
    # タイムアウトするリクエストをモックする
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # タイムアウトより長い
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # 実行と検証
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # 例外メッセージを確認する
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # 整える
    tool = ApiTool()
    
    # レート制限されたレスポンスをモックする
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
        
        # 実行と検証
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # 例外にレート制限情報が含まれていることを確認する
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### 結合テスト

#### 1. ツールチェーンテスト

期待される組み合わせでツールが協調して動作するかテストします：

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

#### 2. MCPサーバーテスト

ツールの完全登録と実行でMCPサーバーをテストします：

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
        // ディスカバリーエンドポイントをテストする
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // ツールリクエストを作成する
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // リクエストを送信し、レスポンスを検証する
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // 無効なツールリクエストを作成する
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // パラメータ「b」が欠落している
        request.put("parameters", parameters);
        
        // リクエストを送信し、エラーレスポンスを検証する
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. エンドツーエンドテスト

モデルプロンプトからツール実行までの完全なワークフローをテストします：

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # セットアップ - MCPクライアントとモックモデルの設定
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # モックモデルの応答
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
    
    # モック天気ツールの応答
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
        
        # 実行
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # 検証
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### パフォーマンステスト

#### 1. 負荷テスト

MCPサーバーが同時に処理できるリクエスト数を確認します：

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

#### 2. ストレステスト

極端な負荷下でのシステム挙動をテストします：

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // ストレステストのためにJMeterを設定する
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // JMeterのテストプランを構成する
    HashTree testPlanTree = new HashTree();
    
    // テストプラン、スレッドグループ、サンプラーなどを作成する
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // ツール実行のためのHTTPサンプラーを追加する
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // リスナーを追加する
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // テストを実行する
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // 結果を検証する
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // 平均応答時間 < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90パーセンタイル < 500ms
}
```

#### 3. 監視とプロファイリング

長期的なパフォーマンス分析のための監視を設定します：

```python
# MCPサーバーの監視を設定する
def configure_monitoring(server):
    # Prometheusのメトリクスを設定する
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
    
    # タイミングとメトリクスの記録のためのミドルウェアを追加する
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # メトリクスエンドポイントを公開する
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCPワークフロー設計パターン

よく設計されたMCPワークフローは効率、信頼性、保守性を向上させます。以下は重要なパターンです：

### 1. ツール連鎖パターン

複数のツールを連続して接続し、各ツールの出力が次の入力になるようにします：

```python
# PythonのChain of Tools実装
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # 実行するツール名のリスト（順番に実行）
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # チェーン内の各ツールを実行し、前の結果を渡す
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # 結果を保存し、次のツールの入力として使用する
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# 使用例
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

### 2. ディスパッチャーパターン

入力に基づいて専門ツールへ振り分ける中央のツールを使用します：

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

### 3. 並列処理パターン

複数のツールを同時に実行して効率化します：

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // ステップ1：データセットのメタデータを取得（同期）
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // ステップ2：複数の解析を並行して開始
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
        
        // すべての並行タスクの完了を待つ
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // 完了を待つ
        
        // ステップ3：結果を統合
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // ステップ4：概要レポートを生成
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // 完全なワークフロー結果を返す
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. エラー回復パターン

ツール障害時に優雅にフォールバック処理を実装します：

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # まずメインのツールを試す
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # 失敗を記録する
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # セカンダリーツールにフォールバックする
            try:
                # フォールバックツール用にパラメータを変換する必要があるかもしれない
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # 両方のツールが失敗した
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # この実装は特定のツールに依存する
        # この例では元のパラメータをそのまま返す
        return params

# 使用例
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # メイン（有料）天気API
        "basicWeatherService",    # フォールバック（無料）天気API
        {"location": location}
    )
```

### 5. ワークフロー合成パターン

単純なワークフローを組み合わせて複雑なものを構築します：

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

# MCPサーバーのテスト：ベストプラクティスとトップヒント

## 概要

テストは信頼性の高い高品質なMCPサーバーを開発する上で重要な要素です。本ガイドは、単体テストから結合テスト、エンドツーエンド検証まで、MCPサーバーを開発ライフサイクル全体でテストするための包括的なベストプラクティスとヒントを提供します。

## MCPサーバーにおけるテストの重要性

MCPサーバーはAIモデルとクライアントアプリケーション間の重要なミドルウェアとして機能します。徹底したテストにより以下が保証されます：

- 本番環境での信頼性
- 正確なリクエストおよびレスポンスの処理
- MCP仕様の適切な実装
- 障害やエッジケースへの耐久性
- 様々な負荷下でも一貫したパフォーマンス

## MCPサーバーの単体テスト

### 単体テスト（基礎）

単体テストはMCPサーバーの個々のコンポーネントを独立して検証します。

#### テスト対象

1. **リソースハンドラー**：各リソースハンドラーのロジックを独立してテスト
2. **ツール実装**：様々な入力に対するツールの動作を検証
3. **プロンプトテンプレート**：プロンプトテンプレートが正しくレンダリングされるか確認
4. **スキーマ検証**：パラメータ検証ロジックのテスト
5. **エラーハンドリング**：無効入力に対するエラー応答を検証

#### 単体テストのベストプラクティス

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
# Pythonでの計算機ツールの例の単体テスト
def test_calculator_tool_add():
    # 準備
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # 実行
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # 検証
    assert result["value"] == 12
```

### 結合テスト（中間層）

結合テストはMCPサーバーのコンポーネント間の相互作用を検証します。

#### テスト対象

1. **サーバー初期化**：様々な構成でのサーバー起動テスト
2. **ルート登録**：すべてのエンドポイントが正しく登録されているか検証
3. **リクエスト処理**：リクエスト-レスポンスの完全なサイクルをテスト
4. **エラー伝播**：コンポーネント間でエラーが適切に処理されるか確認
5. **認証および認可**：セキュリティ機構のテスト

#### 結合テストのベストプラクティス

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

### エンドツーエンドテスト（最上位層）

エンドツーエンドテストはクライアントからサーバーまでのシステム全体の振る舞いを検証します。

#### テスト対象

1. **クライアント-サーバー通信**：完全なリクエスト・レスポンスサイクルをテスト
2. **実際のクライアントSDK**：リアルなクライアントでテスト
3. **負荷下のパフォーマンス**：複数の同時リクエスト時の挙動を検証
4. **エラー回復**：障害からのシステム回復をテスト
5. **長時間動作**：ストリーミングや長時間操作の処理を確認

#### エンドツーエンドテストのベストプラクティス

```typescript
// TypeScriptでのクライアントを使用した例のE2Eテスト
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // テスト環境でサーバーを起動
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // 実行
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // 検証
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## MCPテストのためのモッキング戦略

モッキングはテスト時にコンポーネントを分離するために不可欠です。

### モックすべきコンポーネント

1. **外部AIモデル**：予測可能なテストのためにモデル応答をモック
2. **外部サービス**：API依存（データベース、サードパーティサービス）をモック
3. **認証サービス**：アイデンティティプロバイダーをモック
4. **リソースプロバイダ**：高コストなリソースハンドラーをモック

### 例：AIモデル応答のモック

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
# unittest.mock を使った Python の例
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # モックの設定
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # テストでモックを使う
    server = McpServer(model_client=mock_model)
    # テストを続ける
```

## パフォーマンステスト

パフォーマンステストは本番MCPサーバーにとって重要です。

### 測定項目

1. **レイテンシ**：リクエストの応答時間
2. **スループット**：秒間リクエスト処理数
3. **リソース利用率**：CPU、メモリ、ネットワーク使用率
4. **同時処理能力**：並列リクエスト下での挙動
5. **スケーラビリティ**：負荷増加時の性能

### パフォーマンステストツール

- **k6**：オープンソースの負荷テストツール
- **JMeter**：包括的なパフォーマンステスト
- **Locust**：Pythonベースの負荷テスト
- **Azure Load Testing**：クラウドベースのパフォーマンステスト

### 例：k6による基本的な負荷テスト

```javascript
// MCPサーバーの負荷テスト用k6スクリプト
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10仮想ユーザー
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

## MCPサーバーのテスト自動化

テストを自動化することで、一貫した品質と迅速なフィードバックサイクルを確保します。

### CI/CD統合
1. **プルリクエストでユニットテストを実行**: コード変更が既存の機能を壊さないことを確認する  
2. **ステージング環境での統合テスト**: 本番前環境で統合テストを実行する  
3. **パフォーマンス基準**: パフォーマンスのベンチマークを維持し、リグレッションを検出する  
4. **セキュリティスキャン**: パイプラインの一部としてセキュリティテストを自動化する  

### CIパイプラインの例（GitHub Actions）

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

## MCP仕様準拠のテスト

サーバーがMCP仕様を正しく実装していることを検証します。

### 主要な準拠領域

1. **APIエンドポイント**: 必須エンドポイント（/resources、/toolsなど）のテスト  
2. **リクエスト/レスポンス形式**: スキーマ準拠の検証  
3. **エラーコード**: 様々なシナリオに対する正しいステータスコードの確認  
4. **コンテンツタイプ**: 異なるコンテンツタイプの取り扱いの確認  
5. **認証フロー**: 仕様に準拠した認証機構の検証  

### 準拠テストスイート

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

## 効果的なMCPサーバーテストのためのトップ10のヒント

1. **ツール定義を個別にテスト**: ツールのロジックとは独立してスキーマ定義を検証する  
2. **パラメータ化されたテストを使用**: エッジケースを含む様々な入力でツールをテストする  
3. **エラーレスポンスの確認**: すべての可能なエラー条件に対する適切なエラー処理を検証する  
4. **認可ロジックのテスト**: 異なるユーザーロールごとに適切なアクセス制御を確保する  
5. **テストカバレッジの監視**: 重要経路コードのカバレッジを高く保つ  
6. **ストリーミングレスポンスのテスト**: ストリーミングコンテンツの正しい取り扱いを検証する  
7. **ネットワーク障害をシミュレート**: ネットワーク障害下での動作をテストする  
8. **リソース制限のテスト**: クォータやレート制限に達した場合の挙動を検証する  
9. **回帰テストの自動化**: すべてのコード変更で実行されるスイートを構築する  
10. **テストケースの文書化**: テストシナリオの明確なドキュメントを維持する  

## 一般的なテストの落とし穴

- **陽性パステストへの過信**: エラーケースを徹底的にテストすることを忘れない  
- **パフォーマンステストの無視**: 本番影響前にボトルネックを特定する  
- **単独でのテスト実施のみ**: ユニット、統合、E2Eテストを組み合わせる  
- **不完全なAPIカバレッジ**: すべてのエンドポイントと機能がテストされていることを確認する  
- **テスト環境の不整合**: コンテナを使い一貫したテスト環境を確保する  

## 結論

信頼性が高く高品質なMCPサーバーの開発には包括的なテスト戦略が不可欠です。本ガイドで示したベストプラクティスとヒントを実装することで、MCPの実装が最高水準の品質、信頼性、パフォーマンスを満たすことができます。

## 重要なポイント

1. **ツール設計**: 単一責任原則に従い、依存性注入を使用し、組み合わせ可能な設計をする  
2. **スキーマ設計**: 明確で適切な検証制約を付けたスキーマを作成する  
3. **エラー処理**: 優雅なエラー処理、構造化エラーレスポンス、リトライロジックを実装する  
4. **パフォーマンス**: キャッシュ、非同期処理、リソース制御を活用する  
5. **セキュリティ**: 十分な入力バリデーション、認可チェック、機密データ取り扱いを行う  
6. **テスト**: 包括的なユニット、統合、エンドツーエンドテストを作成する  
7. **ワークフローパターン**: チェーン、ディスパッチャー、並列処理など確立されたパターンを適用する  

## 演習

複数フォーマット（PDF、DOCX、TXT）のドキュメントを受け入れ、  
テキストと重要情報を抽出し、  
ドキュメントをタイプや内容で分類し、  
各ドキュメントの要約を生成するドキュメント処理システムのMCPツールとワークフローを設計してください。  

ツールのスキーマ、エラー処理、そしてこのシナリオに最適なワークフローパターンを実装してください。  
また、この実装をどのようにテストするか考慮してください。

## リソース  

1. [Azure AI Foundry Discord Community](https://aka.ms/foundrydevs) でMCPコミュニティに参加し、最新情報を入手する  
2. オープンソースの[MCPプロジェクト](https://github.com/modelcontextprotocol)に貢献する  
3. 自組織のAI施策にMCPの原則を適用する  
4. 業界向けの専門的なMCP実装を探求する  
5. マルチモーダル統合や企業アプリケーション統合など特定のMCPトピックに関する上級コースを検討する  
6. [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)を通じて学んだ原則を使って独自のMCPツールとワークフローを構築してみる  

## 次へ

次へ: [ケーススタディ](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：  
本書類はAI翻訳サービス「Co-op Translator」（https://github.com/Azure/co-op-translator）を使用して翻訳されました。正確性には努めておりますが、自動翻訳には誤りや不正確な箇所が含まれる可能性があることをご了承ください。原文はあくまで正式な情報源とみなしてください。重要な情報については、専門の人間翻訳者による翻訳を推奨します。本翻訳の利用によって生じたいかなる誤解や解釈違いについても、当方は一切の責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->