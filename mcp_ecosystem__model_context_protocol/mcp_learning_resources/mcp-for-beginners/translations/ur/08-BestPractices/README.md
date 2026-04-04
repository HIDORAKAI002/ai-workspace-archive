# MCP کی ترقی کے بہترین طریقے

[![MCP Development Best Practices](../../../translated_images/ur/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(اس سبق کی ویڈیو دیکھنے کے لیے اوپر دی گئی تصویر پر کلک کریں)_

## جائزہ

یہ سبق MCP سرورز اور فیچرز کو پروڈکشن ماحول میں ترقی، جانچ اور تعیناتی کے لیے جدید بہترین طریقوں پر توجہ دیتا ہے۔ چونکہ MCP ایکوسسٹمز پیچیدہ اور اہمیت کے حامل ہوتے جارہے ہیں، اس لیے قائم شدہ نمونوں کی پیروی اعتماد پذیری، بحالی کی سہولت اور باہمی رابطے کو یقینی بناتی ہے۔ یہ سبق حقیقی دنیا میں MCP کے نفاذ سے حاصل شدہ عملی حکمت عملی کو یکجا کرتا ہے تاکہ آپ کو مضبوط، موثر سرورز بنانے کی رہنمائی ملے جن میں مؤثر وسائل، پرامپٹس، اور ٹولز شامل ہوں۔

## سیکھنے کے مقاصد

اس سبق کے اختتام تک، آپ قابل ہوجائیں گے:

- MCP سرور اور فیچر ڈیزائن میں صنعتی بہترین طریقے نافذ کریں
- MCP سرورز کے لیے جامع جانچ کی حکمت عملی تیار کریں
- پیچیدہ MCP ایپلیکیشنز کے لیے موثر اور قابلِ دوبارہ استعمال ورک فلو پیٹرن ڈیزائن کریں
- MCP سرورز میں مناسب خرابی سنبھالنا، لاگنگ، اور مشاہدہ پذیری نافذ کریں
- کارکردگی، سیکیورٹی، اور بحالی کے لیے MCP نفاذ کو بہتر بنائیں

## MCP کے بنیادی اصول

مخصوص نفاذی طریقوں میں جانے سے پہلے، موثر MCP ترقی کی رہنمائی کرنے والے بنیادی اصولوں کو سمجھنا ضروری ہے:

1. **معیاری رابطہ کاری**: MCP JSON-RPC 2.0 کو اپنی بنیاد کے طور پر استعمال کرتا ہے، جو تمام نفاذات میں درخواستوں، جوابات، اور خرابی سنبھالنے کے لیے ایک مستقل فارمیٹ فراہم کرتا ہے۔

2. **صارف مرکوز ڈیزائن**: ہمیشہ اپنے MCP نفاذات میں صارف کی رضا مندی، کنٹرول، اور شفافیت کو اولین ترجیح دیں۔

3. **سیکیورٹی اولین**: مضبوط سیکیورٹی تدابیر جیسا کہ تصدیق، اجازت، توثیق، اور ریٹ لمٹنگ نافذ کریں۔

4. **ماڈیولر فن تعمیر**: اپنے MCP سرورز کو ماڈیولر انداز میں ڈیزائن کریں، جہاں ہر ٹول اور وسیلہ کا واضح، مرکوز مقصد ہو۔

5. **ریاستی کنکشنز**: متعدد درخواستوں میں حالت کو برقرار رکھنے کی MCP کی صلاحیت سے فائدہ اٹھائیں تاکہ مزید مربوط اور سیاق و سباق سے آگاہ بات چیت ہو۔

## سرکاری MCP بہترین طریقے

مندرجہ ذیل بہترین طریقے سرکاری ماڈل کانٹیکسٹ پروٹوکول دستاویزات سے ماخوذ ہیں:

### سیکیورٹی کے بہترین طریقے

1. **صارف کی رضا مندی اور کنٹرول**: ڈیٹا تک رسائی یا آپریشن انجام دینے سے قبل ہمیشہ واضح صارف کی رضا مندی طلب کریں۔ اس بات کا واضح کنٹرول فراہم کریں کہ کون سا ڈیٹا شیئر کیا جاتا ہے اور کون سے اعمال کی اجازت ہے۔

2. **ڈیٹا کی رازداری**: صرف واضح رضا مندی کے ساتھ صارف کا ڈیٹا ظاہر کریں اور مناسب رسائی کنٹرولز کے ساتھ اس کی حفاظت کریں۔ غیر مجاز ڈیٹا کی ترسیل سے بچاؤ کریں۔

3. **ٹول کی حفاظت**: کسی بھی ٹول کو فعال کرنے سے قبل واضح صارف کی رضا مندی حاصل کریں۔ صارفین کو ہر ٹول کی فنکشنلٹی سمجھائیں اور مضبوط سیکیورٹی حد بندی نافذ کریں۔

4. **ٹول اجازت کا کنٹرول**: اس بات کی ترتیب دیں کہ سیشن کے دوران کون سے ٹول استعمال کی اجازت رکھتا ہے، تاکہ صرف واضح طور پر مجاز ٹولز ہی قابل رسائی ہوں۔

5. **تصدیق**: API کیز، OAuth ٹوکنز، یا دیگر محفوظ تصدیقی طریقوں کے ذریعے ٹولز، وسائل، یا حساس آپریشنز تک رسائی سے پہلے مناسب تصدیق کا تقاضا کریں۔

6. **پیرا میٹر کی توثیق**: تمام ٹول کالز کے لیے توثیق سختی سے نافذ کریں تاکہ خراب یا نقصان دہ ان پٹ ٹول کے نفاذ تک نہ پہنچے۔

7. **ریٹ لمٹنگ**: وسائل کی زیادتی سے بچنے اور سرور کے وسائل کے منصفانہ استعمال کو یقینی بنانے کے لیے ریٹ لمٹنگ نافذ کریں۔

### نفاذ کے بہترین طریقے

1. **صلاحیتوں کا تبادلہ**: کنکشن سیٹ اپ کے دوران، حمایت یافتہ فیچرز، پروٹوکول ورژنز، دستیاب ٹولز، اور وسائل کے بارے میں معلومات کا تبادلہ کریں۔

2. **ٹول ڈیزائن**: ایسے مرکوز ٹولز بنائیں جو ایک کام بخوبی انجام دیں، بجائے اس کے کہ بڑے ٹولز بنائیں جو متعدد معاملات کو سنبھالیں۔

3. **خرابی سنبھالنا**: مسائل کی تشخیص، فیل یور کی ہموار سنبھال، اور قابل عمل فیڈ بیک فراہم کرنے کے لیے معیاری خرابی پیغامات اور کوڈز نافذ کریں۔

4. **لاگنگ**: آڈٹنگ، ڈیبگنگ، اور پروٹوکول تعاملات کی نگرانی کے لیے منظم لاگز ترتیب دیں۔

5. **پیش رفت کی نگرانی**: طویل چلنے والی کارروائیوں کے لیے پیش رفت کی تازہ کاری فراہم کریں تاکہ جوابدہ یوزر انٹرفیس کو فعال کیا جا سکے۔

6. **درخواست منسوخی**: کلائنٹس کو اجازت دیں کہ وہ ایسے زیرِ عمل درخواستیں منسوخ کریں جو مزید ضروری نہ ہوں یا زیادہ وقت لے رہی ہوں۔

## اضافی حوالہ جات

سب سے تازہ ترین معلومات کے لیے MCP کے بہترین طریقوں کے حوالے ملاحظہ کریں:

- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [Security Best Practices](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - سیکیورٹی خطرات اور بچاؤ
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - عملی سیکیورٹی تربیت

## عملی نفاذ کی مثالیں

### ٹول ڈیزائن کے بہترین طریقے

#### 1. ایک ذمہ داری کا اصول

ہر MCP ٹول کا واضح، مرکوز مقصد ہونا چاہیے۔ بڑے ٹولز بنانے کی بجائے جو متعدد معاملات سنبھالنے کی کوشش کرتے ہیں، خاص کاموں پر مہارت رکھنے والے خصوصی ٹولز تیار کریں۔

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

#### 2. مستقل خرابی سنبھالنا

معلوماتی خرابی پیغامات اور مناسب بحالی کے طریقے کے ساتھ مضبوط خرابی سنبھالنا نافذ کریں۔

```python
# جامع نقص ہینڈلنگ کے ساتھ پائتھن کی مثال
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # پیرامیٹر کی توثیق
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # سیکیورٹی کی توثیق
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # ڈیٹا بیس آپریشن وقت ختم ہونے کے ساتھ
                async with timeout(10):  # ۱۰ سیکنڈ کا وقت ختم ہونا
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
                # کوئری کی غلطیاں ممکنہ طور پر کلائنٹ کی غلطیاں ہیں
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # ٹول مخصوص غلطیوں کو گزرنے دیں
            raise
        except Exception as e:
            # غیر متوقع غلطیوں کے لیے جامع گرفت
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # ایس کیو ایل انجیکشن کی شناخت کا نفاذ
        pass
        
    def _log_error(self, message, error):
        # نقص لاگنگ کا نفاذ
        pass
```

#### 3. پیرا میٹر کی توثیق

ہمییشہ پیرا میٹر کی مکمل جانچ پڑتال کریں تاکہ خراب یا نقصان دہ ان پٹ سے بچا جا سکے۔

```javascript
// جاوا اسکرپٹ/ٹائپ اسکرپٹ کی مثال تفصیلی پیرامیٹر کی جانچ کے ساتھ
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
    // 1. پیرامیٹر کی موجودگی کی توثیق کریں
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. پیرامیٹر کی اقسام کی توثیق کریں
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. پیرامیٹر کی قیمتوں کی توثیق کریں
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. لکھنے کے عمل کے لیے مواد کی موجودگی کی توثیق کریں
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. راستے کی حفاظت کی توثیق
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // تصدیق شدہ پیرامیٹرز کی بنیاد پر عملدرآمد
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // راستے کی حفاظت کی جانچ کا نفاذ
    // ...
  }
}
```

### سیکیورٹی نفاذ کی مثالیں

#### 1. تصدیق اور اجازت

```java
// جاوا کی مثال تصدیق اور اجازت کے ساتھ
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
        // 1۔ تصدیقی سیاق و سباق نکالیں
        String authToken = request.getContext().getAuthToken();
        
        // 2۔ صارف کی تصدیق کریں
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3۔ مخصوص عمل کے لئے اجازت چیک کریں
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4۔ مجاز عمل کے ساتھ آگے بڑھیں
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

## جانچ کے بہترین طریقے

### 1. MCP ٹولز کی یونٹ ٹیسٹنگ

ہمیشہ اپنے ٹولز کو علاحدہ حالت میں ٹیسٹ کریں، بیرونی انحصار کو موک کریں:

```typescript
// ٹائپ اسکرپٹ میں ایک ٹول یونٹ ٹیسٹ کی مثال
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // ایک جعلی موسم کی سروس بنائیں
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // جعلی انحصار کے ساتھ ٹول بنائیں
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
    
    // تصدیق کریں
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // ترتیب دیں
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // عمل کریں اور تصدیق کریں
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. انٹیگریشن ٹیسٹنگ

کلائنٹ کی درخواستوں سے لے کر سرور کے جوابات تک مکمل عمل کی جانچ کریں:

```python
# پائتھن انٹیگریشن ٹیسٹ کی مثال
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # ٹیسٹ سرور شروع کریں
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # ایک کلائنٹ بنائیں
        client = McpClient("http://localhost:5000")
        
        # ٹیسٹ ٹول کی دریافت
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # ٹیسٹ ٹول کی عملدرآمد
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

### 1. کیشنگ کی حکمت عملیاں

تاخیر کو کم کرنے اور وسائل کے استعمال کو محدود کرنے کے لیے مناسب کیشنگ نافذ کریں:

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

#### 2. انحصار کی انجیکشن اور جانچ کے قابل ہونا

ٹولز کو کنسٹرکٹر انجیکشن کے ذریعہ ان کے انحصارات وصول کرنے کے لیے ڈیزائن کریں تاکہ وہ جانچ کے قابل اور ترتیب کے قابل ہوں:

```java
// جوا مثال انحصار انجکشن کے ساتھ
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // انحصار کنسٹرکٹر کے ذریعے انجکٹ کیے گئے
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // آلے کا نفاذ
    // ...
}
```

#### 3. قابلِ ترکیب ٹولز

ایسے ٹولز ڈیزائن کریں جو ایک ساتھ مل کر زیادہ پیچیدہ ورک فلو تشکیل دے سکیں:

```python
# قابل ترکیب ٹولز دکھانے والی پائتھون مثال
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # عمل درآمد...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # یہ ٹول dataFetch ٹول کے نتائج استعمال کر سکتا ہے
    async def execute_async(self, request):
        # عمل درآمد...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # یہ ٹول dataAnalysis ٹول کے نتائج استعمال کر سکتا ہے
    async def execute_async(self, request):
        # عمل درآمد...
        pass

# یہ ٹولز خود مختار طور پر یا ورک فلو کے حصے کے طور پر استعمال کیے جا سکتے ہیں
```

### اسکیمہ ڈیزائن کے بہترین طریقے

اسکیمہ ماڈل اور آپ کے ٹول کے درمیان معاہدہ ہے۔ اچھے ڈیزائن کیے گئے اسکیمے بہتر ٹول کے استعمال کی راہ ہموار کرتے ہیں۔

#### 1. واضح پیرا میٹر کی وضاحت

ہر پیرا میٹر کے لیے وضاحتی معلومات شامل کریں:

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

#### 2. توثیقی حدود

غلط ان پٹ کو روکنے کے لیے توثیقی حدود شامل کریں:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // ای میل پراپرٹی فارمیٹ کی تصدیق کے ساتھ
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // عمر پراپرٹی عددی پابندیوں کے ساتھ
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // شمار شدہ پراپرٹی
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

#### 3. مستقل واپسی کا ڈھانچہ

اپنے جواب کے ڈھانچے میں تسلسل برقرار رکھیں تاکہ ماڈلز کو نتائج کو سمجھنا آسان ہو:

```python
async def execute_async(self, request):
    try:
        # درخواست کو پروسیس کریں
        results = await self._search_database(request.parameters["query"])
        
        # ہمیشہ ایک مستقل ڈھانچہ واپس کریں
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

### خرابی سنبھالنا

مضبوط خرابی سنبھالنا MCP ٹولز کی قابلِ اعتمادیت کے لیے اہم ہے۔

#### 1. ہموار خرابی سنبھالنا

مناسب درجات پر خرابی کو سنبھالیں اور معلوماتی پیغامات فراہم کریں:

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

#### 2. منظم خرابی کے جوابات

جب ممکن ہو تو منظم خرابی کی معلومات واپس کریں:

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
        
        // دیگر استثنائی حالات کو دوبارہ ToolExecutionException کے طور پر پھینکیں
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. دوبارہ کوشش کی منطق

عارضی ناکامیوں کے لیے مناسب دوبارہ کوشش کی منطق نافذ کریں:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # سیکنڈ
    
    while retry_count < max_retries:
        try:
            # خارجی API کو کال کریں
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # نمایاں بیک آف
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # غیر عارضی غلطی، دوبارہ کوشش نہ کریں
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### کارکردگی کی بہتری

#### 1. کیشنگ

مہنگے آپریشنز کے لیے کیشنگ نافذ کریں:

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

#### 2. غیر ہم وقت پروسیسنگ

I/O پر مبنی آپریشنز کے لیے غیر ہم وقت پروگرامنگ کے نمونے استعمال کریں:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // طویل مدتی عمل کے لیے، فوراً ایک پروسیسنگ ID واپس کریں
        String processId = UUID.randomUUID().toString();
        
        // غیر ہمعاصر عمل شروع کریں
        CompletableFuture.runAsync(() -> {
            try {
                // طویل مدتی عمل انجام دیں
                documentService.processDocument(documentId);
                
                // حیثیت کو اپ ڈیٹ کریں (عام طور پر ڈیٹابیس میں محفوظ کیا جاتا ہے)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // عمل ID کے ساتھ فوری جواب واپس کریں
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // ساتھی حیثیت چیک کرنے کا آلہ
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

#### 3. وسائل کی حد بندی

اوورلوڈ سے بچنے کے لیے وسائل کی حد بندی نافذ کریں:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # ہر سیکنڈ 5 درخواستیں اجازت دیں
            bucket_size=10        # 10 درخواستوں تک اچانک اضافے کی اجازت دیں
        )
    
    async def execute_async(self, request):
        # چیک کریں کہ ہم آگے بڑھ سکتے ہیں یا انتظار کرنا ہوگا
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # اگر انتظار بہت لمبا ہو
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # مناسب انتظار کا وقت گزاریں
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
            
            # اگلے دستیاب ٹوکن تک کا وقت حساب کریں
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

ہمیشہ ان پٹ پیرا میٹرز کی مکمل جانچ کریں:

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

مناسب اجازت کی جانچ نافذ کریں:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // درخواست سے صارف کا سیاق و سباق حاصل کریں
    UserContext user = request.getContext().getUserContext();
    
    // چیک کریں کہ آیا صارف کے پاس مطلوبہ اجازتیں ہیں
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // مخصوص وسائل کے لیے، اس وسائل تک رسائی چیک کریں
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // اوزار کے نفاذ کے ساتھ آگے بڑھیں
    // ...
}
```

#### 3. حساس ڈیٹا کا سنبھالنا

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
        
        # حساس فیلڈز کو فلٹر کریں جب تک کہ واضح طور پر درخواست نہیں کی گئی ہو اور اجازت دی گئی ہو
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # درخواست کے سیاق و سباق میں اجازت کی سطح چیک کریں
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # اصل کو تبدیل کرنے سے بچنے کے لیے ایک نقل بنائیں
        redacted = user_data.copy()
        
        # مخصوص حساس فیلڈز کو چھپائیں
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # اندرونی حساس ڈیٹا کو چھپائیں
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## MCP ٹولز کی جانچ کے بہترین طریقے

جامع جانچ اس بات کو یقینی بناتی ہے کہ MCP ٹولز درست کام کریں، کنارے کے معاملات کو سنبھالیں، اور نظام کے باقی حصوں کے ساتھ صحیح سے مربوط ہوں۔

### یونٹ ٹیسٹنگ

#### 1. ہر ٹول کو علاحدہ ٹیسٹ کریں

ہر ٹول کی فنکشنلٹی کے لیے مرکوز ٹیسٹ بنائیں:

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

#### 2. اسکیمہ توثیق کی جانچ

اس بات کی جانچ کریں کہ اسکیمے درست ہوں اور حدود کو مناسب طریقے سے نافذ کریں:

```java
@Test
public void testSchemaValidation() {
    // آلے کا نمونہ بنائیں
    SearchTool searchTool = new SearchTool();
    
    // خاکہ حاصل کریں
    Object schema = searchTool.getSchema();
    
    // جانچ کے لیے خاکہ کو JSON میں تبدیل کریں
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // تصدیق کریں کہ خاکہ درست JSONSchema ہے
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // درست پیرا میٹرز کی جانچ کریں
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // مطلوبہ پیرا میٹر کی کمی کی جانچ کریں
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // غلط قسم کے پیرا میٹر کی جانچ کریں
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. خرابی سنبھالنے کے ٹیسٹ

خرابی کی حالتوں کے لیے مخصوص ٹیسٹ بنائیں:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # ترتیب دیں
    tool = ApiTool(timeout=0.1)  # بہت کم وقت کی حد
    
    # ایک درخواست کا مذاق اڑائیں جو وقت ختم ہو جائے گی
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # وقت کی حد سے زیادہ طویل
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # عمل کریں اور تصدیق کریں
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # استثناء کے پیغام کی توثیق کریں
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # ترتیب دیں
    tool = ApiTool()
    
    # ایک محدود شرح کا جواب مزاح کریں
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
        
        # تصدیق کریں کہ استثناء میں شرح کی حد کی معلومات موجود ہے
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### انٹیگریشن ٹیسٹنگ

#### 1. ٹول چین کی جانچ

متوقع امتزاجات میں ٹولز کے کام کو ٹیسٹ کریں:

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

#### 2. MCP سرور کی جانچ

مکمل ٹول رجسٹریشن اور عمل درآمد کے ساتھ MCP سرور کی جانچ کریں:

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
        // دریافت کا نقطہ آزمائیں
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // ٹول کی درخواست بنائیں
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
        // غلط ٹول کی درخواست بنائیں
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // "b" پیرامیٹر غائب ہے
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

#### 3. اینڈ ٹو اینڈ ٹیسٹنگ

ماڈل پرامپٹ سے لے کر ٹول کی تنفیذ تک مکمل ورک فلو کی جانچ کریں:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # ترتیب دیں - MCP کلائنٹ اور جعلی ماڈل قائم کریں
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
    
    # جعلی موسم کے آلے کا جواب
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

ٹیسٹ کریں کہ آپ کا MCP سرور کتنی متوازی درخواستوں کو سنبھال سکتا ہے:

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

#### 2. اسٹریس ٹیسٹنگ

نظام کو انتہائی بوجھ کے تحت ٹیسٹ کریں:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // جے میٹر کو اسٹریس ٹیسٹنگ کے لیے ترتیب دیں
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // جے میٹر ٹیسٹ پلان کو ترتیب دیں
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
    
    // ٹول کی تنفیذ کے لیے HTTP سیمپلر شامل کریں
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // لسنرز شامل کریں
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

طویل مدتی کارکردگی کے تجزیے کے لیے نگرانی کا قیام کریں:

```python
# ایم سی پی سرور کے لیے مانیٹرنگ ترتیب دیں
def configure_monitoring(server):
    # پرومی تھیئس میٹرکس سیٹ کریں
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
    
    # میٹرکس کی وقت بندی اور ریکارڈنگ کے لیے مڈل ویئر شامل کریں
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # میٹرکس اینڈپوائنٹ کو ظاہر کریں
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP ورک فلو ڈیزائن پیٹرنز

اچھے ڈیزائن کیے گئے MCP ورک فلو کارکردگی، اعتماد پذیری، اور بحالی کو بہتر بناتے ہیں۔ یہاں اہم پیٹرنز درج ہیں:

### 1. ٹولز کی چین پیٹرن

متعدد ٹولز کو اس ترتیب میں منسلک کریں جہاں ہر ٹول کی آؤٹ پٹ اگلے کے ان پٹ میں تبدیل ہو:

```python
# پائیتھون چین آف ٹولز کا نفاذ
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # عمل میں لانے کے لیے ٹول کے ناموں کی فہرست
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # چین میں ہر ٹول کو چلائیں، پچھلا نتیجہ پاس کرتے ہوئے
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # نتیجہ محفوظ کریں اور اگلے ٹول کے ان پٹ کے طور پر استعمال کریں
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# استعمال کی مثال
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

مرکزی ٹول استعمال کریں جو ان پٹ کی بنیاد پر مخصوص ٹولز کو بھیجے:

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

### 3. مساوی عمل کاری پیٹرن

زیادہ کارکردگی کے لیے متعدد ٹولز کو بیک وقت چلائیں:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // مرحلہ 1: ڈیٹا سیٹ میٹا ڈیٹا حاصل کریں (ہم وقت)
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

### 4. خرابی کی بازیابی پیٹرن

ٹول کی ناکامیوں کے لیے ہموار متبادل طریقے نافذ کریں:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # پہلے بنیادی آلہ آزماؤ
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # ناکامی کو لاگ کرو
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # ثانوی آلے پر واپس جاؤ
            try:
                # واپس جانے والے آلے کے لیے پیرامیٹرز کو تبدیل کرنا پڑ سکتا ہے
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # دونوں آلے ناکام ہو گئے
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # یہ عمل مخصوص آلات پر منحصر ہوگا
        # اس مثال کے لیے، ہم صرف اصل پیرامیٹرز واپس کریں گے
        return params

# استعمال کی مثال
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # بنیادی (ادا شدہ) موسمیاتی API
        "basicWeatherService",    # واپس جانے والا (مفت) موسمیاتی API
        {"location": location}
    )
```

### 5. ورک فلو کمپوزیشن پیٹرن

سادہ ورک فلوئز کو جوڑ کر پیچیدہ ورک فلو تشکیل دیں:

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

# MCP سرورز کی جانچ: بہترین طریقے اور اہم نکات

## جائزہ

جانچ قابل اعتماد، اعلی معیار کے MCP سرورز تیار کرنے کے لیے ایک اہم پہلو ہے۔ یہ رہنمائی آپ کے MCP سرورز کی ترقی کے دوران، یونٹ ٹیسٹ سے لے کر انٹیگریشن ٹیسٹ اور اختتامی تصدیق تک کے لیے جامع بہترین طریقے اور مشورے فراہم کرتی ہے۔

## MCP سرورز کے لیے جانچ کیوں ضروری ہے

MCP سرورز AI ماڈلز اور کلائنٹ ایپلیکیشنز کے مابین اہم مڈل ویئر کا کردار ادا کرتے ہیں۔ مکمل جانچ یقینی بناتی ہے:

- پروڈکشن ماحول میں اعتماد پذیری
- درخواستوں اور جوابات کو صحیح طریقے سے سنبھالنا
- MCP وضاحتوں کا صحیح نفاذ
- ناکامیوں اور غیر متوقع حالات کے خلاف مزاحمت
- مختلف بوجھ کے تحت مستقل کارکردگی

## MCP سرورز کے لیے یونٹ ٹیسٹنگ

### یونٹ ٹیسٹنگ (بنیاد)

یونٹ ٹیسٹ آپ کے MCP سرور کے فردی اجزاء کو علاحدہ حالت میں چیک کرتے ہیں۔

#### ٹیسٹ کیا کریں

1. **وسائل کے ہینڈلرز**: ہر وسیلہ ہینڈلر کی منطقی جانچ آزادی سے کریں
2. **ٹول نفاذ**: مختلف ان پٹ کے ساتھ ٹول کے رویے کی جانچ کریں
3. **پرامپٹ ٹیمپلیٹس**: یقینی بنائیں کہ پرامپٹ ٹیمپلیٹس صحیح رینڈر ہوتے ہیں
4. **اسکیمہ کی تصدیق**: پیرا میٹر کی جانچ کا منطقی جائزہ لیں
5. **خرابی سنبھالنا**: غلط ان پٹ کے لیے خرابی کے جوابات کی جانچ کریں

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
# پائتھون میں کیلکولیٹر ٹول کے لیے مثال یونٹ ٹیسٹ
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

### انٹیگریشن ٹیسٹنگ (درمیانی پرت)

انٹیگریشن ٹیسٹ MCP سرور کے اجزاء کے درمیان تعاملات کی تصدیق کرتے ہیں۔

#### ٹیسٹ کیا کریں

1. **سرور کی شروعات**: مختلف ترتیبات کے ساتھ سرور کا آغاز ٹیسٹ کریں
2. **راوٹ رجسٹریشن**: تمام endpoints کی درست رجسٹریشن کی تصدیق کریں
3. **درخواست کی پراسیسنگ**: مکمل درخواست و جواب کے عمل کو جانچیں
4. **خرابی کی منتقلی**: یقینی بنائیں کہ خرابی اجزاء کے درمیان درست طریقے سے پہنچے
5. **تصدیق و اجازت**: سیکیورٹی میکانزم کی جانچ کریں

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

### اینڈ ٹو اینڈ ٹیسٹنگ (اعلیٰ پرت)

اینڈ ٹو اینڈ ٹیسٹ پورے نظام کے رویے کی تصدیق کرتے ہیں، کلائنٹ سے سرور تک۔

#### ٹیسٹ کیا کریں

1. **کلائنٹ-سرور رابطہ کاری**: مکمل درخواست و جواب کے دور کو ٹیسٹ کریں
2. **حقیقی کلائنٹ SDKs**: اصل کلائنٹ نفاذ کے ساتھ ٹیسٹ کریں
3. **بوجھ کے تحت کارکردگی**: متعدد متوازی درخواستوں کے ساتھ رویہ کی تصدیق کریں
4. **خرابی کی بازیابی**: نظام کی ناکامیوں سے بحالی کی جانچ کریں
5. **طویل چلنے والی کارروائیاں**: سٹریمنگ اور طویل عمل کی سنبھال کی تصدیق کریں

#### اینڈ ٹو اینڈ ٹیسٹنگ کے بہترین طریقے

```typescript
// ٹائپ اسکرپٹ میں کلائنٹ کے ساتھ ایک مثال ای2ای ٹیسٹ
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // ٹیسٹ کے ماحول میں سرور شروع کریں
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

## MCP کی جانچ کے لیے موکنگ کی حکمت عملیاں

موکنگ جانچ کے دوران اجزاء کو علاحدہ کرنے کے لیے ضروری ہے۔

### موک کرنے والے اجزاء

1. **بیرونی AI ماڈلز**: قابلِ پیش گوئی ٹیسٹنگ کے لیے ماڈل جوابات کو موک کریں
2. **بیرونی خدمات**: API انحصار (ڈیٹا بیس، تھرڈ پارٹی خدمات) کو موک کریں
3. **تصدیقی خدمات**: شناخت فراہم کرنے والوں کو موک کریں
4. **وسائل فراہم کرنے والے**: مہنگے وسائل ہینڈلرز کو موک کریں

### مثال: AI ماڈل کے جواب کو موک کرنا

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

پروڈکشن MCP سرورز کے لیے کارکردگی کی جانچ انتہائی اہم ہے۔

### کیا پیمائش کریں

1. **تاخیر**: درخواست کے جواب کا وقت
2. **تھروپٹ**: سیکنڈ میں سنبھالی جانے والی درخواستیں
3. **وسائل کا استعمال**: CPU، میموری، نیٹ ورک کا استعمال
4. **موازی درخواستوں کا سنبھالنا**: بیک وقت درخواستوں کے تحت رویہ
5. **اسکیلنگ کی خصوصیات**: بڑھتے ہوئے بوجھ کے ساتھ کارکردگی

### کارکردگی جانچنے کے اوزار

- **k6**: اوپن سورس لوڈ ٹیسٹنگ ٹول
- **JMeter**: جامع کارکردگی کی جانچ
- **Locust**: پائتھون پر مبنی لوڈ ٹیسٹنگ
- **Azure Load Testing**: کلاؤڈ پر مبنی کارکردگی کی جانچ

### مثال: k6 کے ساتھ بنیادی لوڈ ٹیسٹ

```javascript
// ایم سی پی سرور کے لوڈ ٹیسٹنگ کے لیے k6 اسکرپٹ
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // ۱۰ مجازی صارفین
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

اپنے ٹیسٹ خودکار بنا کر معیار کو مستقل رکھیں اور تیز فیڈ بیک لوپس حاصل کریں۔

### CI/CD انٹیگریشن
1. **یونٹ ٹیسٹ رن کریں پُل ریکویسٹ پر**: یقینی بنائیں کہ کوڈ میں تبدیلیاں موجودہ فنکشنالیٹی کو متاثر نہ کریں  
2. **انٹیگریشن ٹیسٹ اسٹیجنگ میں**: پری-پروڈکشن ماحول میں انٹیگریشن ٹیسٹ رن کریں  
3. **پرفارمنس بیس لائنز**: پرفارمنس کے معیار برقرار رکھیں تاکہ ریگریشن کا پتہ چل سکے  
4. **سیکیورٹی اسکینز**: پائپ لائن کے حصے کے طور پر سیکیورٹی ٹیسٹنگ خودکار بنائیں  

### مثال کے طور پر CI پائپ لائن (GitHub Actions)

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
  
## MCP وضاحت کے مطابق جانچ پڑتال

اپنے سرور کی MCP وضاحت کی درست عمل درآمد کی تصدیق کریں۔

### کلیدی تعمیل کے علاقے

1. **API اینڈپوائنٹس**: ضروری اینڈپوائنٹس کی جانچ کریں (/resources, /tools, وغیرہ)  
2. **درخواست/جواب فارمیٹ**: اسکیمہ کی تعمیل کی توثیق کریں  
3. **خرابی کوڈز**: مختلف صورتحال کے لیے درست اسٹیٹس کوڈز کی تصدیق کریں  
4. **مواد کی اقسام**: مختلف مواد کی اقسام کی ہینڈلنگ کی جانچ کریں  
5. **تصدیقی عمل**: وضاحت کے مطابق تصدیقی میکانزم کی تصدیق کریں  

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
  
## موثر MCP سرور ٹیسٹنگ کے لیے 10 بہترین تراکیب

1. **ٹول تعریفات کو علیحدہ ٹیسٹ کریں**: سکیمہ کی تعریفات کو ٹول لاجک سے آزاد وارثت کریں  
2. **پیرا میٹرائزڈ ٹیسٹ استعمال کریں**: مختلف ان پٹ کے ساتھ ٹولز کی جانچ کریں، بشمول ایج کیسز  
3. **خرابی کے جوابات چیک کریں**: تمام ممکنہ خرابی کی حالتوں کے لیے مناسب خرابی ہینڈلنگ کی تصدیق کریں  
4. **اجازت لاجک کی جانچ کریں**: مختلف صارف کرداروں کے لیے مناسب رسائی کنٹرول یقینی بنائیں  
5. **ٹیسٹ کوریج کی نگرانی کریں**: اہم راستے کے کوڈ کی زیادہ سے زیادہ کوریج کا ہدف رکھیں  
6. **اسٹریمنگ جوابات کی جانچ کریں**: اسٹریمنگ مواد کی صحیح ہینڈلنگ کی تصدیق کریں  
7. **نیٹ ورک مسائل کی مشابہت کریں**: خراب نیٹ ورک حالات کے تحت برتاؤ کی جانچ کریں  
8. **وسائل کی حدوں کی جانچ کریں**: کوٹاز یا ریٹ لمٹس پر پہنچنے کی صورت میں برتاؤ کی تصدیق کریں  
9. **ریگریشن ٹیسٹ خودکار بنائیں**: ایسی سوئٹ تیار کریں جو ہر کوڈ کی تبدیلی پر چلتی ہو  
10. **ٹیسٹ کیسز دستاویزی کریں**: ٹیسٹ کے مناظر کی واضح دستاویزات بنائیں  

## عام ٹیسٹنگ کے مسائل

- **صرف خوشگوار راستے کی جانچ پر زیادہ انحصار**: خرابی کے معاملات کی مکمل جانچ کریں  
- **پرفارمنس ٹیسٹنگ کو نظر انداز کرنا**: پیداواری اثرات سے قبل رکاوٹوں کی نشاندہی کریں  
- **تنہا علیحدہ ٹیسٹ کرنا**: یونٹ، انٹیگریشن اور اینڈ-ٹو-اینڈ ٹیسٹ کو ایک ساتھ کریں  
- **API کی نامکمل کوریج**: یقینی بنائیں کہ تمام اینڈپوائنٹس اور خصوصیات کی جانچ ہو  
- **ٹیسٹ کے ماحول میں عدم یکسانیت**: کنٹینرز استعمال کریں تاکہ کنسسٹنٹ ٹیسٹ ماحول یقینی بن سکیں  

## نتیجہ

ایک جامع ٹیسٹنگ حکمت عملی قابل اعتماد، اعلی معیار کے MCP سرورز کی ترقی کے لیے ضروری ہے۔ اس گائیڈ میں بیان کردہ بہترین طریقوں اور تجاویز کو نافذ کرکے، آپ اپنی MCP امپلیمنٹیشنز کو اعلیٰ معیار، اعتماد، اور کارکردگی کے معیارات پر پورا اتار سکتے ہیں۔  


## کلیدی نکات

1. **ٹول ڈیزائن**: سنگل ریسپانسبلٹی اصول کی پیروی کریں، ڈپینڈنسی انجیکشن استعمال کریں، اور کمپوز ایبل ڈیزائن کریں  
2. **اسکیمہ ڈیزائن**: واضح، اچھی دستاویزی اسکیمے بنائیں جن میں مناسب ویلیڈیشن پابندیاں ہوں  
3. **خرابی ہینڈلنگ**: نرم خرابی ہینڈلنگ، منظم خرابی جوابات، اور ری ٹرائی لاجک نافذ کریں  
4. **کارکردگی**: کیشنگ، غیر متزامن پراسیسنگ، اور وسائل کی تھروٹلنگ استعمال کریں  
5. **سیکیورٹی**: جامع ان پٹ ویلیڈیشن، اجازت چیکز، اور حساس ڈیٹا ہینڈلنگ اپنائیں  
6. **ٹیسٹنگ**: مکمل یونٹ، انٹیگریشن، اور اینڈ-ٹو-اینڈ ٹیسٹس تیار کریں  
7. **ورک فلو پیٹرنز**: قائم شدہ پیٹرنز جیسے چینز، ڈسپیچرز، اور متوازی پراسیسنگ اپنائیں  

## مشق

ایک MCP ٹول اور ورک فلو ڈیزائن کریں جو ایک دستاویز پروسیسنگ سسٹم کے لیے:

1. متعدد فارمیٹس (PDF، DOCX، TXT) میں دستاویزات قبول کرے  
2. دستاویزات سے متن اور کلیدی معلومات نکالے  
3. دستاویزات کو قسم اور مواد کے اعتبار سے درجہ بندی کرے  
4. ہر دستاویز کا خلاصہ تیار کرے  

ٹول اسکیمے، خرابی ہینڈلنگ، اور ایک ورک فلو پیٹرن نافذ کریں جو اس منظر نامے کے لیے بہترین ہو۔ غور کریں کہ آپ اس امپلیمنٹیشن کی کس طرح جانچ کریں گے۔  

## وسائل

1. تازہ ترین ترقیات سے باخبر رہنے کے لیے MCP کمیونٹی میں شامل ہوں: [Azure AI Foundry Discord Community](https://aka.ms/foundrydevs)  
2. اوپن سورس [MCP پروجیکٹس](https://github.com/modelcontextprotocol) میں تعاون کریں  
3. اپنی تنظیم کے AI اقدامات میں MCP اصول اپنائیں  
4. اپنی صنعت کے لیے خصوصی MCP امپلیمنٹیشنز دریافت کریں  
5. خاص MCP موضوعات پر ایڈوانس کورسز لینے پر غور کریں، جیسے ملٹی موڈل انٹیگریشن یا انٹرپرائز ایپلیکیشن انٹیگریشن  
6. سیکھے گئے اصولوں کا استعمال کرتے ہوئے اپنے MCP ٹولز اور ورک فلو تجربہ کریں: [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)  

## اگلا مرحلہ

اگلا: [کیس اسٹڈیز](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**دستبرداری**:  
اس دستاویز کا ترجمہ AI ترجمہ سروس [Co-op Translator](https://github.com/Azure/co-op-translator) کے ذریعے کیا گیا ہے۔ اگرچہ ہم درستگی کی کوشش کرتے ہیں، براہ کرم اس بات سے آگاہ رہیں کہ خودکار تراجم میں غلطیاں یا عدم درستیاں ہو سکتی ہیں۔ اصل دستاویز اپنی مادری زبان میں ہی معتبر ماخذ سمجھی جائے۔ اہم معلومات کے لیے پیشہ ور انسانی ترجمہ تجویز کیا جاتا ہے۔ ہم اس ترجمہ کے استعمال سے پیدا ہونے والی کسی بھی غلط فہمی یا غلط تعبیر کے لیے ذمہ دار نہیں ہیں۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->