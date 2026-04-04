# Thực hành tốt nhất phát triển MCP

[![Thực hành tốt nhất phát triển MCP](../../../translated_images/vi/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(Nhấp vào hình ảnh bên trên để xem video bài học này)_

## Tổng quan

Bài học này tập trung vào các thực hành tốt nhất nâng cao để phát triển, kiểm thử và triển khai các máy chủ và tính năng MCP trong môi trường sản xuất. Khi hệ sinh thái MCP trở nên phức tạp và quan trọng hơn, việc tuân theo các mẫu đã được thiết lập đảm bảo tính tin cậy, khả năng bảo trì và tương tác. Bài học này tổng hợp kiến thức thực tiễn từ các triển khai MCP thực tế để hướng dẫn bạn tạo ra các máy chủ chắc chắn, hiệu quả với tài nguyên, lời nhắc và công cụ hiệu quả.

## Mục tiêu học tập

Sau bài học này, bạn sẽ có thể:

- Áp dụng các thực hành tốt nhất trong thiết kế máy chủ và tính năng MCP
- Tạo các chiến lược kiểm thử toàn diện cho các máy chủ MCP
- Thiết kế các mẫu quy trình làm việc hiệu quả, có thể tái sử dụng cho các ứng dụng MCP phức tạp
- Thực hiện xử lý lỗi đúng cách, ghi nhật ký và quan sát trong máy chủ MCP
- Tối ưu hóa triển khai MCP về hiệu năng, bảo mật và khả năng bảo trì

## Nguyên tắc cốt lõi của MCP

Trước khi đi sâu vào các thực hành cụ thể, điều quan trọng là hiểu các nguyên tắc cốt lõi hướng dẫn phát triển MCP hiệu quả:

1. **Giao tiếp tiêu chuẩn**: MCP sử dụng JSON-RPC 2.0 làm nền tảng, cung cấp định dạng nhất quán cho yêu cầu, phản hồi và xử lý lỗi trên tất cả các triển khai.

2. **Thiết kế lấy người dùng làm trung tâm**: Luôn ưu tiên sự đồng ý, kiểm soát và minh bạch của người dùng trong các triển khai MCP.

3. **Ưu tiên bảo mật**: Thực hiện các biện pháp bảo mật mạnh mẽ bao gồm xác thực, ủy quyền, xác thực dữ liệu và giới hạn tốc độ.

4. **Kiến trúc mô-đun**: Thiết kế các máy chủ MCP với phương pháp mô-đun, nơi mỗi công cụ và tài nguyên có mục đích rõ ràng, tập trung.

5. **Kết nối có trạng thái**: Tận dụng khả năng của MCP duy trì trạng thái qua nhiều yêu cầu để có tương tác mạch lạc và nhận thức ngữ cảnh hơn.

## Thực hành tốt nhất chính thức của MCP

Các thực hành tốt nhất sau đây được rút ra từ tài liệu chính thức của Model Context Protocol:

### Thực hành tốt nhất về bảo mật

1. **Sự đồng ý và kiểm soát của người dùng**: Luôn yêu cầu sự đồng ý rõ ràng của người dùng trước khi truy cập dữ liệu hoặc thực hiện các thao tác. Cung cấp kiểm soát rõ ràng về dữ liệu được chia sẻ và các hành động được ủy quyền.

2. **Quyền riêng tư dữ liệu**: Chỉ tiết lộ dữ liệu người dùng với sự đồng ý rõ ràng và bảo vệ nó bằng các kiểm soát truy cập thích hợp. Ngăn chặn việc truyền dữ liệu trái phép.

3. **An toàn công cụ**: Yêu cầu sự đồng ý rõ ràng của người dùng trước khi gọi bất kỳ công cụ nào. Đảm bảo người dùng hiểu chức năng của từng công cụ và thực thi ranh giới bảo mật chặt chẽ.

4. **Kiểm soát phép công cụ**: Cấu hình các công cụ mà mô hình được phép sử dụng trong phiên làm việc, đảm bảo chỉ các công cụ được phép rõ ràng mới được truy cập.

5. **Xác thực**: Yêu cầu xác thực thích hợp trước khi cấp quyền truy cập các công cụ, tài nguyên hoặc thao tác nhạy cảm sử dụng khóa API, mã OAuth hoặc các phương pháp xác thực an toàn khác.

6. **Xác thực tham số**: Thực thi xác thực cho tất cả các lời gọi công cụ để ngăn đầu vào sai định dạng hoặc độc hại đến các triển khai công cụ.

7. **Giới hạn tốc độ**: Triển khai giới hạn tốc độ để ngăn chặn lạm dụng và đảm bảo sử dụng công bằng tài nguyên máy chủ.

### Thực hành tốt nhất về triển khai

1. **Đàm phán năng lực**: Trong quá trình thiết lập kết nối, trao đổi thông tin về các tính năng hỗ trợ, phiên bản giao thức, các công cụ và tài nguyên có sẵn.

2. **Thiết kế công cụ**: Tạo các công cụ tập trung làm tốt một việc, thay vì các công cụ đơn thể đảm nhận nhiều mối quan tâm.

3. **Xử lý lỗi**: Thực hiện các thông báo và mã lỗi tiêu chuẩn để giúp chẩn đoán sự cố, xử lý thất bại một cách duyên dáng và cung cấp phản hồi có thể hành động.

4. **Ghi nhật ký**: Cấu hình nhật ký có cấu trúc để kiểm toán, gỡ lỗi và giám sát tương tác giao thức.

5. **Theo dõi tiến trình**: Đối với các thao tác chạy dài, báo cáo cập nhật tiến trình để hỗ trợ giao diện người dùng phản hồi.

6. **Hủy yêu cầu**: Cho phép khách hàng hủy các yêu cầu đang thực hiện mà không còn cần thiết hoặc mất quá nhiều thời gian.

## Tài liệu tham khảo bổ sung

Để có thông tin cập nhật nhất về thực hành tốt nhất của MCP, tham khảo:

- [Tài liệu MCP](https://modelcontextprotocol.io/)
- [Đặc tả MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Kho GitHub](https://github.com/modelcontextprotocol)
- [Thực hành tốt nhất về bảo mật](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [Top 10 MCP của OWASP](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Rủi ro và biện pháp bảo mật
- [Hội thảo MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Đào tạo bảo mật thực hành

## Ví dụ triển khai thực tế

### Thực hành tốt nhất về thiết kế công cụ

#### 1. Nguyên tắc trách nhiệm đơn

Mỗi công cụ MCP nên có mục đích rõ ràng, tập trung. Thay vì tạo các công cụ đơn thể cố gắng xử lý nhiều mối quan tâm, hãy phát triển các công cụ chuyên biệt xuất sắc trong công việc cụ thể.

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

#### 2. Xử lý lỗi nhất quán

Thực hiện xử lý lỗi mạnh mẽ với các thông báo lỗi hữu ích và cơ chế phục hồi phù hợp.

```python
# Ví dụ Python với xử lý lỗi toàn diện
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # Kiểm tra tham số
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # Kiểm tra bảo mật
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # Thao tác cơ sở dữ liệu với giới hạn thời gian
                async with timeout(10):  # Giới hạn thời gian 10 giây
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # Lỗi kết nối có thể là lỗi tạm thời
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # Lỗi truy vấn có khả năng là lỗi của phía khách hàng
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # Cho phép lỗi đặc thù công cụ đi qua
            raise
        except Exception as e:
            # Bắt mọi lỗi không mong đợi
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # Triển khai phát hiện tấn công SQL Injection
        pass
        
    def _log_error(self, message, error):
        # Triển khai ghi nhật ký lỗi
        pass
```

#### 3. Xác thực tham số

Luôn xác thực tham số kỹ lưỡng để ngăn đầu vào sai định dạng hoặc độc hại.

```javascript
// Ví dụ JavaScript/TypeScript với xác thực tham số chi tiết
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
    // 1. Xác thực sự tồn tại của tham số
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. Xác thực kiểu của tham số
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. Xác thực giá trị của tham số
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. Xác thực sự tồn tại nội dung cho thao tác ghi
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. Xác thực an toàn đường dẫn
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // Triển khai dựa trên các tham số đã được xác thực
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // Triển khai kiểm tra an toàn đường dẫn
    // ...
  }
}
```

### Ví dụ triển khai bảo mật

#### 1. Xác thực và ủy quyền

```java
// Ví dụ Java với xác thực và phân quyền
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // Tiêm phụ thuộc
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
        // 1. Trích xuất ngữ cảnh xác thực
        String authToken = request.getContext().getAuthToken();
        
        // 2. Xác thực người dùng
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. Kiểm tra phân quyền cho thao tác cụ thể
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. Tiếp tục với thao tác được phân quyền
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

#### 2. Giới hạn tốc độ

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

## Thực hành tốt nhất về kiểm thử

### 1. Kiểm thử đơn vị công cụ MCP

Luôn kiểm thử công cụ riêng biệt, giả lập các phụ thuộc bên ngoài:

```typescript
// Ví dụ TypeScript về kiểm thử đơn vị công cụ
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // Tạo một dịch vụ thời tiết giả lập
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // Tạo công cụ với phụ thuộc giả lập
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // Sắp xếp
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // Thực hiện
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // Khẳng định
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // Sắp xếp
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // Thực hiện & Khẳng định
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. Kiểm thử tích hợp

Kiểm thử toàn bộ luồng từ yêu cầu khách hàng đến phản hồi máy chủ:

```python
# Ví dụ kiểm thử tích hợp Python
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # Khởi động một máy chủ kiểm thử
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # Tạo một client
        client = McpClient("http://localhost:5000")
        
        # Kiểm thử phát hiện công cụ
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # Kiểm thử thực thi công cụ
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # Xác minh phản hồi
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # Dọn dẹp
        await server.stop()
```

## Tối ưu hiệu suất

### 1. Chiến lược lưu cache

Triển khai lưu cache phù hợp để giảm độ trễ và sử dụng tài nguyên:

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

#### 2. Tiêm phụ thuộc và khả năng kiểm thử

Thiết kế các công cụ nhận phụ thuộc qua constructor injection, giúp dễ kiểm thử và cấu hình:

```java
// Ví dụ Java với tiêm phụ thuộc
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // Các phụ thuộc được tiêm qua hàm dựng
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // Triển khai công cụ
    // ...
}
```

#### 3. Công cụ có thể kết hợp

Thiết kế công cụ có thể kết hợp với nhau để tạo luồng công việc phức tạp hơn:

```python
# Ví dụ Python hiển thị các công cụ có thể kết hợp
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # Cài đặt...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # Công cụ này có thể sử dụng kết quả từ công cụ dataFetch
    async def execute_async(self, request):
        # Cài đặt...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # Công cụ này có thể sử dụng kết quả từ công cụ dataAnalysis
    async def execute_async(self, request):
        # Cài đặt...
        pass

# Các công cụ này có thể được sử dụng độc lập hoặc như một phần của quy trình làm việc
```

### Thực hành tốt nhất thiết kế schema

Schema là hợp đồng giữa mô hình và công cụ của bạn. Schema được thiết kế tốt sẽ cải thiện khả năng sử dụng công cụ.

#### 1. Mô tả tham số rõ ràng

Luôn bao gồm thông tin mô tả cho mỗi tham số:

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

#### 2. Ràng buộc xác thực

Bao gồm các ràng buộc xác thực để ngăn đầu vào không hợp lệ:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // Thuộc tính email với kiểm tra định dạng
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // Thuộc tính tuổi với các ràng buộc số
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // Thuộc tính liệt kê
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

#### 3. Cấu trúc trả về nhất quán

Duy trì sự nhất quán trong cấu trúc phản hồi để mô hình dễ dàng diễn giải kết quả:

```python
async def execute_async(self, request):
    try:
        # Xử lý yêu cầu
        results = await self._search_database(request.parameters["query"])
        
        # Luôn trả về một cấu trúc nhất quán
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

### Xử lý lỗi

Xử lý lỗi mạnh mẽ rất quan trọng để công cụ MCP giữ được độ tin cậy.

#### 1. Xử lý lỗi duyên dáng

Xử lý lỗi ở các cấp phù hợp và cung cấp thông báo có ích:

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

#### 2. Phản hồi lỗi có cấu trúc

Trả về thông tin lỗi có cấu trúc khi có thể:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // Triển khai
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
        
        // Ném lại các ngoại lệ khác dưới dạng ToolExecutionException
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. Logic thử lại

Thực hiện logic thử lại phù hợp đối với lỗi tạm thời:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # giây
    
    while retry_count < max_retries:
        try:
            # Gọi API bên ngoài
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # Thời gian chờ tăng theo cấp số nhân
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # Lỗi không tạm thời, không thử lại
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### Tối ưu hiệu suất

#### 1. Lưu cache

Triển khai lưu cache cho các thao tác tốn kém:

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

#### 2. Xử lý bất đồng bộ

Sử dụng mẫu lập trình bất đồng bộ cho các thao tác I/O:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // Đối với các thao tác chạy lâu, trả về ID xử lý ngay lập tức
        String processId = UUID.randomUUID().toString();
        
        // Bắt đầu xử lý không đồng bộ
        CompletableFuture.runAsync(() -> {
            try {
                // Thực hiện thao tác chạy lâu
                documentService.processDocument(documentId);
                
                // Cập nhật trạng thái (thường được lưu trong cơ sở dữ liệu)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // Trả về phản hồi ngay lập tức với ID quá trình
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // Công cụ kiểm tra trạng thái đồng hành
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

#### 3. Điều tiết tài nguyên

Thực thi điều tiết tài nguyên để ngăn quá tải:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # Cho phép 5 yêu cầu mỗi giây
            bucket_size=10        # Cho phép bùng phát lên đến 10 yêu cầu
        )
    
    async def execute_async(self, request):
        # Kiểm tra xem có thể tiếp tục hay cần phải chờ
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # Nếu thời gian chờ quá lâu
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # Đợi trong thời gian trì hoãn phù hợp
                await asyncio.sleep(delay)
        
        # Tiêu thụ một token và tiếp tục với yêu cầu
        self.rate_limiter.consume()
        
        # Gọi API
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
            
            # Tính thời gian đến khi token tiếp theo có sẵn
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # Thêm token mới dựa trên thời gian đã trôi qua
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### Thực hành tốt nhất về bảo mật

#### 1. Xác thực đầu vào

Luôn xác thực đầu vào tham số kỹ lưỡng:

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

#### 2. Kiểm tra ủy quyền

Thực hiện kiểm tra ủy quyền đúng cách:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // Lấy ngữ cảnh người dùng từ yêu cầu
    UserContext user = request.getContext().getUserContext();
    
    // Kiểm tra xem người dùng có quyền cần thiết hay không
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // Đối với các tài nguyên cụ thể, kiểm tra quyền truy cập tài nguyên đó
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // Tiến hành thực thi công cụ
    // ...
}
```

#### 3. Xử lý dữ liệu nhạy cảm

Xử lý dữ liệu nhạy cảm một cách cẩn thận:

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
        
        # Lấy dữ liệu người dùng
        user_data = await self.user_service.get_user_data(user_id)
        
        # Lọc các trường nhạy cảm trừ khi được yêu cầu rõ ràng VÀ có quyền
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # Kiểm tra cấp độ quyền trong ngữ cảnh yêu cầu
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # Tạo một bản sao để tránh sửa đổi bản gốc
        redacted = user_data.copy()
        
        # Che khuất các trường nhạy cảm cụ thể
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # Che khuất dữ liệu nhạy cảm lồng nhau
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## Kiểm thử công cụ MCP

Kiểm thử toàn diện đảm bảo công cụ MCP hoạt động chính xác, xử lý các trường hợp biên và tích hợp đúng với hệ thống.

### Kiểm thử đơn vị

#### 1. Kiểm thử chức năng riêng biệt từng công cụ

Tạo các kiểm thử tập trung cho chức năng từng công cụ:

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

#### 2. Kiểm thử xác thực schema

Kiểm thử schema hợp lệ và thực thi các ràng buộc đúng cách:

```java
@Test
public void testSchemaValidation() {
    // Tạo phiên bản công cụ
    SearchTool searchTool = new SearchTool();
    
    // Lấy lược đồ
    Object schema = searchTool.getSchema();
    
    // Chuyển đổi lược đồ sang JSON để xác thực
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // Xác thực lược đồ là JSONSchema hợp lệ
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // Kiểm tra các tham số hợp lệ
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // Kiểm tra tham số bắt buộc bị thiếu
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // Kiểm tra kiểu tham số không hợp lệ
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. Kiểm thử xử lý lỗi

Tạo các kiểm thử cụ thể cho điều kiện lỗi:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # Sắp xếp
    tool = ApiTool(timeout=0.1)  # Thời gian chờ rất ngắn
    
    # Giả lập một yêu cầu sẽ hết thời gian chờ
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # Dài hơn thời gian chờ
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # Thực thi & Kiểm tra
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Xác minh thông báo ngoại lệ
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # Sắp xếp
    tool = ApiTool()
    
    # Giả lập một phản hồi bị giới hạn tốc độ
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
        
        # Thực thi & Kiểm tra
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # Xác minh ngoại lệ chứa thông tin giới hạn tốc độ
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### Kiểm thử tích hợp

#### 1. Kiểm thử chuỗi công cụ

Kiểm thử các công cụ hoạt động cùng nhau theo tổ hợp dự kiến:

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

#### 2. Kiểm thử máy chủ MCP

Kiểm thử máy chủ MCP với đăng ký và thực thi đầy đủ các công cụ:

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
        // Kiểm tra điểm cuối khám phá
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // Tạo yêu cầu công cụ
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // Gửi yêu cầu và xác minh phản hồi
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // Tạo yêu cầu công cụ không hợp lệ
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // Thiếu tham số "b"
        request.put("parameters", parameters);
        
        // Gửi yêu cầu và xác minh phản hồi lỗi
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. Kiểm thử end-to-end

Kiểm thử các quy trình làm việc từ lời nhắc mô hình đến thực thi công cụ:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # Sắp xếp - Thiết lập khách hàng MCP và mô hình giả lập
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # Giả lập phản hồi mô hình
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
    
    # Giả lập phản hồi công cụ thời tiết
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
        
        # Thực hiện
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # Khẳng định
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### Kiểm thử hiệu suất

#### 1. Kiểm thử tải

Kiểm thử khả năng xử lý các yêu cầu đồng thời của máy chủ MCP:

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

#### 2. Kiểm thử áp lực

Kiểm thử hệ thống dưới tải cực đoan:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // Thiết lập JMeter cho kiểm thử áp lực
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // Cấu hình kế hoạch kiểm thử JMeter
    HashTree testPlanTree = new HashTree();
    
    // Tạo kế hoạch kiểm thử, nhóm luồng, các bộ lấy mẫu, v.v.
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // Thêm bộ lấy mẫu HTTP để thực thi công cụ
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // Thêm bộ nghe
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // Chạy kiểm thử
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // Xác thực kết quả
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // Thời gian phản hồi trung bình < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // Phần trăm thứ 90 < 500ms
}
```

#### 3. Giám sát và phân tích hiệu suất

Thiết lập giám sát để phân tích hiệu suất lâu dài:

```python
# Cấu hình giám sát cho máy chủ MCP
def configure_monitoring(server):
    # Thiết lập các số liệu Prometheus
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
    
    # Thêm middleware để tính thời gian và ghi lại số liệu
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # Mở cổng endpoint cho các số liệu
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## Mẫu thiết kế quy trình làm việc MCP

Các quy trình làm việc MCP được thiết kế tốt cải thiện hiệu quả, độ tin cậy và khả năng bảo trì. Dưới đây là các mẫu chính cần tuân theo:

### 1. Mẫu chuỗi công cụ

Kết nối nhiều công cụ theo chuỗi, nơi đầu ra của công cụ này trở thành đầu vào cho công cụ tiếp theo:

```python
# Triển khai Chuỗi Công cụ trong Python
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # Danh sách tên công cụ để thực thi theo trình tự
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # Thực thi từng công cụ trong chuỗi, truyền kết quả trước đó
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # Lưu kết quả và sử dụng làm đầu vào cho công cụ tiếp theo
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# Ví dụ sử dụng
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

### 2. Mẫu trung gian phân phối

Sử dụng công cụ trung tâm phân phối đến các công cụ chuyên biệt dựa trên đầu vào:

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

### 3. Mẫu xử lý song song

Thực thi nhiều công cụ đồng thời để tăng hiệu quả:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // Bước 1: Lấy siêu dữ liệu bộ dữ liệu (đồng bộ)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // Bước 2: Khởi chạy nhiều phân tích song song
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
        
        // Chờ tất cả các tác vụ song song hoàn thành
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // Chờ hoàn thành
        
        // Bước 3: Kết hợp kết quả
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // Bước 4: Tạo báo cáo tóm tắt
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // Trả về kết quả quy trình làm việc hoàn chỉnh
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. Mẫu phục hồi lỗi

Thực hiện các giải pháp dự phòng duyên dáng khi công cụ lỗi:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # Thử công cụ chính trước
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # Ghi lại lỗi
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # Chuyển sang công cụ phụ
            try:
                # Có thể cần chuyển đổi tham số cho công cụ dự phòng
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # Cả hai công cụ đều thất bại
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # Việc triển khai này sẽ phụ thuộc vào các công cụ cụ thể
        # Với ví dụ này, chúng ta chỉ trả về các tham số ban đầu
        return params

# Ví dụ sử dụng
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # API thời tiết chính (trả phí)
        "basicWeatherService",    # API thời tiết dự phòng (miễn phí)
        {"location": location}
    )
```

### 5. Mẫu kết hợp quy trình làm việc

Xây dựng các quy trình làm việc phức tạp bằng cách kết hợp các quy trình đơn giản hơn:

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

# Kiểm thử máy chủ MCP: Thực hành tốt nhất và mẹo hàng đầu

## Tổng quan

Kiểm thử là yếu tố then chốt trong việc phát triển các máy chủ MCP đáng tin cậy, chất lượng cao. Hướng dẫn này cung cấp các thực hành tốt nhất và mẹo đầy đủ cho việc kiểm thử máy chủ MCP trong suốt vòng đời phát triển, từ kiểm thử đơn vị đến kiểm thử tích hợp và xác thực end-to-end.

## Tại sao kiểm thử quan trọng với máy chủ MCP

Máy chủ MCP là lớp trung gian quan trọng giữa các mô hình AI và các ứng dụng khách. Kiểm thử kỹ lưỡng đảm bảo:

- Độ tin cậy trong môi trường sản xuất
- Xử lý chính xác yêu cầu và phản hồi
- Triển khai đúng đặc tả MCP
- Độ bền trước các lỗi và các trường hợp cạnh
- Hiệu suất đồng nhất dưới các mức tải khác nhau

## Kiểm thử đơn vị cho máy chủ MCP

### Kiểm thử đơn vị (nền tảng)

Kiểm thử đơn vị xác minh các thành phần riêng lẻ của máy chủ MCP một cách độc lập.

#### Các mục kiểm thử

1. **Bộ xử lý tài nguyên**: Kiểm thử logic từng bộ xử lý tài nguyên độc lập
2. **Triển khai công cụ**: Xác minh hành vi công cụ với các đầu vào khác nhau
3. **Mẫu lời nhắc**: Đảm bảo mẫu lời nhắc hiển thị đúng
4. **Xác thực schema**: Kiểm thử logic xác thực tham số
5. **Xử lý lỗi**: Kiểm thử phản hồi lỗi với đầu vào không hợp lệ

#### Thực hành tốt nhất cho kiểm thử đơn vị

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
# Ví dụ về kiểm thử đơn vị cho công cụ tính toán trong Python
def test_calculator_tool_add():
    # Sắp xếp
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # Thực hiện
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # Xác nhận
    assert result["value"] == 12
```

### Kiểm thử tích hợp (tầng giữa)

Kiểm thử tích hợp xác minh tương tác giữa các thành phần của máy chủ MCP.

#### Các mục kiểm thử

1. **Khởi tạo máy chủ**: Kiểm thử khởi động máy chủ với nhiều cấu hình khác nhau
2. **Đăng ký tuyến**: Xác minh tất cả điểm cuối được đăng ký đúng
3. **Xử lý yêu cầu**: Kiểm thử toàn bộ chu trình yêu cầu - phản hồi
4. **Phân phối lỗi**: Đảm bảo lỗi được xử lý hợp lý qua các thành phần
5. **Xác thực & ủy quyền**: Kiểm thử cơ chế bảo mật

#### Thực hành tốt nhất cho kiểm thử tích hợp

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

### Kiểm thử end-to-end (tầng trên)

Kiểm thử end-to-end xác minh toàn bộ hành vi hệ thống từ khách đến máy chủ.

#### Các mục kiểm thử

1. **Giao tiếp khách-máy chủ**: Kiểm thử các chu trình yêu cầu - phản hồi đầy đủ
2. **SDK khách thực tế**: Kiểm thử với các triển khai khách thực tế
3. **Hiệu suất dưới tải**: Xác minh hành vi với nhiều yêu cầu đồng thời
4. **Phục hồi lỗi**: Kiểm thử hệ thống phục hồi sau lỗi
5. **Thao tác chạy dài**: Xác minh xử lý luồng và thao tác dài

#### Thực hành tốt nhất cho kiểm thử E2E

```typescript
// Ví dụ kiểm thử E2E với một client bằng TypeScript
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // Khởi động máy chủ trong môi trường thử nghiệm
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // Thực hiện hành động
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // Khẳng định kết quả
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## Chiến lược giả lập cho kiểm thử MCP

Giả lập là yếu tố cần thiết để cô lập thành phần trong kiểm thử.

### Thành phần cần giả lập

1. **Mô hình AI bên ngoài**: Giả lập phản hồi mô hình để kiểm thử có thể dự đoán
2. **Dịch vụ bên ngoài**: Giả lập các phụ thuộc API (cơ sở dữ liệu, dịch vụ thứ ba)
3. **Dịch vụ xác thực**: Giả lập nhà cung cấp danh tính
4. **Nhà cung cấp tài nguyên**: Giả lập các bộ xử lý tài nguyên tốn kém

### Ví dụ: Giả lập phản hồi mô hình AI

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
# Ví dụ Python với unittest.mock
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # Cấu hình mock
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # Sử dụng mock trong kiểm thử
    server = McpServer(model_client=mock_model)
    # Tiếp tục với bài kiểm thử
```

## Kiểm thử hiệu suất

Kiểm thử hiệu suất rất quan trọng cho các máy chủ MCP triển khai sản xuất.

### Các chỉ số đo lường

1. **Độ trễ**: Thời gian phản hồi cho yêu cầu
2. **Thông lượng**: Số lượng yêu cầu xử lý mỗi giây
3. **Sử dụng tài nguyên**: CPU, bộ nhớ, mạng
4. **Xử lý đồng thời**: Hành vi dưới các yêu cầu song song
5. **Đặc tính mở rộng**: Hiệu suất khi tải tăng

### Công cụ kiểm thử hiệu suất

- **k6**: Công cụ kiểm thử tải mã nguồn mở
- **JMeter**: Kiểm thử hiệu suất toàn diện
- **Locust**: Kiểm thử tải dựa trên Python
- **Azure Load Testing**: Kiểm thử hiệu suất dựa trên đám mây

### Ví dụ: Kiểm thử tải cơ bản với k6

```javascript
// k6 script để kiểm tra tải máy chủ MCP
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 người dùng ảo
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

## Tự động hóa kiểm thử cho máy chủ MCP

Tự động hóa kiểm thử đảm bảo chất lượng đồng nhất và vòng phản hồi nhanh hơn.

### Tích hợp CI/CD
1. **Chạy Kiểm Tra Đơn Vị trên Pull Requests**: Đảm bảo các thay đổi mã không làm hỏng chức năng hiện có
2. **Kiểm Tra Tích Hợp trong Staging**: Chạy các kiểm tra tích hợp trong môi trường tiền sản xuất
3. **Cơ Sở Hiệu Suất**: Duy trì các điểm chuẩn hiệu suất để phát hiện suy giảm
4. **Quét Bảo Mật**: Tự động hóa kiểm tra bảo mật như một phần của pipeline

### Ví Dụ Pipeline CI (GitHub Actions)

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

## Kiểm Tra Tuân Thủ Đặc Tả MCP

Xác minh máy chủ của bạn triển khai đúng đặc tả MCP.

### Các Lĩnh Vực Tuân Thủ Chính

1. **API Endpoints**: Kiểm tra các endpoint bắt buộc (/resources, /tools, v.v.)
2. **Định Dạng Yêu Cầu/Phản Hồi**: Xác thực tuân thủ schema
3. **Mã Lỗi**: Xác minh mã trạng thái đúng cho các tình huống khác nhau
4. **Loại Nội Dung**: Kiểm tra xử lý các loại nội dung khác nhau
5. **Luồng Xác Thực**: Xác minh cơ chế xác thực tuân theo đặc tả

### Bộ Kiểm Tra Tuân Thủ

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

## Top 10 Mẹo Kiểm Tra Hiệu Quả Máy Chủ MCP

1. **Kiểm Tra Định Nghĩa Công Cụ Riêng Biệt**: Xác minh định nghĩa schema độc lập với logic công cụ
2. **Sử Dụng Kiểm Tra Tham Số Hóa**: Kiểm tra công cụ với nhiều đầu vào, bao gồm các trường hợp biên
3. **Kiểm Tra Phản Hồi Lỗi**: Xác minh xử lý lỗi đúng cho tất cả các điều kiện lỗi có thể xảy ra
4. **Kiểm Tra Logic Ủy Quyền**: Đảm bảo kiểm soát truy cập đúng cho các vai trò người dùng khác nhau
5. **Theo Dõi Phủ Sóng Kiểm Tra**: Hướng tới phủ sóng cao cho mã đường dẫn quan trọng
6. **Kiểm Tra Phản Hồi Streaming**: Xác minh xử lý đúng nội dung streaming
7. **Mô Phỏng Sự Cố Mạng**: Kiểm tra hành vi dưới điều kiện mạng yếu
8. **Kiểm Tra Giới Hạn Tài Nguyên**: Xác minh hành vi khi đạt ngưỡng quota hoặc giới hạn tốc độ
9. **Tự Động Hóa Kiểm Tra Quay Lại**: Xây dựng bộ kiểm tra chạy mỗi khi thay đổi mã
10. **Tài Liệu Hóa Các Trường Hợp Kiểm Tra**: Duy trì tài liệu rõ ràng về các kịch bản kiểm tra

## Những Sai Lầm Khi Kiểm Tra Phổ Biến

- **Quá phụ thuộc vào kiểm tra con đường thuận lợi**: Đảm bảo kiểm tra kỹ các trường hợp lỗi
- **Bỏ qua kiểm tra hiệu suất**: Xác định điểm nghẽn trước khi ảnh hưởng đến sản xuất
- **Chỉ kiểm tra riêng lẻ**: Kết hợp kiểm tra đơn vị, tích hợp và end-to-end
- **Phủ sóng API chưa đầy đủ**: Đảm bảo tất cả các endpoints và tính năng được kiểm tra
- **Môi trường kiểm tra không đồng nhất**: Sử dụng container để đảm bảo môi trường kiểm tra nhất quán

## Kết Luận

Một chiến lược kiểm tra toàn diện là điều thiết yếu để phát triển các máy chủ MCP đáng tin cậy, chất lượng cao. Bằng cách áp dụng các phương pháp và mẹo tốt nhất được trình bày trong hướng dẫn này, bạn có thể đảm bảo các triển khai MCP của mình đáp ứng các tiêu chuẩn cao nhất về chất lượng, độ tin cậy và hiệu suất.

## Các Điểm Chính Cần Nhớ

1. **Thiết Kế Công Cụ**: Tuân theo nguyên tắc trách nhiệm đơn nhất, sử dụng dependency injection, và thiết kế để dễ kết hợp
2. **Thiết Kế Schema**: Tạo schema rõ ràng, có tài liệu đầy đủ với các ràng buộc xác thực phù hợp
3. **Xử Lý Lỗi**: Triển khai xử lý lỗi nhẹ nhàng, phản hồi lỗi có cấu trúc, và logic thử lại
4. **Hiệu Suất**: Sử dụng caching, xử lý bất đồng bộ, và điều tiết tài nguyên
5. **Bảo Mật**: Áp dụng xác thực đầu vào đầy đủ, kiểm tra ủy quyền, và xử lý dữ liệu nhạy cảm
6. **Kiểm Tra**: Tạo bộ kiểm tra đơn vị, tích hợp và đầu-cuối toàn diện
7. **Mẫu Quy Trình Làm Việc**: Áp dụng các mẫu chuẩn như chuỗi, bộ điều phối, và xử lý song song

## Bài Tập

Thiết kế một công cụ MCP và quy trình làm việc cho hệ thống xử lý tài liệu mà:

1. Chấp nhận tài liệu ở nhiều định dạng (PDF, DOCX, TXT)
2. Trích xuất văn bản và thông tin chính từ tài liệu
3. Phân loại tài liệu theo loại và nội dung
4. Tạo bản tóm tắt cho mỗi tài liệu

Triển khai các schema công cụ, xử lý lỗi và mẫu quy trình làm việc phù hợp nhất với kịch bản này. Xem xét cách bạn sẽ kiểm tra triển khai này.

## Tài Nguyên

1. Tham gia cộng đồng MCP trên [Azure AI Foundry Discord Community](https://aka.ms/foundrydevs) để cập nhật các phát triển mới nhất
2. Đóng góp cho các dự án [MCP mã nguồn mở](https://github.com/modelcontextprotocol)
3. Áp dụng các nguyên tắc MCP trong các sáng kiến AI của tổ chức bạn
4. Khám phá các triển khai MCP chuyên biệt cho ngành của bạn.
5. Cân nhắc tham gia các khóa học nâng cao về các chủ đề MCP cụ thể, như tích hợp đa phương tiện hoặc tích hợp ứng dụng doanh nghiệp.
6. Thử xây dựng các công cụ và quy trình làm việc MCP của riêng bạn sử dụng các nguyên tắc học được qua [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)

## Tiếp Theo

Tiếp theo: [Nghiên Cứu Tình Huống](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố từ chối trách nhiệm**:  
Tài liệu này đã được dịch bằng dịch vụ dịch tự động AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sự không chính xác. Văn bản gốc bằng ngôn ngữ gốc được coi là nguồn chính xác và có thẩm quyền. Đối với những thông tin quan trọng, khuyến nghị sử dụng dịch vụ dịch thuật chuyên nghiệp do con người thực hiện. Chúng tôi không chịu trách nhiệm về bất kỳ sự hiểu nhầm hoặc diễn giải sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->