# بهترین روش‌های توسعه MCP

[![بهترین روش‌های توسعه MCP](../../../translated_images/fa/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(برای مشاهده ویدئوی این درس روی تصویر بالا کلیک کنید)_

## مرور کلی

این درس بر بهترین روش‌های پیشرفته برای توسعه، تست و استقرار سرورها و ویژگی‌های MCP در محیط‌های تولید تمرکز دارد. با افزایش پیچیدگی و اهمیت اکوسیستم‌های MCP، پیروی از الگوهای تثبیت شده اطمینان از قابلیت اطمینان، قابلیت نگهداری و هم‌کاری را فراهم می‌کند. این درس خرد عملی به‌دست آمده از پیاده‌سازی‌های واقعی MCP را برای راهنمایی شما در ساخت سرورهای مقاوم، کارآمد با منابع، پرسش‌ها و ابزارهای مؤثر ترکیب می‌کند.

## اهداف یادگیری

در پایان این درس، قادر خواهید بود:

- به‌کارگیری بهترین روش‌های صنعت در طراحی سرورها و ویژگی‌های MCP
- ایجاد استراتژی‌های جامع تست برای سرورهای MCP
- طراحی الگوهای گردش کار کارآمد و قابل استفاده مجدد برای برنامه‌های پیچیده MCP
- پیاده‌سازی مدیریت خطا، لاگ‌گیری و قابلیت مشاهده صحیح در سرورهای MCP
- بهینه‌سازی پیاده‌سازی‌های MCP برای عملکرد، امنیت و قابلیت نگهداری

## اصول اصلی MCP

پیش از پرداختن به روش‌های پیاده‌سازی خاص، مهم است اصول اصلی که توسعه مؤثر MCP را هدایت می‌کنند درک شود:

1. **ارتباط استاندارد شده**: MCP از JSON-RPC 2.0 به عنوان پایه استفاده می‌کند و فرمت ثابتی برای درخواست‌ها، پاسخ‌ها و مدیریت خطا در تمام پیاده‌سازی‌ها فراهم می‌آورد.

2. **طراحی کاربرمحور**: همیشه رضایت، کنترل و شفافیت کاربر را در پیاده‌سازی‌های MCP خود اولویت دهید.

3. **امنیت در اولویت**: اقدامات امنیتی قوی شامل احراز هویت، مجوزدهی، اعتبارسنجی و محدودیت نرخ را پیاده‌سازی کنید.

4. **معماری مدولار**: سرورهای MCP خود را با رویکرد مدولار طراحی کنید، جایی که هر ابزار و منبع هدف واضح و متمرکزی داشته باشد.

5. **اتصالات حالت‌دار**: از توانایی MCP برای حفظ حالت در طول چندین درخواست برای تعاملات منسجم‌تر و آگاه به زمینه بهره ببرید.

## بهترین روش‌های رسمی MCP

بهترین روش‌های زیر برگرفته از مستندات رسمی پروتکل مدل کانتکست (MCP) است:

### بهترین روش‌های امنیتی

1. **رضایت و کنترل کاربر**: همیشه پیش از دسترسی به داده‌ها یا انجام عملیات، رضایت صریح کاربر را بخواهید. کنترل واضحی بر اینکه چه داده‌ای به اشتراک گذاشته می‌شود و چه اقداماتی مجاز است فراهم کنید.

2. **حریم خصوصی داده‌ها**: فقط با رضایت صریح کاربر داده‌ها را افشا کنید و آن‌ها را با کنترل‌های دسترسی مناسب محافظت کنید. از انتقال داده‌های غیرمجاز جلوگیری کنید.

3. **ایمنی ابزار**: پیش از فراخوانی هر ابزاری رضایت صریح کاربر را بخواهید. اطمینان حاصل کنید کاربران عملکرد هر ابزار را درک می‌کنند و مرزهای امنیتی قوی را اعمال کنید.

4. **کنترل مجوز ابزار**: تعیین کنید مدل در طول جلسه از کدام ابزارها مجاز به استفاده است، به طوری که فقط ابزارهای صریحاً مجاز در دسترس باشند.

5. **احراز هویت**: پیش از اعطای دسترسی به ابزارها، منابع یا عملیات حساس، احراز هویت مناسب را با استفاده از کلیدهای API، توکن‌های OAuth یا روش‌های امن دیگر پیاده‌سازی کنید.

6. **اعتبارسنجی پارامترها**: بررسی اعتبار تمام فراخوانی‌های ابزار را برای جلوگیری از ورودی ناقص یا مخرب که ممکن است به پیاده‌سازی ابزار آسیب برساند، اعمال کنید.

7. **محدودیت نرخ**: نرخ درخواست‌ها را محدود کنید تا از سوءاستفاده جلوگیری شود و استفاده منصفانه از منابع سرور تضمین گردد.

### بهترین روش‌های پیاده‌سازی

1. **مذاکره قابلیت‌ها**: طی راه‌اندازی اتصال، اطلاعات درباره ویژگی‌های پشتیبانی شده، نسخه‌های پروتکل، ابزارها و منابع موجود تبادل شود.

2. **طراحی ابزار**: ابزارهای متمرکز بسازید که یک کار را به‌خوبی انجام دهند، نه ابزارهای یکپارچه بزرگ که چندین دغدغه را همزمان مدیریت می‌کنند.

3. **مدیریت خطا**: پیام‌ها و کدهای خطای استاندارد شده را پیاده‌سازی کنید تا در تشخیص مشکلات، مدیریت شکست‌ها به‌صورت مؤدبانه و ارائه بازخورد قابل اقدام کمک نماید.

4. **لاگ‌گیری**: لاگ‌های ساختاریافته برای حسابرسی، اشکال‌زدایی و نظارت بر تعاملات پروتکل تنظیم کنید.

5. **پیگیری پیشرفت**: برای عملیات طولانی مدت به‌روزرسانی‌های پیشرفت را گزارش دهید تا رابط‌های کاربری پاسخگو فراهم شود.

6. **لغو درخواست**: به مشتریان اجازه دهید درخواست‌های در حال اجرا که دیگر نیاز نیست یا بیش از حد زمان‌بر می‌شوند را لغو کنند.

## منابع اضافی

برای به‌روزترین اطلاعات در مورد بهترین روش‌های MCP مراجعه کنید به:

- [مستندات MCP](https://modelcontextprotocol.io/)
- [مشخصات MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [مخزن GitHub](https://github.com/modelcontextprotocol)
- [بهترین روش‌های امنیتی](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [ده اصل برتر امنیتی MCP در OWASP](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - ریسک‌ها و راهکارهای امنیتی
- [کارگاه امنیتی MCP (شرپا)](https://azure-samples.github.io/sherpa/) - آموزش عملی امنیت

## نمونه‌های عملی پیاده‌سازی

### بهترین روش‌های طراحی ابزار

#### 1. اصل مسئولیت واحد

هر ابزار MCP باید هدف واضح و متمرکزی داشته باشد. به جای ایجاد ابزارهای یکپارچه بزرگ که چندین دغدغه را مدیریت می‌کنند، ابزارهای تخصصی توسعه دهید که در وظایف خاص عالی باشند.

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

#### 2. مدیریت خطای یکنواخت

مدیریت خطای قوی با پیام‌های خطای آموزنده و مکانیزم‌های بازیابی مناسب پیاده‌سازی کنید.

```python
# نمونه پایتون با مدیریت جامع خطا
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # اعتبارسنجی پارامتر
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # اعتبارسنجی امنیتی
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # عملیات پایگاه داده با تایم‌اوت
                async with timeout(10):  # تایم‌اوت ۱۰ ثانیه
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # خطاهای اتصال ممکن است موقتی باشند
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # خطاهای پرس و جو احتمالاً خطاهای سمت مشتری هستند
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # اجازه دهید خطاهای خاص ابزار عبور کنند
            raise
        except Exception as e:
            # گرفتن همه خطاهای غیرمنتظره
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # پیاده‌سازی تشخیص تزریق SQL
        pass
        
    def _log_error(self, message, error):
        # پیاده‌سازی ثبت خطا
        pass
```

#### 3. اعتبارسنجی پارامترها

همیشه پارامترها را به‌طور کامل اعتبارسنجی کنید تا از ورودی ناقص یا مخرب جلوگیری شود.

```javascript
// مثال جاوااسکریپت/تایپ‌اسکریپت با اعتبارسنجی دقیق پارامترها
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
    // ۱. اعتبارسنجی وجود پارامتر
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // ۲. اعتبارسنجی نوع پارامترها
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // ۳. اعتبارسنجی مقادیر پارامتر
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // ۴. اعتبارسنجی وجود محتوا برای عملیات نوشتن
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // ۵. اعتبارسنجی ایمنی مسیر
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // پیاده‌سازی بر اساس پارامترهای معتبر
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // پیاده‌سازی بررسی ایمنی مسیر
    // ...
  }
}
```

### نمونه‌های پیاده‌سازی امنیتی

#### 1. احراز هویت و مجوزدهی

```java
// مثال جاوا با احراز هویت و مجوزدهی
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // تزریق وابستگی
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
        // ۱. استخراج زمینه احراز هویت
        String authToken = request.getContext().getAuthToken();
        
        // ۲. احراز هویت کاربر
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // ۳. بررسی مجوز برای عملیات خاص
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // ۴. ادامه با عملیات مجاز شده
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

#### 2. محدودیت نرخ

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

## بهترین روش‌های تست

### 1. تست واحد ابزارهای MCP

ابزارهای خود را همیشه به تنهایی و بدون وابستگی‌های خارجی تست کنید:

```typescript
// نمونه‌ای از تست واحد یک ابزار در تایپ‌اسکریپت
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // ایجاد یک سرویس آب‌وهوای جعلی
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // ایجاد ابزار با وابستگی جعلی
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // آماده‌سازی
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // اجرا
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // تأیید
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // آماده‌سازی
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // اجرا و تأیید
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. تست یکپارچه‌سازی

جریان کامل از درخواست‌های مشتری تا پاسخ‌های سرور را تست کنید:

```python
# نمونه تست یکپارچه‌سازی پایتون
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # راه‌اندازی یک سرور تست
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # ایجاد یک کلاینت
        client = McpClient("http://localhost:5000")
        
        # آزمایش کشف ابزار
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # آزمایش اجرای ابزار
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # بررسی پاسخ
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # پاک‌سازی
        await server.stop()
```

## بهینه‌سازی عملکرد

### 1. استراتژی‌های کشینگ

کش مناسب پیاده‌سازی کنید تا تأخیر و استفاده از منابع کاهش یابد:

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

#### 2. تزریق وابستگی و قابلیت تست

ابزارها را طوری طراحی کنید که وابستگی‌هایشان از طریق سازنده تزریق شود تا قابل تست و پیکربندی باشند:

```java
// مثال جاوا با تزریق وابستگی
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // وابستگی‌ها از طریق سازنده تزریق شده‌اند
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // پیاده‌سازی ابزار
    // ...
}
```

#### 3. ابزارهای ترکیبی

ابزارهایی طراحی کنید که بتوانند با هم ترکیب شوند تا گردش کارهای پیچیده‌تر ساخته شود:

```python
# مثال پایتون که ابزارهای ترکیب‌پذیر را نشان می‌دهد
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # پیاده‌سازی...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # این ابزار می‌تواند از نتایج ابزار dataFetch استفاده کند
    async def execute_async(self, request):
        # پیاده‌سازی...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # این ابزار می‌تواند از نتایج ابزار dataAnalysis استفاده کند
    async def execute_async(self, request):
        # پیاده‌سازی...
        pass

# این ابزارها می‌توانند به صورت مستقل یا به عنوان بخشی از یک جریان کاری استفاده شوند
```

### بهترین روش‌های طراحی اسکیما

اسکیما قرارداد بین مدل و ابزار شماست. اسکیماهای خوب طراحی شده منجر به قابلیت استفاده بهتر ابزار می‌شوند.

#### 1. توضیحات واضح پارامترها

همیشه اطلاعات شرحی برای هر پارامتر درج کنید:

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

#### 2. محدودیت‌های اعتبارسنجی

محدودیت‌های اعتبارسنجی برای جلوگیری از ورودی‌های نامعتبر درج کنید:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // ویژگی ایمیل با اعتبارسنجی قالب
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // ویژگی سن با محدودیت‌های عددی
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // ویژگی شمارشی
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

#### 3. ساختار بازگشتی یکسان

سازگاری در ساختارهای پاسخ حفظ شود تا مدل‌ها راحت‌تر نتایج را تفسیر کنند:

```python
async def execute_async(self, request):
    try:
        # پردازش درخواست
        results = await self._search_database(request.parameters["query"])
        
        # همیشه یک ساختار یکنواخت برگردانید
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

### مدیریت خطا

مدیریت خطای مستحکم برای ابزارهای MCP به منظور حفظ قابلیت اطمینان ضروری است.

#### 1. مدیریت خطای مؤدبانه

خطاها را در سطح مناسب مدیریت کنید و پیام‌های آموزنده ارائه دهید:

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

#### 2. پاسخ‌های ساختاریافته خطا

در صورت امکان اطلاعات خطای ساختاریافته برگردانید:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // پیاده‌سازی
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
        
        // دوباره پرتاب کردن سایر استثناها به عنوان ToolExecutionException
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. منطق تکرار مجدد

منطق تکرار مجدد مناسب برای خطاهای گذرا پیاده‌سازی کنید:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # ثانیه‌ها
    
    while retry_count < max_retries:
        try:
            # فراخوانی API خارجی
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # بازگشت نمایی
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # خطای غیر گذرا، دوباره تلاش نکنید
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### بهینه‌سازی عملکرد

#### 1. کشینگ

کشینگ برای عملیات پرهزینه پیاده‌سازی کنید:

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

#### 2. پردازش ناهمزمان

الگوهای برنامه‌نویسی ناهمزمان برای عملیات وابسته به ورودی/خروجی استفاده کنید:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // برای عملیات طولانی، فوراً یک شناسه پردازش بازگردانید
        String processId = UUID.randomUUID().toString();
        
        // پردازش غیرهمزمان را شروع کنید
        CompletableFuture.runAsync(() -> {
            try {
                // عملیات طولانی را انجام دهید
                documentService.processDocument(documentId);
                
                // وضعیت را به‌روزرسانی کنید (معمولاً در یک پایگاه داده ذخیره می‌شود)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // پاسخ فوری با شناسه فرآیند را بازگردانید
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // ابزار بررسی وضعیت همراه
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

#### 3. تنظیم منابع

محدودسازی منابع برای جلوگیری از بارگذاری بیش از حد اعمال کنید:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # اجازه ۵ درخواست در هر ثانیه
            bucket_size=10        # اجازه افزایش ناگهانی تا ۱۰ درخواست
        )
    
    async def execute_async(self, request):
        # بررسی اینکه آیا می‌توان ادامه داد یا باید منتظر ماند
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # اگر مدت انتظار خیلی طولانی باشد
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # انتظار برای مدت زمان تأخیر مناسب
                await asyncio.sleep(delay)
        
        # مصرف یک توکن و ادامه با درخواست
        self.rate_limiter.consume()
        
        # فراخوانی API
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
            
            # محاسبه زمان تا در دسترس قرار گرفتن توکن بعدی
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # افزودن توکن‌های جدید بر اساس زمان گذشته
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### بهترین روش‌های امنیتی

#### 1. اعتبارسنجی ورودی

همیشه پارامترهای ورودی را به طور کامل اعتبارسنجی کنید:

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

#### 2. بررسی‌های مجوزدهی

بررسی‌های مجوزدهی را به درستی اعمال کنید:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // گرفتن زمینه کاربر از درخواست
    UserContext user = request.getContext().getUserContext();
    
    // بررسی اینکه آیا کاربر مجوزهای لازم را دارد
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // برای منابع خاص، دسترسی به آن منبع را بررسی کنید
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // ادامه با اجرای ابزار
    // ...
}
```

#### 3. مدیریت داده‌های حساس

داده‌های حساس را با دقت مدیریت کنید:

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
        
        # دریافت داده‌های کاربر
        user_data = await self.user_service.get_user_data(user_id)
        
        # فیلتر کردن فیلدهای حساس مگر اینکه به‌طور صریح درخواست شده و مجاز باشد
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # بررسی سطح مجوز در زمینه درخواست
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # ایجاد نسخه‌ای کپی برای جلوگیری از تغییر نسخه اصلی
        redacted = user_data.copy()
        
        # پاک‌سازی فیلدهای حساس خاص
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # پاک‌سازی داده‌های حساس تو در تو
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## بهترین روش‌های تست برای ابزارهای MCP

تست جامع اطمینان می‌دهد که ابزارهای MCP به درستی کار می‌کنند، حالت‌های حاشیه‌ای را مدیریت می‌کنند و به درستی با بقیه سیستم ادغام می‌شوند.

### تست واحد

#### 1. تست هر ابزار به تنهایی

تست‌های متمرکزی برای عملکرد هر ابزار ایجاد کنید:

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

#### 2. تست اعتبارسنجی اسکیما

بررسی کنید اسکیماها معتبر هستند و محدودیت‌ها را درست اجرا می‌کنند:

```java
@Test
public void testSchemaValidation() {
    // ایجاد نمونه ابزار
    SearchTool searchTool = new SearchTool();
    
    // دریافت طرح‌واره
    Object schema = searchTool.getSchema();
    
    // تبدیل طرح‌واره به JSON برای اعتبارسنجی
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // اعتبارسنجی اینکه طرح‌واره JSONSchema معتبر است
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // آزمایش پارامترهای معتبر
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // آزمایش پارامتر اجباری گمشده
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // آزمایش نوع پارامتر نامعتبر
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. تست‌های مدیریت خطا

تست‌های خاص برای شرایط خطا ایجاد کنید:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # مرتب سازی
    tool = ApiTool(timeout=0.1)  # زمان بسیار کوتاه تایم اوت
    
    # شبیه‌سازی یک درخواست که منجر به تایم اوت می‌شود
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # طولانی‌تر از زمان تایم اوت
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # اجرا و بررسی
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # تایید پیام استثنا
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # مرتب سازی
    tool = ApiTool()
    
    # شبیه‌سازی یک پاسخ با محدودیت نرخ
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
        
        # اجرا و بررسی
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # تأیید اینکه استثنا شامل اطلاعات محدودیت نرخ است
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### تست یکپارچه‌سازی

#### 1. تست زنجیره ابزار

ابزارها را در ترکیب‌های پیش‌بینی شده تست کنید:

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

#### 2. تست سرور MCP

سرور MCP را با ثبت کامل ابزار و اجرای آن تست کنید:

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
        // آزمایش نقطه پایان کشف
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // ایجاد درخواست ابزار
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // ارسال درخواست و بررسی پاسخ
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // ایجاد درخواست ابزار نامعتبر
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // پارامتر "b" گم شده است
        request.put("parameters", parameters);
        
        // ارسال درخواست و بررسی پاسخ خطا
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. تست انتها به انتها

گردش‌های کاری کامل از پرسش مدل تا اجرای ابزار را تست کنید:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # تنظیم - راه‌اندازی کلاینت MCP و مدل ساختگی
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # پاسخ‌های مدل ساختگی
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
    
    # پاسخ ابزار هواشناسی ساختگی
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
        
        # اجرا
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # بررسی صحت
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### تست عملکرد

#### 1. تست بار

تعیین کنید سرور MCP شما چند درخواست همزمان را مدیریت می‌کند:

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

#### 2. تست فشار

سیستم را تحت بار شدید امتحان کنید:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // تنظیم JMeter برای تست فشار
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // پیکربندی برنامه تست JMeter
    HashTree testPlanTree = new HashTree();
    
    // ایجاد برنامه تست، گروه نخ، نمونه‌گیرها و غیره
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // افزودن نمونه‌گیر HTTP برای اجرای ابزار
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // افزودن شنونده‌ها
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // اجرای تست
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // اعتبارسنجی نتایج
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // زمان پاسخ متوسط کمتر از ۲۰۰ میلی‌ثانیه
    assertTrue(summaryReport.getPercentile(90.0) < 500); // صدک ۹۰ کمتر از ۵۰۰ میلی‌ثانیه
}
```

#### 3. نظارت و تحلیل

نظارت برای تحلیل عملکرد بلندمدت تنظیم کنید:

```python
# پیکربندی نظارت برای سرور MCP
def configure_monitoring(server):
    # راه‌اندازی معیارهای Prometheus
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
    
    # افزودن میان‌افزار برای زمان‌بندی و ضبط معیارها
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # نمایش نقطه پایانی معیارها
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## الگوهای طراحی گردش کار MCP

گردش‌های کاری خوب طراحی شده MCP بهره‌وری، قابلیت اطمینان و نگهداری را بهبود می‌بخشند. در اینجا الگوهای کلیدی آورده شده است:

### 1. الگوی زنجیره ابزار

چندین ابزار را با ترتیبی متصل کنید که خروجی هر ابزار ورودی بعدی باشد:

```python
# پیاده‌سازی زنجیره ابزارهای پایتون
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # لیست نام ابزارها برای اجرا به ترتیب
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # اجرای هر ابزار در زنجیره، ارسال نتیجه قبلی
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # ذخیره نتیجه و استفاده به عنوان ورودی برای ابزار بعدی
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# نمونه استفاده
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

### 2. الگوی واسط (دیپچری)

ابزار مرکزی که بر اساس ورودی، به ابزارهای تخصصی دستور می‌دهد، استفاده کنید:

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

### 3. الگوی پردازش موازی

ابزارهای متعدد را به طور همزمان برای افزایش کارایی اجرا کنید:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // مرحله ۱: دریافت فراداده‌های مجموعه داده (همگام)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // مرحله ۲: اجرای چندین تحلیل به‌صورت موازی
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
        
        // انتظار برای اتمام تمام وظایف موازی
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // انتظار برای تکمیل
        
        // مرحله ۳: ترکیب نتایج
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // مرحله ۴: تولید گزارش خلاصه
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // بازگردانی نتیجه کامل فرآیند کاری
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. الگوی بازیابی خطا

بدون شکست به شیوه‌ای مؤدبانه در برابر خطاهای ابزارها بازگشتی داشته باشید:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # ابتدا ابزار اصلی را امتحان کنید
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # خطا را ثبت کنید
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # به ابزار ثانویه روی بیاورید
            try:
                # ممکن است نیاز باشد پارامترها را برای ابزار جایگزین تغییر دهید
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # هر دو ابزار شکست خوردند
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # این پیاده‌سازی به ابزارهای خاص بستگی دارد
        # برای این مثال، فقط پارامترهای اصلی را برمی‌گردانیم
        return params

# نمونه استفاده
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # API آب و هوای اصلی (پرداخت شده)
        "basicWeatherService",    # API آب و هوای جایگزین (رایگان)
        {"location": location}
    )
```

### 5. الگوی ترکیب گردش کار

گردش‌های کاری پیچیده را با ترکیب کردن گردش‌های ساده‌تر بسازید:

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

# تست سرورهای MCP: بهترین روش‌ها و نکات برتر

## مرور کلی

تست بخش مهمی از توسعه سرورهای MCP قابل اطمینان و با کیفیت بالا است. این راهنما بهترین روش‌ها و نکات جامع برای تست سرورهای MCP شما در طول چرخه عمر توسعه از تست‌های واحد تا تست‌های یکپارچه و اعتبارسنجی انتها به انتها را ارائه می‌دهد.

## چرا تست برای سرورهای MCP اهمیت دارد

سرورهای MCP به عنوان میان‌افزار مهم بین مدل‌های هوش مصنوعی و برنامه‌های مشتری عمل می‌کنند. تست کامل تضمین می‌کند:

- قابلیت اطمینان در محیط‌های تولید
- مدیریت صحیح درخواست‌ها و پاسخ‌ها
- پیاده‌سازی دقیق مشخصات MCP
- مقاومت در برابر شکست‌ها و شرایط حاشیه‌ای
- عملکرد ثابت تحت بارهای مختلف

## تست واحد برای سرورهای MCP

### تست واحد (اساسی)

تست‌های واحد اجزای فردی سرور MCP شما را به تنهایی بررسی می‌کنند.

#### چه چیزهایی باید تست شود

1. **مدیران منابع**: منطق هر مدیر منبع را به صورت مستقل تست کنید
2. **پیاده‌سازی ابزارها**: رفتار ابزارها را با ورودی‌های مختلف بررسی کنید
3. **قالب‌های پرسش**: اطمینان حاصل کنید قالب‌های درخواست درست نمایش داده می‌شوند
4. **اعتبارسنجی اسکیما**: منطق اعتبارسنجی پارامترها را تست کنید
5. **مدیریت خطا**: پاسخ‌های خطا برای ورودی‌های نامعتبر را ارزیابی کنید

#### بهترین روش‌های تست واحد

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
# نمونه تست واحد برای یک ابزار ماشین حساب در پایتون
def test_calculator_tool_add():
    # ترتیب دادن
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # اجرا کردن
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # تایید کردن
    assert result["value"] == 12
```

### تست یکپارچه‌سازی (لایه میانی)

تست‌های یکپارچه‌سازی تعاملات بین اجزای سرور MCP را بررسی می‌کنند.

#### چه چیزهایی باید تست شود

1. **راه‌اندازی سرور**: استارت سرور با تنظیمات مختلف تست شود
2. **ثبت مسیرها**: اطمینان از ثبت صحیح تمام نقاط انتهایی
3. **پردازش درخواست‌ها**: چرخه کامل درخواست-پاسخ تست شود
4. **گسترش خطا**: خطاها به درستی بین اجزا مدیریت شوند
5. **احراز هویت و مجوزدهی**: مکانیزم‌های امنیتی آزموده شوند

#### بهترین روش‌های تست یکپارچه‌سازی

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

### تست انتها به انتها (لایه بالا)

تست‌های انتها به انتها رفتار کامل سیستم از مشتری تا سرور را بررسی می‌کنند.

#### چه چیزهایی باید تست شود

1. **ارتباط مشتری-سرور**: چرخه‌های کامل درخواست-پاسخ تست شوند
2. **SDKهای واقعی مشتری**: با پیاده‌سازی‌های واقعی آزمایش شوند
3. **عملکرد تحت بار**: رفتار با درخواست‌های همزمان متعدد امتحان شود
4. **بازیابی از خطا**: بهبودی سیستم از خطاها تست شود
5. **عملیات طولانی مدت**: مدیریت عملیات پخش و طولانی رفتار شود

#### بهترین روش‌های تست انتها به انتها

```typescript
// نمونه تست E2E با یک کلاینت در تایپ‌اسکریپت
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // راه‌اندازی سرور در محیط تست
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // اقدام
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // تأیید صحت
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## استراتژی‌های شبیه‌سازی برای تست MCP

شبیه‌سازی برای جداسازی اجزا در هنگام تست ضروری است.

### اجزایی که باید شبیه‌سازی شوند

1. **مدل‌های هوش مصنوعی خارجی**: پاسخ مدل‌ها به صورت پیش‌بینی شده شبیه‌سازی شود
2. **خدمات خارجی**: وابستگی‌های API (دیتابیس‌ها، خدمات ثالث) شبیه‌سازی شود
3. **خدمات احراز هویت**: ارائه‌دهندگان هویت شبیه‌سازی شوند
4. **تأمین‌کنندگان منابع**: مدیران منابع پرهزینه شبیه‌سازی شود

### مثال: شبیه‌سازی پاسخ مدل هوش مصنوعی

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
# نمونه پایتون با unittest.mock
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # پیکربندی موک
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # استفاده از موک در تست
    server = McpServer(model_client=mock_model)
    # ادامه تست
```

## تست عملکرد

تست عملکرد برای سرورهای MCP تولیدی حیاتی است.

### چه چیزهایی باید اندازه‌گیری شود

1. **تاخیر**: زمان پاسخ به درخواست‌ها
2. **توان عملیاتی**: تعداد درخواست‌های پاسخ داده شده در ثانیه
3. **استفاده از منابع**: مصرف CPU، حافظه، شبکه
4. **مدیریت همزمانی**: رفتار تحت درخواست‌های موازی
5. **ویژگی‌های مقیاس‌پذیری**: عملکرد با افزایش بار

### ابزارهای تست عملکرد

- **k6**: ابزار متن‌باز تست بار
- **JMeter**: تست عملکرد جامع
- **Locust**: تست بار بر پایه پایتون
- **Azure Load Testing**: تست عملکرد ابری

### مثال: تست بار پایه با k6

```javascript
// اسکریپت k6 برای تست بار سرور MCP
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // ۱۰ کاربر مجازی
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

## اتوماسیون تست برای سرورهای MCP

خودکارسازی تست‌ها تضمین کیفیت مداوم و چرخه بازخورد سریع‌تر است.

### ادغام CI/CD
1. **اجرای تست‌های واحد در درخواست‌های پول ریکوئست**: اطمینان حاصل کنید که تغییرات کد باعث خراب شدن عملکردهای موجود نشوند  
2. **تست‌های یکپارچه‌سازی در محیط سنجش**: انجام تست‌های یکپارچه‌سازی در محیط‌های پیش‌تولید  
3. **استانداردهای عملکردی**: حفظ معیارهای عملکردی برای شناسایی بازگشت خرابی‌ها  
4. **اسکن‌های امنیتی**: خودکارسازی تست‌های امنیتی به عنوان بخشی از خط لوله  

### نمونه‌ای از خط لوله CI (کارهای گیت‌هاب)

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
  
## تست برای تطابق با مشخصات MCP

بررسی کنید که سرور شما مشخصات MCP را به درستی پیاده‌سازی کرده است.

### حوزه‌های کلیدی تطابق

1. **نقاط پایانی API**: تست نقاط پایانی مورد نیاز (/resources، /tools و غیره)  
2. **فرمت درخواست/پاسخ**: اعتبارسنجی تطابق با اسکیمای تعریف‌شده  
3. **کدهای خطا**: تأیید کدهای وضعیت صحیح برای سناریوهای مختلف  
4. **نوع محتوا**: تست نحوه‌ی مدیریت انواع مختلف محتوا  
5. **جریان احراز هویت**: تأیید سازوکارهای احراز هویتی که مطابق با مشخصات هستند  

### مجموعه تست‌های تطابق

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
  
## ۱۰ نکته برتر برای تست موثر سرور MCP

1. **تعاریف ابزار را جداگانه تست کنید**: اعتبارسنجی تعاریف اسکیمایی جدا از منطق ابزار  
2. **از تست‌های پارامتری استفاده کنید**: تست ابزارها با ورودی‌های مختلف، از جمله موارد حاشیه‌ای  
3. **پاسخ‌های خطا را بررسی کنید**: تأیید مدیریت صحیح خطاها برای همه شرایط احتمالی  
4. **منطق مجوزدهی را تست کنید**: اطمینان از کنترل دسترسی مناسب برای نقش‌های مختلف کاربران  
5. **پوشش تست را پایش کنید**: هدف گذاری برای پوشش بالای کد مسیرهای حیاتی  
6. **تست پاسخ‌های جریانی**: تأیید مدیریت صحیح محتوای جریانی  
7. **شبیه‌سازی مشکلات شبکه**: تست رفتار در شرایط شبکه ضعیف  
8. **تست محدودیت‌های منابع**: تأیید رفتار در رسیدن به سهمیه‌ها یا محدودیت نرخ  
9. **خودکارسازی تست‌های بازگشتی**: ساخت مجموعه‌ای که با هر تغییر کد اجرا شود  
10. **مستندسازی موارد تست**: حفظ مستندات واضح از سناریوهای تست  

## مشکلات رایج در تست

- **اعتماد بیش از حد به تست مسیر خوش‌یمن**: مطمئن شوید موارد خطا را به طور کامل تست می‌کنید  
- **نادیده گرفتن تست‌های عملکرد**: شناسایی نقاط گلوگاه قبل از تأثیر بر تولید  
- **تست در انزوا فقط**: ترکیب تست‌های واحد، یکپارچه‌سازی و انتها به انتها  
- **پوشش ناقص API**: اطمینان از تست همه نقاط پایانی و ویژگی‌ها  
- **ناسازگاری محیط‌های تست**: استفاده از کانتینرها برای تضمین محیط‌های تست یکسان  

## نتیجه‌گیری

یک استراتژی جامع تست برای توسعه سرورهای MCP قابل اعتماد و با کیفیت بالا ضروری است. با اجرای بهترین روش‌ها و نکات ارائه‌شده در این راهنما، می‌توانید اطمینان حاصل کنید که پیاده‌سازی‌های MCP شما بالاترین استانداردهای کیفیت، قابلیت اطمینان و عملکرد را دارند.

## نکات کلیدی

1. **طراحی ابزار**: پیروی از اصل مسئولیت واحد، استفاده از تزریق وابستگی و طراحی برای ترکیب‌پذیری  
2. **طراحی اسکما**: ایجاد اسکیمای واضح و مستندسازی شده با محدودیت‌های اعتبارسنجی مناسب  
3. **مدیریت خطا**: پیاده‌سازی مدیریت خطای ایمن، پاسخ‌های ساختاریافته خطا و منطق تکرار  
4. **عملکرد**: استفاده از کشینگ، پردازش ناهمزمان و محدودیت منابع  
5. **امنیت**: اعمال اعتبارسنجی دقیق ورودی‌ها، بررسی مجوزها و مدیریت داده‌های حساس  
6. **تست**: ایجاد تست‌های جامع واحد، یکپارچه‌سازی و انتها به انتها  
7. **الگوهای جریان کاری**: به‌کارگیری الگوهای تثبیت‌شده مانند زنجیره‌ها، ارسال‌کننده‌ها و پردازش موازی  

## تمرین

یک ابزار MCP و جریان کاری برای یک سیستم پردازش اسناد طراحی کنید که:

1. اسناد را در فرمت‌های مختلف (PDF، DOCX، TXT) قبول کند  
2. متن و اطلاعات کلیدی را از اسناد استخراج کند  
3. اسناد را بر اساس نوع و محتوا دسته‌بندی کند  
4. خلاصه‌ای از هر سند تولید کند  

اسکیمای ابزار، مدیریت خطا و الگوی جریان کاری را که بهترین تناسب را با این سناریو دارد پیاده کنید. در نظر بگیرید چگونه این پیاده‌سازی را تست خواهید کرد.

## منابع

1. به جامعه MCP در <a href="https://aka.ms/foundrydevs">Azure AI Foundry Discord Community</a> بپیوندید تا در جریان جدیدترین تحولات باشید  
2. در پروژه‌های متن باز <a href="https://github.com/modelcontextprotocol">MCP</a> مشارکت کنید  
3. اصول MCP را در پروژه‌های هوش مصنوعی سازمان خود به کار ببرید  
4. پیاده‌سازی‌های تخصصی MCP را برای صنعت خود بررسی کنید  
5. انجام دوره‌های پیشرفته درباره موضوعات خاص MCP، مانند یکپارچه‌سازی چندرسانه‌ای یا یکپارچه‌سازی برنامه‌های سازمانی  
6. آزمایش ساخت ابزارها و جریان‌های کاری MCP خود با استفاده از اصول یادگرفته شده در <a href="../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md">Hands on Lab</a>  

## مرحله بعد

مرحله بعد: <a href="../09-CaseStudy/README.md">مطالعات موردی</a>

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب‌مسئولیت**:
این سند با استفاده از سرویس ترجمه ماشینی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما در تلاش برای دقت هستیم، لطفاً آگاه باشید که ترجمه‌های خودکار ممکن است حاوی خطاها یا نادقتی‌هایی باشند. سند اصلی به زبان بومی آن باید به عنوان منبع معتبر در نظر گرفته شود. برای اطلاعات حیاتی، ترجمه حرفه‌ای انسانی توصیه می‌شود. ما مسئول هیچ گونه سوءتفاهم یا تفسیر نادرستی که ناشی از استفاده از این ترجمه باشد، نیستیم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->