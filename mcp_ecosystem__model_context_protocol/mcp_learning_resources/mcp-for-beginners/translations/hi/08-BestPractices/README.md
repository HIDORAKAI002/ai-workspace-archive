# MCP विकास सर्वोत्तम प्रथाएं

[![MCP Development Best Practices](../../../translated_images/hi/09.d0f6d86c9d72134c.webp)](https://youtu.be/W56H9W7x-ao)

_(इस पाठ का वीडियो देखने के लिए ऊपर तस्वीर पर क्लिक करें)_

## अवलोकन

यह पाठ उत्पादन परिवेशों में MCP सर्वर और फीचर्स के विकास, परीक्षण, और परिनियोजन के लिए उन्नत सर्वोत्तम प्रथाओं पर केंद्रित है। जैसे-जैसे MCP पारिस्थितिक तंत्र जटिलता और महत्व में बढ़ रहे हैं, स्थापित पैटर्न का पालन करने से विश्वसनीयता, रखरखाव, और इंटरऑपरेबिलिटी सुनिश्चित होती है। यह पाठ वास्तविक दुनिया के MCP कार्यान्वयन से प्राप्त व्यावहारिक ज्ञान को एकत्रित करता है ताकि आप मजबूत, कुशल सर्वर प्रभावी संसाधन, प्रॉम्प्ट, और उपकरणों के साथ बना सकें।

## सीखने के उद्देश्य

इस पाठ के अंत तक, आप सक्षम होंगे:

- MCP सर्वर और फीचर डिजाइन में उद्योग की सर्वोत्तम प्रथाओं को लागू करना
- MCP सर्वरों के लिए व्यापक परीक्षण रणनीतियाँ बनाना
- जटिल MCP अनुप्रयोगों के लिए कुशल, पुन: प्रयोज्य वर्कफ़्लो पैटर्न डिजाइन करना
- MCP सर्वरों में उचित त्रुटि प्रबंधन, लॉगिंग, और निरीक्षण लागू करना
- प्रदर्शन, सुरक्षा, और रखरखाव के लिए MCP कार्यान्वयन का अनुकूलन करना

## MCP मूल सिद्धांत

विशिष्ट कार्यान्वयन प्रथाओं में गोता लगाने से पहले, यह समझना आवश्यक है कि प्रभावी MCP विकास को मार्गदर्शित करने वाले मूल सिद्धांत क्या हैं:

1. **मानकीकृत संचार**: MCP JSON-RPC 2.0 को अपने आधार के रूप में उपयोग करता है, जो सभी कार्यान्वयनों में अनुरोध, प्रतिक्रिया, और त्रुटि प्रबंधन के लिए एक सुसंगत प्रारूप प्रदान करता है।

2. **उपयोगकर्ता-केंद्रित डिजाइन**: हमेशा अपने MCP कार्यान्वयनों में उपयोगकर्ता की सहमति, नियंत्रण, और पारदर्शिता को प्राथमिकता दें।

3. **सुरक्षा पहले**: प्रमाणीकरण, प्राधिकरण, सत्यापन, और दर सीमा सहित मजबूत सुरक्षा उपाय लागू करें।

4. **मॉड्यूलर वास्तुकला**: अपने MCP सर्वरों को मॉड्यूलर दृष्टिकोण से डिज़ाइन करें, जहाँ प्रत्येक उपकरण और संसाधन का एक स्पष्ट, केंद्रित उद्देश्य हो।

5. **स्थिति-सम्पन्न कनेक्शन**: अधिक संगठित और संदर्भ-ज्ञानी बातचीत के लिए कई अनुरोधों के बीच स्थिति बनाए रखने की MCP क्षमता का लाभ उठाएं।

## आधिकारिक MCP सर्वोत्तम प्रथाएं

निम्नलिखित सर्वोत्तम प्रथाएं आधिकारिक मॉडल संदर्भ प्रोटोकॉल दस्तावेज़ से प्राप्त हैं:

### सुरक्षा सर्वोत्तम प्रथाएं

1. **उपयोगकर्ता की सहमति और नियंत्रण**: डेटा तक पहुँचने या संचालन करने से पहले हमेशा स्पष्ट उपयोगकर्ता सहमति आवश्यक करें। स्पष्ट रूप से नियंत्रण प्रदान करें कि कौन सा डेटा साझा किया जाता है और कौन से क्रियाएं प्राधिकृत हैं।

2. **डेटा गोपनीयता**: केवल स्पष्ट सहमति के साथ उपयोगकर्ता डेटा का प्रदर्शन करें और इसे उचित पहुँच नियंत्रणों के साथ सुरक्षित करें। अनधिकृत डेटा ट्रांसमिशन से बचाव करें।

3. **उपकरण सुरक्षा**: किसी भी उपकरण को कॉल करने से पहले स्पष्ट उपयोगकर्ता सहमति आवश्यकता करें। सुनिश्चित करें कि उपयोगकर्ता प्रत्येक उपकरण की कार्यक्षमता को समझते हैं और मजबूत सुरक्षा सीमाएं लागू करें।

4. **उपकरण अनुमति नियंत्रण**: सत्र के दौरान मॉडल को किन उपकरणों का उपयोग करने की अनुमति है, यह विन्यस्त करें ताकि केवल स्पष्ट रूप से प्राधिकृत उपकरण उपलब्ध हों।

5. **प्रमाणीकरण**: उपकरणों, संसाधनों, या संवेदनशील संचालन तक पहुँच प्रदान करने से पहले सही प्रमाणीकरण की आवश्यकता करें, जैसे API कुंजियाँ, OAuth टोकन, या अन्य सुरक्षित प्रमाणीकरण विधियाँ।

6. **पैरामीटर सत्यापन**: सभी उपकरण कॉल के लिए सत्यापन लागू करें जिससे गलत या दुर्भावनापूर्ण इनपुट तक उपकरण कार्यान्वयन न पहुँचें।

7. **दर सीमा**: दुरुपयोग रोकने और सर्वर संसाधनों के न्यायसंगत उपयोग को सुनिश्चित करने के लिए दर सीमा लागू करें।

### कार्यान्वयन सर्वोत्तम प्रथाएं

1. **क्षमता बातचीत**: कनेक्शन सेटअप के दौरान समर्थित फीचर्स, प्रोटोकॉल संस्करण, उपलब्ध उपकरण, और संसाधन के बारे में जानकारी का आदान-प्रदान करें।

2. **उपकरण डिजाइन**: ऐसे केंद्रित उपकरण बनाएं जो एक कार्य में पारंगत हों, न कि कई चिंताओं को संभालने वाले मोनोलिथिक उपकरण।

3. **त्रुटि प्रबंधन**: मानकीकृत त्रुटि संदेश और कोड लागू करें ताकि मुद्दों का निदान हो सके, विफलताएँ सलीके से संभाली जा सकें, और कार्रवाई योग्य प्रतिक्रिया मिल सके।

4. **लॉगिंग**: ऑडिटिंग, डिबगिंग, और प्रोटोकॉल इंटरैक्शन मॉनिटरिंग के लिए संरचित लॉग कॉन्फ़िगर करें।

5. **प्रगति ट्रैकिंग**: लंबी चलने वाली कार्रवाइयों के लिए प्रगति अपडेट रिपोर्ट करें ताकि प्रतिक्रियाशील उपयोगकर्ता इंटरफेस सक्षम हो सके।

6. **अनुरोध रद्दीकरण**: क्लाइंट्स को ऐसे अनुरोध जो अब आवश्यक नहीं हैं या बहुत समय ले रहे हैं, रद्द करने की अनुमति दें।

## अतिरिक्त संदर्भ

MCP सर्वोत्तम प्रथाओं पर सबसे नवीनतम जानकारी के लिए देखिए:

- [MCP दस्तावेज़](https://modelcontextprotocol.io/)
- [MCP विनिर्देशन (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub रिपोजिटरी](https://github.com/modelcontextprotocol)
- [सुरक्षा सर्वोत्तम प्रथाएं](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
- [OWASP MCP टॉप 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - सुरक्षा जोखिम और निवारण
- [MCP सुरक्षा समिट वर्कशॉप (शेरपा)](https://azure-samples.github.io/sherpa/) - हैंड्स-ऑन सुरक्षा प्रशिक्षण

## व्यावहारिक कार्यान्वयन उदाहरण

### उपकरण डिजाइन सर्वोत्तम प्रथाएं

#### 1. एकल जिम्मेदारी सिद्धांत

प्रत्येक MCP उपकरण का एक स्पष्ट, केंद्रित उद्देश्य होना चाहिए। कई चिंताओं को संभालने वाले मोनोलिथिक उपकरण बनाने के बजाय, ऐसे विशेषीकृत उपकरण विकसित करें जो विशिष्ट कार्यों में उत्कृष्ट हों।

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

#### 2. सुसंगत त्रुटि प्रबंधन

जानकारीपूर्ण त्रुटि संदेशों और उपयुक्त सुधार तंत्रों के साथ मजबूत त्रुटि प्रबंधन लागू करें।

```python
# व्यापक त्रुटि हैंडलिंग के साथ पायथन उदाहरण
class DataQueryTool:
    def get_name(self):
        return "dataQuery"
        
    def get_description(self):
        return "Queries data from specified database tables"
    
    async def execute(self, parameters):
        try:
            # पैरामीटर सत्यापन
            if "query" not in parameters:
                raise ToolParameterError("Missing required parameter: query")
                
            query = parameters["query"]
            
            # सुरक्षा सत्यापन
            if self._contains_unsafe_sql(query):
                raise ToolSecurityError("Query contains potentially unsafe SQL")
            
            try:
                # टाइमआउट के साथ डेटाबेस ऑपरेशन
                async with timeout(10):  # 10 सेकंड का टाइमआउट
                    result = await self._database.execute_query(query)
                    
                return ToolResponse(
                    content=[TextContent(json.dumps(result))]
                )
            except asyncio.TimeoutError:
                raise ToolExecutionError("Database query timed out after 10 seconds")
            except DatabaseConnectionError as e:
                # कनेक्शन त्रुटियाँ अस्थायी हो सकती हैं
                self._log_error("Database connection error", e)
                raise ToolExecutionError(f"Database connection error: {str(e)}")
            except DatabaseQueryError as e:
                # क्वेरी त्रुटियाँ संभवतः क्लाइंट त्रुटियाँ हैं
                self._log_error("Database query error", e)
                raise ToolExecutionError(f"Invalid query: {str(e)}")
                
        except ToolError:
            # उपकरण-विशिष्ट त्रुटियों को गुजरने दें
            raise
        except Exception as e:
            # अप्रत्याशित त्रुटियों के लिए कैच-ऑल
            self._log_error("Unexpected error in DataQueryTool", e)
            raise ToolExecutionError(f"An unexpected error occurred: {str(e)}")
    
    def _contains_unsafe_sql(self, query):
        # SQL इंजेक्शन पहचान का कार्यान्वयन
        pass
        
    def _log_error(self, message, error):
        # त्रुटि लॉगिंग का कार्यान्वयन
        pass
```

#### 3. पैरामीटर सत्यापन

हमेशा पैरामीटरों का पूरी तरह सत्यापन करें ताकि गलत या दुर्भावनापूर्ण इनपुट रोका जा सके।

```javascript
// JavaScript/TypeScript के साथ विस्तृत पैरामीटर सत्यापन का उदाहरण
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
    // 1. पैरामीटर की उपस्थिति सत्यापित करें
    if (!parameters.operation) {
      throw new ToolError("Missing required parameter: operation");
    }
    
    if (!parameters.path) {
      throw new ToolError("Missing required parameter: path");
    }
    
    // 2. पैरामीटर के प्रकार सत्यापित करें
    if (typeof parameters.operation !== "string") {
      throw new ToolError("Parameter 'operation' must be a string");
    }
    
    if (typeof parameters.path !== "string") {
      throw new ToolError("Parameter 'path' must be a string");
    }
    
    // 3. पैरामीटर के मान सत्यापित करें
    const validOperations = ["read", "write", "delete"];
    if (!validOperations.includes(parameters.operation)) {
      throw new ToolError(`Invalid operation. Must be one of: ${validOperations.join(", ")}`);
    }
    
    // 4. लिखा जाने वाले ऑपरेशन के लिए सामग्री की उपस्थिति सत्यापित करें
    if (parameters.operation === "write" && !parameters.content) {
      throw new ToolError("Content parameter is required for write operation");
    }
    
    // 5. पथ सुरक्षा सत्यापन
    if (!this.isPathWithinAllowedDirectories(parameters.path)) {
      throw new ToolError("Access denied: path is outside of allowed directories");
    }
    
    // सत्यापित पैरामीटरों के आधार पर कार्यान्वयन
    // ...
  }
  
  isPathWithinAllowedDirectories(path) {
    // पथ सुरक्षा जांच का कार्यान्वयन
    // ...
  }
}
```

### सुरक्षा कार्यान्वयन उदाहरण

#### 1. प्रमाणीकरण और प्राधिकरण

```java
// प्रमाणीकरण और प्राधिकरण के साथ जावा उदाहरण
public class SecureDataAccessTool implements Tool {
    private final AuthenticationService authService;
    private final AuthorizationService authzService;
    private final DataService dataService;
    
    // निर्भरता इंजेक्शन
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
        // 1. प्रमाणीकरण संदर्भ निकालें
        String authToken = request.getContext().getAuthToken();
        
        // 2. उपयोगकर्ता को प्रमाणित करें
        UserIdentity user;
        try {
            user = authService.validateToken(authToken);
        } catch (AuthenticationException e) {
            return ToolResponse.error("Authentication failed: " + e.getMessage());
        }
        
        // 3. विशेष संचालन के लिए प्राधिकरण जांचें
        String dataId = request.getParameters().get("dataId").getAsString();
        String operation = request.getParameters().get("operation").getAsString();
        
        boolean isAuthorized = authzService.isAuthorized(user, "data:" + dataId, operation);
        if (!isAuthorized) {
            return ToolResponse.error("Access denied: Insufficient permissions for this operation");
        }
        
        // 4. प्राधिकृत संचालन के साथ आगे बढ़ें
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

#### 2. दर सीमा

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

## परीक्षण सर्वोत्तम प्रथाएं

### 1. यूनिट टेस्टिंग MCP उपकरण

हमेशा अपने उपकरणों का पृथक रूप में परीक्षण करें, बाहरी निर्भरताओं को मॉक करें:

```typescript
// टाइपस्क्रिप्ट उदाहरण एक टूल यूनिट टेस्ट का
describe('WeatherForecastTool', () => {
  let tool: WeatherForecastTool;
  let mockWeatherService: jest.Mocked<IWeatherService>;
  
  beforeEach(() => {
    // एक नकली मौसम सेवा बनाएँ
    mockWeatherService = {
      getForecasts: jest.fn()
    } as any;
    
    // नकली निर्भरता के साथ टूल बनाएँ
    tool = new WeatherForecastTool(mockWeatherService);
  });
  
  it('should return weather forecast for a location', async () => {
    // व्यवस्था करें
    const mockForecast = {
      location: 'Seattle',
      forecasts: [
        { date: '2025-07-16', temperature: 72, conditions: 'Sunny' },
        { date: '2025-07-17', temperature: 68, conditions: 'Partly Cloudy' },
        { date: '2025-07-18', temperature: 65, conditions: 'Rain' }
      ]
    };
    
    mockWeatherService.getForecasts.mockResolvedValue(mockForecast);
    
    // क्रिया करें
    const response = await tool.execute({
      location: 'Seattle',
      days: 3
    });
    
    // सत्यापित करें
    expect(mockWeatherService.getForecasts).toHaveBeenCalledWith('Seattle', 3);
    expect(response.content[0].text).toContain('Seattle');
    expect(response.content[0].text).toContain('Sunny');
  });
  
  it('should handle errors from the weather service', async () => {
    // व्यवस्था करें
    mockWeatherService.getForecasts.mockRejectedValue(new Error('Service unavailable'));
    
    // क्रिया करें और सत्यापित करें
    await expect(tool.execute({
      location: 'Seattle',
      days: 3
    })).rejects.toThrow('Weather service error: Service unavailable');
  });
});
```

### 2. इंटीग्रेशन टेस्टिंग

क्लाइंट अनुरोधों से सर्वर प्रतिक्रियाओं तक पूरा प्रवाह टेस्ट करें:

```python
# पाइथन एकीकरण परीक्षण उदाहरण
@pytest.mark.asyncio
async def test_mcp_server_integration():
    # एक परीक्षण सर्वर शुरू करें
    server = McpServer()
    server.register_tool(WeatherForecastTool(MockWeatherService()))
    await server.start(port=5000)
    
    try:
        # एक क्लाइंट बनाएं
        client = McpClient("http://localhost:5000")
        
        # टूल खोज का परीक्षण करें
        tools = await client.discover_tools()
        assert "weatherForecast" in [t.name for t in tools]
        
        # टूल निष्पादन का परीक्षण करें
        response = await client.execute_tool("weatherForecast", {
            "location": "Seattle",
            "days": 3
        })
        
        # प्रतिक्रिया सत्यापित करें
        assert response.status_code == 200
        assert "Seattle" in response.content[0].text
        assert len(json.loads(response.content[0].text)["forecasts"]) == 3
        
    finally:
        # साफ़ सफाई करें
        await server.stop()
```

## प्रदर्शन अनुकूलन

### 1. कैशिंग रणनीतियाँ

लेटेंसी और संसाधन उपयोग को कम करने के लिए उचित कैशिंग लागू करें:

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

#### 2. निर्भरता इंजेक्शन और टेस्टेबिलिटी

ऐसे उपकरण डिज़ाइन करें जो अपने निर्भरता कंस्ट्रक्टर इंजेक्शन के माध्यम से ग्रहण करें, जिससे वे परीक्षणीय और कॉन्फ़िगरेबल हों:

```java
// निर्भरता इंजेक्शन के साथ जावा उदाहरण
public class CurrencyConversionTool implements Tool {
    private final ExchangeRateService exchangeService;
    private final CacheService cacheService;
    private final Logger logger;
    
    // कंस्ट्रक्टर के माध्यम से डिपेंडेंसी इंजेक्ट की गई
    public CurrencyConversionTool(
            ExchangeRateService exchangeService,
            CacheService cacheService,
            Logger logger) {
        this.exchangeService = exchangeService;
        this.cacheService = cacheService;
        this.logger = logger;
    }
    
    // टूल कार्यान्वयन
    // ...
}
```

#### 3. संयोज्य उपकरण

ऐसे उपकरण डिज़ाइन करें जिन्हें एक साथ मिलाकर अधिक जटिल वर्कफ़्लो बनाए जा सकें:

```python
# कंपोजेबल टूल्स दिखाने वाला पायथन उदाहरण
class DataFetchTool(Tool):
    def get_name(self):
        return "dataFetch"
    
    # कार्यान्वयन...

class DataAnalysisTool(Tool):
    def get_name(self):
        return "dataAnalysis"
    
    # यह टूल dataFetch टूल के परिणामों का उपयोग कर सकता है
    async def execute_async(self, request):
        # कार्यान्वयन...
        pass

class DataVisualizationTool(Tool):
    def get_name(self):
        return "dataVisualize"
    
    # यह टूल dataAnalysis टूल के परिणामों का उपयोग कर सकता है
    async def execute_async(self, request):
        # कार्यान्वयन...
        pass

# इन टूल्स का स्वतंत्र रूप से या वर्कफ़्लो के हिस्से के रूप में उपयोग किया जा सकता है
```

### स्कीमा डिजाइन सर्वोत्तम प्रथाएं

स्कीमा मॉडल और आपके उपकरण के बीच अनुबंध है। अच्छी तरह डिज़ाइन किए गए स्कीमा बेहतर उपकरण उपयोगिता प्रदान करते हैं।

#### 1. स्पष्ट पैरामीटर विवरण

हमेशा प्रत्येक पैरामीटर के लिए वर्णनात्मक जानकारी शामिल करें:

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

#### 2. सत्यापन बाधाएं

अमान्य इनपुट रोकने के लिए सत्यापन बाधाएं शामिल करें:

```java
Map<String, Object> getSchema() {
    Map<String, Object> schema = new HashMap<>();
    schema.put("type", "object");
    
    Map<String, Object> properties = new HashMap<>();
    
    // ईमेल संपत्ति स्वरूप सत्यापन के साथ
    Map<String, Object> email = new HashMap<>();
    email.put("type", "string");
    email.put("format", "email");
    email.put("description", "User email address");
    
    // आयु संपत्ति संख्यात्मक प्रतिबंधों के साथ
    Map<String, Object> age = new HashMap<>();
    age.put("type", "integer");
    age.put("minimum", 13);
    age.put("maximum", 120);
    age.put("description", "User age in years");
    
    // सूचीबद्ध संपत्ति
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

#### 3. सुसंगत रिटर्न संरचनाएँ

अपने प्रतिक्रिया संरचनाओं में सुसंगति बनाए रखें ताकि मॉडल परिणामों को सरलता से व्याख्यायित कर सकें:

```python
async def execute_async(self, request):
    try:
        # अनुरोध को संसाधित करें
        results = await self._search_database(request.parameters["query"])
        
        # हमेशा एक सुसंगत संरचना लौटाएं
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

### त्रुटि प्रबंधन

मजबूत त्रुटि प्रबंधन MCP उपकरणों की विश्वसनीयता बनाए रखने के लिए आवश्यक है।

#### 1. सौम्य त्रुटि प्रबंधन

उपयुक्त स्तरों पर त्रुटियों को संभालें और जानकारीपूर्ण संदेश प्रदान करें:

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

#### 2. संरचित त्रुटि प्रतिक्रियाएं

संरचित त्रुटि जानकारी संभव होने पर लौटाएं:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    try {
        // कार्यान्वयन
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
        
        // अन्य अपवादों को पुनः ToolExecutionException के रूप में फेंकें
        throw new ToolExecutionException("Tool execution failed: " + ex.getMessage(), ex);
    }
}
```

#### 3. पुनः प्रयास तर्क

अस्थायी विफलताओं के लिए उपयुक्त पुनः प्रयास तर्क लागू करें:

```python
async def execute_async(self, request):
    max_retries = 3
    retry_count = 0
    base_delay = 1  # सेकंड
    
    while retry_count < max_retries:
        try:
            # बाहरी API कॉल करें
            return await self._call_api(request.parameters)
        except TransientError as e:
            retry_count += 1
            if retry_count >= max_retries:
                raise ToolExecutionException(f"Operation failed after {max_retries} attempts: {str(e)}")
                
            # घातीय बैकऑफ़
            delay = base_delay * (2 ** (retry_count - 1))
            logging.warning(f"Transient error, retrying in {delay}s: {str(e)}")
            await asyncio.sleep(delay)
        except Exception as e:
            # गैर-अस्थायी त्रुटि, पुनः प्रयास न करें
            raise ToolExecutionException(f"Operation failed: {str(e)}")
```

### प्रदर्शन अनुकूलन

#### 1. कैशिंग

महंगे ऑपरेशनों के लिए कैशिंग लागू करें:

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

#### 2. असिंक्रोनस प्रसंस्करण

I/O-बाउंड कार्यों के लिए असिंक्रोनस प्रोग्रामिंग पैटर्न का उपयोग करें:

```java
public class AsyncDocumentProcessingTool implements Tool {
    private final DocumentService documentService;
    private final ExecutorService executorService;
    
    @Override
    public ToolResponse execute(ToolRequest request) {
        String documentId = request.getParameters().get("documentId").asText();
        
        // लंबी अवधि वाले कार्यों के लिए, तुरंत एक प्रोसेसिंग आईडी वापस करें
        String processId = UUID.randomUUID().toString();
        
        // असिंक्रोनस प्रोसेसिंग शुरू करें
        CompletableFuture.runAsync(() -> {
            try {
                // लंबी अवधि वाला कार्य करें
                documentService.processDocument(documentId);
                
                // स्थिति अपडेट करें (आम तौर पर डेटाबेस में संग्रहीत की जाती है)
                processStatusRepository.updateStatus(processId, "completed");
            } catch (Exception ex) {
                processStatusRepository.updateStatus(processId, "failed", ex.getMessage());
            }
        }, executorService);
        
        // प्रोसेस आईडी के साथ तुरंत प्रतिक्रिया लौटाएं
        Map<String, Object> result = new HashMap<>();
        result.put("processId", processId);
        result.put("status", "processing");
        result.put("estimatedCompletionTime", ZonedDateTime.now().plusMinutes(5));
        
        return new ToolResponse.Builder().setResult(result).build();
    }
    
    // साथी स्थिति जांच उपकरण
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

#### 3. संसाधन थ्रॉटलिंग

अत्यधिक लोड से बचाने के लिए संसाधन थ्रॉटलिंग लागू करें:

```python
class ThrottledApiTool(Tool):
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter(
            tokens_per_second=5,  # प्रति सेकंड 5 अनुरोधों की अनुमति दें
            bucket_size=10        # 10 अनुरोधों तक के अचानक बढ़ोतरी की अनुमति दें
        )
    
    async def execute_async(self, request):
        # जांचें कि क्या हम आगे बढ़ सकते हैं या इंतजार करना है
        delay = self.rate_limiter.get_delay_time()
        
        if delay > 0:
            if delay > 2.0:  # यदि इंतजार बहुत लंबा हो
                raise ToolExecutionException(
                    f"Rate limit exceeded. Please try again in {delay:.1f} seconds."
                )
            else:
                # उपयुक्त विलंब समय के लिए प्रतीक्षा करें
                await asyncio.sleep(delay)
        
        # एक टोकन का उपयोग करें और अनुरोध के साथ जारी रखें
        self.rate_limiter.consume()
        
        # API कॉल करें
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
            
            # अगले टोकन के उपलब्ध होने तक का समय निकालें
            return (1 - self.tokens) / self.tokens_per_second
    
    async def consume(self):
        async with self.lock:
            self._refill()
            self.tokens -= 1
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        
        # बीते समय के आधार पर नए टोकन जोड़ें
        new_tokens = elapsed * self.tokens_per_second
        self.tokens = min(self.bucket_size, self.tokens + new_tokens)
        self.last_refill = now
```

### सुरक्षा सर्वोत्तम प्रथाएं

#### 1. इनपुट सत्यापन

हमेशा इनपुट पैरामीटरों का पूर्ण सत्यापन करें:

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

#### 2. प्राधिकरण जांच

उचित प्राधिकरण जांच लागू करें:

```java
@Override
public ToolResponse execute(ToolRequest request) {
    // अनुरोध से उपयोगकर्ता संदर्भ प्राप्त करें
    UserContext user = request.getContext().getUserContext();
    
    // जांचें कि उपयोगकर्ता के पास आवश्यक अनुमतियाँ हैं या नहीं
    if (!authorizationService.hasPermission(user, "documents:read")) {
        throw new ToolExecutionException("User does not have permission to access documents");
    }
    
    // विशिष्ट संसाधनों के लिए, उस संसाधन तक पहुँच जांचें
    String documentId = request.getParameters().get("documentId").asText();
    if (!documentService.canUserAccess(user.getId(), documentId)) {
        throw new ToolExecutionException("Access denied to the requested document");
    }
    
    // उपकरण निष्पादन के साथ आगे बढ़ें
    // ...
}
```

#### 3. संवेदनशील डेटा प्रबंधन

संवेदनशील डेटा को सावधानीपूर्वक संभालें:

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
        
        # उपयोगकर्ता डेटा प्राप्त करें
        user_data = await self.user_service.get_user_data(user_id)
        
        # संवेदनशील फ़ील्ड को फ़िल्टर करें जब तक कि स्पष्ट रूप से अनुरोधित और अधिकृत न हो
        if not include_sensitive or not self._is_authorized_for_sensitive_data(request):
            user_data = self._redact_sensitive_fields(user_data)
        
        return ToolResponse(result=user_data)
    
    def _is_authorized_for_sensitive_data(self, request):
        # अनुरोध संदर्भ में प्राधिकरण स्तर की जांच करें
        auth_level = request.context.get("authorizationLevel")
        return auth_level == "admin"
    
    def _redact_sensitive_fields(self, user_data):
        # मूल को संशोधित करने से बचने के लिए एक प्रति बनाएं
        redacted = user_data.copy()
        
        # विशिष्ट संवेदनशील फ़ील्ड को छुपाएं
        sensitive_fields = ["ssn", "creditCardNumber", "password"]
        for field in sensitive_fields:
            if field in redacted:
                redacted[field] = "REDACTED"
        
        # नेस्टेड संवेदनशील डेटा को छुपाएं
        if "financialInfo" in redacted:
            redacted["financialInfo"] = {"available": True, "accessRestricted": True}
        
        return redacted
```

## MCP उपकरणों के लिए परीक्षण सर्वोत्तम प्रथाएं

विस्तृत परीक्षण सुनिश्चित करता है कि MCP उपकरण सही ढंग से काम करें, एज मामलों को संभालें, और सिस्टम के बाकी हिस्सों के साथ सही एकीकरण करें।

### यूनिट टेस्टिंग

#### 1. प्रत्येक उपकरण का पृथक परीक्षण करें

प्रत्येक उपकरण की कार्यक्षमता के लिए केंद्रित परीक्षण बनाएं:

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

#### 2. स्कीमा सत्यापन परीक्षण

परीक्षण करें कि स्कीमा मान्य हैं और बाधाओं को ठीक से लागू करते हैं:

```java
@Test
public void testSchemaValidation() {
    // टूल इंस्टेंस बनाएं
    SearchTool searchTool = new SearchTool();
    
    // स्कीमा प्राप्त करें
    Object schema = searchTool.getSchema();
    
    // स्कीमा को सत्यापन के लिए JSON में परिवर्तित करें
    String schemaJson = objectMapper.writeValueAsString(schema);
    
    // स्कीमा की वैधता JSONSchema के रूप में जांचें
    JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    JsonSchema jsonSchema = factory.getJsonSchema(schemaJson);
    
    // मान्य पैरामीटर का परीक्षण करें
    JsonNode validParams = objectMapper.createObjectNode()
        .put("query", "test query")
        .put("limit", 5);
        
    ProcessingReport validReport = jsonSchema.validate(validParams);
    assertTrue(validReport.isSuccess());
    
    // आवश्यक पैरामीटर के अभाव का परीक्षण करें
    JsonNode missingRequired = objectMapper.createObjectNode()
        .put("limit", 5);
        
    ProcessingReport missingReport = jsonSchema.validate(missingRequired);
    assertFalse(missingReport.isSuccess());
    
    // अमान्य पैरामीटर प्रकार का परीक्षण करें
    JsonNode invalidType = objectMapper.createObjectNode()
        .put("query", "test")
        .put("limit", "not-a-number");
        
    ProcessingReport invalidReport = jsonSchema.validate(invalidType);
    assertFalse(invalidReport.isSuccess());
}
```

#### 3. त्रुटि प्रबंधन परीक्षण

त्रुटि स्थितियों के लिए विशेष परीक्षण बनाएं:

```python
@pytest.mark.asyncio
async def test_api_tool_handles_timeout():
    # व्यवस्थित करें
    tool = ApiTool(timeout=0.1)  # बहुत छोटा टाइमआउट
    
    # एक अनुरोध का मॉक करें जो टाइमआउट हो जाएगा
    with aioresponses() as mocked:
        mocked.get(
            "https://api.example.com/data",
            callback=lambda *args, **kwargs: asyncio.sleep(0.5)  # टाइमआउट से लंबा
        )
        
        request = ToolRequest(
            tool_name="apiTool",
            parameters={"url": "https://api.example.com/data"}
        )
        
        # क्रिया करें और सत्यापित करें
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # अपवाद संदेश सत्यापित करें
        assert "timed out" in str(exc_info.value).lower()

@pytest.mark.asyncio
async def test_api_tool_handles_rate_limiting():
    # व्यवस्थित करें
    tool = ApiTool()
    
    # एक दर-सीमित प्रतिक्रिया का मॉक करें
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
        
        # क्रिया करें और सत्यापित करें
        with pytest.raises(ToolExecutionException) as exc_info:
            await tool.execute_async(request)
        
        # सत्यापित करें कि अपवाद में दर सीमा जानकारी शामिल है
        error_msg = str(exc_info.value).lower()
        assert "rate limit" in error_msg
        assert "try again" in error_msg
```

### इंटीग्रेशन टेस्टिंग

#### 1. उपकरण श्रृंखला परीक्षण

उपकरणों को अपेक्षित संयोजनों में एक साथ काम करते हुए जांचें:

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

#### 2. MCP सर्वर परीक्षण

पूर्ण उपकरण पंजीकरण और निष्पादन के साथ MCP सर्वर की जांच करें:

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
        // डिस्कवरी एंडपॉइंट का परीक्षण करें
        mockMvc.perform(get("/mcp/tools"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tools").isArray())
            .andExpect(jsonPath("$.tools[*].name").value(hasItems(
                "weatherForecast", "calculator", "documentSearch"
            )));
    }
    
    @Test
    public void testToolExecution() throws Exception {
        // टूल अनुरोध बनाएँ
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "add");
        parameters.put("a", 5);
        parameters.put("b", 7);
        request.put("parameters", parameters);
        
        // अनुरोध भेजें और प्रतिक्रिया सत्यापित करें
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.result.value").value(12));
    }
    
    @Test
    public void testToolValidation() throws Exception {
        // अमान्य टूल अनुरोध बनाएँ
        Map<String, Object> request = new HashMap<>();
        request.put("toolName", "calculator");
        
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("operation", "divide");
        parameters.put("a", 10);
        // पैरामीटर "b" गायब है
        request.put("parameters", parameters);
        
        // अनुरोध भेजें और त्रुटि प्रतिक्रिया सत्यापित करें
        mockMvc.perform(post("/mcp/execute")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }
}
```

#### 3. एंड-टू-एंड परीक्षण

मॉडल प्रॉम्प्ट से लेकर उपकरण निष्पादन तक पूर्ण वर्कफ़्लो परीक्षण करें:

```python
@pytest.mark.asyncio
async def test_model_interaction_with_tool():
    # व्यवस्थित करें - MCP क्लाइंट सेट अप करें और मॉक मॉडल स्थापित करें
    mcp_client = McpClient(server_url="http://localhost:5000")
    
    # मॉक मॉडल प्रतिक्रियाएं
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
    
    # मॉक मौसम उपकरण प्रतिक्रिया
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
        
        # क्रिया करें
        response = await mcp_client.send_prompt(
            "What's the weather in Seattle?",
            model=mock_model,
            allowed_tools=["weatherForecast"]
        )
        
        # पुष्टि करें
        assert "Seattle" in response.generated_text
        assert "65" in response.generated_text
        assert "Sunny" in response.generated_text
        assert "Rain" in response.generated_text
        assert len(response.tool_calls) == 1
        assert response.tool_calls[0].tool_name == "weatherForecast"
```

### प्रदर्शन परीक्षण

#### 1. लोड टेस्टिंग

टेस्ट करें कि आपका MCP सर्वर कितने समवर्ती अनुरोध संभाल सकता है:

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

#### 2. स्ट्रेस टेस्टिंग

अत्यधिक लोड के तहत सिस्टम का परीक्षण करें:

```java
@Test
public void testServerUnderStress() {
    int maxUsers = 1000;
    int rampUpTimeSeconds = 60;
    int testDurationSeconds = 300;
    
    // स्ट्रेस टेस्टिंग के लिए JMeter सेटअप करें
    StandardJMeterEngine jmeter = new StandardJMeterEngine();
    
    // JMeter टेस्ट प्लान कॉन्फ़िगर करें
    HashTree testPlanTree = new HashTree();
    
    // टेस्ट प्लान, थ्रेड समूह, सैम्पलर आदि बनाएं
    TestPlan testPlan = new TestPlan("MCP Server Stress Test");
    testPlanTree.add(testPlan);
    
    ThreadGroup threadGroup = new ThreadGroup();
    threadGroup.setNumThreads(maxUsers);
    threadGroup.setRampUp(rampUpTimeSeconds);
    threadGroup.setScheduler(true);
    threadGroup.setDuration(testDurationSeconds);
    
    testPlanTree.add(threadGroup);
    
    // टूल निष्पादन के लिए HTTP सैम्पलर जोड़ें
    HTTPSampler toolExecutionSampler = new HTTPSampler();
    toolExecutionSampler.setDomain("localhost");
    toolExecutionSampler.setPort(5000);
    toolExecutionSampler.setPath("/mcp/execute");
    toolExecutionSampler.setMethod("POST");
    toolExecutionSampler.addArgument("toolName", "calculator");
    toolExecutionSampler.addArgument("parameters", "{\"operation\":\"add\",\"a\":5,\"b\":7}");
    
    threadGroup.add(toolExecutionSampler);
    
    // लिसनर जोड़ें
    SummaryReport summaryReport = new SummaryReport();
    threadGroup.add(summaryReport);
    
    // टेस्ट चलाएं
    jmeter.configure(testPlanTree);
    jmeter.run();
    
    // परिणाम जांचें
    assertEquals(0, summaryReport.getErrorCount());
    assertTrue(summaryReport.getAverage() < 200); // औसत प्रतिक्रिया समय < 200ms
    assertTrue(summaryReport.getPercentile(90.0) < 500); // 90 वां पर्सेंटाइल < 500ms
}
```

#### 3. मॉनिटरिंग और प्रोफाइलिंग

दीर्घकालिक प्रदर्शन विश्लेषण के लिए मॉनिटरिंग सेट करें:

```python
# एक MCP सर्वर के लिए निगरानी कॉन्फ़िगर करें
def configure_monitoring(server):
    # Prometheus मेट्रिक्स सेट करें
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
    
    # समय निर्धारण और मेट्रिक्स रिकॉर्ड करने के लिए मिडलवेयर जोड़ें
    server.add_middleware(PrometheusMiddleware(prometheus_metrics))
    
    # मेट्रिक्स एंडपॉइंट प्रदर्शित करें
    @server.router.get("/metrics")
    async def metrics():
        return generate_latest()
    
    return server
```

## MCP वर्कफ़्लो डिजाइन पैटर्न

अच्छी तरह से डिज़ाइन किए गए MCP वर्कफ़्लो दक्षता, विश्वसनीयता, और रखरखाव में सुधार करते हैं। यहाँ कुछ मुख्य पैटर्न दिए गए हैं जिन्हें आप अनुसरण कर सकते हैं:

### 1. उपकरण श्रृंखला पैटर्न

कई उपकरणों को एक श्रृंखला में जोड़ें जहां प्रत्येक उपकरण का आउटपुट अगले के लिए इनपुट बनता है:

```python
# पायथन चेन ऑफ टूल्स कार्यान्वयन
class ChainWorkflow:
    def __init__(self, tools_chain):
        self.tools_chain = tools_chain  # निष्पादित करने के लिए टूल नामों की सूची
    
    async def execute(self, mcp_client, initial_input):
        current_result = initial_input
        all_results = {"input": initial_input}
        
        for tool_name in self.tools_chain:
            # श्रृंखला में प्रत्येक टूल को निष्पादित करें, पिछला परिणाम पास करते हुए
            response = await mcp_client.execute_tool(tool_name, current_result)
            
            # परिणाम संग्रहीत करें और अगले टूल के लिए इनपुट के रूप में उपयोग करें
            all_results[tool_name] = response.result
            current_result = response.result
        
        return {
            "final_result": current_result,
            "all_results": all_results
        }

# उदाहरण उपयोग
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

### 2. डिस्पैचर पैटर्न

केंद्रित उपकरण का उपयोग करें जो इनपुट के आधार पर विशिष्ट उपकरणों को डिस्पैच करता है:

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

### 3. समानांतर प्रसंस्करण पैटर्न

कुशलता के लिए कई उपकरणों को समानांतर निष्पादित करें:

```java
public class ParallelDataProcessingWorkflow {
    private final McpClient mcpClient;
    
    public ParallelDataProcessingWorkflow(McpClient mcpClient) {
        this.mcpClient = mcpClient;
    }
    
    public WorkflowResult execute(String datasetId) {
        // चरण 1: डेटासेट मेटाडेटा प्राप्त करें (सिंक्रोनस)
        ToolResponse metadataResponse = mcpClient.executeTool("datasetMetadata", 
            Map.of("datasetId", datasetId));
        
        // चरण 2: एक साथ कई विश्लेषण लॉन्च करें
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
        
        // सभी समानांतर कार्यों के पूरा होने की प्रतीक्षा करें
        CompletableFuture<Void> allAnalyses = CompletableFuture.allOf(
            statisticalAnalysis, correlationAnalysis, outlierDetection
        );
        
        allAnalyses.join();  // पूरा होने की प्रतीक्षा करें
        
        // चरण 3: परिणाम संयोजित करें
        Map<String, Object> combinedResults = new HashMap<>();
        combinedResults.put("metadata", metadataResponse.getResult());
        combinedResults.put("statistics", statisticalAnalysis.join().getResult());
        combinedResults.put("correlations", correlationAnalysis.join().getResult());
        combinedResults.put("outliers", outlierDetection.join().getResult());
        
        // चरण 4: सारांश रिपोर्ट तैयार करें
        ToolResponse summaryResponse = mcpClient.executeTool("reportGenerator", 
            Map.of("analysisResults", combinedResults));
        
        // पूर्ण वर्कफ़्लो परिणाम लौटाएं
        WorkflowResult result = new WorkflowResult();
        result.setDatasetId(datasetId);
        result.setAnalysisResults(combinedResults);
        result.setSummaryReport(summaryResponse.getResult());
        
        return result;
    }
}
```

### 4. त्रुटि पुनर्प्राप्ति पैटर्न

उपकरण विफलताओं के लिए सौम्य फॉलबैक्स लागू करें:

```python
class ResilientWorkflow:
    def __init__(self, mcp_client):
        self.client = mcp_client
    
    async def execute_with_fallback(self, primary_tool, fallback_tool, parameters):
        try:
            # पहले प्राथमिक उपकरण का प्रयास करें
            response = await self.client.execute_tool(primary_tool, parameters)
            return {
                "result": response.result,
                "source": "primary",
                "tool": primary_tool
            }
        except ToolExecutionException as e:
            # असफलता को लॉग करें
            logging.warning(f"Primary tool '{primary_tool}' failed: {str(e)}")
            
            # माध्यमिक उपकरण पर वापस जाएं
            try:
                # वापसी उपकरण के लिए पैरामीटर बदलने की आवश्यकता हो सकती है
                fallback_params = self._adapt_parameters(parameters, primary_tool, fallback_tool)
                
                response = await self.client.execute_tool(fallback_tool, fallback_params)
                return {
                    "result": response.result,
                    "source": "fallback",
                    "tool": fallback_tool,
                    "primaryError": str(e)
                }
            except ToolExecutionException as fallback_error:
                # दोनों उपकरण विफल रहे
                logging.error(f"Both primary and fallback tools failed. Fallback error: {str(fallback_error)}")
                raise WorkflowExecutionException(
                    f"Workflow failed: primary error: {str(e)}; fallback error: {str(fallback_error)}"
                )
    
    def _adapt_parameters(self, params, from_tool, to_tool):
        """Adapt parameters between different tools if needed"""
        # यह कार्यान्वयन विशिष्ट उपकरणों पर निर्भर करेगा
        # इस उदाहरण के लिए, हम केवल मूल पैरामीटर लौटाएंगे
        return params

# उदाहरण उपयोग
async def get_weather(workflow, location):
    return await workflow.execute_with_fallback(
        "premiumWeatherService",  # प्राथमिक (भुगतान किया हुआ) मौसम एपीआई
        "basicWeatherService",    # वापसी (मुफ्त) मौसम एपीआई
        {"location": location}
    )
```

### 5. वर्कफ़्लो संयोजन पैटर्न

सरल वर्कफ़्लो को संयोजित करके जटिल वर्कफ़्लो बनाएँ:

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

# MCP सर्वर परीक्षण: सर्वोत्तम प्रथाएं और शीर्ष सुझाव

## अवलोकन

परीक्षण विश्वसनीय, उच्च गुणवत्ता वाले MCP सर्वरों के विकास का एक महत्वपूर्ण पहलू है। यह गाइड विकास जीवनचक्र में आपके MCP सर्वरों का परीक्षण करने के लिए व्यापक सर्वोत्तम प्रथाएं और सुझाव प्रदान करता है, यूनिट टेस्ट से लेकर इंटीग्रेशन टेस्ट और एंड-टू-एंड सत्यापन तक।

## MCP सर्वरों के लिए परीक्षण क्यों महत्वपूर्ण है

MCP सर्वर AI मॉडल और क्लाइंट अनुप्रयोगों के बीच महत्वपूर्ण मिडलवेयर के रूप में कार्य करते हैं। गहन परीक्षण सुनिश्चित करता है:

- उत्पादन परिवेशों में विश्वसनीयता
- अनुरोधों और प्रतिक्रियाओं की सटीक हैंडलिंग
- MCP विनिर्देशों का सही कार्यान्वयन
- विफलताओं और एज मामलों के खिलाफ लचीलापन
- विभिन्न भारों के तहत स्थिर प्रदर्शन

## MCP सर्वरों के लिए यूनिट टेस्टिंग

### यूनिट टेस्टिंग (मूलभूत)

यूनिट टेस्ट आपके MCP सर्वर के व्यक्तिगत घटकों का पृथक परीक्षण करते हैं।

#### क्या परीक्षण करें

1. **संसाधन हैंडलर**: प्रत्येक संसाधन हैंडलर के लॉजिक का स्वतंत्र परीक्षण करें
2. **उपकरण कार्यान्वयन**: विभिन्न इनपुट के साथ उपकरण व्यवहार सत्यापित करें
3. **प्रॉम्प्ट टेम्पलेट**: सुनिश्चित करें कि प्रॉम्प्ट टेम्पलेट सही ढंग से प्रस्तुत होते हैं
4. **स्कीमा सत्यापन**: पैरामीटर सत्यापन लॉजिक का परीक्षण करें
5. **त्रुटि प्रबंधन**: अमान्य इनपुट के लिए त्रुटि प्रतिक्रियाओं को सत्यापित करें

#### यूनिट टेस्टिंग के लिए सर्वोत्तम प्रथाएं

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
# पाइथन में एक कैलकुलेटर टूल के लिए उदाहरण यूनिट टेस्ट
def test_calculator_tool_add():
    # व्यवस्थित करें
    calculator = CalculatorTool()
    parameters = {
        "operation": "add",
        "a": 5,
        "b": 7
    }
    
    # क्रियान्वित करें
    response = calculator.execute(parameters)
    result = json.loads(response.content[0].text)
    
    # सत्यापित करें
    assert result["value"] == 12
```

### इंटीग्रेशन टेस्टिंग (मध्य स्तर)

इंटीग्रेशन टेस्ट आपके MCP सर्वर के घटकों के बीच अंतःक्रियाओं को सत्यापित करते हैं।

#### क्या परीक्षण करें

1. **सर्वर प्रारंभ**: विभिन्न कॉन्फ़िगरेशन के साथ सर्वर स्टार्टअप का परीक्षण करें
2. **रूट पंजीकरण**: सभी एंडपॉइंट्स ठीक से पंजीकृत हैं यह सत्यापित करें
3. **अनुरोध प्रसंस्करण**: पूरा अनुरोध-प्रतिक्रिया चक्र परीक्षण करें
4. **त्रुटि प्रचार**: सुनिश्चित करें कि त्रुटियाँ घटकों के बीच ठीक से संचारित हो रही हैं
5. **प्रमाणीकरण और प्राधिकरण**: सुरक्षा तंत्रों का परीक्षण करें

#### इंटीग्रेशन टेस्टिंग के लिए सर्वोत्तम प्रथाएं

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

### एंड-टू-एंड टेस्टिंग (शीर्ष स्तर)

एंड-टू-एंड टेस्ट पूरी प्रणाली के व्यवहार को क्लाइंट से सर्वर तक सत्यापित करते हैं।

#### क्या परीक्षण करें

1. **क्लाइंट-सर्वर संचार**: पूर्ण अनुरोध-प्रतिक्रिया चक्र का परीक्षण करें
2. **वास्तविक क्लाइंट SDK**: वास्तविक क्लाइंट कार्यान्वयन के साथ परीक्षण करें
3. **लोड के तहत प्रदर्शन**: कई समवर्ती अनुरोधों के साथ व्यवहार सत्यापित करें
4. **त्रुटि पुनर्प्राप्ति**: विफलताओं से सिस्टम की पुनर्प्राप्ति का परीक्षण करें
5. **लंबे-समय तक चलने वाले ऑपरेशन**: स्ट्रीमिंग और लंबे ऑपरेशनों के हैंडलिंग की जांच करें

#### E2E परीक्षण के लिए सर्वोत्तम प्रथाएं

```typescript
// टाइपस्क्रिप्ट में क्लाइंट के साथ उदाहरण E2E परीक्षण
describe('MCP Server E2E Tests', () => {
  let client: McpClient;
  
  beforeAll(async () => {
    // परीक्षण वातावरण में सर्वर प्रारंभ करें
    await startTestServer();
    client = new McpClient('http://localhost:5000');
  });
  
  afterAll(async () => {
    await stopTestServer();
  });
  
  test('Client can invoke calculator tool and get correct result', async () => {
    // क्रिया करें
    const response = await client.invokeToolAsync('calculator', {
      operation: 'divide',
      a: 20,
      b: 4
    });
    
    // पुष्टि करें
    expect(response.statusCode).toBe(200);
    expect(response.content[0].text).toContain('5');
  });
});
```

## MCP परीक्षण के लिए मॉकिंग रणनीतियाँ

परीक्षण के दौरान घटकों को पृथक करने के लिए मॉकिंग आवश्यक है।

### मॉक करने वाले घटक

1. **बाहरी AI मॉडल**: पूर्वानुमानित परीक्षण के लिए मॉडल प्रतिक्रियाएं मॉक करें
2. **बाहरी सेवाएं**: API निर्भरता (डेटाबेस, थर्ड-पार्टी सेवाएं) मॉक करें
3. **प्रमाणीकरण सेवाएं**: पहचान प्रदाताओं को मॉक करें
4. **संसाधन प्रदाता**: महंगे संसाधन हैंडलरों को मॉक करें

### उदाहरण: AI मॉडल प्रतिक्रिया मॉक करना

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
# unittest.mock के साथ Python उदाहरण
@patch('mcp_server.models.OpenAIModel')
def test_with_mock_model(mock_model):
    # मॉक कॉन्फ़िगर करें
    mock_model.return_value.generate_response.return_value = {
        "text": "Mocked model response",
        "finish_reason": "completed"
    }
    
    # परीक्षण में मॉक का उपयोग करें
    server = McpServer(model_client=mock_model)
    # परीक्षण के साथ जारी रखें
```

## प्रदर्शन परीक्षण

प्रोडक्शन MCP सर्वरों के लिए प्रदर्शन परीक्षण महत्वपूर्ण है।

### क्या मापें

1. **लेटेंसी**: अनुरोधों के लिए प्रतिक्रिया समय
2. **थ्रूपुट**: प्रति सेकंड संभाले गए अनुरोध
3. **संसाधन उपयोग**: CPU, मेमोरी, नेटवर्क उपयोग
4. **समवर्ती हैंडलिंग**: समानांतर अनुरोधों के तहत व्यवहार
5. **स्केलिंग गुणधर्म**: जैसे-जैसे लोड बढ़ता है प्रदर्शन

### प्रदर्शन परीक्षण के उपकरण

- **k6**: ओपन-सोर्स लोड परीक्षण उपकरण
- **JMeter**: व्यापक प्रदर्शन परीक्षण
- **Locust**: पायथन-आधारित लोड परीक्षण
- **Azure Load Testing**: क्लाउड-आधारित प्रदर्शन परीक्षण

### उदाहरण: k6 के साथ बुनियादी लोड टेस्ट

```javascript
// MCP सर्वर के लिए लोड टेस्टिंग के लिए k6 स्क्रिप्ट
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,  // 10 वर्चुअल उपयोगकर्ता
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

## MCP सर्वरों के लिए परीक्षण स्वचालन

अपने परीक्षणों को स्वचालित करना सुनिश्चित करता है कि गुणवत्ता सुसंगत हो और प्रतिक्रिया चक्र तेजी से हो।

### CI/CD एकीकरण

1. **पुल रिक्वेस्ट पर यूनिट टेस्ट चलाएँ**: सुनिश्चित करें कि कोड परिवर्तन मौजूदा कार्यक्षमता को प्रभावित न करें  
2. **स्टेजिंग में इंटीग्रेशन टेस्ट**: प्रोडक्शन पूर्व वातावरण में इंटीग्रेशन टेस्ट चलाएँ  
3. **परफॉर्मेंस बेसलाइन**: रिग्रेशन पकड़ने के लिए परफॉर्मेंस बेंचमार्क बनाए रखें  
4. **सुरक्षा स्कैन**: पाइपलाइन के हिस्से के रूप में सुरक्षा परीक्षण स्वचालित करें  

### उदाहरण CI पाइपलाइन (GitHub Actions)

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
  
## MCP विनिर्देशन के अनुपालन के लिए परीक्षण  

सुनिश्चित करें कि आपका सर्वर MCP विनिर्देशन को सही तरीके से लागू करता है।  

### महत्वपूर्ण अनुपालन क्षेत्र  

1. **API एंडपॉइंट्स**: आवश्यक एंडपॉइंट्स (/resources, /tools, आदि) का परीक्षण करें  
2. **अनुरोध/प्रतिक्रिया प्रारूप**: स्कीमा अनुपालन को सत्यापित करें  
3. **त्रुटि कोड**: विभिन्न परिदृश्यों के लिए सही स्थिति कोड सत्यापित करें  
4. **सामग्री प्रकार**: विभिन्न सामग्री प्रकारों की हैंडलिंग का परीक्षण करें  
5. **प्रामाणिकता प्रवाह**: विनिर्देशन-अनुपालन प्रामाणिकता तंत्र सत्यापित करें  

### अनुपालन टेस्ट सूट  

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
  
## प्रभावी MCP सर्वर परीक्षण के लिए शीर्ष 10 सुझाव  

1. **टूल परिभाषाओं का अलग से परीक्षण करें**: टूल लॉजिक से स्वतंत्र रूप से स्कीमा परिभाषाओं का सत्यापन करें  
2. **पैरामीटरयुक्त टेस्ट का उपयोग करें**: विभिन्न इनपुट्स के साथ, यहां तक कि एज केसेस सहित, टूल्स का परीक्षण करें  
3. **त्रुटि प्रतिक्रियाओं की जांच करें**: सभी संभावित त्रुटि स्थितियों के लिए सही त्रुटि हैंडलिंग सत्यापित करें  
4. **प्राधिकरण तर्क का परीक्षण करें**: विभिन्न उपयोगकर्ता भूमिकाओं के लिए उचित एक्सेस नियंत्रण सुनिश्चित करें  
5. **टेस्ट कवरेज मॉनिटर करें**: महत्वपूर्ण पथ कोड के उच्च कवरेज के लक्ष्य रखें  
6. **स्ट्रीमिंग प्रतिक्रियाओं का परीक्षण करें**: स्ट्रीमिंग सामग्री की सही हैंडलिंग का सत्यापन करें  
7. **नेटवर्क समस्याओं का सिमुलेशन करें**: खराब नेटवर्क स्थितियों में व्यवहार का परीक्षण करें  
8. **संसाधन सीमाओं का परीक्षण करें**: कोटा या दर सीमाओं तक पहुँचने पर व्यवहार सत्यापित करें  
9. **रिग्रेशन टेस्ट स्वचालित करें**: एक ऐसा सूट बनाएं जो हर कोड परिवर्तन पर चले  
10. **टेस्ट केस दस्तावेज़ करें**: परीक्षण परिदृश्यों का स्पष्ट दस्तावेज बनाए रखें  

## सामान्य परीक्षण गलतियाँ  

- **खुशहाल पथ परीक्षण पर अत्यधिक निर्भरता**: त्रुटि मामलों का व्यापक रूप से परीक्षण अवश्य करें  
- **परफॉर्मेंस परीक्षण की अनदेखी**: उत्पादन को प्रभावित करने से पहले बॉटलनेक्स की पहचान करें  
- **केवल अलगाव में परीक्षण**: यूनिट, इंटीग्रेशन, और E2E परीक्षणों को मिलाएं  
- **अपूर्ण API कवरेज**: सुनिश्चित करें कि सभी एंडपॉइंट्स और फीचर्स का परीक्षण हो  
- **असंगत परीक्षण वातावरण**: सुनिश्चित परीक्षण वातावरण के लिए कंटेनरों का उपयोग करें  

## निष्कर्ष  

एक व्यापक परीक्षण रणनीति विश्वसनीय, उच्च गुणवत्ता वाले MCP सर्वर विकसित करने के लिए आवश्यक है। इस गाइड में उल्लिखित सर्वोत्तम प्रथाओं और सुझावों को लागू करके, आप अपने MCP कार्यान्वयनों को उच्चतम गुणवत्ता, विश्वसनीयता, और परफॉर्मेंस मानकों पर सुनिश्चित कर सकते हैं।  


## मुख्य निष्कर्ष  

1. **टूल डिज़ाइन**: एकल जिम्मेदारी सिद्धांत का पालन करें, निर्भरता इंजेक्शन का उपयोग करें, और संयोजन योग्यता के लिए डिज़ाइन करें  
2. **स्कीमा डिज़ाइन**: स्पष्ट, अच्छी तरह से प्रलेखित स्कीमा बनाएं जिसमें उचित सत्यापन प्रतिबंध हों  
3. **त्रुटि हैंडलिंग**: सौम्य त्रुटि हैंडलिंग, संरचित त्रुटि प्रतिक्रियाएँ, और पुनः प्रयास लॉजिक लागू करें  
4. **परफॉर्मेंस**: कैशिंग, असिंक्रोनस प्रोसेसिंग, और संसाधन थ्रॉटलिंग का उपयोग करें  
5. **सुरक्षा**: व्यापक इनपुट सत्यापन, प्राधिकरण जांच, और संवेदनशील डेटा हैंडलिंग लागू करें  
6. **परीक्षण**: व्यापक यूनिट, इंटीग्रेशन, और एंड-टू-एंड परीक्षण बनाएं  
7. **वर्कफ़्लो पैटर्न**: चेन, डिस्पैचर्स, और पैरेलल प्रोसेसिंग जैसे स्थापित पैटर्न लागू करें  

## अभ्यास  

एक दस्तावेज़ प्रसंस्करण प्रणाली के लिए MCP टूल और वर्कफ़्लो डिज़ाइन करें जो:  

1. विभिन्न स्वरूपों (PDF, DOCX, TXT) में दस्तावेज स्वीकार करता है  
2. दस्तावेजों से पाठ और प्रमुख जानकारी निकालता है  
3. दस्तावेज़ों को प्रकार और सामग्री द्वारा वर्गीकृत करता है  
4. प्रत्येक दस्तावेज़ का सारांश उत्पन्न करता है  

टूल स्कीमा, त्रुटि हैंडलिंग, और उस परिदृश्य के लिए सबसे उपयुक्त वर्कफ़्लो पैटर्न को लागू करें। इस कार्यान्वयन का परीक्षण कैसे करेंगे इस पर विचार करें।  

## संसाधन  

1. नवीनतम विकासों पर अपडेट रहने के लिए [Azure AI Foundry Discord Community](https://aka.ms/foundrydevs) में MCP समुदाय से जुड़ें  
2. ओपन-सोर्स [MCP प्रोजेक्ट्स](https://github.com/modelcontextprotocol) में योगदान दें  
3. अपनी खुद की संगठन की AI पहल में MCP सिद्धांत लागू करें  
4. अपने उद्योग के लिए विशिष्ट MCP कार्यान्वयन एक्सप्लोर करें।  
5. मल्टी-मॉडल इंटीग्रेशन या एंटरप्राइज एप्लिकेशन इंटीग्रेशन जैसे विशिष्ट MCP विषयों पर उन्नत पाठ्यक्रम लेने पर विचार करें।  
6. [Hands on Lab](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md) के माध्यम से सीखे गए सिद्धांतों का उपयोग करके अपने स्वयं के MCP टूल और वर्कफ़्लो बनाने का प्रयोग करें  

## आगे क्या है  

अगला: [मामले अध्ययन](../09-CaseStudy/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यह दस्तावेज़ AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) का उपयोग करके अनुवादित किया गया है। जबकि हम सटीकता के लिए प्रयासरत हैं, कृपया ध्यान दें कि स्वचालित अनुवाद में त्रुटियाँ या अशुद्धियाँ हो सकती हैं। मूल भाषा में दस्तावेज़ को अधिकारिक स्रोत माना जाना चाहिए। महत्वपूर्ण जानकारी के लिए, पेशेवर मानव अनुवाद की सलाह दी जाती है। इस अनुवाद के उपयोग से उत्पन्न किसी भी गलतफहमी या गलत व्याख्या के लिए हम जिम्मेदार नहीं हैं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->