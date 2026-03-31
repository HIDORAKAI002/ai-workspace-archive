# MCP 개발 모범 사례

[![MCP Development Best Practices](../../../translated_images/ko/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(위 이미지 클릭 시 본 수업의 영상 시청)_

## 개요

이 수업은 MCP 서버 및 기능을 프로덕션 환경에서 개발, 테스트 및 배포할 때의 고급 모범 사례에 중점을 둡니다. MCP 생태계가 복잡성과 중요성이 커짐에 따라, 확립된 패턴을 따르는 것은 신뢰성, 유지보수성 및 상호 운용성을 보장합니다. 본 수업은 실제 MCP 구현에서 얻은 실용적 지혜를 통합하여 견고하고 효율적인 서버를 효과적인 리소스, 프롬프트 및 도구와 함께 만드는 데 도움을 줍니다.

## 학습 목표

이 수업이 끝나면 다음을 할 수 있습니다:

- MCP 서버 및 기능 설계에서 업계 모범 사례 적용
- MCP 서버에 대한 포괄적인 테스트 전략 수립
- 복잡한 MCP 애플리케이션을 위한 효율적이고 재사용 가능한 워크플로우 패턴 설계
- MCP 서버에서 적절한 오류 처리, 로깅 및 관측성 구현
- MCP 구현의 성능, 보안, 유지보수성 최적화

## MCP 핵심 원칙

구체적인 구현 관행에 들어가기 전에, 효과적인 MCP 개발을 안내하는 핵심 원칙을 이해하는 것이 중요합니다:

1. **표준화된 통신**: MCP는 JSON-RPC 2.0을 기반으로 하여 모든 구현 사이에 요청, 응답 및 오류 처리를 위한 일관된 형식을 제공합니다.

2. **사용자 중심 설계**: 항상 MCP 구현에서 사용자 동의, 제어 및 투명성을 최우선으로 합니다.

3. **보안 우선**: 인증, 권한 부여, 검증, 속도 제한 등 강력한 보안 조치를 구현합니다.

4. **모듈식 아키텍처**: 각 도구와 리소스가 명확하고 집중된 목적을 가지는 모듈식 접근방식으로 MCP 서버를 설계합니다.

5. **상태 유지 연결**: 여러 요청에 걸쳐 상태를 유지하는 MCP의 능력을 활용하여 더 일관되고 문맥 인지적인 상호작용을 만듭니다.

## 공식 MCP 모범 사례

다음 모범 사례는 공식 모델 컨텍스트 프로토콜 문서에서 유래했습니다:

### 보안 모범 사례

1. **사용자 동의 및 제어**: 데이터 접근 또는 작업 수행 전에 명시적인 사용자 동의를 항상 요구합니다. 공유되는 데이터와 승인된 작업에 대해 명확한 제어를 제공합니다.

2. **데이터 프라이버시**: 명시적 동의가 있는 경우에만 사용자 데이터를 노출하며 적절한 접근 제어로 보호합니다. 무단 데이터 전송을 방지합니다.

3. **도구 안전성**: 도구 호출 전에 명확한 사용자 동의를 요구합니다. 사용자가 각 도구의 기능을 이해하도록 하고 강력한 보안 경계를 시행합니다.

4. **도구 권한 제어**: 세션 중 모델이 사용할 수 있는 도구를 구성하여 명시적으로 승인된 도구만 접근할 수 있도록 보장합니다.

5. **인증**: API 키, OAuth 토큰 또는 기타 안전한 인증 방식을 사용하여 도구, 리소스 또는 민감 작업에 접근하기 전에 적절한 인증을 요구합니다.

6. **매개변수 검증**: 모든 도구 호출에 대해 검증을 시행하여 잘못되거나 악의적인 입력이 도구 구현에 도달하지 않도록 합니다.

7. **속도 제한**: 서버 자원의 남용을 방지하고 공정한 사용을 보장하기 위해 속도 제한을 구현합니다.

### 구현 모범 사례

1. **기능 협상**: 연결 설정 중 지원 기능, 프로토콜 버전, 사용 가능한 도구 및 리소스에 대한 정보를 교환합니다.

2. **도구 설계**: 여러 관심사를 처리하는 거대 도구 대신 하나의 작업에 집중하는 도구를 만듭니다.

3. **오류 처리**: 문제 진단, 실패 우아한 처리 및 실행 가능한 피드백 제공을 위한 표준화된 오류 메시지와 코드를 구현합니다.

4. **로깅**: 감사, 디버그 및 프로토콜 상호작용 모니터링을 위한 구조화된 로그를 구성합니다.

5. **진행 추적**: 장시간 실행 작업에 대해 진행 상황 업데이트를 보고하여 반응형 사용자 인터페이스를 가능하게 합니다.

6. **요청 취소**: 필요없거나 너무 오래 걸리는 진행 중인 요청을 클라이언트가 취소할 수 있도록 합니다.

## 추가 참고 자료

최신 MCP 모범 사례 정보는 다음을 참조하세요:

- [MCP 문서](https://modelcontextprotocol.io/)
- [MCP 명세 (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub 저장소](https://github.com/modelcontextprotocol)
- [보안 모범 사례](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - 보안 위험 및 완화책
- [MCP 보안 정상회담 워크숍 (Sherpa)](https://azure-samples.github.io/sherpa/) - 실습 보안 교육

## 실용적 구현 예시

### 도구 설계 모범 사례

#### 1. 단일 책임 원칙

각 MCP 도구는 명확하고 집중된 목적을 가져야 합니다. 여러 관심사를 처리하려는 거대 도구를 만들기보다 특정 작업에 뛰어난 전문 도구를 개발하세요.

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

#### 2. 일관된 오류 처리

정보가 풍부한 오류 메시지와 적절한 복구 메커니즘을 갖춘 견고한 오류 처리를 구현하세요.

```python
# 포괄적인 오류 처리를 포함한 파이썬 예제
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # 매개변수 검증
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # 보안 검증
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # 타임아웃이 있는 데이터베이스 작업
                async with timeout(10):  # 10초 타임아웃
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # 연결 오류는 일시적일 수 있음
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # 쿼리 오류는 클라이언트 오류일 가능성이 높음
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # 도구별 오류는 통과시킴
            raise
        except Exception as e:
            # 예상치 못한 오류에 대한 포괄적 처리
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # SQL 인젝션 탐지 구현
        pass
        
    def _log_error(self, message, error):
        # 오류 로깅 구현
        pass
```

#### 3. 매개변수 검증

항상 매개변수를 철저히 검증하여 잘못되거나 악의적인 입력을 방지하세요.

```javascript
// 자세한 매개변수 검증이 포함된 JavaScript/TypeScript 예제
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
    // 1. 매개변수 존재 여부 검증
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. 매개변수 타입 검증
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. 매개변수 값 검증
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. 쓰기 작업을 위한 내용 존재 여부 검증
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. 경로 안전성 검증
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // 검증된 매개변수를 기반으로 한 구현
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // 경로 안전성 검사 구현
    // ...
  }
}
```

### 보안 구현 예시

#### 1. 인증 및 권한 부여

```java
// 인증 및 권한 부여가 포함된 Java 예제
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // 의존성 주입
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
        // 1. 인증 컨텍스트 추출
        String authToken = request.getContext().getAuthToken();
        
        // 2. 사용자 인증
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. 특정 작업에 대한 권한 확인
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. 권한이 부여된 작업 진행
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

#### 2. 속도 제한

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

## 테스트 모범 사례

### 1. MCP 도구 단위 테스트

도구를 독립적으로 테스트하고 외부 종속성을 모킹하세요:

```typescript
// 도구 단위 테스트의 TypeScript 예제
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // 목 날씨 서비스 생성
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // 목 의존성을 가진 도구 생성
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // 준비
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // 실행
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // 검증
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // 준비
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // 실행 및 검증
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. 통합 테스트

클라이언트 요청부터 서버 응답까지의 전체 흐름을 테스트하세요:

```python
# 파이썬 통합 테스트 예제
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # 테스트 서버 시작
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # 클라이언트 생성
        client = McpClient("http://localhost:5000")
        
        # 도구 검색 테스트
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # 도구 실행 테스트
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # 응답 확인
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # 정리 작업
        await server.stop()
```

## 성능 최적화

### 1. 캐싱 전략

지연 시간과 리소스 사용량을 줄이기 위해 적절한 캐싱을 구현하세요:

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

#### 2. 의존성 주입과 테스트 용이성

의존성을 생성자 주입 통해 받아들이도록 도구를 설계하여 테스트 가능하고 구성 가능하게 만드세요:

```java
// 의존성 주입이 포함된 자바 예제
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // 생성자를 통한 의존성 주입
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // 도구 구현
    // ...
}
```

#### 3. 조합 가능한 도구

더 복잡한 워크플로우를 만들기 위해 도구를 조합할 수 있도록 설계하세요:

```python
# 조합 가능한 도구를 보여주는 파이썬 예제
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # 구현...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # 이 도구는 dataFetch 도구의 결과를 사용할 수 있습니다
    async def execute_async(self, request):
        # 구현...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # 이 도구는 dataAnalysis 도구의 결과를 사용할 수 있습니다
    async def execute_async(self, request):
        # 구현...
        pass

# 이 도구들은 독립적으로 사용하거나 워크플로우의 일부로 사용할 수 있습니다
```

### 스키마 설계 모범 사례

스키마는 모델과 도구 간의 계약입니다. 잘 설계된 스키마는 도구 사용성을 높입니다.

#### 1. 명확한 매개변수 설명

각 매개변수에 설명 정보를 항상 포함하세요:

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

#### 2. 검증 제약조건

잘못된 입력을 방지하기 위해 검증 제약조건을 포함하세요:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // 형식 검증이 포함된 이메일 속성
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // 숫자 제약 조건이 있는 나이 속성
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // 열거형 속성
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

#### 3. 일관된 반환 구조

모델이 결과를 해석하기 쉽도록 응답 구조를 일관되게 유지하세요:

```python
async def execute_async(self, request):
    try:
        # 요청을 처리합니다
        results = await self._search_database(request.parameters["query"])
        
        # 항상 일관된 구조를 반환합니다
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

### 오류 처리

신뢰성을 유지하려면 견고한 오류 처리가 필수입니다.

#### 1. 우아한 오류 처리

적절한 수준에서 오류를 처리하고 정보성 메시지를 제공하세요:

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

#### 2. 구조화된 오류 응답

가능한 경우 구조화된 오류 정보를 반환하세요:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // 구현
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
        
        // 다른 예외를 ToolExecutionException으로 다시 던짐
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. 재시도 로직

일시적 실패에 대해 적절한 재시도 로직을 구현하세요:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # 초
    
    while retry_count < max_retries:
        try:
            # 외부 API 호출
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # 지수 백오프
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # 일시적이지 않은 오류, 재시도하지 않음
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### 성능 최적화

#### 1. 캐싱

비용이 큰 작업에 대해 캐싱을 구현하세요:

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

#### 2. 비동기 처리

I/O 바운드 작업에 대해 비동기 프로그래밍 패턴을 사용하세요:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // 장시간 실행되는 작업의 경우 즉시 처리 ID를 반환합니다
        String processId = UUID.randomUUID().toString();
        
        // 비동기 처리를 시작합니다
        CompletableFuture.runAsync(() -> {
            try {
                // 장시간 실행되는 작업을 수행합니다
                documentService.processDocument(documentId);
                
                // 상태를 업데이트합니다 (일반적으로 데이터베이스에 저장됩니다)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // 프로세스 ID와 함께 즉시 응답을 반환합니다
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // 동반 상태 확인 도구
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

#### 3. 리소스 제한

과부하를 방지하기 위해 리소스 제한을 구현하세요:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # 초당 5개의 요청 허용
            bucket_size=10        # 최대 10개의 요청 버스트 허용
        )
    
    async def execute_async(self, request):
        # 진행할 수 있는지 또는 대기해야 하는지 확인
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # 대기 시간이 너무 긴 경우
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # 적절한 지연 시간 동안 대기
                await asyncio.sleep(delay)
        
        # 토큰을 소모하고 요청 진행
        self.rate_limiter.consume()
        
        # API 호출
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
            
            # 다음 토큰 사용 가능 시간 계산
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # 경과 시간에 따라 새로운 토큰 추가
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### 보안 모범 사례

#### 1. 입력 검증

항상 매개변수를 철저히 검증하세요:

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

#### 2. 권한 검사

적절한 권한 검사를 구현하세요:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // 요청에서 사용자 컨텍스트 가져오기
    UserContext user = request.getContext().getUserContext();
    
    // 사용자가 필요한 권한을 가지고 있는지 확인
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // 특정 리소스의 경우 해당 리소스에 대한 접근 권한 확인
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // 도구 실행 진행
    // ...
}
```

#### 3. 민감 데이터 처리

민감 데이터를 조심스럽게 처리하세요:

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
        
        # 사용자 데이터 가져오기
        user_data = await self.user_service.get_user_data(user_id)
        
        # 명시적으로 요청되고 권한이 부여되지 않은 경우 민감한 필드 필터링
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # 요청 컨텍스트에서 권한 수준 확인
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # 원본 변경을 피하기 위해 복사본 생성
        redacted = user_data.copy()
        
        # 특정 민감한 필드 가리기
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # 중첩된 민감한 데이터 가리기
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## MCP 도구 테스트 모범 사례

포괄적인 테스트는 MCP 도구가 올바르게 작동하고 극단적 사례를 처리하며 시스템과 적절히 통합되도록 보장합니다.

### 단위 테스트

#### 1. 각 도구를 독립적으로 테스트

각 도구 기능에 집중한 테스트를 만드세요:

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

#### 2. 스키마 검증 테스트

스키마가 유효하며 제약을 제대로 시행하는지 테스트하세요:

```java
@Test
public void testSchemaValidation() {
    // 도구 인스턴스 생성
    SearchTool searchTool = new SearchTool();
    
    // 스키마 가져오기
    Object schema = searchTool.getSchema();
    
    // 유효성 검사용으로 스키마를 JSON으로 변환
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // 스키마가 유효한 JSONSchema인지 검증
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // 유효한 매개변수 테스트
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // 필수 매개변수가 누락된 경우 테스트
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // 잘못된 매개변수 유형 테스트
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. 오류 처리 테스트

오류 조건에 대한 특정 테스트를 만드세요:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # 정렬
    tool = ApiTool(timeout=0.1)  # 매우 짧은 타임아웃
    
    # 타임아웃 될 요청을 모킹
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # 타임아웃보다 긴
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # 실행 및 검증
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # 예외 메시지 확인
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # 정렬
    tool = ApiTool()
    
    # 속도 제한 응답 모킹
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
        
        # 실행 및 검증
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # 예외에 속도 제한 정보 포함 확인
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### 통합 테스트

#### 1. 도구 체인 테스트

기대하는 조합에서 도구들이 함께 작동하는지 테스트하세요:

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

#### 2. MCP 서버 테스트

전체 도구 등록과 실행으로 MCP 서버를 테스트하세요:

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
        // 발견 엔드포인트 테스트
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // 도구 요청 생성
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // 요청 전송 및 응답 확인
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // 잘못된 도구 요청 생성
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // 누락된 매개변수 "b"
        request.put("parameters", parameters);
        
        // 요청 전송 및 오류 응답 확인
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. 엔드 투 엔드 테스트

모델 프롬프트부터 도구 실행까지의 완전한 워크플로우를 테스트하세요:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # 정렬 - MCP 클라이언트 및 모형 설정
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # 모형 응답 모의
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
    
    # 날씨 도구 응답 모의
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
        
        # 실행
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # 단언
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### 성능 테스트

#### 1. 부하 테스트

MCP 서버가 얼마나 많은 동시 요청을 처리할 수 있는지 테스트하세요:

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

#### 2. 스트레스 테스트

극한 부하 하에서 시스템을 테스트하세요:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // 스트레스 테스트를 위해 JMeter 설치
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // JMeter 테스트 계획 구성
    HashTree testPlanTree = new HashTree();
    
    // 테스트 계획, 스레드 그룹, 샘플러 등을 생성
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // 도구 실행을 위한 HTTP 샘플러 추가
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // 리스너 추가
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // 테스트 실행
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // 결과 검증
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // 평균 응답 시간 < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90번째 백분위수 < 500ms
}
```

#### 3. 모니터링 및 프로파일링

장기적 성능 분석을 위한 모니터링을 설정하세요:

```python
# MCP 서버 모니터링 구성
def configure_monitoring(server):
    # Prometheus 메트릭 설정
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
    
    # 타이밍 및 메트릭 기록을 위한 미들웨어 추가
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # 메트릭 엔드포인트 노출
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP 워크플로우 설계 패턴

잘 설계된 MCP 워크플로우는 효율성, 신뢰성, 유지보수성을 향상시킵니다. 주요 패턴은 다음과 같습니다:

### 1. 도구 체인 패턴

여러 도구를 순서대로 연결하여 각 도구의 출력이 다음 도구 입력이 되게 합니다:

```python
# 파이썬 체인 오브 툴 구현
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # 순차적으로 실행할 도구 이름 목록
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # 체인에 있는 각 도구를 실행하고 이전 결과를 전달
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # 결과를 저장하고 다음 도구의 입력으로 사용
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# 사용 예시
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

### 2. 디스패처 패턴

입력에 따라 전문 도구로 분배하는 중앙 도구를 사용하세요:

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

### 3. 병렬 처리 패턴

효율성을 위해 여러 도구를 동시에 실행하세요:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // 1단계: 데이터셋 메타데이터 가져오기(동기식)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // 2단계: 여러 분석을 병렬로 시작
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
        
        // 모든 병렬 작업이 완료될 때까지 대기
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // 완료 대기
        
        // 3단계: 결과 병합
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // 4단계: 요약 보고서 생성
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // 전체 워크플로우 결과 반환
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. 오류 복구 패턴

도구 실패에 대해 우아한 대체 수단을 구현하세요:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # 먼저 기본 도구를 시도하십시오
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # 실패를 기록하십시오
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # 보조 도구로 대체하십시오
            try:
                # 보조 도구에 맞게 매개변수를 변환해야 할 수 있습니다
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # 두 도구 모두 실패했습니다
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # 이 구현은 특정 도구에 따라 달라집니다
        # 이 예제에서는 원래 매개변수만 반환합니다
        return params

# 사용 예
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # 기본(유료) 날씨 API
        "basicWeatherService",    # 보조(무료) 날씨 API
        {"location": location}
    )
```

### 5. 워크플로우 구성 패턴

간단한 워크플로우를 조합하여 복잡한 워크플로우를 구축하세요:

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

# MCP 서버 테스트: 모범 사례 및 주요 팁

## 개요

테스트는 신뢰할 수 있고 고품질의 MCP 서버 개발의 핵심 요소입니다. 이 가이드는 단위 테스트부터 통합 테스트, 엔드 투 엔드 검증에 이르는 개발 수명주기 동안 MCP 서버 테스트를 위한 포괄적인 모범 사례와 팁을 제공합니다.

## MCP 서버 테스트가 중요한 이유

MCP 서버는 AI 모델과 클라이언트 애플리케이션 간의 중요한 미들웨어 역할을 합니다. 철저한 테스트는 다음을 보장합니다:

- 프로덕션 환경에서의 신뢰성
- 요청 및 응답의 정확한 처리
- MCP 명세의 적절한 구현
- 실패 및 극한 사례에 대한 복원력
- 다양한 부하에서 일관된 성능

## MCP 서버 단위 테스트

### 단위 테스트 (기초 단계)

단위 테스트는 MCP 서버의 개별 구성 요소를 독립적으로 검증합니다.

#### 테스트 대상

1. **리소스 핸들러**: 각 리소스 핸들러의 로직 독립적 테스트
2. **도구 구현**: 다양한 입력에 대한 도구 동작 검증
3. **프롬프트 템플릿**: 프롬프트 템플릿이 올바르게 렌더되는지 확인
4. **스키마 검증**: 매개변수 검증 로직 테스트
5. **오류 처리**: 잘못된 입력에 대한 오류 응답 검증

#### 단위 테스트 모범 사례

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
# Python에서 계산기 도구에 대한 예제 단위 테스트
def test_calculator_tool_add():
    # 준비
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # 실행
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # 검증
    assert result["value"] == 12
```

### 통합 테스트 (중간 계층)

통합 테스트는 MCP 서버 구성 요소 간 상호작용을 검증합니다.

#### 테스트 대상

1. **서버 초기화**: 다양한 구성으로 서버 시작 테스트
2. **라우트 등록**: 모든 엔드포인트가 제대로 등록되었는지 확인
3. **요청 처리**: 전체 요청-응답 사이클 테스트
4. **오류 전파**: 구성 요소 간 오류가 적절히 처리되는지 확인
5. **인증 및 권한 부여**: 보안 메커니즘 테스트

#### 통합 테스트 모범 사례

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

### 엔드 투 엔드 테스트 (최상위 계층)

엔드 투 엔드 테스트는 클라이언트에서 서버까지 전체 시스템 동작을 검증합니다.

#### 테스트 대상

1. **클라이언트-서버 통신**: 완전한 요청-응답 사이클 테스트
2. **실제 클라이언트 SDK**: 실제 클라이언트 구현체와 테스트
3. **부하 하 성능**: 다수 동시 요청 시 동작 검증
4. **오류 복구**: 실패 시 시스템 복구 테스트
5. **장기간 작업**: 스트리밍 및 장기 작업 처리 검증

#### 엔드 투 엔드 테스트 모범 사례

```typescript
// TypeScript로 작성된 클라이언트를 사용한 E2E 테스트 예제
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // 테스트 환경에서 서버 시작
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // 실행
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // 검증
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## MCP 테스트를 위한 모킹 전략

모킹은 테스트하는 동안 구성 요소를 격리할 때 필수적입니다.

### 모킹할 구성 요소

1. **외부 AI 모델**: 예측 가능한 테스트를 위해 모델 응답 모킹
2. **외부 서비스**: API 종속성(데이터베이스, 서드파티 서비스) 모킹
3. **인증 서비스**: 신원 제공자 모킹
4. **리소스 제공자**: 비용이 큰 리소스 핸들러 모킹

### 예시: AI 모델 응답 모킹

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
# unittest.mock를 사용한 Python 예제
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # 목 설정
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # 테스트에서 목 사용
    server = McpServer(model_client=mock_model)
    # 테스트 계속 진행
```

## 성능 테스트

성능 테스트는 프로덕션 MCP 서버에 필수적입니다.

### 측정 대상

1. **지연 시간**: 요청에 대한 응답 시간
2. **처리량**: 초당 처리 요청 수
3. **자원 활용도**: CPU, 메모리, 네트워크 사용량
4. **동시성 처리**: 병렬 요청 시 동작
5. **확장 특성**: 부하 증가 시 성능

### 성능 테스트 도구

- **k6**: 오픈소스 부하 테스트 도구
- **JMeter**: 종합 성능 테스트
- **Locust**: 파이썬 기반 부하 테스트
- **Azure Load Testing**: 클라우드 기반 성능 테스트

### 예시: k6를 이용한 기본 부하 테스트

```javascript
// MCP 서버 부하 테스트를 위한 k6 스크립트
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10명의 가상 사용자
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

## MCP 서버를 위한 테스트 자동화

테스트 자동화는 일관된 품질 유지와 빠른 피드백 루프를 보장합니다.

### CI/CD 통합
1. **풀 리퀘스트에서 단위 테스트 실행**: 코드 변경 사항이 기존 기능을 깨뜨리지 않는지 확인
2. **스테이징 환경에서 통합 테스트**: 사전 운영 환경에서 통합 테스트 실행
3. **성능 기준선 유지**: 회귀를 감지하기 위해 성능 벤치마크 유지
4. **보안 스캔**: 파이프라인의 일부로 보안 테스트 자동화

### 예제 CI 파이프라인 (GitHub Actions)

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

## MCP 사양 준수를 위한 테스트

서버가 MCP 사양을 올바르게 구현했는지 확인하세요.

### 주요 준수 영역

1. **API 엔드포인트**: 필수 엔드포인트 테스트(/resources, /tools 등)
2. **요청/응답 포맷**: 스키마 준수 검증
3. **오류 코드**: 다양한 시나리오에 대한 올바른 상태 코드 확인
4. **콘텐츠 유형**: 다양한 콘텐츠 유형 처리 테스트
5. **인증 흐름**: 사양에 맞는 인증 메커니즘 검증

### 준수 테스트 스위트

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

## 효과적인 MCP 서버 테스트를 위한 상위 10가지 팁

1. **도구 정의를 별도로 테스트**: 도구 로직과 독립적으로 스키마 정의 검증
2. **매개변수화된 테스트 사용**: 다양한 입력값과 경계값을 포함한 도구 테스트
3. **오류 응답 확인**: 가능한 모든 오류 조건에 대한 적절한 오류 처리 검증
4. **권한 부여 로직 테스트**: 다양한 사용자 역할에 대한 적절한 접근 제어 보장
5. **테스트 커버리지 모니터링**: 핵심 경로 코드를 높은 커버리지로 목표 설정
6. **스트리밍 응답 테스트**: 스트리밍 콘텐츠의 올바른 처리 검증
7. **네트워크 문제 시뮬레이션**: 열악한 네트워크 조건에서 동작 테스트
8. **리소스 한도 테스트**: 할당량 또는 속도 제한 도달 시 동작 검증
9. **회귀 테스트 자동화**: 모든 코드 변경 시 실행되는 스위트 구축
10. **테스트 케이스 문서화**: 테스트 시나리오를 명확하게 문서화 유지

## 일반적인 테스트 함정

- **정상 경로 테스트에 과도한 의존**: 오류 케이스를 철저히 테스트할 것
- **성능 테스트 무시**: 프로덕션에 영향을 미치기 전에 병목 지점 파악
- **분리된 테스트만 수행**: 단위, 통합, E2E 테스트 결합
- **불완전한 API 커버리지**: 모든 엔드포인트 및 기능 테스트 보장
- **일관되지 않은 테스트 환경**: 컨테이너를 사용해 일관된 테스트 환경 유지

## 결론

신뢰할 수 있고 고품질의 MCP 서버 개발을 위해 포괄적인 테스트 전략이 필수적입니다. 이 가이드에 제시된 모범 사례와 팁을 구현하면 MCP 구현이 최고 수준의 품질, 신뢰성 및 성능을 충족함을 보장할 수 있습니다.


## 주요 요점

1. **도구 설계**: 단일 책임 원칙 준수, 의존성 주입 사용, 조합 가능성을 고려한 설계
2. **스키마 설계**: 명확하고 잘 문서화된 스키마 생성, 적절한 유효성 검사 제약 조건 포함
3. **오류 처리**: 우아한 오류 처리, 구조화된 오류 응답 및 재시도 로직 구현
4. **성능**: 캐싱, 비동기 처리, 리소스 제한 사용
5. **보안**: 철저한 입력 검증, 권한 검사, 민감 데이터 처리 적용
6. **테스트**: 포괄적인 단위, 통합, 엔드투엔드 테스트 생성
7. **워크플로 패턴**: 체인, 디스패처, 병렬 처리와 같은 확립된 패턴 적용

## 실습

다음 작업을 수행하는 문서 처리 시스템을 위한 MCP 도구 및 워크플로 설계:

1. 여러 형식(PDF, DOCX, TXT)의 문서 수락
2. 문서에서 텍스트 및 주요 정보 추출
3. 문서 유형 및 내용에 따라 분류
4. 각 문서 요약 생성

이 시나리오에 가장 적합한 도구 스키마, 오류 처리, 워크플로 패턴을 구현하세요. 또한 이 구현을 어떻게 테스트할지 고려해 보세요.

## 자료

1. 최신 개발 소식을 접하려면 [Azure AI Foundry Discord Community](https://aka.ms/foundrydevs)에서 MCP 커뮤니티에 참여하세요.
2. 오픈 소스 [MCP 프로젝트](https://github.com/modelcontextprotocol)에 기여하세요.
3. 귀하 조직의 AI 이니셔티브에 MCP 원칙을 적용하세요.
4. 귀하 산업에 특화된 MCP 구현도 탐색해 보세요.
5. 다중 모달 통합 또는 엔터프라이즈 애플리케이션 통합 같은 특정 MCP 주제에 대한 고급 과정을 수강하는 것을 고려하세요.
6. [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)을 통해 배운 원칙으로 자신만의 MCP 도구와 워크플로를 실험해 보세요.

## 다음 단계

다음: [사례 연구](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:  
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 위해 노력하고 있으나, 자동 번역에는 오류나 부정확성이 포함될 수 있음을 알려드립니다. 원문 문서는 해당 언어의 공식 자료로 간주되어야 합니다. 중요한 정보의 경우 전문 인간 번역을 권장합니다. 본 번역 사용으로 인한 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->