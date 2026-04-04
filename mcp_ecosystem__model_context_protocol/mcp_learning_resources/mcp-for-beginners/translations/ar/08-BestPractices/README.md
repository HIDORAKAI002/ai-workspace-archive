# أفضل ممارسات تطوير MCP

[![أفضل ممارسات تطوير MCP](../../../translated_images/ar/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(انقر على الصورة أعلاه لمشاهدة فيديو هذا الدرس)_

## نظرة عامة

يركز هذا الدرس على أفضل الممارسات المتقدمة لتطوير واختبار ونشر خوادم وميزات MCP في بيئات الإنتاج. مع تزايد تعقيد وأهمية أنظمة MCP، يضمن اتباع الأنماط المعتمدة الموثوقية وقابلية الصيانة والتشغيل البيني. يجمع هذا الدرس الحكمة العملية المكتسبة من تطبيقات MCP الواقعية لإرشادك في إنشاء خوادم قوية وفعالة مع موارد ومطالبات وأدوات فعالة.

## أهداف التعلم

بنهاية هذا الدرس، ستكون قادرًا على:

- تطبيق أفضل الممارسات الصناعية في تصميم خوادم وميزات MCP
- إنشاء استراتيجيات اختبار شاملة لخوادم MCP
- تصميم أنماط سير عمل فعّالة وقابلة لإعادة الاستخدام لتطبيقات MCP المعقدة
- تنفيذ معالجة الأخطاء الصحيحة وتسجيل الأحداث والمراقبة في خوادم MCP
- تحسين تطبيقات MCP من حيث الأداء والأمان وقابلية الصيانة

## المبادئ الأساسية لـ MCP

قبل الغوص في ممارسات التنفيذ المحددة، من المهم فهم المبادئ الأساسية التي توجه تطوير MCP الفعّال:

1. **الاتصال الموحد**: يستخدم MCP JSON-RPC 2.0 كأساس له، موفرًا صيغة متسقة للطلبات والاستجابات ومعالجة الأخطاء عبر جميع التطبيقات.

2. **التصميم المرتكز على المستخدم**: دائمًا اعطِ الأولوية لموافقة المستخدم، والتحكم، والشفافية في تطبيقات MCP.

3. **الأمان أولاً**: طبق تدابير أمان قوية تشمل التوثيق، التفويض، التحقق، وتحديد المعدل.

4. **الهيكلية المعيارية**: صمم خوادم MCP بطريقة معيارية، حيث يكون لكل أداة وموارد غرض واضح ومحدّد.

5. **الاتصالات الحالة**: استفد من قدرة MCP على الحفاظ على الحالة عبر طلبات متعددة لتفاعلات أكثر تماسكًا ووعيًا بالسياق.

## أفضل الممارسات الرسمية لـ MCP

الممارسات الأفضل التالية مستمدة من وثائق بروتوكول سياق النموذج الرسمي:

### أفضل ممارسات الأمان

1. **موافقة المستخدم والسيطرة**: دائمًا اطلب موافقة صريحة من المستخدم قبل الوصول إلى البيانات أو تنفيذ العمليات. قدم تحكمًا واضحًا فيما يتم مشاركته من بيانات وأي الإجراءات مصرح بها.

2. **خصوصية البيانات**: لا تعرض بيانات المستخدم إلا بموافقة صريحة وحمايتها بضوابط وصول مناسبة. احمِ ضد نقل البيانات غير المصرح به.

3. **سلامة الأدوات**: اطلب موافقة صريحة من المستخدم قبل استدعاء أي أداة. تأكد من أن المستخدمين يفهمون وظيفة كل أداة وفرض حدود أمان قوية.

4. **التحكم في صلاحيات الأدوات**: قم بتكوين الأدوات المسموح للنموذج استخدامها أثناء الجلسة، مما يضمن إمكانية الوصول فقط إلى الأدوات المصرح بها صراحة.

5. **التوثيق**: اطلب التوثيق الصحيح قبل منح الوصول إلى الأدوات أو الموارد أو العمليات الحساسة باستخدام مفاتيح API، رموز OAuth، أو طرق توثيق آمنة أخرى.

6. **التحقق من المعلمات**: طبق التحقق لجميع استدعاءات الأدوات لمنع إدخالات خاطئة أو خبيثة من الوصول إلى التنفيذ.

7. **تحديد المعدل**: طبق ضبط معدل لمنع سوء الاستخدام وضمان استخدام عادل لموارد الخادم.

### أفضل ممارسات التنفيذ

1. **التفاوض على القدرات**: خلال إعداد الاتصال، تبادل المعلومات حول الميزات المدعومة، إصدارات البروتوكول، الأدوات المتاحة، والموارد.

2. **تصميم الأدوات**: أنشئ أدوات مخصصة تركز على القيام بمهمة واحدة بشكل جيد، بدلاً من أدوات ضخمة تتعامل مع عدة اهتمامات.

3. **معالجة الأخطاء**: طبق رسائل وأكواد أخطاء موحدة للمساعدة في تشخيص المشكلات، التعامل مع الفشل بسلاسة، وتوفير ملاحظات قابلة للتنفيذ.

4. **التسجيل**: قم بإعداد سجلات منظمة للمراجعة، التصحيح، ومراقبة تفاعلات البروتوكول.

5. **تتبع التقدم**: للعمليات طويلة الأمد، أبلغ عن تحديثات التقدم لتمكين واجهات مستخدم استجابة.

6. **إلغاء الطلبات**: أتاح للعملاء إلغاء الطلبات الجارية التي لم تعد مطلوبة أو تستغرق وقتًا طويلاً.

## مراجع إضافية

للحصول على أحدث المعلومات حول أفضل ممارسات MCP، راجع:

- [توثيق MCP](https://modelcontextprotocol.io/)
- [مواصفات MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [مستودع GitHub](https://github.com/modelcontextprotocol)
- [أفضل ممارسات الأمان](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [أفضل 10 مخاطر أمان لـ MCP من OWASP](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - مخاطر أمان وتدابير التخفيف
- [ورشة عمل قمة أمان MCP (Sherpa)](https://azure-samples.github.io/sherpa/) - تدريب عملي على الأمان

## أمثلة على التنفيذ العملي

### أفضل ممارسات تصميم الأدوات

#### 1. مبدأ المسؤولية الواحدة

يجب أن يكون لكل أداة MCP غرض واضح ومركز. بدلاً من إنشاء أدوات ضخمة تحاول التعامل مع عدة مهام، طور أدوات متخصصة تتفوق في مهام محددة.

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

#### 2. معالجة أخطاء متناسقة

طبق معالجة أخطاء قوية برسائل خطأ مفيدة وآليات استرداد مناسبة.

```python
# مثال بايثون مع معالجة شاملة للأخطاء
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # التحقق من صحة المعاملات
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # التحقق من الأمان
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # عملية قاعدة بيانات مع مهلة زمنية
                async with timeout(10):  # مهلة ١٠ ثوانٍ
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # قد تكون أخطاء الاتصال مؤقتة
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # أخطاء الاستعلام غالباً ما تكون أخطاء من العميل
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # السماح بمرور الأخطاء الخاصة بالأدوات
            raise
        except Exception as e:
            # التقاط جميع الأخطاء غير المتوقعة
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # تنفيذ اكتشاف حقن SQL
        pass
        
    def _log_error(self, message, error):
        # تنفيذ تسجيل الأخطاء
        pass
```

#### 3. التحقق من المعلمات

تحقق دائمًا من المعلمات بدقة لمنع الإدخالات المشوهة أو الخبيثة.

```javascript
// مثال على JavaScript/TypeScript مع التحقق المفصل من المعلمات
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
    // 1. التحقق من وجود المعلمة
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. التحقق من نوع المعلمة
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. التحقق من قيم المعلمة
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. التحقق من وجود المحتوى لعملية الكتابة
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. التحقق من أمان المسار
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // التنفيذ بناءً على المعلمات التي تم التحقق منها
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // تنفيذ فحص أمان المسار
    // ...
  }
}
```

### أمثلة تنفيذ الأمان

#### 1. التوثيق والتفويض

```java
// مثال جافا مع المصادقة والتفويض
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // حقن التبعية
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
        // 1. استخراج سياق المصادقة
        String authToken = request.getContext().getAuthToken();
        
        // 2. مصادقة المستخدم
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. التحقق من التفويض للعملية المحددة
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. المتابعة مع العملية المصرح بها
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

#### 2. تحديد المعدل

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

## أفضل ممارسات الاختبار

### 1. اختبار الوحدة لأدوات MCP

اختبر أدواتك دائمًا بمعزل، مع محاكاة التبعيات الخارجية:

```typescript
// مثال على اختبار وحدة أداة باستخدام TypeScript
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // إنشاء خدمة الطقس المزيفة
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // إنشاء الأداة بالاعتماد المزيف
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // ترتيب
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // تنفيذ
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // تحقق
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // ترتيب
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // تنفيذ والتحقق
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. اختبار التكامل

اختبر التدفق الكامل من طلبات العميل إلى استجابات الخادم:

```python
# مثال اختبار تكامل بايثون
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # بدء خادم اختبار
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # إنشاء عميل
        client = McpClient("http://localhost:5000")
        
        # اختبار اكتشاف الأداة
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # اختبار تنفيذ الأداة
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # التحقق من الاستجابة
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # التنظيف
        await server.stop()
```

## تحسين الأداء

### 1. استراتيجيات التخزين المؤقت

طبق التخزين المؤقت المناسب لتقليل الكمون واستخدام الموارد:

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

#### 2. حقن التبعيات وقابلية الاختبار

صمم الأدوات لاستقبال تبعياتها عبر الحقن في المُنشئ، مما يجعلها قابلة للاختبار وقابلة للتكوين:

```java
// مثال جافا مع حقن التبعية
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // التبعيات تم حقنها من خلال الباني
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // تنفيذ الأداة
    // ...
}
```

#### 3. أدوات مركبة

صمم أدوات يمكن تركيبها معًا لإنشاء سير عمل أكثر تعقيدًا:

```python
# مثال بايثون يظهر أدوات قابلة للتأليف
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # التنفيذ...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # يمكن لهذه الأداة استخدام نتائج أداة جلب البيانات
    async def execute_async(self, request):
        # التنفيذ...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # يمكن لهذه الأداة استخدام نتائج أداة تحليل البيانات
    async def execute_async(self, request):
        # التنفيذ...
        pass

# يمكن استخدام هذه الأدوات بشكل مستقل أو كجزء من سير العمل
```

### أفضل ممارسات تصميم المخطط

المخطط هو العقد بين النموذج وأداتك. تصاميم المخططات الجيدة تؤدي إلى قابلية أفضل لأداة الاستخدام.

#### 1. وصف واضح للمعلمات

اشمل دائمًا معلومات وصفية لكل معلمة:

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

#### 2. قيود التحقق

أضف قيود تحقق لمنع الإدخالات غير الصالحة:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // خاصية البريد الإلكتروني مع التحقق من صحة التنسيق
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // خاصية العمر مع قيود رقمية
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // خاصية معدودة
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

#### 3. هياكل إرجاع متناسقة

حافظ على تناسق في هياكل الاستجابة لتسهيل تفسير النماذج للنتائج:

```python
async def execute_async(self, request):
    try:
        # معالجة الطلب
        results = await self._search_database(request.parameters["query"])
        
        # إعادة هيكلية متسقة دائماً
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

### معالجة الأخطاء

معالجة الأخطاء القوية ضرورية لأدوات MCP للحفاظ على الموثوقية.

#### 1. المعالجة الأخلاقية للأخطاء

تعامل مع الأخطاء في المستويات المناسبة وقدم رسائل مفيدة:

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

#### 2. استجابات خطأ منظمة

أرجع معلومات خطأ منظمة عندما يكون ذلك ممكنًا:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // التنفيذ
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
        
        // إعادة رمي الاستثناءات الأخرى كـ ToolExecutionException
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. منطق إعادة المحاولة

طبق منطق إعادة مناسب لإعادة المحاولة في حالات الأخطاء العابرة:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # ثواني
    
    while retry_count < max_retries:
        try:
            # استدعاء واجهة برمجة التطبيقات الخارجية
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # تراجع أسي
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # خطأ غير مؤقت، لا تعيد المحاولة
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### تحسين الأداء

#### 1. التخزين المؤقت

طبق التخزين المؤقت للعمليات المكلفة:

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

#### 2. المعالجة غير المتزامنة

استخدم أنماط برمجة غير متزامنة للعمليات المعتمدة على الإدخال/الإخراج:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // لعمليات طويلة الأمد، أرجع معرف المعالجة فورًا
        String processId = UUID.randomUUID().toString();
        
        // ابدأ المعالجة غير المتزامنة
        CompletableFuture.runAsync(() -> {
            try {
                // قم بتنفيذ العملية طويلة الأمد
                documentService.processDocument(documentId);
                
                // تحديث الحالة (عادة ما يتم تخزينها في قاعدة بيانات)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // إرجاع استجابة فورية مع معرف العملية
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // أداة فحص حالة المرافق
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

#### 3. ضبط الموارد

طبق ضبط الموارد لمنع التحميل الزائد:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # السماح بخمسة طلبات في الثانية
            bucket_size=10        # السماح بحد أقصى 10 طلبات دفعة واحدة
        )
    
    async def execute_async(self, request):
        # التحقق مما إذا كان يمكننا المتابعة أو نحتاج للانتظار
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # إذا كان الانتظار طويلاً جداً
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # الانتظار لمدة التأخير المناسبة
                await asyncio.sleep(delay)
        
        # استهلاك رمز والمتابعة مع الطلب
        self.rate_limiter.consume()
        
        # استدعاء واجهة برمجة التطبيقات
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
            
            # حساب الوقت حتى توفر الرمز التالي
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # إضافة رموز جديدة بناءً على الوقت المنقضي
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### أفضل ممارسات الأمان

#### 1. التحقق من المدخلات

تحقق دائمًا من مدخلات المعلمات بدقة:

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

#### 2. فحوصات التفويض

طبق فحوصات التفويض المناسبة:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // الحصول على سياق المستخدم من الطلب
    UserContext user = request.getContext().getUserContext();
    
    // التحقق مما إذا كان المستخدم لديه الأذونات المطلوبة
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // بالنسبة للموارد المحددة، التحقق من الوصول إلى تلك المورد
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // المتابعة في تنفيذ الأداة
    // ...
}
```

#### 3. معالجة البيانات الحساسة

تعامل بعناية مع البيانات الحساسة:

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
        
        # الحصول على بيانات المستخدم
        user_data = await self.user_service.get_user_data(user_id)
        
        # تصفية الحقول الحساسة ما لم يُطلب ذلك صراحة وتم الترخيص به
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # التحقق من مستوى التفويض في سياق الطلب
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # إنشاء نسخة لتجنب تعديل الأصل
        redacted = user_data.copy()
        
        # حذف البيانات الحساسة المحددة
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # حذف البيانات الحساسة المتداخلة
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## أفضل ممارسات اختبار أدوات MCP

الاختبار الشامل يضمن أن أدوات MCP تعمل بشكل صحيح، تتعامل مع الحالات الحدية، وتتكامل بشكل سليم مع باقي النظام.

### اختبار الوحدة

#### 1. اختبار كل أداة بمعزل

أنشئ اختبارات مركزة على وظيفة كل أداة:

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

#### 2. اختبار التحقق من المخطط

اختبر أن المخططات صالحة وتنفذ القيود بشكل صحيح:

```java
@Test
public void testSchemaValidation() {
    // إنشاء مثيل الأداة
    SearchTool searchTool = new SearchTool();
    
    // الحصول على المخطط
    Object schema = searchTool.getSchema();
    
    // تحويل المخطط إلى JSON للتحقق
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // التحقق من أن المخطط هو JSONSchema صالح
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // اختبار المعلمات الصحيحة
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // اختبار المعلمة المطلوبة المفقودة
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // اختبار نوع المعلمة غير الصحيح
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. اختبارات معالجة الأخطاء

أنشئ اختبارات محددة لحالات الخطأ:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # رتب
    tool = ApiTool(timeout=0.1)  # مهلة قصيرة جدًا
    
    # قم بمحاكاة طلب سينتهي وقت استجابته
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # أطول من المهلة
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # نفذ و تحقق
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # تحقق من رسالة الاستثناء
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # رتب
    tool = ApiTool()
    
    # قم بمحاكاة رد محدود المعدل
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
        
        # نفذ و تحقق
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # تحقق من احتواء الاستثناء على معلومات حدود المعدل
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### اختبار التكامل

#### 1. اختبار سلسلة الأدوات

اختبر الأدوات تعمل معًا في التركيبات المتوقعة:

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

#### 2. اختبار خادم MCP

اختبر خادم MCP مع التسجيل الكامل للأدوات والتنفيذ:

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
        // اختبار نقطة نهاية الاكتشاف
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // إنشاء طلب الأدوات
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // إرسال الطلب والتحقق من الاستجابة
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // إنشاء طلب أداة غير صالح
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // المعامل "b" مفقود
        request.put("parameters", parameters);
        
        // إرسال الطلب والتحقق من استجابة الخطأ
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. اختبار من النهاية إلى النهاية

اختبر سير العمل الكامل من موجه النموذج إلى تنفيذ الأداة:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # رتب - إعداد عميل MCP ونموذج المحاكاة
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # استجابات نموذج المحاكاة
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
    
    # استجابة أداة الطقس المحاكية
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
        
        # نفذ
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # تحقق
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### اختبار الأداء

#### 1. اختبار الحمل

اختبر عدد الطلبات المتزامنة التي يمكن لخادم MCP التعامل معها:

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

#### 2. اختبار الضغط

اختبر النظام تحت حمل شديد:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // إعداد JMeter لاختبار الضغط
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // تكوين خطة اختبار JMeter
    HashTree testPlanTree = new HashTree();
    
    // إنشاء خطة اختبار، مجموعة الخيوط، العينات، إلخ.
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // إضافة عينة HTTP لتشغيل الأداة
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // إضافة المستمعين
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // تشغيل الاختبار
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // التحقق من النتائج
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // متوسط زمن الاستجابة < 200 مللي ثانية
    assertTrue(summaryReport.getPercentile(90.0) < 500); // المئين 90 < 500 مللي ثانية
}
```

#### 3. المراقبة والتحليل

قم بإعداد المراقبة للتحليل طويل الأمد للأداء:

```python
# تكوين المراقبة لخادم MCP
def configure_monitoring(server):
    # إعداد مقاييس بروميثيوس
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
    
    # إضافة وسيط لقياس الوقت وتسجيل المقاييس
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # كشف نقطة نهاية المقاييس
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## أنماط تصميم سير عمل MCP

تحسن سير عمل MCP المصممة جيدًا الكفاءة، الموثوقية، وقابلية الصيانة. إليك الأنماط الرئيسية التي يجب اتباعها:

### 1. نمط سلسلة الأدوات

ربط عدة أدوات في سلسلة حيث تصبح مخرجات كل أداة المدخلات للأداة التالية:

```python
# تنفيذ سلسلة أدوات بايثون
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # قائمة بأسماء الأدوات للتنفيذ على التوالي
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # تنفيذ كل أداة في السلسلة، مع تمرير النتيجة السابقة
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # تخزين النتيجة واستخدامها كمدخل للأداة التالية
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# مثال على الاستخدام
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

### 2. نمط الموزع

استخدم أداة مركزية توزع الطلبات إلى أدوات متخصصة بناءً على المدخلات:

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

### 3. نمط المعالجة المتوازية

نفذ عدة أدوات في آن واحد لكفاءة أعلى:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // الخطوة 1: جلب بيانات وصفية لمجموعة البيانات (متزامن)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // الخطوة 2: تشغيل تحليلات متعددة بالتوازي
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
        
        // الانتظار حتى اكتمال جميع المهام المتوازية
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // الانتظار حتى الانتهاء
        
        // الخطوة 3: دمج النتائج
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // الخطوة 4: إنشاء تقرير ملخص
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // إرجاع نتيجة سير العمل الكاملة
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. نمط استرداد الأخطاء

طبق بدائل سلسة لفشل الأدوات:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # جرب الأداة الأساسية أولاً
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # سجل الفشل
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # التراجع إلى الأداة الثانوية
            try:
                # قد تحتاج إلى تحويل المعاملات لأداة التراجع
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # فشلت كلتا الأداتين
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # هذه التنفيذ يعتمد على الأدوات المحددة
        # في هذا المثال، سنعيد المعاملات الأصلية فقط
        return params

# مثال للاستخدام
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # واجهة برمجة التطبيقات الأساسية (مدفوعة) للطقس
        "basicWeatherService",    # واجهة برمجة التطبيقات الثانوية (مجانية) للطقس
        {"location": location}
    )
```

### 5. نمط تركيب سير العمل

ابنِ سير عمل معقد بتركيب سير عمل أبسط:

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

# اختبار خوادم MCP: أفضل الممارسات وأهم النصائح

## نظرة عامة

الاختبار هو جانب حاسم في تطوير خوادم MCP موثوقة وعالية الجودة. توفر هذه الإرشادات ممارسات شاملة ونصائح لاختبار خوادم MCP خلال دورة حياة التطوير، من اختبارات الوحدة إلى اختبارات التكامل والتحقق الشامل.

## لماذا يهم الاختبار لخوادم MCP

تعمل خوادم MCP كوسيط حاسم بين نماذج الذكاء الاصطناعي وتطبيقات العميل. يضمن الاختبار الدقيق:

- الموثوقية في بيئات الإنتاج
- التعامل الدقيق مع الطلبات والاستجابات
- تنفيذ مواصفات MCP بصورة صحيحة
- الصمود أمام حالات الفشل والحالات الحدية
- الأداء المستقر تحت أحمال مختلفة

## اختبار الوحدة لخوادم MCP

### اختبار الوحدة (الأساس)

تتحقق اختبارات الوحدة من مكونات خادم MCP الفردية بمعزل.

#### ماذا تختبر

1. **معالجات الموارد**: اختبار منطق كل معالج موارد بشكل مستقل
2. **تنفيذ الأدوات**: التحقق من سلوك الأداة مع مدخلات مختلفة
3. **قوالب الموجهات**: التأكد من عرض قوالب الموجهات بشكل صحيح
4. **التحقق من المخطط**: اختبار منطق التحقق من المعلمات
5. **معالجة الأخطاء**: التحقق من ردود الأخطاء للمدخلات غير الصالحة

#### أفضل الممارسات لاختبار الوحدة

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
# اختبار وحدة مثال لأداة آلة حاسبة في بايثون
def test_calculator_tool_add():
    # تهيئة
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # تنفيذ
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # تأكيد
    assert result["value"] == 12
```

### اختبار التكامل (الطبقة الوسطى)

تتحقق اختبارات التكامل من التفاعلات بين مكونات خادم MCP.

#### ماذا تختبر

1. **بدء تشغيل الخادم**: اختبار بدء التشغيل مع تكوينات مختلفة
2. **تسجيل المسارات**: التأكد من تسجيل جميع نقاط النهاية بشكل صحيح
3. **معالجة الطلبات**: اختبار دورة الطلب-الاستجابة الكاملة
4. **انتقال الأخطاء**: ضمان التعامل الصحيح مع الأخطاء عبر المكونات
5. **التوثيق والتفويض**: اختبار آليات الأمان

#### أفضل الممارسات لاختبار التكامل

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

### اختبار نهاية إلى نهاية (الطبقة العليا)

تتحقق اختبارات نهاية إلى نهاية من سلوك النظام الكامل من العميل إلى الخادم.

#### ماذا تختبر

1. **اتصال العميل بالخادم**: اختبار دورات الطلب-الاستجابة الكاملة
2. **SDKs الحقيقية للعميل**: اختبار باستخدام تطبيقات عميل فعلية
3. **الأداء تحت الحمل**: التحقق من السلوك مع طلبات متزامنة متعددة
4. **استرداد الأخطاء**: اختبار استرداد النظام من الفشل
5. **العمليات طويلة الأمد**: التحقق من التعامل مع التدفق والعمليات الطويلة

#### أفضل الممارسات لاختبار E2E

```typescript
// مثال على اختبار E2E مع عميل بلغة TypeScript
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // بدء الخادم في بيئة الاختبار
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // نفذ
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // تحقق
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## استراتيجيات المحاكاة لاختبار MCP

المحاكاة ضرورية لعزل المكونات أثناء الاختبار.

### المكونات التي يجب محاكاتها

1. **نماذج الذكاء الاصطناعي الخارجية**: محاكاة استجابات النموذج لاختبار متوقع
2. **الخدمات الخارجية**: محاكاة تبعيات API (قواعد البيانات، خدمات الطرف الثالث)
3. **خدمات التوثيق**: محاكاة مزودي الهوية
4. **مزودو الموارد**: محاكاة معالجات الموارد المكلفة

### مثال: محاكاة استجابة نموذج ذكاء اصطناعي

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
# مثال بايثون مع unittest.mock
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # تهيئة المحاكاة
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # استخدام المحاكاة في الاختبار
    server = McpServer(model_client=mock_model)
    # المتابعة مع الاختبار
```

## اختبار الأداء

اختبار الأداء ضروري لخوادم MCP في الإنتاج.

### ماذا تقيس

1. **الكمون**: زمن استجابة الطلبات
2. **معدل الأداء**: عدد الطلبات المعالجة في الثانية
3. **استخدام الموارد**: CPU، الذاكرة، استخدام الشبكة
4. **التعامل مع التزامن**: السلوك عند الطلبات المتوازية
5. **خصائص التوسع**: الأداء مع زيادة الحمل

### أدوات اختبار الأداء

- **k6**: أداة اختبار حمل مفتوحة المصدر
- **JMeter**: اختبار أداء شامل
- **Locust**: اختبار حمل مبني على بايثون
- **Azure Load Testing**: اختبار أداء سحابي

### مثال: اختبار حمل أساسي باستخدام k6

```javascript
// سكريبت k6 لاختبار تحميل خادم MCP
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // ١٠ مستخدمين افتراضيين
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

## أتمتة الاختبارات لخوادم MCP

أتمتة اختباراتك تضمن جودة ثابتة وحلقات تغذية راجعة أسرع.

### دمج CI/CD
1. **تشغيل اختبارات الوحدة على طلبات السحب**: التأكد من أن تغييرات الكود لا تكسر الوظائف الموجودة
2. **اختبارات التكامل في بيئة التهيئة**: تشغيل اختبارات التكامل في بيئات ما قبل الإنتاج
3. **أساسات الأداء**: الحفاظ على معايير الأداء لاكتشاف التراجع
4. **المسح الأمني**: أتمتة الاختبارات الأمنية كجزء من خط الأنابيب

### مثال على خط أنابيب CI (GitHub Actions)

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

## اختبار التوافق مع مواصفة MCP

تحقق من أن الخادم الخاص بك يطبق مواصفة MCP بشكل صحيح.

### المجالات الرئيسية للتوافق

1. **نقاط نهاية API**: اختبار نقاط النهاية المطلوبة (/resources, /tools, إلخ)
2. **تنسيق الطلب/الاستجابة**: التحقق من مطابقة المخطط
3. **رموز الخطأ**: التحقق من رموز الحالة الصحيحة في السيناريوهات المختلفة
4. **أنواع المحتوى**: اختبار التعامل مع أنواع المحتوى المختلفة
5. **تدفق المصادقة**: التحقق من آليات المصادقة المتوافقة مع المواصفة

### مجموعة اختبارات التوافق

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

## أفضل 10 نصائح لاختبار خادم MCP بفعالية

1. **اختبر تعريفات الأدوات بشكل منفصل**: تحقق من تعاريف المخطط بشكل مستقل عن منطق الأدوات
2. **استخدام اختبارات ذات معلمات**: اختبار الأدوات مع مجموعة متنوعة من المدخلات، بما في ذلك الحالات الحدية
3. **التحقق من استجابات الأخطاء**: تأكد من التعامل السليم مع الأخطاء لجميع حالات الخطأ الممكنة
4. **اختبار منطق التفويض**: ضمان التحكم المناسب في الوصول لأدوار المستخدم المختلفة
5. **مراقبة تغطية الاختبارات**: السعي للحصول على تغطية عالية لكود المسار الحيوي
6. **اختبار استجابات البث**: التحقق من التعامل السليم مع المحتوى المتدفق
7. **محاكاة مشاكل الشبكة**: اختبار السلوك في ظروف شبكة ضعيفة
8. **اختبار حدود الموارد**: التحقق من السلوك عند الوصول إلى الحصص أو حدود السرعة
9. **أتمتة اختبارات الانحدار**: بناء مجموعة تشغيل على كل تغيير في الكود
10. **توثيق حالات الاختبار**: الحفاظ على وثائق واضحة لسيناريوهات الاختبار

## الأخطاء الشائعة في الاختبار

- **الاعتماد المفرط على اختبار المسار السعيد**: تأكد من اختبار حالات الخطأ بدقة
- **تجاهل اختبار الأداء**: تحديد نقاط الاختناق قبل أن تؤثر على الإنتاج
- **الاختبار في العزلة فقط**: دمج اختبارات الوحدة، والتكامل، والنهاية للنهاية
- **تغطية API غير مكتملة**: ضمان اختبار جميع النقاط والميزات
- **بيئات اختبار غير متسقة**: استخدم الحاويات لضمان بيئات اختبار متسقة

## الخلاصة

استراتيجية اختبار شاملة ضرورية لتطوير خوادم MCP موثوقة وعالية الجودة. من خلال تطبيق أفضل الممارسات والنصائح الموضحة في هذا الدليل، يمكنك ضمان أن تطبيقات MCP الخاصة بك تلبي أعلى معايير الجودة والموثوقية والأداء.

## النقاط الرئيسية

1. **تصميم الأداة**: اتبع مبدأ المسؤولية الوحيدة، استخدم حقن التبعيات، وصمم لتكوين الأجزاء
2. **تصميم المخطط**: أنشئ مخططات واضحة وموثقة جيدًا مع قيود تحقق مناسبة
3. **معالجة الأخطاء**: نفذ معالجة أخطاء أنيقة، واستجابات خطأ منظمة، ومنطق إعادة المحاولة
4. **الأداء**: استخدم التخزين المؤقت، المعالجة غير المتزامنة، وتقييد الموارد
5. **الأمان**: طبق تحقق شامل للمدخلات، وفحوصات التفويض، والتعامل مع البيانات الحساسة
6. **الاختبار**: أنشئ اختبارات شاملة للوحدة، والتكامل، والنهاية للنهاية
7. **أنماط سير العمل**: طبق الأنماط المعتمدة مثل السلاسل، والمرسلات، والمعالجة المتوازية

## التمرين

صمم أداة MCP وسير عمل لنظام معالجة المستندات الذي:

1. يقبل مستندات بصيغ متعددة (PDF, DOCX, TXT)
2. يستخرج النص والمعلومات الرئيسية من المستندات
3. يصنف المستندات حسب النوع والمحتوى
4. يولد ملخصًا لكل مستند

نفذ مخططات الأداة، ومعالجة الأخطاء، ونمط سير العمل الأنسب لهذا السيناريو. فكر في كيفية اختبار هذا التنفيذ.

## الموارد 

1. انضم إلى مجتمع MCP على [Azure AI Foundry Discord Community](https://aka.ms/foundrydevs) للبقاء على اطلاع بأحدث التطورات 
2. ساهم في مشاريع MCP المفتوحة المصدر [MCP projects](https://github.com/modelcontextprotocol)
3. طبق مبادئ MCP في مبادرات الذكاء الاصطناعي في منظمتك
4. استكشف تطبيقات MCP المتخصصة لصناعتك
5. فكر في أخذ دورات متقدمة في مواضيع MCP محددة، مثل التكامل متعدد الأوضاع أو تكامل تطبيقات المؤسسات
6. جرب بناء أدوات MCP وسير عمل خاصة بك باستخدام المبادئ التي تعلمتها من خلال [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md) 

## التالي

التالي: [دراسات حالة](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**إخلاء مسؤولية**:  
تمت ترجمة هذا المستند باستخدام خدمة الترجمة الآلية [Co-op Translator](https://github.com/Azure/co-op-translator). بينما نسعى لتحقيق الدقة، يرجى العلم أن الترجمات الآلية قد تحتوي على أخطاء أو عدم دقة. يجب اعتبار المستند الأصلي بلغته الأصلية المصدر الرسمي والمعتمد. للمعلومات الهامة أو الحرجة، يوصى بالترجمة المهنية البشرية. نحن غير مسؤولين عن أي سوء فهم أو تفسيرات خاطئة قد تنشأ عن استخدام هذه الترجمة.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->