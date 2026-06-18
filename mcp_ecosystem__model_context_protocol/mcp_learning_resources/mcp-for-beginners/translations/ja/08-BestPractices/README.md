# MCP 開発ベストプラクティス

[![MCP Development Best Practices](../../../translated_images/ja/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_（上の画像をクリックするとこのレッスンのビデオを視聴できます）_

## 概要

このレッスンは、MCPサーバーや機能を本番環境で開発、テスト、デプロイする際の高度なベストプラクティスに焦点を当てています。MCPエコシステムが複雑化し重要性が増すにつれて、確立されたパターンに従うことで信頼性、保守性、相互運用性を保証します。このレッスンは実際のMCP実装から得られた実践的な知見をまとめ、堅牢で効率的なサーバーと効果的なリソース、プロンプト、ツールの作成を支援します。

## 学習目標

このレッスンの最後には、以下ができるようになります：

- MCPサーバーと機能設計における業界のベストプラクティスを適用する
- MCPサーバーのための総合的なテスト戦略を作成する
- 複雑なMCPアプリケーション向けに効率的で再利用可能なワークフローパターンを設計する
- MCPサーバーにおける適切なエラー処理、ロギング、および可観測性を実装する
- パフォーマンス、セキュリティ、保守性のためにMCP実装を最適化する

## MCPのコア原則

具体的な実装手法に入る前に、効果的なMCP開発を導くコア原則を理解することが重要です：

1. <strong>標準化された通信</strong>: MCPは基盤としてJSON-RPC 2.0を使用し、すべての実装で要求、応答、エラー処理の一貫した形式を提供します。

2. <strong>ユーザー中心設計</strong>: MCP実装では常にユーザーの同意、コントロール、透明性を優先します。

3. <strong>セキュリティ第一</strong>: 認証、認可、検証、レート制限など堅牢なセキュリティ対策を実装します。

4. <strong>モジュラーアーキテクチャ</strong>: 各ツールとリソースが明確で焦点を絞った目的を持つモジュラー設計を行います。

5. <strong>ステートフルな接続</strong>: 複数のリクエストにまたがって状態を維持できるMCPの能力を活用し、一貫性と文脈を意識したやり取りを実現します。

## 公式MCPベストプラクティス

以下のベストプラクティスは公式のModel Context Protocolドキュメントから派生したものです：

### セキュリティベストプラクティス

1. <strong>ユーザーの同意とコントロール</strong>: データへのアクセスや操作の前に必ず明示的なユーザー同意を求めます。共有するデータや承認された行動が明確に管理可能であることを提供します。

2. <strong>データプライバシー</strong>: 明示的な同意がある場合のみユーザーデータを公開し、適切なアクセスポリシーで保護します。不正なデータ送信から守ります。

3. <strong>ツールの安全性</strong>: ツールを呼び出す前に明確なユーザー同意を求めます。各ツールの機能をユーザーが理解できるようにし、強力なセキュリティ境界を施行します。

4. <strong>ツールの許可管理</strong>: セッション中にモデルが使用可能なツールを設定し、明示的に許可されたツールのみアクセス可能にします。

5. <strong>認証</strong>: APIキー、OAuthトークン、その他の安全な認証方法を使い、ツール、リソース、または機密操作へのアクセス前に適切な認証を要求します。

6. <strong>パラメーター検証</strong>: すべてのツール呼び出しに対して不正または悪意のある入力がツール実装に伝わらないよう検証を行います。

7. <strong>レート制限</strong>: サーバーリソースの乱用を防止し、公正な利用を確保するためにレート制限を実施します。

### 実装ベストプラクティス

1. <strong>機能交渉</strong>: 接続設定時にサポートされる機能、プロトコルバージョン、利用可能なツールやリソースに関する情報を交換します。

2. <strong>ツール設計</strong>: 複数の関心事を扱う巨大なツールではなく、一つのことをうまくこなす焦点を絞ったツールを作成します。

3. <strong>エラー処理</strong>: 問題の診断、障害の優雅な処理、実用的なフィードバックのために標準化されたエラーメッセージとコードを実装します。

4. <strong>ロギング</strong>: 監査、デバッグ、およびプロトコルの相互作用の監視のために構造化されたログを設定します。

5. <strong>進捗追跡</strong>: 長時間実行する操作では進捗更新を報告し、応答性の高いユーザーインターフェースを可能にします。

6. <strong>リクエストキャンセル</strong>: もはや必要ないか時間がかかりすぎる進行中のリクエストをクライアントがキャンセルできるようにします。

## 追加参考資料

MCPベストプラクティスの最新情報については、以下を参照してください：

- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [Security Best Practices](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - セキュリティリスクと緩和策
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - ハンズオンサセキュリティトレーニング

## 実践的な実装例

### ツール設計のベストプラクティス

#### 1. 単一責任の原則

各MCPツールは明確で焦点が絞られた目的を持つべきです。複数の課題を扱おうとする巨大なツールを作るのではなく、特定のタスクに優れた専門的なツールを開発します。

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

#### 2. 一貫したエラー処理

有益なエラーメッセージと適切な復旧メカニズムを備えた堅牢なエラー処理を実装します。

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
                # タイムアウト付きデータベース操作
                async with timeout(10):  # 10秒のタイムアウト
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # 接続エラーは一時的な可能性があります
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # クエリエラーはクライアントエラーである可能性が高いです
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # ツール固有のエラーはそのまま通過させる
            raise
        except Exception as e:
            # 想定外のエラー用のキャッチオール
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # SQLインジェクション検出の実装
        pass
        
    def _log_error(self, message, error):
        # エラーロギングの実装
        pass
```

#### 3. パラメーター検証

誤ったまたは悪意のある入力を防ぐため、常にパラメーターを徹底的に検証します。

```javascript
// 詳細なパラメータ検証を伴うJavaScript/TypeScriptの例
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
    
    // 依存性注入
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
        
        // 4. 許可された操作を続行
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

### 1. ユニットテストによるMCPツールの検証

外部依存関係をモック化してツール単体を必ずテストします：

```typescript
// ツールの単体テストのTypeScript例
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // モックの天気サービスを作成する
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // モックの依存関係を使ってツールを作成する
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

### 2. 統合テスト

クライアントのリクエストからサーバーの応答まで全体のフローをテストします：

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

遅延とリソース使用を減らすために適切なキャッシュを実装します：

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

依存関係をコンストラクタ注入で受け取るツール設計にし、テストや構成を容易にします：

```java
// 依存性注入を使ったJavaの例
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // コンストラクタを通じて注入された依存関係
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

#### 3. 組み合わせ可能なツール

より複雑なワークフローを構築できるようにツールを組み合わせられる設計にします：

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

# これらのツールは単独でもワークフローの一部としても使用できます
```

### スキーマ設計ベストプラクティス

スキーマはモデルとツール間の契約です。よく設計されたスキーマはツールの使いやすさを高めます。

#### 1. 明確なパラメーター説明

すべてのパラメーターに説明情報を必ず含めます：

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

#### 2. バリデーション制約

無効な入力を防ぐためにバリデーション制約を含めます：

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

#### 3. 一貫した返却構造

モデルが結果を解釈しやすいように応答構造の一貫性を保ちます：

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

### エラー処理

堅牢なエラー処理はMCPツールの信頼性維持に不可欠です。

#### 1. 優雅なエラー処理

適切なレベルでエラーを処理し、有益なメッセージを提供します：

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

可能な場合は構造化されたエラー情報を返します：

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
        
        // 他の例外を ToolExecutionException として再スローする
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. リトライロジック

一時的な障害に対して適切なリトライロジックを実装します：

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
            # 一過性でないエラー、再試行しない
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### パフォーマンス最適化

#### 1. キャッシング

コストのかかる操作にキャッシュを実装します：

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

I/Oバウンド操作に対して非同期プログラミングパターンを活用します：

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // 長時間実行される操作の場合、処理IDを即座に返します
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
        
        // 処理ID付きで即時応答を返します
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

過負荷を防ぐためリソースのスロットリングを実装します：

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # 1秒あたり5リクエストを許可
            bucket_size=10        # バーストで最大10リクエストを許可
        )
    
    async def execute_async(self, request):
        # 続行可能か、または待つ必要があるかを確認
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # 待ち時間が長すぎる場合
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # 適切な遅延時間を待機
                await asyncio.sleep(delay)
        
        # トークンを消費してリクエストを続行
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
            
            # 次のトークンが利用可能になるまでの時間を計算
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # 経過時間に基づいて新しいトークンを追加
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### セキュリティベストプラクティス

#### 1. 入力検証

入力パラメーターを徹底的に検証します：

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

適切な認可チェックを実装します：

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

#### 3. 機微データの取り扱い

機微なデータを慎重に扱います：

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
        
        # 明示的に要求され、かつ許可されていない限り、機密フィールドをフィルタリングする
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # リクエストコンテキストで認可レベルを確認する
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # 元のデータを変更しないようにコピーを作成する
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

包括的なテストにより、MCPツールが正確に機能し、エッジケースを処理し、システムの他部分と適切に統合されることを保証します。

### ユニットテスト

#### 1. 各ツールを個別にテスト

各ツールの機能に焦点を絞ったテストを作成します：

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

スキーマが有効で制約を適切に強制していることをテストします：

```java
@Test
public void testSchemaValidation() {
    // ツールのインスタンスを作成する
    SearchTool searchTool = new SearchTool();
    
    // スキーマを取得する
    Object schema = searchTool.getSchema();
    
    // 検証のためにスキーマをJSONに変換する
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // スキーマが有効なJSONスキーマであることを検証する
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

#### 3. エラー処理テスト

エラー条件を対象とした特定のテストを作成します：

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # 手配する
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
        
        # 例外メッセージを検証する
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # 手配する
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
        
        # 例外にレート制限の情報が含まれていることを確認する
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### 統合テスト

#### 1. ツールチェーンテスト

期待される組み合わせでツールが連携することをテストします：

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

完全なツール登録と実行を含むMCPサーバーをテストします：

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

モデルプロンプトからツール実行までの完結したワークフローをテストします：

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # 設定 - MCPクライアントとモックモデルのセットアップ
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # モックモデルのレスポンス
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
    
    # モック天気ツールのレスポンス
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

MCPサーバーが同時に処理できるリクエスト数をテストします：

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

極端な負荷下でのシステムをテストします：

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

長期間のパフォーマンス分析のために監視を設定します：

```python
# MCPサーバーの監視を設定する
def configure_monitoring(server):
    # Prometheusメトリクスを設定する
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
    
    # タイミングとメトリクス記録のためのミドルウェアを追加する
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # メトリクスエンドポイントを公開する
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCPワークフローデザインパターン

よく設計されたMCPワークフローは効率性、信頼性、保守性を向上させます。以下が従うべき主要なパターンです：

### 1. ツールのチェーンパターン

複数のツールを順に接続し、各ツールの出力が次の入力となるようにします：

```python
# PythonのChain of Tools実装
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # 順番に実行するツール名のリスト
    
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

入力に基づいて専門的なツールに振り分ける中央ツールを使用します：

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

複数のツールを同時に実行して効率を高めます：

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // ステップ1：データセットのメタデータを取得（同期処理）
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
        
        // すべての並行タスクの完了を待機
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
        
        // ステップ4：サマリーレポートを生成
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // 完全なワークフローの結果を返す
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. エラー回復パターン

ツールの失敗に対して優雅なフォールバックを実装します：

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # まずはプライマリツールを試す
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # 失敗を記録する
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # セカンダリツールにフォールバックする
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
        # この例では、元のパラメータをそのまま返すだけにする
        return params

# 使用例
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # プライマリ（有料）天気API
        "basicWeatherService",    # フォールバック（無料）天気API
        {"location": location}
    )
```

### 5. ワークフロー合成パターン

より単純なワークフローを組み合わせて複雑なものを構築します：

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

# MCPサーバーテスト：ベストプラクティスとトップヒント

## 概要

テストは信頼性が高く高品質のMCPサーバーを開発するための重要な側面です。このガイドは開発ライフサイクル全体でユニットテストから統合テスト、エンドツーエンド検証までMCPサーバーのテストに関する包括的なベストプラクティスとヒントを提供します。

## MCPサーバーテストの重要性

MCPサーバーはAIモデルとクライアントアプリケーション間の重要なミドルウェアとして機能します。徹底的なテストは以下を保証します：

- 本番環境での信頼性
- リクエストとレスポンスの正確な処理
- MCP仕様の適切な実装
- 障害やエッジケースへの強靭性
- 様々な負荷下での一貫したパフォーマンス

## MCPサーバーのユニットテスト

### ユニットテスト（基礎）

ユニットテストはMCPサーバーの個々のコンポーネントを独立して検証します。

#### テスト内容

1. <strong>リソースハンドラー</strong>: 各リソースハンドラーのロジックを独立してテストする
2. <strong>ツール実装</strong>: 様々な入力に対しツールの挙動を検証する
3. <strong>プロンプトテンプレート</strong>: プロンプトテンプレートが正しくレンダリングされることを確認する
4. <strong>スキーマ検証</strong>: パラメーター検証ロジックをテストする
5. <strong>エラー処理</strong>: 不正な入力に対するエラーレスポンスを検証する

#### ユニットテストのベストプラクティス

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
# Pythonの計算機ツールの例示的なユニットテスト
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

### 統合テスト（中間層）

統合テストはMCPサーバーのコンポーネント間の相互作用を検証します。

#### テスト内容

1. <strong>サーバー初期化</strong>: さまざまな構成でのサーバー起動をテストする
2. <strong>ルート登録</strong>: すべてのエンドポイントが正しく登録されていることを検証する
3. <strong>リクエスト処理</strong>: 完全なリクエスト-レスポンスサイクルをテストする
4. <strong>エラー伝播</strong>: コンポーネント間のエラーが適切に処理されることを確認する
5. <strong>認証と認可</strong>: セキュリティ機構をテストする

#### 統合テストのベストプラクティス

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

### エンドツーエンドテスト（トップ層）

エンドツーエンドテストはクライアントからサーバーまでの完全なシステム動作を検証します。

#### テスト内容

1. **クライアント-サーバー通信**: 完全なリクエスト-レスポンスサイクルをテストする
2. **実際のクライアントSDK**: 実際のクライアント実装でテストする
3. <strong>負荷下でのパフォーマンス</strong>: 複数の同時リクエスト時の挙動を検証する
4. <strong>エラー回復</strong>: 障害からのシステム回復をテストする
5. <strong>長時間実行操作</strong>: ストリーミングや長時間実行操作の処理を検証する

#### E2Eテストのベストプラクティス

```typescript
// TypeScriptでのクライアントを使用したE2Eテストの例
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // テスト環境でサーバーを起動する
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
    
    // アサート
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## MCPテストのモック戦略

モックはテスト時にコンポーネントを分離するために不可欠です。

### モックすべきコンポーネント

1. **外部AIモデル**: 予測可能なテストのためにモデル応答をモック化する
2. <strong>外部サービス</strong>: API依存（データベース、サードパーティサービス）をモック化する
3. <strong>認証サービス</strong>: アイデンティティプロバイダーをモック化する
4. <strong>リソースプロバイダー</strong>: 負荷の高いリソースハンドラーをモック化する

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
    # モックを設定する
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # テストでモックを使用する
    server = McpServer(model_client=mock_model)
    # テストを続ける
```

## パフォーマンステスト

パフォーマンステストは本番用MCPサーバーにとって重要です。

### 測定項目

1. <strong>レイテンシ</strong>: リクエストの応答時間
2. <strong>スループット</strong>: 秒間に処理できるリクエスト数
3. <strong>リソース使用率</strong>: CPU、メモリ、ネットワーク使用量
4. <strong>同時処理</strong>: 並列リクエスト時の挙動
5. <strong>スケーリング特性</strong>: 負荷増加時のパフォーマンス

### パフォーマンステストツール

- **k6**: オープンソースの負荷テストツール
- **JMeter**: 総合的なパフォーマンステスト
- **Locust**: Pythonベースの負荷テスト
- **Azure Load Testing**: クラウドベースのパフォーマンステスト

### 例：k6を使った基本負荷テスト

```javascript
// MCPサーバーの負荷テスト用k6スクリプト
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10人の仮想ユーザー
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

テストの自動化で品質の一貫性と迅速なフィードバックループを実現します。

### CI/CD統合

1. <strong>プルリクエスト時にユニットテストを実行</strong>: コード変更が既存機能を壊さないことを保証する
2. <strong>ステージング環境での統合テスト</strong>: 事前本番環境で統合テストを実行する  
3. <strong>パフォーマンスベースライン</strong>: 回帰を検出するためにパフォーマンスベンチマークを維持する  
4. <strong>セキュリティスキャン</strong>: パイプラインの一部としてセキュリティテストを自動化する  

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

## MCP仕様準拠テスト

サーバーがMCP仕様を正しく実装していることを検証します。

### 主要な準拠項目

1. **APIエンドポイント**: 必須エンドポイント（/resources、/toolsなど）をテスト  
2. **リクエスト/レスポンス形式**: スキーマ準拠を検証  
3. <strong>エラーコード</strong>: 各種シナリオで正しいステータスコードを確認  
4. <strong>コンテンツタイプ</strong>: 異なるコンテンツタイプの処理をテスト  
5. <strong>認証フロー</strong>: 仕様準拠の認証機構を検証  

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

## 効果的なMCPサーバーテストのトップ10のヒント

1. <strong>ツール定義を個別にテスト</strong>: ツールのロジックとは別にスキーマ定義を検証する  
2. <strong>パラメータ化テストの活用</strong>: エッジケースを含むさまざまな入力でツールをテスト  
3. <strong>エラー応答をチェック</strong>: すべての可能なエラー条件で適切なエラー処理を検証  
4. <strong>認可ロジックのテスト</strong>: さまざまなユーザーロールに対する適切なアクセス制御を確認  
5. <strong>テストカバレッジの監視</strong>: 重要パスコードの高いカバレッジを目指す  
6. <strong>ストリーミングレスポンスのテスト</strong>: ストリーミングコンテンツの適切な処理を検証  
7. <strong>ネットワーク問題をシミュレート</strong>: 不良ネットワーク条件下の動作をテスト  
8. <strong>リソース制限のテスト</strong>: クォータやレート制限への到達時の挙動を確認  
9. <strong>回帰テストの自動化</strong>: すべてのコード変更で実行されるスイートを構築  
10. <strong>テストケースのドキュメント化</strong>: 明確なテストシナリオの文書化を維持  

## 一般的なテストの落とし穴

- <strong>ハッピーパステストに過度に依存</strong>: エラーケースも徹底的にテストすること  
- <strong>パフォーマンステストの無視</strong>: 本番影響前にボトルネックを特定する  
- <strong>単独テストのみの実施</strong>: ユニット、統合、E2Eテストを組み合わせる  
- **APIカバレッジ不十分**: 全エンドポイントと機能のテストを保証  
- <strong>一貫性のないテスト環境</strong>: コンテナを使って一貫した環境を維持する  

## 結論

信頼性が高く高品質なMCPサーバー開発には包括的なテスト戦略が不可欠です。本ガイドで示したベストプラクティスとヒントを実施することで、MCP実装が最高水準の品質、信頼性、パフォーマンスを満たすことができます。

## 重要な要点

1. <strong>ツール設計</strong>: 単一責任の原則に従い、依存性注入を用い、合成可能な設計を行う  
2. <strong>スキーマ設計</strong>: 明確で文書化されたスキーマを作成し、適切な検証制約を設ける  
3. <strong>エラー処理</strong>: 優雅なエラー処理、構造化されたエラー応答、再試行ロジックを実装する  
4. <strong>パフォーマンス</strong>: キャッシュ、非同期処理、リソーススロットリングを活用  
5. <strong>セキュリティ</strong>: 徹底した入力検証、認可チェック、機密データの取り扱いを適用  
6. <strong>テスト</strong>: 包括的なユニット、統合、エンドツーエンドテストを作成  
7. <strong>ワークフローパターン</strong>: チェーン、ディスパッチャー、並列処理などの確立されたパターンを適用  

## 演習

ドキュメント処理システムのために以下の仕様を持つMCPツールとワークフローを設計してください:

1. 複数フォーマット（PDF、DOCX、TXT）のドキュメントを受け入れる  
2. ドキュメントからテキストと重要情報を抽出  
3. ドキュメントをタイプと内容で分類  
4. 各ドキュメントの要約を生成  

このシナリオに最適なツールスキーマ、エラー処理、およびワークフローパターンを実装してください。この実装をどのようにテストするかも検討してください。

## リソース

1. 最新情報を得るために [Microsoft Foundry Discord Community](https://aka.ms/foundrydevs) でMCPコミュニティに参加  
2. オープンソースの [MCPプロジェクト](https://github.com/modelcontextprotocol) に貢献  
3. 自組織のAIイニシアチブにMCP原則を適用  
4. 業界向けの専門的なMCP実装を検討  
5. マルチモーダル統合やエンタープライズアプリ統合など、特定のMCPトピックの上級コースを検討  
6. [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md) を通じて学んだ原則で独自のMCPツールやワークフローを構築してみる  

## 次は

次: [ケーススタディ](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->