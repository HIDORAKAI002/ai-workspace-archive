# MCP کی ترقی کے بہترین طریقے

[![MCP کی ترقی کے بہترین طریقے](../../../translated_images/ur/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(اس سبق کی ویڈیو دیکھنے کے لیے اوپر تصویر پر کلک کریں)_

## جائزہ

یہ سبق پروڈکشن ماحول میں MCP سرورز اور خصوصیات کی ترقی، ٹیسٹنگ، اور تعیناتی کے لیے اعلیٰ درجے کے بہترین طریقوں پر مرکوز ہے۔ جیسا کہ MCP ماحولیاتی نظام پیچیدگی اور اہمیت میں بڑھتا ہے، قائم کردہ نمونوں کی پیروی کرنا قابل اعتبار، قابلِ بحالی، اور بین العملیت کو یقینی بناتا ہے۔ یہ سبق حقیقی دنیا کی MCP نفاذات سے حاصل شدہ عملی حکمتِ عملی کو یکجا کرتا ہے تاکہ آپ کو مستحکم، موثر سرورز تخلیق کرنے میں رہنمائی فراہم کی جائے جن میں مؤثر وسائل، پروپمٹ، اور اوزار شامل ہوں۔

## سیکھنے کے مقاصد

اس سبق کے اختتام تک، آپ قابل ہو جائیں گے:

- MCP سرور اور فیچر کے ڈیزائن میں صنعتی بہترین طریقے اپنانا
- MCP سرورز کے لیے جامع ٹیسٹنگ حکمت عملی تیار کرنا
- پیچیدہ MCP ایپلیکیشنز کے لیے موثر، دوبارہ استعمال کے قابل ورک فلو پیٹرنز ڈیزائن کرنا
- MCP سرورز میں مناسب غلطی ہینڈلنگ، لاگنگ، اور قابلِ مشاہدہ کاری نافذ کرنا
- کارکردگی، سیکیورٹی، اور قابلِ بحالی کے لیے MCP نفاذات کو بہتر بنانا

## MCP کے بنیادی اصول

خصوصی نفاذی طریقوں میں جانے سے پہلے، ان بنیادی اصولوں کو سمجھنا ضروری ہے جو مؤثر MCP ترقی کی رہنمائی کرتے ہیں:

1. **معیاری رابطہ**: MCP JSON-RPC 2.0 کو بنیاد کے طور پر استعمال کرتا ہے، جو تمام نفاذات میں درخواستوں، جوابات، اور غلطی ہینڈلنگ کے لیے ایک مستقل فارمیٹ فراہم کرتا ہے۔

2. **صارف مرکزیت کا ڈیزائن**: ہمیشہ اپنے MCP نفاذات میں صارف کی رضا، کنٹرول، اور شفافیت کو اولین ترجیح دیں۔

3. **سیکیورٹی پہلے**: مستحکم سیکیورٹی اقدامات نافذ کریں جن میں تصدیق، اجازت، توثیق، اور ریٹ لمٹنگ شامل ہیں۔

4. **ماڈیولر فن تعمیر**: اپنے MCP سرورز کو ماڈیولر نقطہ نظر سے ڈیزائن کریں، جہاں ہر ٹول اور وسیلہ کا ایک واضح اور مخصوص مقصد ہو۔

5. **ریاست دار کنکشنز**: متعدد درخواستوں کے درمیان حالت کو برقرار رکھنے کی MCP کی صلاحیت سے فائدہ اٹھائیں تاکہ زیادہ مربوط اور سیاق و سباق سے واقف تعاملات ممکن ہوں۔

## سرکاری MCP بہترین طریقے

مندرجہ ذیل بہترین طریقے ماڈل کانٹیکسٹ پروٹوکول کی سرکاری دستاویزات سے ماخوذ ہیں:

### سیکیورٹی کے بہترین طریقے

1. **صارف کی رضا اور کنٹرول**: ڈیٹا تک رسائی یا کارروائیاں انجام دینے سے پہلے ہمیشہ واضح صارف کی رضا طلب کریں۔ واضح کنٹرول فراہم کریں کہ کون سا ڈیٹا شیئر کیا جائے اور کونسی کارروائیاں مجاز ہوں۔

2. **ڈیٹا کی رازداری**: صرف واضح رضامندی کے ساتھ صارف کا ڈیٹا ظاہر کریں اور اسے مناسب رسائی کنٹرولز سے محفوظ رکھیں۔ غیر مجاز ڈیٹا کی منتقلی سے بچاؤ کریں۔

3. **آلات کی سلامتی**: کسی بھی ٹول کو کال کرنے سے پہلے واضح صارف کی رضا حاصل کریں۔ صارفین کو ہر ٹول کی فعالیت سمجھائیں اور مستحکم سیکیورٹی حدود نافذ کریں۔

4. **ٹول اجازت کنٹرول**: سیشن کے دوران کون سے ٹولز استعمال کیے جا سکتے ہیں اس کی وضاحت کریں تاکہ صرف واضح طور پر مجاز ٹولز قابل رسائی ہوں۔

5. **تصدیق**: ٹولز، وسائل، یا حساس کارروائیوں تک رسائی دینے سے پہلے مناسب تصدیق کا مطالبہ کریں، جیسے API کیز، OAuth ٹوکنز، یا دیگر محفوظ طریقے۔

6. **پیرا میٹر کی توثیق**: تمام ٹول کالز کے لیے توثیق نافذ کریں تاکہ خراب یا نقصان دہ ان پٹ ٹول نفاذات تک نہ پہنچ سکے۔

7. **ریٹ لمٹنگ**: غلط استعمال سے بچاؤ کے لیے اور سرور وسائل کی منصفانہ استعمال کو یقینی بنانے کے لیے ریٹ لمٹنگ نافذ کریں۔

### نفاذ کے بہترین طریقے

1. **صلاحیت کی بات چیت**: کنکشن قائم کرتے وقت، سپورٹ شدہ خصوصیات، پروٹوکول ورژنز، دستیاب ٹولز، اور وسائل کے بارے میں معلومات کا تبادلہ کریں۔

2. **ٹول ڈیزائن**: ایسے ٹول تیار کریں جو ایک کام پر واضح توجہ دیں، بجائے اس کے کہ کثیر الجہتی مسائل کو سنبھالنے والے بڑے ٹولز بنائیں۔

3. **غلطی ہینڈلنگ**: معیاری غلطی پیغامات اور کوڈز نافذ کریں تاکہ مسائل کی نشاندہی، ہموار ناکامیوں کا انتظام، اور قابل عمل فیڈبیک فراہم کیا جا سکے۔

4. **لاگنگ**: آڈٹ، ڈیبگنگ، اور پروٹوکول تعاملات کی نگرانی کے لیے منظم لاگز ترتیب دیں۔

5. **ترقی کی نگرانی**: طویل دورانیے کی کارروائیوں کے لیے ترقی کی تازہ کاری رپورٹ کریں تاکہ صارف کے انٹرفیس کو فوری ردعمل دیا جا سکے۔

6. **درخواست منسوخی**: کلائنٹس کو اجازت دیں کہ وہ فضول یا طویل عرصے سے جاری درخواستوں کو منسوخ کر سکیں۔

## اضافی حوالہ جات

MCP کے بہترین طریقوں پر تازہ ترین معلومات کے لیے رجوع کریں:

- [MCP دستاویزات](https://modelcontextprotocol.io/)
- [MCP وضاحت (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [گٹ ہب ریپوزیٹری](https://github.com/modelcontextprotocol)
- [سیکیورٹی کے بہترین طریقے](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP ٹاپ 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - سیکیورٹی خطرات اور ان کا تدارک
- [MCP سیکیورٹی سمٹ ورکشاپ (شرپا)](https://azure-samples.github.io/sherpa/) - عملی سیکیورٹی تربیت

## عملی نفاذ کی مثالیں

### ٹول ڈیزائن کے بہترین طریقے

#### 1. واحد ذمہ داری کا اصول

ہر MCP ٹول کا ایک واضح اور مخصوص مقصد ہونا چاہیے۔ کثیر الجہتی مسائل سنبھالنے والے بڑے ٹولز بنانے کی بجائے، مخصوص کاموں میں مہارت رکھنے والے منتخب شدہ ٹول تیار کریں۔

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

#### 2. یکساں غلطی ہینڈلنگ

مضبوط غلطی ہینڈلنگ نافذ کریں جس میں معلوماتی غلطی پیغامات اور مناسب بازیابی کے طریقے شامل ہوں۔

```python
# پایتھن کی مثال مکمل ایرر ہینڈلنگ کے ساتھ
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # پیرامیٹر کی تصدیق
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # سیکیورٹی کی تصدیق
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # ڈیٹا بیس آپریشن وقت کی حد کے ساتھ
                async with timeout(10):  # 10 سیکنڈ کی وقت کی حد
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # کنکشن کی غلطیاں عارضی ہو سکتی ہیں
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # سوال کی غلطیاں ممکنہ طور پر کلائنٹ کی غلطیاں ہیں
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # ٹول مخصوص غلطیوں کو گزرنے دیں
            raise
        except Exception as e:
            # غیر متوقع غلطیوں کے لیے مکمل گرفت
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # ایس کیو ایل انجیکشن کے پتہ لگانے کا نفاذ
        pass
        
    def _log_error(self, message, error):
        # غلطی کی لاگنگ کا نفاذ
        pass
```

#### 3. پیرا میٹر کی توثیق

ہمیشہ پیرا میٹرز کی مکمل جانچ پڑتال کریں تاکہ خراب یا نقصان دہ ان پٹ سے بچا جا سکے۔

```javascript
// تفصیلی پیرامیٹر کی توثیق کے ساتھ جاوا اسکرپٹ/ٹائپ اسکرپٹ کی مثال
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
    // 1. پیرامیٹر کی موجودگی کی تصدیق کریں
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. پیرامیٹر کی اقسام کی تصدیق کریں
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. پیرامیٹر کی قدروں کی تصدیق کریں
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. تحریری عمل کے لیے مواد کی موجودگی کی تصدیق کریں
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. راستے کی حفاظت کی توثیق
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // توثیق شدہ پیرامیٹروں کی بنیاد پر نفاذ
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // راستے کی حفاظت کے چیک کا نفاذ
    // ...
  }
}
```

### سیکیورٹی نفاذ کی مثالیں

#### 1. تصدیق اور اجازت

```java
// تصدیق اور اجازت کے ساتھ جاوا مثال
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // انحصار انجیکشن
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
        // 1. تصدیقی سیاق و سباق نکالیں
        String authToken = request.getContext().getAuthToken();
        
        // 2. صارف کی تصدیق کریں
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. مخصوص آپریشن کے لیے اجازت چیک کریں
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. مجاز آپریشن کے ساتھ آگے بڑھیں
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

#### 2. ریٹ لمٹنگ

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

## ٹیسٹنگ کے بہترین طریقے

### 1. یونٹ ٹیسٹنگ MCP ٹولز

ہمیشہ اپنے ٹولز کو تنہائی میں ٹیسٹ کریں، بیرونی انحصار کو موک کریں:

```typescript
// ٹائپ اسکرپٹ کی مثال ایک ٹول یونٹ ٹیسٹ کی
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // ایک جعلی موسمی سروس بنائیں
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // ٹول کو جعلی انحصار کے ساتھ بنائیں
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // ترتیب دیں
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // عمل کریں
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // یقین دہانی کریں
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // ترتیب دیں
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // عمل کریں اور یقین دہانی کریں
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. انٹیگریشن ٹیسٹنگ

کلائنٹ کی درخواستوں سے سرور کے جوابات تک مکمل عمل کو ٹیسٹ کریں:

```python
# پائیتھن انٹیگریشن ٹیسٹ کی مثال
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # ایک ٹیسٹ سرور شروع کریں
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # ایک کلائنٹ بنائیں
        client = McpClient("http://localhost:5000")
        
        # ٹول کی دریافت کا ٹیسٹ کریں
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # ٹول کی اجرا کا ٹیسٹ کریں
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # جواب کی تصدیق کریں
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # صفائی کریں
        await server.stop()
```

## کارکردگی کی بہتری

### 1. کیشنگ حکمت عملی

تاخیر کو کم کرنے اور وسائل کی کھپت کم کرنے کے لیے مناسب کیشنگ نافذ کریں:

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

#### 2. انحصار کی انجیکشن اور قابلِ ٹیسٹ ہونا

ٹولز کو اپنے انحصارات کنسٹرکٹر انجیکشن کے ذریعے وصول کرنے کے لیے ڈیزائن کریں، تاکہ وہ ٹیسٹ کے قابل اور ترتیب پذیر ہوں:

```java
// جیوہ مثال انحصار انجیکشن کے ساتھ
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // انحصار کنسٹرکٹر کے ذریعے انجیکٹ کیے گئے
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // آلہ کی عملداری
    // ...
}
```

#### 3. ترکیبی ٹولز

ایسے ٹولز ڈیزائن کریں جو ایک ساتھ مرکب ہو کر زیادہ پیچیدہ ورک فلو بنا سکیں:

```python
# پائتھون کی مثال جو مرکب اوزار دکھاتی ہے
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # نفاذ...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # یہ آلہ dataFetch آلے کے نتائج استعمال کر سکتا ہے
    async def execute_async(self, request):
        # نفاذ...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # یہ آلہ dataAnalysis آلے کے نتائج استعمال کر سکتا ہے
    async def execute_async(self, request):
        # نفاذ...
        pass

# یہ اوزار آزادانہ طور پر یا کام کے بہاؤ کے حصے کے طور پر استعمال کیے جا سکتے ہیں
```

### اسکیمہ ڈیزائن کے بہترین طریقے

اسکیمہ ماڈل اور آپ کے ٹول کے درمیان معاہدہ ہے۔ اچھے ڈیزائن شدہ اسکیمے بہتر ٹول استعمالیت کی طرف لے جاتے ہیں۔

#### 1. واضح پیرا میٹر کی وضاحت

ہمیشہ ہر پیرا میٹر کے لیے وضاحتی معلومات شامل کریں:

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

#### 2. توثیق کی پابندیاں

غلط ان پٹ کو روکنے کے لیے توثیق پابندیاں شامل کریں:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // ای میل کی خصوصیت جس میں فارمیٹ کی تصدیق ہو
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // عمر کی خصوصیت جو عددی پابندیوں کے ساتھ ہو
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // گنا گیا خاصہ
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

#### 3. یکساں واپسی کا ڈھانچہ

اپنے جواب کے ڈھانچے میں تسلسل برقرار رکھیں تاکہ ماڈلز کے لیے نتائج کی تشریح آسان ہو:

```python
async def execute_async(self, request):
    try:
        # درخواست کو پراسیس کریں
        results = await self._search_database(request.parameters["query"])
        
        # ہمیشہ ایک مستقل ساخت واپس کریں
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

### غلطی ہینڈلنگ

مضبوط غلطی ہینڈلنگ MCP ٹولز کی قابل اعتماد برقرار رکھنے کے لیے ضروری ہے۔

#### 1. نرمی سے غلطی سنبھالنا

مناسب سطحوں پر غلطیوں کو ہینڈل کریں اور معلوماتی پیغامات فراہم کریں:

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

#### 2. منظم غلطی کے جوابات

ممکن ہو تو منظم غلطی کی معلومات واپس کریں:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // نفاذ
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
        
        // دیگر استثنیات کو دوبارہ ToolExecutionException کے طور پر پھینکیں
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. دوبارہ کوشش کرنے کی منطق

عارضی ناکامیوں کے لیے مناسب دوبارہ کوشش کی منطق نافذ کریں:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # سیکنڈ
    
    while retry_count < max_retries:
        try:
            # بیرونی API کو کال کریں
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # نمایاں پسپائی
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # مستقل غلطی نہیں، دوبارہ کوشش نہ کریں
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### کارکردگی کی بہتری

#### 1. کیشنگ

مہنگی کارروائیوں کے لیے کیشنگ نافذ کریں:

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

#### 2. غیر ہم وقت ساز عمل کاری

I/O سے منسلک کارروائیوں کے لیے غیر ہم وقت ساز پروگرامنگ کے نمونے استعمال کریں:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // طویل چلنے والے آپریشنز کے لیے، فوری طور پر پروسیسنگ آئی ڈی واپس کریں
        String processId = UUID.randomUUID().toString();
        
        // غیر متزامن پراسیسنگ شروع کریں
        CompletableFuture.runAsync(() -> {
            try {
                // طویل چلنے والا آپریشن انجام دیں
                documentService.processDocument(documentId);
                
                // حالت کو اپ ڈیٹ کریں (عام طور پر ڈیٹابیس میں محفوظ کی جاتی ہے)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // پروسیس آئی ڈی کے ساتھ فوری جواب واپس کریں
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // ساتھی اسٹیٹس چیک کا آلہ
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

#### 3. وسائل کی محدودیت

اوور لوڈ سے بچنے کے لیے وسائل کی محدودیت نافذ کریں:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # ہر سیکنڈ 5 درخواستوں کی اجازت دیں
            bucket_size=10        # زیادہ سے زیادہ 10 درخواستوں کی اجازت دیں
        )
    
    async def execute_async(self, request):
        # چیک کریں کہ کیا ہم آگے بڑھ سکتے ہیں یا انتظار کرنا ہوگا
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # اگر انتظار بہت زیادہ ہو
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # مناسب تاخیر کے وقت کا انتظار کریں
                await asyncio.sleep(delay)
        
        # ایک ٹوکن استعمال کریں اور درخواست کے ساتھ آگے بڑھیں
        self.rate_limiter.consume()
        
        # API کو کال کریں
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
            
            # اگلے دستیاب ٹوکن تک وقت کا حساب لگائیں
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # گزرے ہوئے وقت کی بنیاد پر نئے ٹوکن شامل کریں
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### سیکیورٹی کے بہترین طریقے

#### 1. ان پٹ کی توثیق

ہمیشہ ان پٹ پیرا میٹرز کو مکمل طور پر جانچیں:

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

#### 2. اجازت کی جانچ

مناسب اجازت کی جانچ کریں:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // درخواست سے صارف کا سیاق و سباق حاصل کریں
    UserContext user = request.getContext().getUserContext();
    
    // چیک کریں کہ صارف کے پاس مطلوبہ اجازتیں ہیں
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // مخصوص وسائل کے لیے، اس وسیلہ تک رسائی چیک کریں
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // ٹول کے نفاذ کے ساتھ آگے بڑھیں
    // ...
}
```

#### 3. حساس ڈیٹا کا انتظام

حساس ڈیٹا کو احتیاط سے سنبھالیں:

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
        
        # صارف کا ڈیٹا حاصل کریں
        user_data = await self.user_service.get_user_data(user_id)
        
        # حساس فیلڈز کو فلٹر کریں جب تک کہ واضح طور پر درخواست نہ کی گئی ہو اور اجازت یافتہ نہ ہو
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # درخواست کے سیاق و سباق میں اجازت کی سطح کی جانچ کریں
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # اصل کو تبدیل کرنے سے بچنے کے لیے ایک نقل بنائیں
        redacted = user_data.copy()
        
        # مخصوص حساس فیلڈز کو مخفی کریں
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # اندرونی حساس ڈیٹا کو مخفی کریں
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## MCP ٹولز کے لیے ٹیسٹنگ کے بہترین طریقے

جامع ٹیسٹنگ یقینی بناتی ہے کہ MCP ٹولز درست کام کریں، کنارے کے معاملات کو ہینڈل کریں، اور نظام کے بقایا حصوں کے ساتھ مناسب انضمام کرتے ہوں۔

### یونٹ ٹیسٹنگ

#### 1. ہر ٹول کو تنہائی میں ٹیسٹ کریں

ہر ٹول کی فعالیت کے لیے مرکوز ٹیسٹ بنائیں:

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

#### 2. اسکیمہ کی توثیق کی ٹیسٹنگ

ٹیسٹ کریں کہ اسکیمے درست اور پابندیاں مناسب طریقے سے نافذ کرتے ہیں:

```java
@Test
public void testSchemaValidation() {
    // اوزار کا ایک نمونہ بنائیں
    SearchTool searchTool = new SearchTool();
    
    // خاکہ حاصل کریں
    Object schema = searchTool.getSchema();
    
    // درستگی کے لیے خاکے کو JSON میں تبدیل کریں
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // تصدیق کریں کہ خاکہ جائز JSONSchema ہے
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // درست پیرامیٹرز کا ٹیسٹ کریں
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // ضروری پیرامیٹر کے غائب ہونے کا ٹیسٹ کریں
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // غلط پیرامیٹر قسم کا ٹیسٹ کریں
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. غلطی ہینڈلنگ کے ٹیسٹ

غلطی کی حالتوں کے لیے مخصوص ٹیسٹ بنائیں:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # ترتیب دیں
    tool = ApiTool(timeout=0.1)  # بہت چھوٹا وقت ختم ہونا
    
    # ایک درخواست کا مذاق بنائیں جو وقت ختم ہو جائے گی
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # وقت کے ختم ہونے سے زیادہ طویل
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # عمل کریں اور تصدیق کریں
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # استثناء کا پیغام تصدیق کریں
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # ترتیب دیں
    tool = ApiTool()
    
    # ریٹ-لمیٹڈ جواب کا مذاق بنائیں
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
        
        # عمل کریں اور تصدیق کریں
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # استثناء میں ریٹ لمٹ کی معلومات موجود ہونے کی تصدیق کریں
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### انٹیگریشن ٹیسٹنگ

#### 1. ٹول چین ٹیسٹنگ

متوقع امتزاج میں ٹولز کے ایک ساتھ کام کرنے کی جانچ کریں:

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

#### 2. MCP سرور ٹیسٹنگ

مکمل ٹول رجسٹریشن اور عمل درآمد کے ساتھ MCP سرور کو ٹیسٹ کریں:

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
        // انکشاف اینڈ پوائنٹ کا امتحان کریں
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // ٹول درخواست بنائیں
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // درخواست بھیجیں اور جواب کی تصدیق کریں
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // غلط ٹول درخواست بنائیں
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // "b" پیرا میٹر غائب ہے
        request.put("parameters", parameters);
        
        // درخواست بھیجیں اور غلطی کے جواب کی تصدیق کریں
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. اختتام سے اختتام تک ٹیسٹنگ

ماڈل کے پروپمٹ سے ٹول کے اجرا تک مکمل ورک فلو کی جانچ کریں:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # ترتیب دیں - MCP کلائنٹ اور جعلی ماڈل سیٹ اپ کریں
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # جعلی ماڈل کے جوابات
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
    
    # جعلی موسمی آلے کا جواب
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
        
        # عمل کریں
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # تصدیق کریں
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### کارکردگی کی جانچ

#### 1. لوڈ ٹیسٹنگ

ٹیسٹ کریں کہ آپ کا MCP سرور کتنی بیک وقت درخواستیں سنبھال سکتا ہے:

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

#### 2. دباؤ ٹیسٹنگ

انتہائی لوڈ میں نظام کو ٹیسٹ کریں:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // JMeter کو اسٹریس ٹیسٹنگ کے لیے ترتیب دیں
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // JMeter ٹیسٹ پلان تشکیل دیں
    HashTree testPlanTree = new HashTree();
    
    // ٹیسٹ پلان، تھریڈ گروپ، سیمپلرز وغیرہ بنائیں
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // ٹول کے اجرا کے لیے HTTP سیمپلر شامل کریں
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // لسٹنرز شامل کریں
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // ٹیسٹ چلائیں
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // نتائج کی تصدیق کریں
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // اوسط ردعمل کا وقت < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90ویں پرسنٹائل < 500ms
}
```

#### 3. نگرانی اور پروفائلنگ

طویل مدتی کارکردگی کے تجزیے کے لیے نگرانی قائم کریں:

```python
# MCP سرور کے لیے نگرانی ترتیب دیں
def configure_monitoring(server):
    # Prometheus میٹرکس سیٹ کریں
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
    
    # میٹرکس کی وقت ناپنے اور ریکارڈنگ کے لیے مڈل ویئر شامل کریں
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # میٹرکس اینڈ پوائنٹ کو ظاہر کریں
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP ورک فلو ڈیزائن پیٹرنز

اچھی طرح ڈیزائن شدہ MCP ورک فلو کارکردگی، قابل اعتماد، اور قابلِ بحالی کو بہتر بناتے ہیں۔ یہاں کلیدی پیٹرنز ہیں جن کی پیروی کریں:

### 1. ٹولز کی زنجیر کا نمونہ

متعدد ٹولز کو اس طرح سلسلہ وار جوڑیں کہ ہر ٹول کی پیداوار اگلے کے ان پٹ بن جائے:

```python
# پائتھن چین آف ٹولز کا نفاذ
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # ٹولز کے ناموں کی فہرست جو ترتیب سے چلائی جائے
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # چین میں ہر ٹول کو چلائیں، پچھلا نتیجہ پاس کرتے ہوئے
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # نتیجہ محفوظ کریں اور اگلے ٹول کے لیے ان پٹ کے طور پر استعمال کریں
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# مثال کے طور پر استعمال
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

### 2. ڈسپیچر پیٹرن

مرکزی ٹول استعمال کریں جو ان پٹ کی بنیاد پر مخصوص ٹولز کو ڈسپیچ کرتا ہے:

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

### 3. متوازی عمل کاری کا نمونہ

کارکردگی کے لیے متعدد ٹولز کو بیک وقت چلائیں:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // مرحلہ 1: ڈیٹا سیٹ کے میٹا ڈیٹا کو بازیافت کریں (ہم وقت ساز)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // مرحلہ 2: متعدد تجزیے متوازی طور پر شروع کریں
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
        
        // تمام متوازی کاموں کے مکمل ہونے کا انتظار کریں
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // مکمل ہونے کا انتظار کریں
        
        // مرحلہ 3: نتائج کو یکجا کریں
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // مرحلہ 4: خلاصہ رپورٹ تیار کریں
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // مکمل ورک فلو نتیجہ واپس کریں
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. غلطی کی بازیابی کا نمونہ

ٹول کی ناکامیوں کے لیے نرمی سے متبادل راستے نافذ کریں:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # پہلے بنیادی آلے کو آزمائیں
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # ناکامی کو لاگ کریں
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # دوسرے آلے پر واپس جائیں
            try:
                # واپس جانے والے آلے کے لیے پیرامیٹرز کو تبدیل کرنے کی ضرورت ہو سکتی ہے
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # دونوں آلات ناکام ہو گئے
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # اس نفاذ کا انحصار مخصوص آلات پر ہوگا
        # اس مثال کے لیے، ہم صرف اصل پیرامیٹرز واپس کریں گے
        return params

# استعمال کی مثال
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # بنیادی (ادا شدہ) موسم کا API
        "basicWeatherService",    # واپس جانے والا (مفت) موسم کا API
        {"location": location}
    )
```

### 5. ورک فلو ترکیب پیٹرن

سادہ ورکس کو ملا کر پیچیدہ ورک فلو تیار کریں:

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

# MCP سرورز کی ٹیسٹنگ: بہترین طریقے اور اعلیٰ نکات

## جائزہ

ٹیسٹنگ MCP سرورز کی ترقی میں قابل اعتماد، اعلیٰ معیار کے قیام کا ایک اہم پہلو ہے۔ یہ رہنما پورے ترقیاتی عمل کے دوران، یونٹ ٹیسٹ سے لے کر انٹیگریشن ٹیسٹ اور اختتام سے اختتام کی ویلیڈیشن تک، آپ کے MCP سرورز کی ٹیسٹنگ کے لیے جامع بہترین طریقے اور نکات فراہم کرتا ہے۔

## MCP سرورز کے لیے ٹیسٹنگ کی اہمیت

MCP سرورز AI ماڈلز اور کلائنٹ ایپلیکیشنز کے درمیان اہم مڈل ویئر کے طور پر کام کرتے ہیں۔ مکمل ٹیسٹنگ یقینی بناتی ہے:

- پروڈکشن ماحول میں قابل اعتماد کارکردگی  
- درخواستوں اور جوابات کی درست ہینڈلنگ  
- MCP وضاحتوں کا مناسب نفاذ  
- ناکامیوں اور کنارے کے معاملات کے خلاف مزاحمت  
- مختلف بوجھ کے تحت مستقل کارکردگی  

## MCP سرورز کے لیے یونٹ ٹیسٹنگ

### یونٹ ٹیسٹنگ (بنیاد)

یونٹ ٹیسٹ آپ کے MCP سرور کے انفرادی کمپونینٹس کو تنہائی میں چیک کرتے ہیں۔

#### کیا ٹیسٹ کرنا ہے

1. **وسائل کے ہینڈلرز**: ہر وسیلہ ہینڈلر کی منطق کو علیحدہ سے جانچیں  
2. **ٹول نفاذات**: مختلف ان پٹ کے ساتھ ٹول کے رویے کی تصدیق کریں  
3. **پروپمٹ ٹیمپلیٹس**: یقینی بنائیں کہ پروپمٹ ٹیمپلیٹس صحیح ظاہر ہوتے ہیں  
4. **اسکیمہ کی توثیق**: پیرا میٹر توثیق کی منطق کو ٹیسٹ کریں  
5. **غلطی ہینڈلنگ**: ناقابل قبول ان پٹ کے لیے غلطی کے جوابات کی تصدیق کریں  

#### یونٹ ٹیسٹنگ کے بہترین طریقے

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
# پائتھن میں کیلکولیٹر ٹول کے لیے مثال یونٹ ٹیسٹ
def test_calculator_tool_add():
    # ترتیب دیں
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # عمل کریں
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # تصدیق کریں
    assert result["value"] == 12
```
  
### انٹیگریشن ٹیسٹنگ (درمیانی سطح)

انٹیگریشن ٹیسٹ آپ کے MCP سرور کے اجزاء کے درمیان تعامل کی تصدیق کرتے ہیں۔

#### کیا ٹیسٹ کرنا ہے

1. **سرور کی شروعات**: مختلف کنفیگریشن کے ساتھ سرور کی شروعات کو ٹیسٹ کریں  
2. **راٹنگ رجسٹریشن**: یقینی بنائیں کہ تمام اینڈ پوائنٹس درست طور پر رجسٹر ہیں  
3. **درخواست کی پروسیسنگ**: مکمل درخواست-جواب کے عمل کی جانچ کریں  
4. **غلطی کی منتقلی**: یقینی بنائیں کہ غلطیاں اجزاء کے درمیان صحیح طریقے سے ہینڈل ہوں  
5. **تصدیق اور اجازت**: سیکیورٹی کے طریقہ کار کو ٹیسٹ کریں  

#### انٹیگریشن ٹیسٹنگ کے بہترین طریقے

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
  
### اختتام سے اختتام تک ٹیسٹنگ (بالائی سطح)

اختتام سے اختتام ٹیسٹ کلائنٹ سے سرور تک مکمل نظام کے رویے کی تصدیق کرتے ہیں۔

#### کیا ٹیسٹ کرنا ہے

1. **کلائنٹ-سرور رابطہ**: مکمل درخواست-جواب سائیکل کو ٹیسٹ کریں  
2. **حقیقی کلائنٹ SDKs**: اصلی کلائنٹ نفاذات کے ساتھ ٹیسٹ کریں  
3. **بوجھ کے تحت کارکردگی**: متعدد بیک وقت درخواستوں کے ساتھ رویہ کی تصدیق کریں  
4. **غلطی سے بازیابی**: ناکامی سے نظام کی بحالی کو ٹیسٹ کریں  
5. **طویل دورانیے کی کارروائیاں**: سٹریمنگ اور طویل کارروائیوں کی ہینڈلنگ کی تصدیق کریں  

#### اختتام سے اختتام ٹیسٹنگ کے بہترین طریقے

```typescript
// ٹائپ اسکرپٹ میں کلائنٹ کے ساتھ مثال کا اینڈ ٹو اینڈ ٹیسٹ
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // ٹیسٹ ماحول میں سرور شروع کریں
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // عمل کریں
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // تصدیق کریں
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```
  
## MCP ٹیسٹنگ کے لیے موکنگ کی حکمت عملی

موکنگ ٹیسٹنگ کے دوران کمپونینٹس کو علیحدہ کرنے کے لیے ضروری ہے۔

### جن کمپونینٹس کو موک کرنا ہے

1. **بیرونی AI ماڈلز**: پیش گوئی کے لیے ماڈل کے جوابات موک کریں  
2. **بیرونی خدمات**: API انحصارات (ڈیٹا بیس، تیسرے فریق کی خدمات) کو موک کریں  
3. **تصدیقی خدمات**: شناخت دہندگان کو موک کریں  
4. **وسائل کے فراہم کنندگان**: مہنگے وسائل ہینڈلرز کو موک کریں  

### مثال: AI ماڈل کے ردعمل کا موکنگ

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
# پائتھن کی مثال unittest.mock کے ساتھ
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # موک کو ترتیب دیں
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # ٹیسٹ میں موک کا استعمال کریں
    server = McpServer(model_client=mock_model)
    # ٹیسٹ کے ساتھ جاری رکھیں
```
  
## کارکردگی کی جانچ

کارکردگی کی جانچ پروڈکشن MCP سرورز کے لیے انتہائی اہم ہے۔

### کیا ماپنا ہے

1. **دیرینہ (لیٹنسی)**: درخواست کے جوابات کا وقت  
2. **گزرگاہ (تھرپٹ)**: فی سیکنڈ ہینڈل کی جانے والی درخواستیں  
3. **وسائل کا استعمال**: CPU، میموری، نیٹ ورک کا استعمال  
4. **ہم وقت سازی کا انتظام**: متوازی درخواستوں کے تحت رویہ  
5. **اسکیلنگ کی خصوصیات**: بوجھ بڑھنے پر کارکردگی  

### کارکردگی کی جانچ کے اوزار

- **k6**: اوپن سورس لوڈ ٹیسٹنگ ٹول  
- **JMeter**: جامع کارکردگی کی جانچ  
- **Locust**: پائتھن پر مبنی لوڈ ٹیسٹنگ  
- **Azure Load Testing**: کلاؤڈ بیسڈ کارکردگی ٹیسٹنگ  

### مثال: k6 کے ساتھ بنیادی لوڈ ٹیسٹ

```javascript
// MCP سرور کے لیے لوڈ ٹیسٹنگ کے لیے k6 اسکرپٹ
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 ورچوئل صارفین
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
  
## MCP سرورز کے لیے ٹیسٹ آٹومیشن

اپنے ٹیسٹ خودکار بنائیں تاکہ معیار مستقل رہے اور فیڈبیک فوری ملے۔

### CI/CD انضمام

1. **پُل ریکویسٹ پر یونٹ ٹیسٹ چلائیں**: یقینی بنائیں کہ کوڈ تبدیلیاں موجودہ فعالیت کو توڑتی نہیں ہیں
2. **اسٹیجنگ میں انٹیگریشن ٹیسٹ**: پری-پروڈکشن ماحول میں انٹیگریشن ٹیسٹ چلائیں  
3. **کارکردگی کے بیس لائنز**: ریگریشنز کو پکڑنے کے لیے کارکردگی کے معیارات کو برقرار رکھیں  
4. **سیکیورٹی اسکینز**: پائپ لائن کے حصے کے طور پر سیکیورٹی ٹیسٹنگ کو خودکار بنائیں  

### مثال CI پائپ لائن (GitHub Actions)

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
  
## MCP تفصیلی وضاحت کی تعمیل کے لیے ٹیسٹنگ

اپنے سرور کی MCP وضاحت پر درست عمل درآمد کو تصدیق کریں۔  

### کلیدی تعمیل والے علاقے

1. **API اینڈپوائنٹس**: ضروری اینڈپوائنٹس کی جانچ کریں (/resources، /tools، وغیرہ)  
2. **درخواست/جواب کا فارمٹ**: اسکیمہ کی تعمیل کی توثیق کریں  
3. **ایرر کوڈز**: مختلف حالات کے لیے درست اسٹیٹس کوڈز کی تصدیق کریں  
4. **مواد کی اقسام**: مختلف مواد کی اقسام کی ہینڈلنگ کی جانچ کریں  
5. **توثیق کا عمل**: وضاحت کے مطابق اتھ mechanisms mechanisms کے نفاذ کی تصدیق کریں  

### تعمیل ٹیسٹ سوئٹ

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
  
## MCP سرور کی موثر جانچ کے لیے ٹاپ 10 نکات  

1. **ٹیسٹ ٹول کی تعریفات کو الگ الگ جانچیں**: ٹول لاجک سے آزاد اسکیمہ تعریفات کی توثیق کریں  
2. **پیرا میٹرائزڈ ٹیسٹس استعمال کریں**: مختلف ان پٹس کے ساتھ ٹولز کی جانچ کریں، بشمول ایج کیسز  
3. **ایرر ردعمل چیک کریں**: تمام ممکنہ غلطی کی صورتوں کے لیے مناسب ایرر ہینڈلنگ کی تصدیق کریں  
4. **اتھورائزیشن لاجک ٹیسٹ کریں**: مختلف یوزر رولز کے لیے درست رسائی کنٹرول کو یقینی بنائیں  
5. **ٹیسٹ کوریج مانیٹر کریں**: اہم راستے کے کوڈ کی زیادہ سے زیادہ کوریج کا ہدف رکھیں  
6. **سٹریمنگ ردعمل کی جانچ کریں**: سٹریمنگ مواد کی صحیح ہینڈلنگ کی تصدیق کریں  
7. **نیٹ ورک مسائل کی تمثیل کریں**: خراب نیٹ ورک حالات میں رویے کی جانچ کریں  
8. **وسائل کی حدود کی جانچ کریں**: کوٹاز یا ریٹ لمٹس تک پہنچنے پر رویے کی تصدیق کریں  
9. **ریگریشن ٹیسٹس کو خودکار بنائیں**: ہر کوڈ تبدیلی پر چلنے والا سوئٹ بنائیں  
10. **ٹیسٹ کیسز کو دستاویزی شکل دیں**: ٹیسٹ منظرناموں کی واضح دستاویزات رکھیں  

## عام ٹیسٹنگ میں دشواریاں

- **ہپی پاتھ ٹیسٹنگ پر ضرورت سے زیادہ انحصار**: غلطی کے کیسز کو مکمل طور پر جانچنا یقینی بنائیں  
- **کارکردگی کی جانچ سے غفلت**: پروڈکشن پر اثر انداز ہونے سے پہلے کمزوریوں کی نشاندہی کریں  
- **صرف الگ تھلگ ٹیسٹ کرنا**: یونٹ، انٹیگریشن اور E2E ٹیسٹس کو یکجا کریں  
- **ناکافی API کوریج**: تمام اینڈپوائنٹس اور خصوصیات کی جانچ کریں  
- **غیر مستقل ٹیسٹ ماحول**: مستقل ٹیسٹ ماحول کو یقینی بنانے کے لیے کنٹینرز استعمال کریں  

## نتیجہ

ایک جامع جانچ حکمت عملی قابل اعتماد، اعلیٰ معیار کے MCP سرورز تیار کرنے کے لیے ضروری ہے۔ اس گائیڈ میں بیان کردہ بہترین طریقوں اور نکات کو نافذ کرکے، آپ اپنے MCP اطلاقات کو معیار، قابل اعتماد، اور کارکردگی کے اعلیٰ معیارات پر پورا اترتا ہوا یقینی بنا سکتے ہیں۔  


## اہم نتائج

1. **ٹول ڈیزائن**: سنگل ریسپانسبلٹی پرنسپل کی پیروی کریں، ڈپینڈنسی انجیکشن استعمال کریں، اور کمپوز ایبلٹی کے لیے ڈیزائن کریں  
2. **اسکیمہ ڈیزائن**: واضح، دستاویزی اسکیمہ تیار کریں جس میں مناسب ویلیڈیشن کنسٹرینٹس ہوں  
3. **ایرر ہینڈلنگ**: نرم ہینڈلنگ، منظم ایرر ردعمل، اور ریٹری لاجک کا نفاذ کریں  
4. **کارکردگی**: کیشنگ، غیر متزامن پروسیسنگ، اور وسائل کی تھروٹلنگ استعمال کریں  
5. **سیکیورٹی**: مکمل ان پٹ ویلیڈیشن، اتھورائزیشن چیکس، اور حساس ڈیٹا ہینڈلنگ نافذ کریں  
6. **جانچ**: جامع یونٹ، انٹیگریشن، اور اینڈ-ٹو-اینڈ ٹیسٹ بنائیں  
7. **ورک فلو پیٹرنز**: چینز، ڈسپیچرز، اور پیرالل پروسیسنگ جیسے قائم شدہ پیٹرنز کا اطلاق کریں  

## مشق

ایک MCP ٹول اور ورک فلو ڈیزائن کریں جو دستاویز پراسیسنگ سسٹم کے لیے ہو جو کہ:

1. متعدد فارمیٹس (PDF، DOCX، TXT) میں دستاویزات قبول کرے  
2. دستاویزات سے متن اور اہم معلومات نکالے  
3. دستاویزات کو قسم اور مواد کے لحاظ سے درجہ‌بندی کرے  
4. ہر دستاویز کا خلاصہ تیار کرے  

ٹول اسکیمہ، ایرر ہینڈلنگ، اور ورک فلو پیٹرن کو نافذ کریں جو اس منظرنامے کے لیے سب سے زیادہ موزوں ہو۔ غور کریں کہ آپ اس نفاذ کی جانچ کیسے کریں گے۔  

## وسائل

1. تازہ ترین ترقیات سے آگاہ رہنے کے لیے [Microsoft Foundry Discord Community](https://aka.ms/foundrydevs) پر MCP کمیونٹی میں شامل ہوں  
2. اوپن سورس [MCP پروجیکٹس](https://github.com/modelcontextprotocol) میں تعاون کریں  
3. اپنی تنظیم کی AI پہل کاریوں میں MCP اصولوں کا اطلاق کریں  
4. اپنی صنعت کے لیے مخصوص MCP نفاذ کو دریافت کریں  
5. مخصوص MCP موضوعات جیسے ملٹی-موڈل انٹیگریشن یا انٹرپرائز اپلیکیشن انٹیگریشن پر اعلیٰ سطحی کورسز لینے پر غور کریں  
6. [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md) کے ذریعے سیکھی گئی اصولوں کا استعمال کرتے ہوئے اپنے MCP ٹولز اور ورک فلو بنانے کا تجربہ کریں  

## اگلا کیا ہے

اگلا: [کیس اسٹڈیز](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ڈس کلیمر**:
یہ دستاویز AI ترجمہ سروس [Co-op Translator](https://github.com/Azure/co-op-translator) کے ذریعے ترجمہ کی گئی ہے۔ جبکہ ہم درستگی کے لیے کوشاں ہیں، براہ کرم اس بات سے آگاہ رہیں کہ خودکار ترجمے میں غلطیاں یا عدم درستیاں ہو سکتی ہیں۔ اصل دستاویز اپنے مادری زبان میں مستند ماخذ سمجھی جائے گی۔ حساس معلومات کے لیے پیشہ ور انسانی ترجمہ کی سفارش کی جاتی ہے۔ اس ترجمے کے استعمال سے پیدا ہونے والی کسی بھی غلط فہمی یا غلط تشریح کی ذمہ داری ہم قبول نہیں کرتے۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->