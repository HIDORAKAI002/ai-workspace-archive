# أفضل ممارسات تطوير MCP

[![أفضل ممارسات تطوير MCP](../../../translated_images/ar/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(اضغط على الصورة أعلاه لمشاهدة فيديو هذا الدرس)_

## نظرة عامة

يركز هذا الدرس على أفضل الممارسات المتقدمة لتطوير واختبار ونشر خوادم وميزات MCP في بيئات الإنتاج. مع تعقيد وأهمية أنظمة MCP التي تتزايد، فإن اتباع الأنماط المعتمدة يضمن الموثوقية وسهولة الصيانة والتشغيل البيني. يجمع هذا الدرس الحكمة العملية المكتسبة من تطبيقات MCP الحقيقية لتوجيهك في إنشاء خوادم قوية وفعالة مع موارد ومطالبات وأدوات فعالة.

## أهداف التعلم

بنهاية هذا الدرس، ستكون قادرًا على:

- تطبيق أفضل الممارسات الصناعية في تصميم خوادم وميزات MCP
- إنشاء استراتيجيات اختبار شاملة لخوادم MCP
- تصميم أنماط سير عمل فعالة وقابلة لإعادة الاستخدام لتطبيقات MCP المعقدة
- تنفيذ التعامل السليم مع الأخطاء، والتسجيل، ورصد الأداء في خوادم MCP
- تحسين تطبيقات MCP لأداء أفضل، وأمان، وسهولة صيانة

## مبادئ MCP الأساسية

قبل الخوض في ممارسات التنفيذ المحددة، من المهم فهم المبادئ الأساسية التي توجه تطوير MCP الفعال:

1. **الاتصال الموحد**: يستخدم MCP JSON-RPC 2.0 كأساس له، مما يوفر تنسيقًا متسقًا للطلبات، والاستجابات، والتعامل مع الأخطاء عبر جميع التطبيقات.

2. **تصميم يركز على المستخدم**: دائمًا أعطِ الأولوية لموافقة المستخدم، والسيطرة، والشفافية في تطبيقات MCP الخاصة بك.

3. **الأمان أولاً**: نفذ تدابير أمان قوية تشمل المصادقة، والتفويض، والتحقق، وتحديد المعدل.

4. **بنية معيارية**: صمّم خوادم MCP الخاصة بك بنهج معياري، حيث يكون لكل أداة وموارد هدف واضح ومركز.

5. **اتصالات محافظة على الحالة**: استفد من قدرة MCP على الحفاظ على الحالة عبر عدة طلبات لتفاعلات أكثر تماسكًا ووعيًا بالسياق.

## أفضل الممارسات الرسمية لـ MCP

أفضل الممارسات التالية مستمدة من وثائق بروتوكول سياق النموذج الرسمية:

### أفضل ممارسات الأمان

1. **موافقة وسيطرة المستخدم**: يتطلب دائمًا موافقة صريحة من المستخدم قبل الوصول إلى البيانات أو أداء العمليات. قدم سيطرة واضحة على البيانات المشتركة والإجراءات المصرح بها.

2. **خصوصية البيانات**: اكشف عن بيانات المستخدم فقط بموافقة صريحة وحمها بضوابط وصول مناسبة. احمِ ضد النقل غير المصرح به للبيانات.

3. **أمان الأدوات**: يتطلب موافقة صريحة من المستخدم قبل استدعاء أي أداة. تأكد من فهم المستخدم لكل وظيفة أداة وفرض حدود أمان قوية.

4. **التحكم في أذونات الأدوات**: قم بتكوين الأدوات المسموح للنموذج باستخدامها أثناء الجلسة، لضمان وصول الأدوات المصرح بها فقط.

5. **المصادقة**: تطلب مصادقة صحيحة قبل منح الوصول إلى الأدوات أو الموارد أو العمليات الحساسة باستخدام مفاتيح API أو رموز OAuth أو طرق مصادقة آمنة أخرى.

6. **التحقق من المعلمات**: فرض التحقق لجميع استدعاءات الأدوات لمنع وصول مدخلات مشوهة أو خبيثة إلى تطبيقات الأدوات.

7. **تحديد المعدل**: نفّذ تحديد معدل لمنع سوء الاستخدام وضمان الاستخدام العادل لموارد الخادم.

### أفضل ممارسات التنفيذ

1. **تفاوض القدرات**: أثناء إعداد الاتصال، تبادل المعلومات حول الميزات المدعومة، وإصدارات البروتوكول، والأدوات، والموارد المتاحة.

2. **تصميم الأدوات**: أنشئ أدوات مركزة تقوم بمهمة واحدة بشكل جيد، بدلاً من أدوات متكاملة تعالج عدة اهتمامات.

3. **معالجة الأخطاء**: نفذ رسائل وأكواد خطأ موحدة للمساعدة في تشخيص المشكلات، والتعامل مع الإخفاقات بشكل سلس، وتوفير تعليقات قابلة للتنفيذ.

4. **التسجيل**: قم بتكوين سجلات منظمة للمراجعة، وتصحيح الأخطاء، ومراقبة تفاعلات البروتوكول.

5. **تتبع التقدم**: للعمليات طويلة الأمد، أبلغ عن تحديثات التقدم لتمكين واجهات مستخدم تفاعلية.

6. **إلغاء الطلبات**: اسمح للعملاء بإلغاء الطلبات قيد التنفيذ التي لم تعد مطلوبة أو تأخذ وقتًا طويلاً.

## مراجع إضافية

للحصول على أحدث المعلومات حول أفضل ممارسات MCP، راجع:

- [وثائق MCP](https://modelcontextprotocol.io/)
- [مواصفات MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [مستودع GitHub](https://github.com/modelcontextprotocol)
- [أفضل ممارسات الأمن](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [أعلى 10 مخاطر أمنية في MCP من OWASP](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - المخاطر الأمنية والتدابير الوقائية
- [ورشة MCP Security Summit (شربا)](https://azure-samples.github.io/sherpa/) - تدريب عملي على الأمان

## أمثلة تطبيقية

### أفضل ممارسات تصميم الأدوات

#### 1. مبدأ المسؤولية الواحدة

يجب أن يكون لكل أداة MCP هدف واضح ومركز. بدلاً من إنشاء أدوات متكاملة تحاول معالجة عدة مشكلات، طور أدوات متخصصة تتقن مهامًا محددة.

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

#### 2. التعامل المتسق مع الأخطاء

نفذ معالجة قوية للأخطاء مع رسائل خطأ إعلامية وآليات استرداد مناسبة.

```python
# مثال بايثون مع معالجة أخطاء شاملة
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
                # عملية قاعدة بيانات مع مهلة
                async with timeout(10):  # مهلة 10 ثوانٍ
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
                # أخطاء الاستعلام من المحتمل أن تكون أخطاء من جانب العميل
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # دع أخطاء الأدوات الخاصة تمر
            raise
        except Exception as e:
            # التقاط جميع الأخطاء غير المتوقعة
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # تنفيذ كشف حقن SQL
        pass
        
    def _log_error(self, message, error):
        # تنفيذ تسجيل الأخطاء
        pass
```

#### 3. التحقق من المعلمات

تحقق دائمًا من المعلمات بدقة لمنع المدخلات المشوهة أو الخبيثة.

```javascript
// مثال على JavaScript/TypeScript مع التحقق التفصيلي من المعاملات
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
    // 1. التحقق من وجود المعامل
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. التحقق من أنواع المعاملات
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. التحقق من قيم المعاملات
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
    
    // التنفيذ بناءً على المعاملات التي تم التحقق منها
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // تنفيذ فحص أمان المسار
    // ...
  }
}
```

### أمثلة على تنفيذ الأمان

#### 1. المصادقة والتفويض

```java
// مثال جافا مع المصادقة والتفويض
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // الحقن التبعي
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
        
        // 4. المتابعة بالعملية المصرح بها
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

### 1. اختبار وحدات أدوات MCP

اختبر أدواتك دائمًا بمعزل، محاكياً التبعيات الخارجية:

```typescript
// مثال TypeScript لاختبار وحدة أداة
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // إنشاء خدمة طقس وهمية
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // إنشاء الأداة بالاعتماد الوهمي
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
    
    // تأكيد
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // ترتيب
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // تنفيذ وتأكيد
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. اختبار التكامل

اختبر التدفق الكامل من طلبات العملاء إلى ردود الخادم:

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
        # تنظيف البيانات
        await server.stop()
```

## تحسين الأداء

### 1. استراتيجيات التخزين المؤقت

نفذ التخزين المؤقت المناسب لتقليل التأخير واستهلاك الموارد:

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

#### 2. حقن الاعتمادية وقابلية الاختبار

صمم الأدوات لتتلقى تبعياتها عبر حقن المكوّنات، مما يجعلها قابلة للاختبار والتكوين:

```java
// مثال جافا مع حقن التبعيات
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // التبعيات محقونة من خلال المُنشئ
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

#### 3. أدوات قابلة للتركيب

صمم أدوات يمكن تركيبها معًا لإنشاء سير عمل أكثر تعقيدًا:

```python
# مثال بايثون يوضح الأدوات القابلة للتركيب
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # التنفيذ...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # يمكن لهذه الأداة استخدام النتائج من أداة جلب البيانات
    async def execute_async(self, request):
        # التنفيذ...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # يمكن لهذه الأداة استخدام النتائج من أداة تحليل البيانات
    async def execute_async(self, request):
        # التنفيذ...
        pass

# يمكن استخدام هذه الأدوات بشكل مستقل أو كجزء من سير عمل
```

### أفضل ممارسات تصميم المخططات

المخطط هو العقد بين النموذج وأداتك. تؤدي المخططات المصممة جيدًا إلى سهولة استخدام أفضل للأداة.

#### 1. وصف واضح للمعلمات

ضمن معلومات وصفية لكل معلمة:

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

ضمن قيود تحقق لمنع المدخلات غير الصالحة:

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

#### 3. تناسق في هياكل الاستجابة

حافظ على التناسق في هياكل الاستجابة لتسهيل تفسير النتائج من قبل النماذج:

```python
async def execute_async(self, request):
    try:
        # معالجة الطلب
        results = await self._search_database(request.parameters["query"])
        
        # دائماً إعادة هيكل متسق
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

### التعامل مع الأخطاء

معالجة قوية للأخطاء ضرورية لأدوات MCP للحفاظ على الموثوقية.

#### 1. التعامل الراقي مع الأخطاء

تعامل مع الأخطاء على المستويات المناسبة وقدم رسائل إعلامية:

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

أرجع معلومات خطأ منظمة عند الإمكان:

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

#### 3. منطق المحاولة مجددًا

نفذ منطق إعادة المحاولة المناسب للفشل العابر:

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
                
            # تراجع أُسّي
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # خطأ دائم، لا تحاول مرة أخرى
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### تحسين الأداء

#### 1. التخزين المؤقت

نفذ التخزين المؤقت للعمليات المكلفة:

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

استخدم أنماط البرمجة غير المتزامنة للعمليات التي تعتمد على الإدخال/الإخراج:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // لعمليات طويلة، قم بإرجاع معرف العملية فورًا
        String processId = UUID.randomUUID().toString();
        
        // بدء المعالجة غير المتزامنة
        CompletableFuture.runAsync(() -> {
            try {
                // إجراء العملية الطويلة
                documentService.processDocument(documentId);
                
                // تحديث الحالة (عادةً ما يتم تخزينها في قاعدة بيانات)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // إرجاع استجابة فورية بمعرف العملية
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // أداة فحص حالة مرافقة
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

#### 3. تحديد الموارد

نفذ تحديد الموارد لمنع الحمل الزائد:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # السماح بخمسة طلبات في الثانية
            bucket_size=10        # السماح بتدفقات تصل إلى عشرة طلبات
        )
    
    async def execute_async(self, request):
        # التحقق مما إذا كان بإمكاننا المتابعة أو نحتاج إلى الانتظار
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # إذا كان الانتظار طويلاً جدًا
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # الانتظار لمدة التأخير المناسبة
                await asyncio.sleep(delay)
        
        # استهلاك رمز والمتابعة بالطلب
        self.rate_limiter.consume()
        
        # استدعاء API
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
            
            # حساب الوقت حتى يتوفر الرمز التالي
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

تحقق دائمًا من معلمات الإدخال بدقة:

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

نفذ فحوصات التفويض المناسبة:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // احصل على سياق المستخدم من الطلب
    UserContext user = request.getContext().getUserContext();
    
    // تحقق مما إذا كان لدى المستخدم الأذونات المطلوبة
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // بالنسبة للموارد المحددة، تحقق من الوصول إلى تلك الموارد
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // تابع تنفيذ الأداة
    // ...
}
```

#### 3. التعامل مع البيانات الحساسة

تعامل مع البيانات الحساسة بحذر:

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
        
        # جلب بيانات المستخدم
        user_data = await self.user_service.get_user_data(user_id)
        
        # تصفية الحقول الحساسة ما لم يتم طلبها صراحةً والموافقة عليها
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # التحقق من مستوى التفويض في سياق الطلب
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # إنشاء نسخة لتجنب تعديل النسخة الأصلية
        redacted = user_data.copy()
        
        # حذف حقول حساسة محددة
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # حذف بيانات حساسة متداخلة
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## أفضل ممارسات اختبار أدوات MCP

يضمن الاختبار الشامل أن أدوات MCP تعمل بشكل صحيح، وتعالج الحالات الحدية، وتتكامل بشكل صحيح مع بقية النظام.

### اختبار الوحدات

#### 1. اختبار كل أداة بمعزل

أنشئ اختبارات مركزة لوظائف كل أداة:

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

اختبر أن المخططات صحيحة وتفرض القيود بشكل صحيح:

```java
@Test
public void testSchemaValidation() {
    // إنشاء مثيل الأداة
    SearchTool searchTool = new SearchTool();
    
    // الحصول على المخطط
    Object schema = searchTool.getSchema();
    
    // تحويل المخطط إلى JSON للتحقق
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // التحقق من صحة المخطط كـ JSONSchema
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // اختبار المعاملات الصالحة
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // اختبار المعامل المطلوب المفقود
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // اختبار نوع المعامل غير صالح
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. اختبارات التعامل مع الأخطاء

أنشئ اختبارات محددة لحالات الخطأ:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # رتب
    tool = ApiTool(timeout=0.1)  # مهلة قصيرة جدًا
    
    # تزييف طلب سينتهي وقته
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # أطول من المهلة
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # نفذ وتحقق
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # تحقق من رسالة الاستثناء
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # رتب
    tool = ApiTool()
    
    # تزييف استجابة مقيدة بمعدل
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
        
        # نفذ وتحقق
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # تحقق من أن الاستثناء يحتوي على معلومات عن حد المعدل
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### اختبار التكامل

#### 1. اختبار سلسلة الأدوات

اختبر عمل الأدوات معًا في التراكيب المتوقعة:

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

اختبر خادم MCP مع تسجيل وتشغيل الأدوات بالكامل:

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
        // إنشاء طلب الأداة
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

#### 3. اختبار شامل من البداية للنهاية

اختبر سير العمل الكامل من مطالبات النموذج إلى تنفيذ الأداة:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # ترتيب - إعداد عميل MCP ونموذج محاكاة
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
    
    # استجابة أداة الطقس المحاكاة
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
        
        # تنفيذ
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

#### 1. اختبار التحميل

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
    
    // إعداد JMeter لاختبار التحميل
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // تكوين خطة اختبار JMeter
    HashTree testPlanTree = new HashTree();
    
    // إنشاء خطة اختبار، مجموعة الخيوط، العينات، وما إلى ذلك
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // إضافة عينة HTTP لتنفيذ الأداة
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
    assertTrue(summaryReport.getPercentile(90.0) < 500); // النسبة المئوية 90 < 500 مللي ثانية
}
```

#### 3. المراقبة والتحليل

قم بإعداد مراقبة لتحليل الأداء طويل الأمد:

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
    
    # إضافة وسيطة لتوقيت وتسجيل المقاييس
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # عرض نقطة نهاية المقاييس
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## أنماط تصميم سير عمل MCP

تحسن سير عمل MCP المصمم جيدًا الكفاءة، والموثوقية، وسهولة الصيانة. فيما يلي الأنماط الرئيسية التي يجب اتباعها:

### 1. نمط سلسلة الأدوات

وصل عدة أدوات في تسلسل حيث تصبح مخرجات أداة ما إدخالاً للأداة التالية:

```python
# تنفيذ سلسلة أدوات بايثون
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # قائمة بأسماء الأدوات للتنفيذ بالتسلسل
    
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

### 2. نمط المرسل المركزي

استخدم أداة مركزية توجه إلى أدوات متخصصة بناءً على الإدخال:

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

نفذ عدة أدوات في الوقت ذاته لزيادة الكفاءة:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // الخطوة 1: جلب بيانات وصفية لمجموعة البيانات (بشكل متزامن)
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

### 4. نمط استرداد الخطأ

نفذ استجابات احتياطية سلسة لفشل الأدوات:

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
            # سجّل الفشل
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # التراجع للأداة الثانوية
            try:
                # قد تحتاج إلى تحويل المعلمات للأداة الاحتياطية
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
        # يعتمد هذا التنفيذ على الأدوات المحددة
        # في هذا المثال، سنعيد فقط المعلمات الأصلية
        return params

# مثال على الاستخدام
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # واجهة برمجة تطبيقات الطقس الأساسية (مدفوعة)
        "basicWeatherService",    # واجهة برمجة تطبيقات الطقس الاحتياطية (مجانية)
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

# اختبار خوادم MCP: أفضل الممارسات والنصائح الرئيسية

## نظرة عامة

الاختبار هو جانب حاسم في تطوير خوادم MCP موثوقة وعالية الجودة. يوفر هذا الدليل أفضل الممارسات الشاملة ونصائح لاختبار خوادم MCP الخاصة بك طوال دورة التطوير، من اختبارات الوحدات إلى اختبارات التكامل والتحقق الشامل من البداية للنهاية.

## لماذا الاختبار مهم لخوادم MCP

تعمل خوادم MCP كوسيط حاسم بين نماذج الذكاء الاصطناعي وتطبيقات العملاء. يضمن الاختبار الدقيق:

- الاعتمادية في بيئات الإنتاج
- التعامل الصحيح مع الطلبات والاستجابات
- التنفيذ الصحيح لمواصفات MCP
- الصمود ضد الإخفاقات والحالات الحدية
- أداء ثابت تحت أحمال مختلفة

## اختبار الوحدة لخوادم MCP

### اختبار الوحدة (الأساس)

تتحقق اختبارات الوحدة من مكونات MCP الفردية بمعزل.

#### ماذا تختبر

1. **معالجات الموارد**: اختبار منطق معالجات الموارد بمعزل
2. **تطبيقات الأدوات**: التحقق من سلوك الأدوات مع مدخلات مختلفة
3. **قوالب المطالبات**: التأكد من عرض قوالب المطالبات بشكل صحيح
4. **التحقق من المخطط**: اختبار منطق التحقق من المعلمات
5. **التعامل مع الأخطاء**: التحقق من ردود الأخطاء للمدخلات غير الصالحة

#### أفضل الممارسات لاختبارات الوحدة

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
# مثال على اختبار وحدة لأداة آلة حاسبة في بايثون
def test_calculator_tool_add():
    # ترتيب
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # تنفيذ
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # تحقق
    assert result["value"] == 12
```

### اختبار التكامل (الطبقة المتوسطة)

تتحقق اختبارات التكامل من التفاعلات بين مكونات خادم MCP.

#### ماذا تختبر

1. **تهيئة الخادم**: اختبار بدء التشغيل مع تكوينات مختلفة
2. **تسجيل المسارات**: التحقق من تسجيل جميع النقاط النهائية بشكل صحيح
3. **معالجة الطلبات**: اختبار دورة الطلب-الاستجابة كاملة
4. **انتشار الأخطاء**: التأكد من معالجة الأخطاء بشكل صحيح عبر المكونات
5. **المصادقة والتفويض**: اختبار آليات الأمان

#### أفضل الممارسات لاختبارات التكامل

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

### اختبار من البداية للنهاية (الطبقة العليا)

تتحقق اختبارات من البداية للنهاية من سلوك النظام الكامل من العميل إلى الخادم.

#### ماذا تختبر

1. **الاتصال بين العميل والخادم**: اختبار دورات الطلب-الاستجابة كاملة
2. **SDKs العملاء الحقيقية**: الاختبار باستخدام تطبيقات العميل الفعلية
3. **الأداء تحت الحمل**: التحقق من السلوك مع طلبات متزامنة متعددة
4. **استرداد الأخطاء**: اختبار استرداد النظام من الإخفاقات
5. **العمليات طويلة الأمد**: التحقق من التعامل مع البث والعمليات الطويلة

#### أفضل الممارسات لاختبارات E2E

```typescript
// مثال على اختبار نهاية إلى نهاية مع عميل في تايب سكريبت
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
    // تنفيذ
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // تأكيد
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## استراتيجيات المحاكاة لاختبار MCP

المحاكاة ضرورية لعزل المكونات أثناء الاختبار.

### المكونات التي يجب محاكاتها

1. **نماذج الذكاء الاصطناعي الخارجية**: محاكاة ردود النماذج لاختبار قابل للتوقع
2. **الخدمات الخارجية**: محاكاة تبعيات API (قواعد البيانات، خدمات الطرف الثالث)
3. **خدمات المصادقة**: محاكاة موفري الهوية
4. **موفرو الموارد**: محاكاة معالجات الموارد المكلفة

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
# مثال بيثون مع unittest.mock
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # تكوين الموك
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # استخدام الموك في الاختبار
    server = McpServer(model_client=mock_model)
    # متابعة الاختبار
```

## اختبار الأداء

اختبار الأداء ضروري لخوادم MCP في الإنتاج.

### ما الذي يجب قياسه

1. **الكمون**: زمن استجابة الطلبات
2. **الإنتاجية**: الطلبات المعالجة في الثانية
3. **استهلاك الموارد**: استخدام CPU، والذاكرة، والشبكة
4. **تعامل التزامن**: السلوك تحت الطلبات المتوازية
5. **خصائص التوسع**: الأداء مع زيادة الحمل

### أدوات اختبار الأداء

- **k6**: أداة اختبار تحميل مفتوحة المصدر
- **JMeter**: اختبار الأداء الشامل
- **Locust**: اختبار تحميل بلغة البايثون
- **Azure Load Testing**: اختبار الأداء على السحابة

### مثال: اختبار تحميل أساسي باستخدام k6

```javascript
// برنامج k6 لاختبار التحميل على خادم MCP
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

أتمتة اختباراتك تضمن جودة ثابتة وسرعة في التغذية الراجعة.

### دمج CI/CD

1. **تشغيل اختبارات الوحدة على طلبات السحب**: لضمان عدم تعطل الوظائف القائمة
2. **اختبارات التكامل في بيئة الاختبار**: تشغيل اختبارات التكامل في بيئات ما قبل الإنتاج  
3. **خطوط أساس الأداء**: الحفاظ على معايير الأداء لاكتشاف التراجع  
4. **فحوصات الأمان**: أتمتة اختبارات الأمان كجزء من خط الأنابيب  

### مثال على خط أنابيب التكامل المستمر (GitHub Actions)

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
  
## اختبار الالتزام بمواصفات MCP  

تحقق من أن الخادم الخاص بك ينفذ مواصفات MCP بشكل صحيح.  

### مجالات الالتزام الرئيسية  

1. **نقاط النهاية لواجهة برمجة التطبيقات**: اختبار النقاط المطلوبة (/resources، /tools، إلخ)  
2. **تنسيق الطلب/الاستجابة**: التحقق من الالتزام بالمخطط  
3. **رموز الخطأ**: التحقق من رموز الحالة الصحيحة لمختلف السيناريوهات  
4. **أنواع المحتوى**: اختبار التعامل مع أنواع المحتوى المختلفة  
5. **تدفق المصادقة**: التحقق من آليات المصادقة المتوافقة مع المواصفات  

### مجموعة اختبارات الالتزام  

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

1. **اختبر تعريفات الأدوات بشكل منفصل**: تحقق من تعريفات المخطط بشكل مستقل عن منطق الأداة  
2. **استخدم اختبارات معلماتية**: اختبار الأدوات مع مجموعة متنوعة من المدخلات بما في ذلك الحالات الحافة  
3. **تحقق من استجابات الأخطاء**: التحقق من التعامل الصحيح مع الأخطاء في جميع حالات الخطأ الممكنة  
4. **اختبر منطق التفويض**: التأكد من التحكم السليم في الوصول لأدوار المستخدم المختلفة  
5. **راقب تغطية الاختبارات**: استهدف تغطية عالية لشفرة المسار الحرج  
6. **اختبر استجابات البث**: تحقق من التعامل الصحيح مع المحتوى المتدفق  
7. **حاكي مشاكل الشبكة**: اختبر السلوك في ظروف الشبكة الضعيفة  
8. **اختبر حدود الموارد**: تحقق من السلوك عند الوصول إلى الحصص أو حدود السعر  
9. **أتمتة اختبارات التراجع**: انشئ مجموعة اختبارات تعمل عند كل تغيير في الشفرة  
10. **وثق حالات الاختبار**: حافظ على توثيق واضح لسيناريوهات الاختبار  

## المشكلات الشائعة في الاختبار  

- **الاعتماد المفرط على اختبار المسار السعيد**: تأكد من اختبار حالات الخطأ بدقة  
- **تجاهل اختبارات الأداء**: تحديد نقاط الاختناق قبل تأثيرها على الإنتاج  
- **الاختبار في عزلة فقط**: دمج اختبارات الوحدة، التكامل، والنهائية  
- **تغطية واجهة برمجة التطبيقات غير كاملة**: تأكد من اختبار جميع النقاط والميزات  
- **بيئات اختبار غير متناسقة**: استخدم الحاويات لضمان بيئات اختبار متناسقة  

## الخلاصة  

تعد استراتيجية اختبار شاملة ضرورية لتطوير خوادم MCP موثوقة وعالية الجودة. من خلال تطبيق أفضل الممارسات والنصائح الموضحة في هذا الدليل، يمكنك ضمان أن تنفيذات MCP الخاصة بك تلبي أعلى معايير الجودة والموثوقية والأداء.  

## النقاط الرئيسية  

1. **تصميم الأدوات**: اتبع مبدأ المسؤولية الواحدة، استخدم حقن التبعيات، وصمم للتركيب  
2. **تصميم المخطط**: أنشئ مخططات واضحة وموثقة جيدًا مع قيود تحقق مناسبة  
3. **معالجة الأخطاء**: نفذ معالجة أخطاء مرنة، واستجابات خطأ منظمة، ومنطق إعادة المحاولة  
4. **الأداء**: استخدم التخزين المؤقت، المعالجة غير المتزامنة، وتقييد الموارد  
5. **الأمان**: طبق تحقق شامل من المدخلات، فحوصات التفويض، وتعامل مع البيانات الحساسة  
6. **الاختبار**: أنشئ اختبارات شاملة للوحدة، التكامل، والنهائية  
7. **أنماط سير العمل**: طبق الأنماط المعروفة مثل السلاسل، الموزعين، والمعالجة المتوازية  

## التمرين  

صمم أداة MCP وسير عمل لنظام معالجة المستندات الذي:  

1. يقبل مستندات بصيغ متعددة (PDF, DOCX, TXT)  
2. يستخرج النص والمعلومات الرئيسية من المستندات  
3. يصنف المستندات حسب النوع والمحتوى  
4. ينشئ ملخصًا لكل مستند  

نفذ مخططات الأداة، معالجة الأخطاء، وأنماط سير العمل التي تناسب هذا السيناريو. فكر في كيفية اختبار هذا التنفيذ.  

## الموارد  

1. انضم إلى مجتمع MCP على [Microsoft Foundry Discord Community](https://aka.ms/foundrydevs) للبقاء على اطلاع بأحدث التطورات  
2. ساهم في مشاريع [MCP مفتوحة المصدر](https://github.com/modelcontextprotocol)  
3. طبق مبادئ MCP في مبادرات الذكاء الاصطناعي في منظمتك  
4. استكشف تطبيقات MCP المتخصصة لصناعتك  
5. فكر في الالتحاق بدورات متقدمة حول مواضيع MCP محددة، مثل التكامل متعدد الوسائط أو تكامل تطبيقات المؤسسات  
6. جرب بناء أدوات MCP وسير العمل الخاصة بك باستخدام المبادئ التي تعلمتها من خلال [مختبر التدريب العملي](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)  

## التالي  

التالي: [دراسات الحالة](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**تنويه**:
تمت ترجمة هذا المستند باستخدام خدمة الترجمة بالذكاء الاصطناعي [Co-op Translator](https://github.com/Azure/co-op-translator). بينما نسعى للدقة، يرجى العلم أن الترجمات الآلية قد تحتوي على أخطاء أو عدم دقة. يجب اعتبار المستند الأصلي بلغته الأصلية المصدر الرسمي والمعتمد. للمعلومات الهامة، يُنصح بالاستعانة بترجمة بشرية محترفة. نحن غير مسؤولين عن أي سوء فهم أو تفسير ناتج عن استخدام هذه الترجمة.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->