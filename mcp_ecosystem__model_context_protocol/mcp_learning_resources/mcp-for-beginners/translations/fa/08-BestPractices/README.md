# بهترین شیوه‌های توسعه MCP

[![بهترین شیوه‌های توسعه MCP](../../../translated_images/fa/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(برای مشاهده ویدیو این درس روی تصویر بالا کلیک کنید)_

## مقدمه

این درس بر بهترین شیوه‌های پیشرفته توسعه، آزمایش و استقرار سرورهای MCP و ویژگی‌ها در محیط‌های تولیدی تمرکز دارد. با رشد پیچیدگی و اهمیت اکوسیستم‌های MCP، پیروی از الگوهای تثبیت‌شده اطمینان از قابلیت اطمینان، قابلیت نگهداری و تعامل‌پذیری را فراهم می‌کند. این درس خرد عملی به‌دست‌آمده از پیاده‌سازی‌های واقعی MCP را برای راهنمایی در ایجاد سرورهای قوی، کارآمد با منابع، فرمان‌ها و ابزارهای مؤثر گردآوری می‌کند.

## اهداف یادگیری

با پایان این درس، شما قادر خواهید بود:

- به‌کارگیری بهترین شیوه‌های صنعتی در طراحی سرور و ویژگی‌های MCP  
- ایجاد استراتژی‌های جامع تست برای سرورهای MCP  
- طراحی الگوهای گردش کاری کارآمد و قابل استفاده مجدد برای برنامه‌های پیچیده MCP  
- پیاده‌سازی مدیریت صحیح خطا، ثبت ورود و مانیتورینگ در سرورهای MCP  
- بهینه‌سازی پیاده‌سازی‌های MCP برای کارایی، امنیت و قابلیت نگهداری  

## اصول اصلی MCP

قبل از ورود به شیوه‌های خاص پیاده‌سازی، مهم است اصول اصلی که راهنمای توسعه مؤثر MCP هستند را بشناسیم:

1. **ارتباط استاندارد‌شده**: MCP از JSON-RPC 2.0 به عنوان پایه خود استفاده می‌کند، که قالبی یکسان برای درخواست‌ها، پاسخ‌ها و مدیریت خطا در تمامی پیاده‌سازی‌ها فراهم می‌آورد.

2. **طراحی محور بر کاربر**: همیشه رضایت، کنترل و شفافیت کاربر را در پیاده‌سازی‌های MCP اولویت دهید.

3. **امنیت در اولویت**: اقدامات امنیتی قوی شامل احراز هویت، مجوزدهی، اعتبارسنجی و محدودیت نرخ پیاده‌سازی کنید.

4. **معماری مدولار**: سرورهای MCP خود را با رویکرد مدولار طراحی کنید که هر ابزار و منبع هدفی شفاف و متمرکز داشته باشد.

5. **اتصالات حالت‌مند**: از قابلیت MCP برای حفظ حالت در چندین درخواست جهت تعاملات همبسته‌تر و آگاه به زمینه استفاده کنید.

## بهترین شیوه‌های رسمی MCP

بهترین شیوه‌های زیر از مستندات رسمی پروتکل مدل کانتکست استخراج شده‌اند:

### بهترین شیوه‌های امنیتی

1. **رضایت و کنترل کاربر**: همیشه پیش از دسترسی به داده‌ها یا انجام عملیات، رضایت صریح کاربر را بخواهید. کنترل شفاف بر اشتراک داده‌ها و اقدامات مجاز فراهم کنید.

2. **حریم خصوصی داده‌ها**: فقط داده‌های کاربر را با رضایت صریح افشا کنید و آن را با کنترل‌های دسترسی مناسب محافظت کنید. از انتقال غیرمجاز داده جلوگیری کنید.

3. **ایمنی ابزارها**: پیش از فراخوانی هر ابزاری رضایت صریح کاربر را بخواهید. اطمینان حاصل کنید کاربران عملکرد هر ابزار را می‌فهمند و مرزهای امنیتی محکمی اعمال کنید.

4. **کنترل مجوز ابزار**: پیکربندی کنید کدام ابزارها در طول جلسه برای مدل اجازه استفاده دارند تا فقط ابزارهای مجاز قابل دسترسی باشند.

5. **احراز هویت**: پیش از اعطای دسترسی به ابزارها، منابع یا عملیات حساس، احراز هویت مناسب با استفاده از کلیدهای API، توکن‌های OAuth یا روش‌های امن دیگر را الزامی کنید.

6. **اعتبارسنجی پارامترها**: اعتبارسنجی همه فراخوانی‌های ابزار را برای جلوگیری از ورودی‌های نادرست یا مخرب الزامی کنید.

7. **محدودیت نرخ**: محدودیت نرخ تعریف کنید تا از سوءاستفاده جلوگیری و استفاده منصفانه از منابع سرور تضمین شود.

### بهترین شیوه‌های پیاده‌سازی

1. **مذاکره قابلیت‌ها**: هنگام راه‌اندازی اتصال، اطلاعات مربوط به ویژگی‌های پشتیبانی شده، ورژن‌های پروتکل، ابزارها و منابع در دسترس را مبادله کنید.

2. **طراحی ابزارها**: ابزارهای متمرکز ایجاد کنید که یک کار را خوب انجام دهند، به جای ابزارهای یکپارچه که چندین نگرانی را مدیریت می‌کنند.

3. **مدیریت خطا**: پیام‌ها و کدهای خطای استاندارد‌شده پیاده‌سازی کنید تا به تشخیص مسائل، مدیریت مشکلات ملایم و ارائه بازخورد عملی کمک کند.

4. **ثبت وقایع (Logging)**: لاگ‌های ساختاریافته را برای حسابرسی، اشکال‌زدایی و نظارت بر تعاملات پروتکل پیکربندی کنید.

5. **پیگیری پیشرفت**: برای عملیات طولانی، به‌روزرسانی پیشرفت را گزارش کنید تا رابط‌های کاربری پاسخگو فعال شوند.

6. **لغو درخواست**: امکان لغو درخواست‌های درحال انجام که دیگر نیاز نیستند یا طولانی شده‌اند را برای مشتریان فراهم کنید.

## منابع تکمیلی

برای جدیدترین اطلاعات در مورد بهترین شیوه‌های MCP، به منابع زیر مراجعه کنید:

- [مستندات MCP](https://modelcontextprotocol.io/)
- [مشخصات MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [مخزن گیت‌هاب](https://github.com/modelcontextprotocol)
- [بهترین شیوه‌های امنیتی](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [ده ریسک برتر MCP از OWASP](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - ریسک‌ها و اقدامات کاهش
- [کارگاه امنیتی MCP (شرپا)](https://azure-samples.github.io/sherpa/) - آموزش عملی امنیت

## نمونه‌های عملی پیاده‌سازی

### بهترین شیوه‌های طراحی ابزار

#### 1. اصل مسئولیت واحد

هر ابزار MCP باید هدف مشخص و متمرکزی داشته باشد. به جای ایجاد ابزارهای یکپارچه که چندین کار را هم‌زمان انجام می‌دهند، ابزارهای تخصصی توسعه دهید که در وظایف خاص برتر هستند.

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

#### 2. مدیریت خطا به شکل یکنواخت

مدیریت خطای مقاوم با پیام‌های خطای مفید و سازوکارهای بازیابی مناسب پیاده‌سازی کنید.

```python
# مثال پایتون با مدیریت جامع خطا
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # اعتبارسنجی پارامترها
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # اعتبارسنجی امنیتی
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # عملیات پایگاه داده با تایم‌اوت
                async with timeout(10):  # تایم‌اوت ۱۰ ثانیه‌ای
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
                # خطاهای پرس‌وجو احتمالاً خطاهای سمت کلاینت هستند
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
        # پیاده‌سازی تشخیص SQL Injection
        pass
        
    def _log_error(self, message, error):
        # پیاده‌سازی لاگ‌گیری خطا
        pass
```

#### 3. اعتبارسنجی پارامترها

همیشه پارامترها را به دقت اعتبارسنجی کنید تا از ورودی‌های نادرست یا مخرب جلوگیری شود.

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
    
    // ۲. اعتبارسنجی نوع پارامتر
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
    
    // پیاده‌سازی بر اساس پارامترهای معتبرشده
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // پیاده‌سازی چک ایمنی مسیر
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
        // 1. استخراج متن احراز هویت
        String authToken = request.getContext().getAuthToken();
        
        // 2. احراز هویت کاربر
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. بررسی مجوز برای عملیات خاص
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. ادامه با عملیات مجاز شده
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

## بهترین شیوه‌های تست

### 1. تست واحد ابزارهای MCP

همیشه ابزارهای خود را به‌صورت ایزوله آزمایش کنید و وابستگی‌های خارجی را شبیه‌سازی کنید:

```typescript
// نمونه تست واحد ابزار در تایپ‌اسکریپت
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // ایجاد یک سرویس آب‌وهوا ساختگی
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // ایجاد ابزار با وابستگی ساختگی
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // آرایش
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // عمل
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // تایید
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // آرایش
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // عمل و تایید
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. تست یکپارچه‌سازی

مسیر کامل از درخواست‌های کلاینت تا پاسخ‌های سرور را تست کنید:

```python
# مثال تست یکپارچه‌سازی پایتون
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

برای کاهش تأخیر و مصرف منابع، کش مناسب پیاده‌سازی کنید:

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

ابزارها را به گونه‌ای طراحی کنید که وابستگی‌هایشان از طریق سازنده تزریق شود و این امکان فراهم شود که ابزارها تست‌پذیر و قابل تنظیم باشند:

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

ابزارهایی طراحی کنید که بتوان آنها را کنار هم قرار داد تا گردش‌های کاری پیچیده‌تر ساخته شود:

```python
# نمونه پایتون که ابزارهای ترکیبی را نشان می‌دهد
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

### بهترین شیوه‌های طراحی شِما

شِما قرارداد بین مدل و ابزار شما است. شِماهای خوب طراحی‌شده منجر به بهبود قابلیت استفاده ابزار می‌شوند.

#### 1. توضیحات روشن پارامترها

همیشه اطلاعات توصیفی برای هر پارامتر درج کنید:

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

محدودیت‌های اعتبارسنجی را در نظر بگیرید تا ورودی‌های نامعتبر جلوگیری شود:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // خاصیت ایمیل با اعتبارسنجی فرمت
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // خاصیت سن با محدودیت‌های عددی
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // خاصیت شمارشی
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

#### 3. ساختارهای پاسخ یکنواخت

سازگاری در ساختارهای پاسخ را حفظ کنید تا مدل‌ها بتوانند نتایج را بهتر تفسیر کنند:

```python
async def execute_async(self, request):
    try:
        # پردازش درخواست
        results = await self._search_database(request.parameters["query"])
        
        # همیشه یک ساختار سازگار بازگردانید
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

مدیریت خطا قوی برای ابزارهای MCP حیاتی است تا قابلیت اطمینان حفظ شود.

#### 1. مدیریت خطای ملایم

خطاها را در سطوح مناسب مدیریت کنید و پیام‌های مفید ارائه دهید:

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

تا حد امکان اطلاعات ساختاریافته خطا را بازگردانید:

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
        
        // پرتاب دوباره سایر استثناءها به عنوان ToolExecutionException
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. منطق تکرار

منطق تکرار مناسب برای خطاهای گذرا پیاده‌سازی کنید:

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
            # خطای غیر موقت، دوباره تلاش نکنید
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### بهینه‌سازی عملکرد

#### 1. کشینگ

کش برای عملیات پرهزینه پیاده‌سازی کنید:

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

از الگوهای برنامه‌نویسی ناهمزمان برای عملیات با ورودی/خروجی محدود استفاده کنید:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // برای عملیات طولانی‌مدت، بلافاصله یک شناسه پردازش برگردانید
        String processId = UUID.randomUUID().toString();
        
        // شروع پردازش غیرهمزمان
        CompletableFuture.runAsync(() -> {
            try {
                // انجام عملیات طولانی‌مدت
                documentService.processDocument(documentId);
                
                // به‌روزرسانی وضعیت (معمولاً در یک پایگاه داده ذخیره می‌شود)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // بازگرداندن پاسخ فوری با شناسه پردازش
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

#### 3. محدودسازی منابع

کنترل روی مصرف منابع پیاده‌سازی کنید تا از بار اضافی جلوگیری شود:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # اجازه دادن به ۵ درخواست در هر ثانیه
            bucket_size=10        # اجازه دادن به انفجار تا ۱۰ درخواست
        )
    
    async def execute_async(self, request):
        # بررسی اینکه آیا می‌توانیم ادامه دهیم یا باید منتظر بمانیم
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # اگر انتظار خیلی طولانی باشد
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # انتظار برای زمان تأخیر مناسب
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
            
            # محاسبه زمان تا در دسترس بودن توکن بعدی
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # اضافه کردن توکن‌های جدید بر اساس زمان سپری شده
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### بهترین شیوه‌های امنیتی

#### 1. اعتبارسنجی ورودی

همیشه پارامترهای ورودی را به دقت اعتبارسنجی کنید:

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

بررسی‌های مجوزدهی مناسب پیاده‌سازی کنید:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // دریافت زمینه کاربری از درخواست
    UserContext user = request.getContext().getUserContext();
    
    // بررسی اینکه آیا کاربر دسترسی‌های لازم را دارد
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // برای منابع خاص، بررسی دسترسی به آن منبع
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // ادامه اجرای ابزار
    // ...
}
```

#### 3. مدیریت داده‌های حساس

داده‌های حساس را با دقت مدیریت نمایید:

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
        
        # فیلتر کردن فیلدهای حساس مگر اینکه صراحتا درخواست شده و مجاز باشد
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # بررسی سطح مجوز در متن درخواست
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # ایجاد یک نسخه برای جلوگیری از تغییر نسخه اصلی
        redacted = user_data.copy()
        
        # سانسور فیلدهای حساس خاص
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # سانسور داده‌های حساس تو در تو
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## بهترین شیوه‌های تست برای ابزارهای MCP

تست جامع اطمینان می‌دهد که ابزارهای MCP به درستی عمل کرده، حالت‌های خاص را مدیریت و به‌درستی با بقیه سیستم یکپارچه می‌شوند.

### تست واحد

#### 1. هر ابزار را به صورت ایزوله تست کنید

آزمون‌های متمرکز برای عملکرد هر ابزار ایجاد کنید:

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

#### 2. تست اعتبارسنجی شِما

تست کنید که شِماها معتبر هستند و محدودیت‌ها را به درستی اعمال می‌کنند:

```java
@Test
public void testSchemaValidation() {
    // ایجاد نمونه ابزار
    SearchTool searchTool = new SearchTool();
    
    // دریافت طرح‌واره
    Object schema = searchTool.getSchema();
    
    // تبدیل طرح‌واره به JSON برای اعتبارسنجی
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // اعتبارسنجی طرح‌واره به عنوان JSONSchema معتبر
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

آزمون‌های خاص برای شرایط خطا ایجاد کنید:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # مرتب‌سازی
    tool = ApiTool(timeout=0.1)  # تایم‌اوت بسیار کوتاه
    
    # تقلید یک درخواست که تایم‌اوت می‌شود
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # طولانی‌تر از تایم‌اوت
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # اجرا و اعتبارسنجی
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # بررسی پیام استثنا
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # مرتب‌سازی
    tool = ApiTool()
    
    # تقلید یک پاسخ با محدودیت نرخ
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
        
        # اجرا و اعتبارسنجی
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # بررسی اینکه استثنا شامل اطلاعات محدودیت نرخ باشد
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### تست یکپارچه‌سازی

#### 1. تست زنجیره ابزارها

ابزارها را در ترکیب‌های مورد انتظار با هم تست کنید:

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

سرور MCP را با ثبت و اجرای کامل ابزارها تست کنید:

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
        // آزمایش نقطه انتهایی کشف
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
        
        // ارسال درخواست و تأیید پاسخ
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
        // پارامتر "b" موجود نیست
        request.put("parameters", parameters);
        
        // ارسال درخواست و تأیید پاسخ خطا
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. تست انتها به انتها

گردش‌های کاری کامل را از فرمان مدل تا اجرای ابزار تست کنید:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # تنظیم - راه‌اندازی کلاینت MCP و مدل شبیه‌سازی‌شده
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # پاسخ‌های مدل شبیه‌سازی‌شده
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
    
    # پاسخ ابزار آب‌وهوا شبیه‌سازی‌شده
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
        
        # تأیید
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### تست عملکرد

#### 1. تست بار

تعداد درخواست‌های همزمانی که سرور MCP شما می‌تواند مدیریت کند را تست کنید:

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

#### 2. تست استرس

سیستم را تحت بار شدید تست کنید:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // راه‌اندازی JMeter برای تست استرس
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
    assertTrue(summaryReport.getPercentile(90.0) < 500); // درصد نود کمتر از ۵۰۰ میلی‌ثانیه
}
```

#### 3. مانیتورینگ و پروفایلینگ

برای تحلیل عملکرد بلندمدت مانیتورینگ راه‌اندازی کنید:

```python
# پیکربندی نظارت برای یک سرور MCP
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
    
    # در دسترس قرار دادن نقطه پایان معیارها
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## الگوهای طراحی گردش کار MCP

گردش‌های کاری خوب طراحی‌شده MCP کارایی، اطمینان و نگهداری‌پذیری را بهبود می‌بخشند. الگوهای کلیدی زیر را دنبال کنید:

### 1. الگوی زنجیره ابزارها

چندین ابزار را به ترتیبی متصل کنید که خروجی هر ابزار ورودی ابزار بعدی شود:

```python
# پیاده‌سازی زنجیره ابزارهای پایتون
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # لیست نام ابزارها برای اجرای ترتیبی
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # اجرای هر ابزار در زنجیره، با عبور نتیجه قبلی
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

### 2. الگوی توزیع‌کننده

از ابزاری مرکزی استفاده کنید که بر اساس ورودی به ابزارهای تخصصی هدایت کند:

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

### 3. الگوی پردازش همزمان

چندین ابزار را به طور همزمان اجرا کنید تا کارایی بالا رود:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // مرحله ۱: واکشی فراداده‌های مجموعه داده (همزمان)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // مرحله ۲: اجرای هم‌زمان چندین تحلیل
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
        
        // انتظار برای تکمیل همه‌ی وظایف موازی
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
        
        // بازگرداندن نتیجه کامل جریان کاری
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. الگوی بازیابی خطا

فروشگاه‌های سقوط ملایم برای خطاهای ابزار پیاده‌سازی کنید:

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
            # ثبت خطا
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # به ابزار ثانویه بازگردید
            try:
                # ممکن است نیاز باشد پارامترها برای ابزار جایگزین تغییر کنند
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # هر دو ابزار ناکام ماندند
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # این پیاده‌سازی به ابزارهای خاص بستگی دارد
        # برای این مثال، فقط پارامترهای اصلی را باز می‌گردانیم
        return params

# نمونه استفاده
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # API هواشناسی اصلی (پرداختی)
        "basicWeatherService",    # API هواشناسی جایگزین (رایگان)
        {"location": location}
    )
```

### 5. الگوی ترکیب گردش کار

گردش‌های کاری پیچیده را با ترکیب گردش‌های کاری ساده بسازید:

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

# تست سرورهای MCP: بهترین شیوه‌ها و نکات برتر

## مقدمه

تست بخشی حیاتی از توسعه سرورهای MCP قابل اعتماد و با کیفیت بالا است. این راهنما بهترین شیوه‌ها و نکات جامعی برای تست سرورهای MCP شما در چرخه توسعه، از تست واحد تا تست یکپارچه و اعتبارسنجی انتها به انتها ارائه می‌دهد.

## اهمیت تست برای سرورهای MCP

سرورهای MCP به عنوان میان‌افزار مهم بین مدل‌های هوش مصنوعی و برنامه‌های کلاینت عمل می‌کنند. تست دقیق تضمین می‌کند:

- قابلیت اطمینان در محیط‌های تولیدی  
- مدیریت دقیق درخواست‌ها و پاسخ‌ها  
- پیاده‌سازی صحیح مشخصات MCP  
- مقاومت در برابر خطاها و حالت‌های خاص  
- عملکرد یکنواخت تحت بارهای مختلف  

## تست واحد برای سرورهای MCP

### تست واحد (بنیاد)

تست‌های واحد اجزای منفرد سرور MCP شما را به صورت ایزوله بررسی می‌کنند.

#### چی چیزی را تست کنیم

1. **مدیرهای منابع**: منطق هر مدیر منبع را به صورت مجزا تست کنید  
2. **پیاده‌سازی ابزارها**: رفتار ابزارها را با ورودی‌های مختلف بررسی کنید  
3. **قالب‌های فرمان (Prompt)**: اطمینان حاصل کنید قالب‌ها به درستی اجرا می‌شوند  
4. **اعتبارسنجی شِما**: منطق اعتبارسنجی پارامترها را تست کنید  
5. **مدیریت خطا**: پاسخ‌های خطا برای ورودی‌های نامعتبر را بررسی کنید  

#### بهترین شیوه‌های تست واحد

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
# نمونه تست واحد برای ابزار ماشین حساب در پایتون
def test_calculator_tool_add():
    # تنظیم
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # اجرا
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # تأیید
    assert result["value"] == 12
```

### تست یکپارچه‌سازی (لایه میانی)

تست‌های یکپارچه‌سازی تعامل بین اجزای سرور MCP را بررسی می‌کنند.

#### چی چیزی را تست کنیم

1. **راه‌اندازی سرور**: راه‌اندازی سرور با پیکربندی‌های مختلف را تست کنید  
2. **ثبت مسیرها**: اطمینان حاصل کنید همه نقطه‌های انتهایی به درستی ثبت شده‌اند  
3. **پردازش درخواست**: چرخه کامل درخواست و پاسخ را تست کنید  
4. **انتقال خطا**: اطمینان حاصل کنید خطاها به درستی بین اجزا مدیریت می‌شوند  
5. **احراز هویت و مجوزدهی**: مکانیزم‌های امنیتی را تست کنید  

#### بهترین شیوه‌های تست یکپارچه‌سازی

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

تست‌های انتها به انتها رفتار کامل سیستم از کلاینت تا سرور را اعتبارسنجی می‌کنند.

#### چی چیزی را تست کنیم

1. **ارتباط کلاینت-سرور**: چرخه کامل درخواست و پاسخ را تست کنید  
2. **کتابخانه‌های SDK واقعی کلاینت**: با پیاده‌سازی‌های واقعی کلاینت تست کنید   
3. **عملکرد تحت بار**: رفتار سیستم با درخواست‌های همزمان متعدد را تأیید کنید  
4. **بازیابی خطا**: بازیابی سیستم از خطاها را تست کنید  
5. **عملیات طولانی‌مدت**: مدیریت عملیات استریمینگ و طولانی را بررسی نمایید  

#### بهترین شیوه‌های تست انتها به انتها

```typescript
// نمونه تست پایان به پایان با یک کلاینت در تایپ‌اسکریپت
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
    // اجرا
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // تایید صحت
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## استراتژی‌های موک‌سازی برای تست MCP

موک‌سازی برای ایزوله کردن اجزا در تست ضروری است.

### اجزایی که باید موک شوند

1. **مدل‌های هوش مصنوعی خارجی**: پاسخ مدل‌ها را برای تست پیش‌بینی شده موک کنید  
2. **خدمات خارجی**: وابستگی‌های API (دیتابیس‌ها، خدمات ثالث) را موک کنید  
3. **خدمات احراز هویت**: ارائه‌دهندگان هویت را موک کنید  
4. **تأمین‌کنندگان منابع**: مدیرهای منبع پرهزینه را موک کنید  

### مثال: موک پاسخ مدل هوش مصنوعی

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
    # پیکربندی ماک
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # استفاده از ماک در تست
    server = McpServer(model_client=mock_model)
    # ادامه با تست
```

## تست عملکرد

تست عملکرد برای سرورهای MCP در محیط تولید اهمیت بالایی دارد.

### چه چیزی را اندازه‌گیری کنیم

1. **تاخیر (Latency)**: زمان پاسخ برای درخواست‌ها  
2. **توان عملیاتی (Throughput)**: تعداد درخواست‌های پردازش‌شده در ثانیه  
3. **مصرف منابع**: استفاده از CPU، حافظه، شبکه  
4. **مدیریت همزمانی**: رفتار تحت درخواست‌های موازی  
5. **ویژگی‌های مقیاس‌پذیری**: عملکرد با افزایش بار  

### ابزارهای تست عملکرد

- **k6**: ابزار متن‌باز تست بار  
- **JMeter**: تست عملکرد جامع  
- **Locust**: تست بار مبتنی بر پایتون  
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

## اتوماتیک‌سازی تست‌ها برای سرورهای MCP

اتوماتیک کردن تست‌ها کیفیت یکنواخت و بازخورد سریع‌تر را تضمین می‌کند.

### ادغام CI/CD

1. **اجرای تست‌های واحد روی درخواست‌های Pull**: اطمینان از اینکه تغییرات کد عملکرد موجود را خراب نمی‌کند
2. **تست‌های یکپارچگی در مرحله آزمایشی**: اجرای تست‌های یکپارچگی در محیط‌های پیش‌تولید  
3. **معیارهای عملکرد**: حفظ معیارهای عملکرد برای شناسایی پسرفت‌ها  
4. **اسکن‌های امنیتی**: خودکارسازی تست امنیتی به عنوان بخشی از خط لوله  

### نمونه خط لوله CI (اقدامات گیت‌هاب)

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
  
## تست انطباق با مشخصات MCP  

بررسی کنید که سرور شما به درستی مشخصات MCP را پیاده‌سازی می‌کند.  

### حوزه‌های کلیدی انطباق  

1. **نقاط پایانی API**: تست نقاط پایانی مورد نیاز (/resources، /tools، و غیره)  
2. **قالب درخواست/پاسخ**: اعتبارسنجی انطباق با ساختار  
3. **کدهای خطا**: بررسی کدهای وضعیت صحیح برای سناریوهای مختلف  
4. **انواع محتوا**: تست مدیریت انواع مختلف محتوا  
5. **روند احراز هویت**: بررسی سازوکارهای احراز هویت منطبق با مشخصات  

### مجموعه تست انطباق  

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
  
## ۱۰ نکته برتر برای تست مؤثر سرور MCP  

1. **تعاریف ابزار را جداگانه تست کنید**: تعاریف ساختار را مستقل از منطق ابزار بررسی کنید  
2. **از تست‌های پارامتری استفاده کنید**: ابزارها را با ورودی‌های متنوع، از جمله موارد مرزی تست کنید  
3. **پاسخ‌های خطا را بررسی کنید**: رویه‌های صحیح مدیریت خطا را برای تمام شرایط احتمالی تأیید کنید  
4. **منطق مجوزدهی را تست کنید**: کنترل دسترسی مناسب برای نقش‌های مختلف کاربری را تضمین کنید  
5. **پوشش تست را زیر نظر بگیرید**: تلاش برای پوشش بالای کد مسیر بحرانی  
6. **پاسخ‌های جریان داده را تست کنید**: مدیریت صحیح محتوای جریان داده را بررسی کنید  
7. **شبیه‌سازی مشکلات شبکه**: رفتار در شرایط شبکه ضعیف را تست کنید  
8. **محدودیت منابع را تست کنید**: رفتار هنگام رسیدن به سهمیه‌ها یا محدودیت‌های نرخ را بررسی کنید  
9. **تست‌های بازگشتی را خودکار کنید**: مجموعه‌ای بسازید که با هر تغییر کد اجرا شود  
10. **موارد تست را مستندسازی کنید**: مستندسازی واضح از سناریوهای تست نگه دارید  

## مشکلات رایج تست  

- **اعتماد بیش از حد به تست مسیر خوشحال**: حتماً موارد خطا را به دقت تست کنید  
- **نادیده گرفتن تست عملکرد**: گلوگاه‌ها را قبل از تأثیر بر تولید شناسایی کنید  
- **فقط تست‌های مجزا**: تست‌های واحد، یکپارچگی و انتها به انتها را ترکیب کنید  
- **پوشش ناکامل API**: اطمینان حاصل کنید که همه نقاط پایانی و ویژگی‌ها تست شده‌اند  
- **محیط‌های تست ناسازگار**: از کانتینرها برای تضمین محیط‌های تست یکسان استفاده کنید  

## نتیجه‌گیری  

استراتژی جامع تست برای توسعه سرورهای قابل اعتماد و با کیفیت بالا ضروری است. با پیاده‌سازی بهترین شیوه‌ها و نکات ارائه شده در این راهنما، می‌توانید اطمینان حاصل کنید که پیاده‌سازی‌های MCP شما استانداردهای بالای کیفیت، قابلیت اعتماد و عملکرد را برآورده می‌کند.  

## نکات کلیدی  

1. **طراحی ابزار**: اصل مسئولیت‌پذیری منفرد را دنبال کنید، تزریق وابستگی را به کار گیرید و طراحی برای ترکیب‌پذیری انجام دهید  
2. **طراحی ساختار**: ساختارهای واضح و مستندسازی شده با محدودیت‌های اعتبارسنجی مناسب ایجاد کنید  
3. **مدیریت خطا**: مدیریت خطای مطلوب، پاسخ‌های ساختاریافته خطا و منطق تلاش مجدد را پیاده‌سازی کنید  
4. **عملکرد**: از کشینگ، پردازش ناهمزمان و کنترل منابع استفاده کنید  
5. **امنیت**: اعتبارسنجی کامل ورودی، بررسی‌های مجوزدهی و مدیریت داده‌های حساس را اعمال کنید  
6. **تست**: تست‌های جامع واحد، یکپارچگی و انتها به انتها بسازید  
7. **الگوهای جریان کاری**: از الگوهای شناخته شده مانند زنجیره‌ها، توزیع‌کننده‌ها و پردازش موازی استفاده کنید  

## تمرین  

یک ابزار MCP و جریان کاری برای یک سیستم پردازش اسناد طراحی کنید که:  

1. اسناد را در فرمت‌های مختلف (PDF، DOCX، TXT) قبول کند  
2. متن و اطلاعات کلیدی را از اسناد استخراج کند  
3. اسناد را بر اساس نوع و محتوا دسته‌بندی کند  
4. خلاصه‌ای برای هر سند تولید کند  

ساختارهای ابزاری، مدیریت خطا و الگویی از جریان کاری که برای این سناریو مناسب است را پیاده کنید. فکر کنید چگونه این پیاده‌سازی را تست خواهید کرد.  

## منابع  

1. به جامعه MCP در [Microsoft Foundry Discord Community](https://aka.ms/foundrydevs) بپیوندید تا از آخرین تحولات مطلع شوید  
2. به پروژه‌های متن‌باز [MCP](https://github.com/modelcontextprotocol) کمک کنید  
3. اصول MCP را در ابتکارات هوش مصنوعی سازمان خود اعمال کنید  
4. پیاده‌سازی‌های تخصصی MCP برای صنعت خود را بررسی کنید  
5. شرکت در دوره‌های پیشرفته در موضوعات خاص MCP مانند هم‌پوشانی چندوجهی یا یکپارچه‌سازی برنامه‌های سازمانی را مد نظر داشته باشید  
6. با ساخت ابزارها و جریان‌های کاری MCP خود با استفاده از اصول آموخته شده در [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md) آزمایش کنید  

## مرحله بعد  

مرحله بعد: [مطالعات موردی](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:
این سند با استفاده از سرویس ترجمه هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما در تلاش برای دقت هستیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است شامل خطاها یا نادرستی‌هایی باشند. سند اصلی به زبان مادری خود باید به عنوان منبع معتبر در نظر گرفته شود. برای اطلاعات حیاتی، ترجمه حرفه‌ای انسانی توصیه می‌شود. ما در قبال هرگونه سوء تفاهم یا برداشت نادرست ناشی از استفاده از این ترجمه مسئولیتی نداریم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->